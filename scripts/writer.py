#!/usr/bin/env python3
"""
Pantheon Writer Agent.

Reads a research brief from stdin, writes X and Threads posts.
Outputs JSON to stdout.

Usage:
  echo '<research_brief_json>' | python3 writer.py
  python3 researcher.py --mode auto | python3 writer.py
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from shared import get_secret

SYSTEM_PROMPT = """You are the content voice for Pantheon — a project that surfaces the cognitive patterns of history's greatest problem-solvers.

Your job: write social posts that connect a current event to a historical pattern. The reader should finish the post and think: "this is still happening — and nobody closed the loop."

The Threads post follows this arc in 5-7 sentences:
1. HOOK — one sentence. Drop the reader into the current event mid-scene. No dates. No "Did you know". Start with action or tension.
2. HISTORICAL MIRROR — 2 sentences. Who used this same pattern before. Make the parallel vivid.
3. THE GEM — one sentence. Name the pattern. "This is [gem name] — [one-line definition]."
4. THE OUTCOME — one sentence. What happened last time. Not triumphant. Just what the pattern produced.
5. THE OPEN LOOP — one sentence. The lesson history handed us that nobody acted on. This is where the reader leans forward.
End with: "This pattern lives in Pantheon as [gem-name] — and it's still open."

The X post is one punch: hook + open loop only. Under 280 chars. End with #Pantheon.

Hard rules:
- No em-dashes (use commas or restructure)
- No en-dashes
- No "fascinating", "remarkable", "incredible" — show it, don't label it
- No bullet points — flowing prose only
- No tidy resolution — the loop stays open
- Sound like a smart friend who just noticed something, not a professor"""


def _parse_json_response(raw: str) -> dict:
    """Parse JSON from a model response, stripping markdown fences if present."""
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


def _enforce_constraints(content: dict) -> dict:
    """Strip em/en-dashes in place. Returns the mutated dict."""
    for key in ("x_post", "threads_post"):
        content[key] = content[key].replace("\u2014", "-").replace("\u2013", "-")
    return content


def generate_posts(brief: dict) -> dict:
    import anthropic

    client = anthropic.Anthropic(api_key=get_secret("ANTHROPIC_API_KEY"))

    base_prompt = f"""Write two social posts based on this research brief:

Current event: {brief['current_event']}
Gem: {brief['gem_name']} — {brief['gem_summary']}
Historical precedent: {brief['historical_precedent']}
Historical outcome: {brief['historical_outcome']}
The open loop: {brief['open_loop']}

Return ONLY valid JSON:
{{
  "x_post": "...",
  "threads_post": "...",
  "subject_line": "one-line description of this post"
}}

x_post must be under 280 characters including #Pantheon.
threads_post MUST be strictly under 500 characters — count carefully before responding.
No em-dashes anywhere."""

    MAX_RETRIES = 3
    last_error = None
    content = None
    raw = ""

    for attempt in range(1, MAX_RETRIES + 1):
        extra = "" if attempt == 1 else f"\n\nATTENTION: Previous attempt produced a threads_post that exceeded 500 characters. Write a shorter version, aim for 450 characters max."
        user_prompt = base_prompt + extra

        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=700,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )

        raw = message.content[0].text.strip()

        try:
            content = _parse_json_response(raw)
        except json.JSONDecodeError as e:
            last_error = f"Could not parse JSON: {e}\nRaw:\n{raw}"
            continue

        content = _enforce_constraints(content)

        if len(content["x_post"]) <= 280 and len(content["threads_post"]) <= 500:
            return content

        last_error = (
            f"Attempt {attempt}: x_post={len(content['x_post'])} chars, "
            f"threads_post={len(content['threads_post'])} chars"
        )
        print(f"✗ {last_error} — retrying...", file=sys.stderr)

    # If all retries failed due to JSON parse errors, content was never assigned.
    if content is None:
        print(f"✗ All {MAX_RETRIES} attempts failed to produce valid JSON.\nLast raw response:\n{raw}", file=sys.stderr)
        sys.exit(1)

    # Final fallback: hard-truncate threads_post at last sentence boundary <= 500 chars
    print("✗ Max retries reached — applying hard truncation to threads_post", file=sys.stderr)
    tp = content["threads_post"]
    if len(tp) > 500:
        # Truncate at last sentence end (. ! ?) within the 500-char window
        truncated = tp[:500]
        for punct in (".", "!", "?"):
            idx = truncated.rfind(punct)
            if idx > 300:  # keep at least 300 chars
                truncated = truncated[: idx + 1]
                break
        content["threads_post"] = truncated

    # Truncate x_post to 280 chars at last word boundary if needed
    xp = content["x_post"]
    if len(xp) > 280:
        truncated_x = xp[:280]
        # Cut at last space to avoid splitting a word
        last_space = truncated_x.rfind(" ")
        content["x_post"] = truncated_x[:last_space] if last_space > 200 else truncated_x

    return content


def main():
    brief_raw = sys.stdin.read().strip()
    if not brief_raw:
        sys.exit("✗ No input on stdin. Pipe a research brief JSON.")

    try:
        brief = json.loads(brief_raw)
    except json.JSONDecodeError as e:
        print(f"✗ Invalid JSON on stdin: {e}", file=sys.stderr)
        sys.exit(1)

    output = generate_posts(brief)
    print(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    main()
