#!/usr/bin/env python3
"""
Pantheon content pipeline.

Generates compelling social content from a gem or free topic,
sends to Telegram for approval, then posts to X and Threads.

Usage:
  python3 pantheon-post.py                        # pick random gem
  python3 pantheon-post.py --gem andon-cord       # specific gem
  python3 pantheon-post.py --topic "Hannibal at Cannae"  # free topic
  python3 pantheon-post.py --dry-run              # generate only, no post
"""

import argparse
import json
import os
import random
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from shared import get_secret

import requests
import tweepy

# ── Paths ──────────────────────────────────────────────────────────────────
PANTHEON_ROOT = Path(__file__).parent.parent
PATTERNS_DIR  = PANTHEON_ROOT / "patterns"

# ── Content generation ─────────────────────────────────────────────────────
def generate_content(subject: str, gem_context: str = "", gem_name: str = "") -> dict:
    """Run researcher + writer pipeline and return content dict."""
    if gem_name:
        researcher_cmd = [sys.executable, str(Path(__file__).parent / "researcher.py"),
                          "--mode", "gem", "--arg", gem_name]
    elif subject.startswith("the '") and "' cognitive pattern" in subject:
        # Legacy subject format from random_gem() — extract gem name
        extracted = subject.split("'")[1]
        researcher_cmd = [sys.executable, str(Path(__file__).parent / "researcher.py"),
                          "--mode", "gem", "--arg", extracted]
    else:
        researcher_cmd = [sys.executable, str(Path(__file__).parent / "researcher.py"),
                          "--mode", "topic", "--arg", subject]

    researcher = subprocess.run(researcher_cmd, capture_output=True, text=True,
                                cwd=Path(__file__).parent.parent)
    if researcher.returncode != 0:
        sys.exit(f"✗ Researcher failed:\n{researcher.stderr}")

    writer = subprocess.run(
        [sys.executable, str(Path(__file__).parent / "writer.py")],
        input=researcher.stdout, capture_output=True, text=True,
        cwd=Path(__file__).parent.parent
    )
    if writer.returncode != 0:
        sys.exit(f"✗ Writer failed:\n{writer.stderr}")

    return json.loads(writer.stdout.strip())

def random_gem() -> str:
    gems = [d.name for d in PATTERNS_DIR.iterdir()
            if d.is_dir() and (d / "pattern.md").exists()]
    return random.choice(gems)

# ── Telegram ───────────────────────────────────────────────────────────────
def tg_send(token: str, chat_id: str, text: str, reply_markup=None) -> int:
    payload = {"chat_id": chat_id, "text": text, "parse_mode": "Markdown"}
    if reply_markup:
        payload["reply_markup"] = json.dumps(reply_markup)
    r = requests.post(f"https://api.telegram.org/bot{token}/sendMessage", json=payload)
    r.raise_for_status()
    return r.json()["result"]["message_id"]

def tg_get_updates(token: str, offset: int = 0, timeout: int = 30) -> list:
    try:
        r = requests.get(
            f"https://api.telegram.org/bot{token}/getUpdates",
            params={
                "offset": offset,
                "timeout": timeout,
                "allowed_updates": json.dumps(["callback_query", "message"]),
            },
            timeout=timeout + 5,
        )
        if r.status_code == 409:
            # Another poller (e.g. n8n) is active — wait and retry
            time.sleep(3)
            return []
        r.raise_for_status()
        return r.json().get("result", [])
    except requests.exceptions.Timeout:
        return []

def tg_answer_callback(token: str, callback_id: str):
    requests.post(f"https://api.telegram.org/bot{token}/answerCallbackQuery",
                  json={"callback_query_id": callback_id})

def await_approval(token: str, chat_id: str, content: dict) -> str:
    """Send draft to Telegram, return 'post', 'skip', or edited text."""

    preview = (
        f"*Pantheon draft — {content['subject_line']}*\n\n"
        f"*X ({len(content['x_post'])} chars):*\n{content['x_post']}\n\n"
        f"*Threads:*\n{content['threads_post']}"
    )

    keyboard = {
        "inline_keyboard": [[
            {"text": "✅ Post to social",  "callback_data": "post"},
            {"text": "❌ Skip",       "callback_data": "skip"},
        ]]
    }

    tg_send(token, chat_id, preview, reply_markup=keyboard)
    print("Waiting for Telegram approval...")

    # Get current update offset to ignore old messages (non-blocking)
    updates = tg_get_updates(token, timeout=0)
    offset = (updates[-1]["update_id"] + 1) if updates else 0

    while True:
        updates = tg_get_updates(token, offset=offset)
        for update in updates:
            offset = update["update_id"] + 1

            # Inline button press
            if "callback_query" in update:
                cb = update["callback_query"]
                if str(cb["message"]["chat"]["id"]) == str(chat_id):
                    tg_answer_callback(token, cb["id"])
                    return cb["data"]  # "post" or "skip"

            # Text reply (manual edit)
            if "message" in update:
                msg = update["message"]
                if str(msg["chat"]["id"]) == str(chat_id) and "text" in msg:
                    return msg["text"]

        time.sleep(1)

# ── Posting ────────────────────────────────────────────────────────────────
def post_to_x(text: str):
    client = tweepy.Client(
        consumer_key=get_secret("PANTHEON_X_API_KEY"),
        consumer_secret=get_secret("PANTHEON_X_API_SECRET"),
        access_token=get_secret("PANTHEON_X_ACCESS_TOKEN"),
        access_token_secret=get_secret("PANTHEON_X_ACCESS_SECRET"),
    )
    resp = client.create_tweet(text=text)
    return resp.data["id"]

def _safe_truncate(text: str, limit: int = 490) -> str:
    """Truncate at last sentence boundary within limit characters."""
    if len(text) <= limit:
        return text
    candidate = text[:limit]
    # Find last sentence-ending period with space or end-of-string
    for marker in (". ", "! ", "? "):
        pos = candidate.rfind(marker)
        if pos > limit // 2:
            return candidate[:pos + 1]
    # No good boundary found — hard cut
    return candidate

def post_to_threads(text: str):
    token = get_secret("PANTHEON_THREADS_ACCESS_TOKEN")
    # Step 1: create container (POST body, not params — avoids URL length issues)
    truncated = _safe_truncate(text, limit=490)
    r = requests.post(
        "https://graph.threads.net/v1.0/me/threads",
        data={"media_type": "TEXT", "text": truncated, "access_token": token}
    )
    r.raise_for_status()
    creation_id = r.json()["id"]
    # Step 2: publish
    r2 = requests.post(
        "https://graph.threads.net/v1.0/me/threads_publish",
        data={"creation_id": creation_id, "access_token": token}
    )
    r2.raise_for_status()
    return r2.json()["id"]

# ── Main ───────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Pantheon content pipeline")
    parser.add_argument("--gem",     help="Gem name (e.g. andon-cord)")
    parser.add_argument("--topic",   help="Free-form topic")
    parser.add_argument("--dry-run", action="store_true", help="Generate only, don't post")
    args = parser.parse_args()

    # Determine subject
    if args.topic:
        subject = args.topic
        gem_name = ""
        gem_context = ""
    else:
        gem_name = args.gem or random_gem()
        print(f"Gem: {gem_name}")
        gem_context = ""  # researcher loads gem context internally now
        subject = gem_name

    # Generate content
    print("Generating content via Claude (research + write)...")
    content = generate_content(subject, gem_context, gem_name=gem_name)

    content["threads_post"] += "\n\nhttps://pantheon-lilac.vercel.app/"

    print(f"\n── X ({len(content['x_post'])} chars) ──")
    print(content["x_post"])
    print(f"\n── Threads ──")
    print(content["threads_post"])

    if args.dry_run:
        print("\n[dry-run] Done.")
        return

    # Telegram approval gate
    tg_token  = get_secret("PANTHEON_TG_BOT_TOKEN")
    tg_chat   = get_secret("PANTHEON_TG_CHAT_ID")

    decision = await_approval(tg_token, tg_chat, content)

    if decision == "skip":
        print("Skipped.")
        tg_send(tg_token, tg_chat, "❌ Skipped — nothing posted.")
        return

    # If user replied with custom text, use it for both platforms
    if decision != "post":
        content["x_post"] = decision[:280]
        content["threads_post"] = decision

    # Post
    print("Posting to X...")
    x_id = post_to_x(content["x_post"])
    print(f"✓ X: {x_id}")

    print("Posting to Threads...")
    t_id = post_to_threads(content["threads_post"])
    print(f"✓ Threads: {t_id}")

    tg_send(tg_token, tg_chat,
            f"✅ Posted!\n\nX: `{x_id}`\nThreads: `{t_id}`")

if __name__ == "__main__":
    main()
