# Scaled Social Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-agent (researcher + writer) content pipeline that finds current news, matches it to a Pantheon gem, digs historical precedent, and produces sharp social posts — triggered by schedule, Telegram, or CLI.

**Architecture:** `researcher.py` calls Claude with web_search to produce a research brief (JSON to stdout); `writer.py` reads the brief from stdin and writes X + Threads posts (JSON to stdout); `pantheon-post.py` chains them via subprocess pipe and handles HITM + publishing. Two n8n workflows handle scheduling and Telegram-triggered on-demand runs.

**Tech Stack:** Python 3, `anthropic` SDK (claude-sonnet-4-6), `tweepy`, `requests`, `pytest`, n8n (Execute Command + Wait + Telegram nodes)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `scripts/shared.py` | Create | `get_secret()` vault utility — shared by all scripts |
| `scripts/researcher.py` | Create | Claude + web_search → research brief JSON (stdout) |
| `scripts/writer.py` | Create | research brief (stdin) → X + Threads posts JSON (stdout) |
| `scripts/pantheon-post.py` | Modify | Chain researcher → writer via subprocess; keep HITM + publisher |
| `tests/test_researcher.py` | Create | Gem loader + output schema tests |
| `tests/test_writer.py` | Create | Input/output schema + char limit tests |

---

## Task 1: Extract shared vault utility

**Files:**
- Create: `scripts/shared.py`
- Modify: `scripts/pantheon-post.py`

- [ ] **Step 1: Write the failing test**

Create `tests/test_shared.py`:
```python
import subprocess, sys

def test_get_secret_missing_key_exits():
    result = subprocess.run(
        [sys.executable, "-c",
         "import sys; sys.path.insert(0, 'scripts'); from shared import get_secret; get_secret('NONEXISTENT_KEY_XYZ')"],
        capture_output=True, text=True, cwd="/Users/danaschreiber/Dev-Projects/pantheon"
    )
    assert result.returncode != 0
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd ~/Dev-Projects/pantheon && python3 -m pytest tests/test_shared.py -v
```
Expected: FAIL (ImportError — shared.py doesn't exist yet)

- [ ] **Step 3: Create `scripts/shared.py`**

```python
#!/usr/bin/env python3
"""Shared utilities for Pantheon pipeline scripts."""

import subprocess
import sys


def get_secret(key: str) -> str:
    """Fetch a secret from the Nexus vault."""
    result = subprocess.run(
        ["bash", "-c",
         f"cd ~/Dev-Projects/nexus && source .env && "
         f"nexus-secrets get {key} | sed 's/^{key}[[:space:]]*=[[:space:]]*//' | tr -d '\\n[:space:]'"],
        capture_output=True, text=True
    )
    val = result.stdout.strip()
    if not val:
        sys.exit(f"✗ Secret '{key}' not found in vault")
    return val
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd ~/Dev-Projects/pantheon && python3 -m pytest tests/test_shared.py -v
```
Expected: PASS

- [ ] **Step 5: Update `pantheon-post.py` to import from shared**

Replace the existing `get_secret()` function definition in `scripts/pantheon-post.py` (lines 33–43) with:

```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from shared import get_secret
```

Remove the `import subprocess` line only if it's no longer used elsewhere in the file — check first.

- [ ] **Step 6: Verify pantheon-post.py still works**

```bash
cd ~/Dev-Projects/pantheon && python3 scripts/pantheon-post.py --dry-run
```
Expected: gem name printed, content generated, `[dry-run] Done.`

- [ ] **Step 7: Commit**

```bash
cd ~/Dev-Projects/pantheon
git add scripts/shared.py scripts/pantheon-post.py tests/test_shared.py
git commit -m "refactor(pipeline): extract get_secret to shared.py"
```

---

## Task 2: Create researcher.py — gem library loading

**Files:**
- Create: `scripts/researcher.py`
- Create: `tests/test_researcher.py`

- [ ] **Step 1: Write the failing test**

Create `tests/test_researcher.py`:
```python
import sys
sys.path.insert(0, "scripts")
from researcher import load_gem_summaries
from pathlib import Path

PATTERNS_DIR = Path("/Users/danaschreiber/Dev-Projects/pantheon/patterns")

def test_load_gem_summaries_returns_list():
    summaries = load_gem_summaries(PATTERNS_DIR)
    assert isinstance(summaries, list)
    assert len(summaries) > 0

def test_each_summary_has_name_and_text():
    summaries = load_gem_summaries(PATTERNS_DIR)
    for s in summaries:
        assert "name" in s
        assert "summary" in s
        assert len(s["summary"]) <= 300
        assert len(s["name"]) > 0

def test_summary_count_matches_pattern_dirs():
    summaries = load_gem_summaries(PATTERNS_DIR)
    expected = len([d for d in PATTERNS_DIR.iterdir() if d.is_dir()])
    assert len(summaries) == expected
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd ~/Dev-Projects/pantheon && python3 -m pytest tests/test_researcher.py -v
```
Expected: FAIL (ImportError — researcher.py doesn't exist yet)

- [ ] **Step 3: Create `scripts/researcher.py` with gem loader**

```python
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

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        tools=[{"type": "web_search_20250305", "name": "web_search"}],
        betas=["web-search-2025-03-05"],
        messages=[{"role": "user", "content": prompt}],
    )

    # Extract the final text block (after tool use)
    for block in reversed(response.content):
        if hasattr(block, "text"):
            raw = block.text.strip()
            if raw.startswith("```"):
                raw = raw.split("```")[1]
                if raw.startswith("json"):
                    raw = raw[4:]
            return json.loads(raw.strip())

    raise ValueError("No text response from researcher agent")


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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Dev-Projects/pantheon && python3 -m pytest tests/test_researcher.py -v
```
Expected: all 3 tests PASS (gem loading tests don't call the API)

- [ ] **Step 5: Smoke test researcher dry run (no posting)**

```bash
cd ~/Dev-Projects/pantheon && python3 scripts/researcher.py --mode gem --arg shape-the-ground 2>&1
```
Expected: JSON output with `current_event`, `gem_name`, `historical_precedent`, `open_loop` fields. Takes 10-30 seconds (web search).

- [ ] **Step 6: Commit**

```bash
cd ~/Dev-Projects/pantheon
git add scripts/researcher.py tests/test_researcher.py
git commit -m "feat(pipeline): add researcher agent with web search"
```

---

## Task 3: Create writer.py

**Files:**
- Create: `scripts/writer.py`
- Create: `tests/test_writer.py`

- [ ] **Step 1: Write the failing tests**

Create `tests/test_writer.py`:
```python
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, "scripts")

SAMPLE_BRIEF = {
    "current_event": "OpenAI researchers leaving for xAI at 3x salary",
    "gem_name": "gollum-effect",
    "gem_summary": "Identity fusion with a capability until transfer feels like death",
    "historical_precedent": "William Shockley invented the transistor at Bell Labs, then watched his best researchers leave to found Fairchild Semiconductor because he couldn't let go of control.",
    "historical_outcome": "Shockley's hoarding produced nothing. The people he couldn't release built Silicon Valley.",
    "open_loop": "Altman built the most capable AI researchers in the world and is learning the same lesson Shockley learned. The ring always escapes.",
    "source_urls": []
}

WRITER_SCRIPT = Path("/Users/danaschreiber/Dev-Projects/pantheon/scripts/writer.py")

def run_writer(brief: dict) -> dict:
    result = subprocess.run(
        [sys.executable, str(WRITER_SCRIPT)],
        input=json.dumps(brief),
        capture_output=True, text=True
    )
    assert result.returncode == 0, f"writer.py failed: {result.stderr}"
    return json.loads(result.stdout.strip())

def test_writer_returns_required_fields():
    output = run_writer(SAMPLE_BRIEF)
    assert "x_post" in output
    assert "threads_post" in output
    assert "subject_line" in output

def test_x_post_within_char_limit():
    output = run_writer(SAMPLE_BRIEF)
    assert len(output["x_post"]) <= 280, f"X post too long: {len(output['x_post'])} chars"

def test_threads_post_within_char_limit():
    output = run_writer(SAMPLE_BRIEF)
    assert len(output["threads_post"]) <= 500, f"Threads post too long: {len(output['threads_post'])} chars"

def test_no_em_dashes_in_output():
    output = run_writer(SAMPLE_BRIEF)
    assert "\u2014" not in output["x_post"], "em-dash found in X post"
    assert "\u2014" not in output["threads_post"], "em-dash found in Threads post"
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd ~/Dev-Projects/pantheon && python3 -m pytest tests/test_writer.py -v
```
Expected: FAIL (writer.py doesn't exist yet)

- [ ] **Step 3: Create `scripts/writer.py`**

```python
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


def generate_posts(brief: dict) -> dict:
    import anthropic

    client = anthropic.Anthropic(api_key=get_secret("ANTHROPIC_API_KEY"))

    user_prompt = f"""Write two social posts based on this research brief:

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
threads_post must be under 500 characters.
No em-dashes anywhere."""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=700,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    raw = message.content[0].text.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    content = json.loads(raw.strip())

    # Enforce: strip em-dashes even if Claude ignores the rule
    for key in ("x_post", "threads_post"):
        content[key] = content[key].replace("\u2014", "-").replace("\u2013", "-")

    return content


def main():
    brief_raw = sys.stdin.read().strip()
    if not brief_raw:
        sys.exit("✗ No input on stdin. Pipe a research brief JSON.")
    brief = json.loads(brief_raw)
    output = generate_posts(brief)
    print(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Dev-Projects/pantheon && python3 -m pytest tests/test_writer.py -v
```
Expected: all 4 tests PASS (makes real API calls — takes ~10 seconds)

- [ ] **Step 5: Test the full pipe end-to-end**

```bash
cd ~/Dev-Projects/pantheon && python3 scripts/researcher.py --mode gem --arg andon-cord | python3 scripts/writer.py
```
Expected: JSON with `x_post`, `threads_post`, `subject_line`. No em-dashes. X post under 280 chars.

- [ ] **Step 6: Commit**

```bash
cd ~/Dev-Projects/pantheon
git add scripts/writer.py tests/test_writer.py
git commit -m "feat(pipeline): add writer agent"
```

---

## Task 4: Update pantheon-post.py to use researcher + writer

**Files:**
- Modify: `scripts/pantheon-post.py`

- [ ] **Step 1: Replace `generate_content()` with subprocess pipe**

In `scripts/pantheon-post.py`, replace the entire `generate_content()` function with:

```python
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
```

Also add `import subprocess` at the top if not already present, and add `from pathlib import Path` if not already present.

- [ ] **Step 2: Update `main()` to pass gem_name explicitly**

In `main()`, find the section that calls `generate_content()` and update it to pass `gem_name`:

```python
    if args.topic:
        subject = args.topic
        gem_name = ""
        gem_context = ""
    else:
        gem_name = args.gem or random_gem()
        print(f"Gem: {gem_name}")
        gem_context = ""  # researcher loads gem context internally now
        subject = gem_name

    print("Generating content via Claude (research + write)...")
    content = generate_content(subject, gem_context, gem_name=gem_name)
```

- [ ] **Step 3: Remove dead code**

Remove the `load_gem()` function and the `SYSTEM_PROMPT` constant from `pantheon-post.py` — both are now handled inside `researcher.py` and `writer.py`.

Keep `_safe_truncate` and `post_to_threads()` unchanged — `_safe_truncate` is used by `post_to_threads()` as a final safety net before the Threads API call.

- [ ] **Step 4: Dry-run test**

```bash
cd ~/Dev-Projects/pantheon && python3 scripts/pantheon-post.py --dry-run
```
Expected: gem name, "Generating content via Claude (research + write)...", X post, Threads post, `[dry-run] Done.`

```bash
cd ~/Dev-Projects/pantheon && python3 scripts/pantheon-post.py --gem feynman-clarity --dry-run
```
Expected: same, using feynman-clarity gem with a current news connection.

- [ ] **Step 5: Commit**

```bash
cd ~/Dev-Projects/pantheon
git add scripts/pantheon-post.py
git commit -m "feat(pipeline): wire pantheon-post.py through researcher + writer agents"
```

---

## Task 5: n8n Workflow 1 — Daily Auto Scheduler

**Note:** n8n workflows are built in the n8n UI at `http://localhost:5678`. This task documents the exact node configuration.

- [ ] **Step 1: Open n8n and create a new workflow named "Pantheon Daily Post"**

Go to `http://localhost:5678` → New Workflow → rename to "Pantheon Daily Post"

- [ ] **Step 2: Add Schedule Trigger node**

- Node type: Schedule Trigger
- Trigger interval: Every Day
- Time: 07:00 (or your preferred morning time)

- [ ] **Step 3: Add Execute Command node — researcher + writer pipe**

- Node type: Execute Command
- Command:
```
/Users/danaschreiber/.pyenv/versions/3.10.6/bin/python3 /Users/danaschreiber/Dev-Projects/pantheon/scripts/researcher.py --mode auto | /Users/danaschreiber/.pyenv/versions/3.10.6/bin/python3 /Users/danaschreiber/Dev-Projects/pantheon/scripts/writer.py
```
- Note: use full Python path (not `python3`) to avoid PATH issues in n8n's subprocess environment

- [ ] **Step 4: Add JSON Parse node**

- Input: `{{ $json.stdout }}`
- This parses the writer's JSON output into n8n fields

- [ ] **Step 5: Add Telegram node — send draft for approval**

- Node type: Telegram
- Credential: use `PANTHEON_TG_BOT_TOKEN` from vault (add as n8n credential once)
- Operation: Send Message
- Chat ID: `{{ $env.PANTHEON_TG_CHAT_ID }}` (or hardcode from vault: `6404890389`)
- Text:
```
*Pantheon draft — {{ $json.subject_line }}*

*X ({{ $json.x_post.length }} chars):*
{{ $json.x_post }}

*Threads:*
{{ $json.threads_post }}
```
- Reply Markup (Inline Keyboard JSON):
```json
{"inline_keyboard":[[{"text":"✅ Post","callback_data":"post"},{"text":"❌ Skip","callback_data":"skip"}]]}
```

- [ ] **Step 6: Add Wait node**

- Node type: Wait
- Resume: On Webhook Call
- n8n will generate a resume URL — the Telegram inline buttons must POST to this URL
- **Important:** The Telegram inline keyboard buttons cannot directly POST to a webhook. Use the pattern: set button callback_data to "post" or "skip", then poll for Telegram callback updates in a separate sub-workflow, OR use n8n's Telegram Trigger node as the resume mechanism.

**Simpler alternative (recommended):** Instead of the Wait node, split into two workflows:
- Workflow 1A: runs researcher + writer, sends Telegram message with button, stores `x_post` and `threads_post` in n8n static data keyed by message_id
- Workflow 1B: Telegram Trigger listens for callback_query, reads stored posts by message_id, branches on "post"/"skip"

- [ ] **Step 7: Build Workflow 1B — Telegram Callback Handler**

Create a second workflow named "Pantheon Telegram Handler":
- Trigger: Telegram Trigger (on `callback_query` updates)
- Credential: same `PANTHEON_TG_BOT_TOKEN`
- Filter: only process callbacks with data "post" or "skip"
- Branch on `{{ $json.callback_query.data }}`:
  - "post" branch:
    - HTTP Request node → POST to `https://api.twitter.com/2/tweets` (X API, use OAuth1 credential)
    - HTTP Request node → POST to `https://graph.threads.net/v1.0/me/threads` (Threads, Bearer token)
    - Telegram Send Message → "✅ Posted!"
  - "skip" branch:
    - Telegram Send Message → "❌ Skipped."

- [ ] **Step 8: Test Workflow 1A manually**

In n8n, click "Test workflow" on Workflow 1A. Verify:
- Execute Command node returns JSON with x_post, threads_post, subject_line
- Telegram message arrives with Post/Skip buttons

- [ ] **Step 9: Test Workflow 1B manually**

Press "Post" on the Telegram approval message. Verify:
- X post appears on @PantheonGems
- Threads post appears on @pantheon.gems
- Confirmation message arrives in Telegram

---

## Task 6: n8n Workflow 2 — Telegram On-Demand Trigger

**Note:** This workflow listens for trigger messages (distinct from approval callbacks). Both workflows share the same bot token — n8n handles all routing.

- [ ] **Step 1: Create workflow named "Pantheon On-Demand"**

- [ ] **Step 2: Add Telegram Trigger node**

- Node type: Telegram Trigger
- Credential: `PANTHEON_TG_BOT_TOKEN`
- Updates to watch: `message`
- Filter: only trigger on messages (not callback_query — that's handled by Workflow 1B)

- [ ] **Step 3: Add Function node — parse trigger message**

```javascript
const text = $json.message.text || "";
let mode = "topic";
let arg = text;

if (text.toLowerCase().startsWith("gem:")) {
  mode = "gem";
  arg = text.slice(4).trim();
} else if (text.toLowerCase().startsWith("topic:")) {
  mode = "topic";
  arg = text.slice(6).trim();
} else if (text.toLowerCase().startsWith("explore:")) {
  mode = "topic";
  arg = text.slice(8).trim();
}

// Sanitize: remove shell-special chars
arg = arg.replace(/[`$;&|><]/g, "");

return [{ json: { mode, arg } }];
```

- [ ] **Step 4: Add Telegram node — send acknowledgment**

- Text: `Researching "{{ $json.arg }}"... this takes ~30 seconds.`
- Chat ID: from `$json.message.chat.id`

- [ ] **Step 5: Add Execute Command node**

```
/Users/danaschreiber/.pyenv/versions/3.10.6/bin/python3 /Users/danaschreiber/Dev-Projects/pantheon/scripts/researcher.py --mode {{ $json.mode }} --arg "{{ $json.arg }}" | /Users/danaschreiber/.pyenv/versions/3.10.6/bin/python3 /Users/danaschreiber/Dev-Projects/pantheon/scripts/writer.py
```

- [ ] **Step 6: Add JSON Parse node + Telegram approval message**

Same as Workflow 1A Steps 4 and 5. The callback goes to Workflow 1B (same handler).

- [ ] **Step 7: Test with Telegram message**

Send to `@pantheon_publisher_bot`:
```
gem: feynman-clarity
```
Expected: acknowledgment message, then draft with Post/Skip buttons within 30 seconds.

- [ ] **Step 8: Commit n8n workflow exports**

Export both workflows from n8n (Settings → Download) and save as:
```bash
cd ~/Dev-Projects/pantheon
mkdir -p n8n-workflows
# save exported JSONs as:
# n8n-workflows/pantheon-daily-post.json
# n8n-workflows/pantheon-telegram-handler.json
# n8n-workflows/pantheon-on-demand.json
git add n8n-workflows/
git commit -m "feat(pipeline): add n8n workflows for daily + on-demand posting"
```

---

## Testing the Full Pipeline

After all tasks complete, run this end-to-end check:

```bash
# 1. Unit tests
cd ~/Dev-Projects/pantheon && python3 -m pytest tests/ -v

# 2. CLI dry-run (auto mode)
python3 scripts/pantheon-post.py --dry-run

# 3. CLI dry-run (specific gem)
python3 scripts/pantheon-post.py --gem two-way-door --dry-run

# 4. CLI dry-run (topic)
python3 scripts/pantheon-post.py --topic "Nvidia GTC keynote" --dry-run

# 5. Send Telegram trigger message and verify full on-demand flow
# (sends real post — confirm in Telegram before approving)
```

All tests should pass. Dry-runs should show research-grounded content tied to current news.
