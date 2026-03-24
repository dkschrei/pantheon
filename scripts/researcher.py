#!/usr/bin/env python3
"""
Pantheon Researcher Agent.

Finds current news, matches to a Pantheon gem, digs historical precedent.
Outputs a research brief as JSON to stdout.

Usage:
  python3 researcher.py --mode auto
  python3 researcher.py --mode gem --arg andon-cord
  python3 researcher.py --mode topic --arg "OpenAI talent exodus"
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from shared import get_secret

PANTHEON_ROOT = Path(__file__).parent.parent
PATTERNS_DIR  = PANTHEON_ROOT / "patterns"

MONITORED_DOMAINS = [
    "AI and machine learning industry",
    "geopolitics and international relations",
    "financial markets and economics",
    "technology industry and startups",
    "science and medicine",
]


def load_gem_summaries(patterns_dir: Path) -> list[dict]:
    """Load name + 300-char summary for every gem."""
    summaries = []
    for gem_dir in sorted(patterns_dir.iterdir()):
        if not gem_dir.is_dir():
            continue
        pattern_file = gem_dir / "pattern.md"
        if not pattern_file.exists():
            continue
        text = pattern_file.read_text(encoding="utf-8")
        summaries.append({
            "name": gem_dir.name,
            "summary": text[:300],
        })
    return summaries


def load_full_gem(gem_name: str) -> str:
    pattern_file = PATTERNS_DIR / gem_name / "pattern.md"
    if not pattern_file.exists():
        return ""
    return pattern_file.read_text(encoding="utf-8")


def run_research(mode: str, arg: str | None) -> dict:
    import anthropic

    client = anthropic.Anthropic(api_key=get_secret("ANTHROPIC_API_KEY"))
    summaries = load_gem_summaries(PATTERNS_DIR)

    gem_list = "\n".join(
        f"- {s['name']}: {s['summary']}" for s in summaries
    )

    if mode == "auto":
        domain_list = ", ".join(MONITORED_DOMAINS)
        task = (
            f"Search for the most compelling current news story (last 48 hours) "
            f"across these domains: {domain_list}. "
            f"Then find the Pantheon gem that best illuminates the pattern at work."
        )
    elif mode == "gem":
        full_gem = load_full_gem(arg)
        task = (
            f"The gem is '{arg}'. Full pattern:\n{full_gem}\n\n"
            f"Search for a current news story (last 7 days) that best illustrates "
            f"this pattern in action today."
        )
    else:  # topic
        task = (
            f"The topic is: {arg}\n\n"
            f"Search for current news about this topic (last 7 days), then find "
            f"the Pantheon gem that best explains the pattern at work."
        )

    prompt = f"""{task}

Available Pantheon gems:
{gem_list}

After searching and matching, output a JSON research brief with this exact structure:
{{
  "current_event": "one sentence describing the current news story",
  "gem_name": "exact gem name from the list above",
  "gem_summary": "one sentence describing the gem's core insight",
  "historical_precedent": "2-3 sentences: who used this pattern before, when, context",
  "historical_outcome": "one sentence: what happened as a result",
  "open_loop": "one sentence: what the pattern revealed but did not resolve — the lesson history keeps surfacing",
  "source_urls": ["url1", "url2"]
}}

Return ONLY valid JSON. No markdown fences."""

    response = client.beta.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2000,
        tools=[{"type": "web_search_20250305", "name": "web_search"}],
        betas=["web-search-2025-03-05"],
        messages=[{"role": "user", "content": prompt}],
    )

    # Concatenate all text blocks (web search beta returns multiple BetaTextBlock chunks)
    text_parts = [
        block.text
        for block in response.content
        if hasattr(block, "text") and block.text.strip()
    ]
    if not text_parts:
        raise ValueError("No text response from researcher agent")

    raw = "".join(text_parts).strip()

    # Strip markdown fences if present
    if "```" in raw:
        # Find the last JSON fence block
        parts = raw.split("```")
        for part in reversed(parts):
            part = part.strip()
            if part.startswith("json"):
                part = part[4:].strip()
            if part.startswith("{"):
                return json.loads(part)

    # Try parsing the whole concatenated text as JSON
    return json.loads(raw)


def main():
    parser = argparse.ArgumentParser(description="Pantheon Researcher Agent")
    parser.add_argument("--mode", choices=["auto", "gem", "topic"], default="auto")
    parser.add_argument("--arg", help="Gem name or topic text (required for gem/topic mode)")
    args = parser.parse_args()

    if args.mode in ("gem", "topic") and not args.arg:
        sys.exit(f"✗ --arg is required for --mode {args.mode}")

    # Sanitize --arg: strip shell-special characters (input from Telegram)
    arg = args.arg
    if arg:
        arg = arg.replace("`", "").replace("$", "").replace(";", "").replace("&", "")

    brief = run_research(args.mode, arg)
    print(json.dumps(brief, ensure_ascii=False))


if __name__ == "__main__":
    main()
