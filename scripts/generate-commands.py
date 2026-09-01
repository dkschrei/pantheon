#!/usr/bin/env python3
"""Regenerates commands/pantheon.md — the /pantheon dispatcher.

The dispatcher is a COMMAND, not a listing. Its prose tells Claude how to route
`list | show | load | unload | launch`, and only the gem index table underneath
is derived from the patterns on disk. An earlier version of this script emitted
a plain listing instead, which silently destroyed the routing every time anyone
ran it. The prose therefore lives here as a template and is reproduced verbatim.

Inclusion rule: every pattern carrying a `trigger:` in its frontmatter is
listed. Anything skipped is NAMED on stdout, never dropped quietly — a gem
vanishing from the index is exactly the failure this file is being repaired for.

Deliberately NOT "patterns that pass tests/validate-schema.sh": three shipping
gems (extraction-principle, insurgents-advantage, the-gollum-effect) currently
fail that check on missing frontmatter fields, and removing them from the
dispatcher would break working gems to satisfy a lint.
"""
import re
import sys

import yaml
from pathlib import Path

REPO_ROOT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent.parent
OUTPUT_FILE = REPO_ROOT / "commands" / "pantheon.md"

HEADER = """---
description: Access Pantheon gems on demand. /pantheon list — show all gems. /pantheon <gem> show — display gem. /pantheon <gem> load — load into context. /pantheon <gem> launch — invoke immediately.
---

# Pantheon Dispatcher

Arguments received: $ARGUMENTS

Parse the arguments and execute exactly one of the following actions:

---

## `list` (or no arguments)
Output the gem index table below. Nothing else.

## `<gem-name> show`
Read the file `~/.claude/pantheon/<gem-name>.md` and display its full content.
If the file does not exist, say: "Gem not found: <gem-name>. Run /pantheon list to see available gems."

## `<gem-name> load`
Read the file `~/.claude/pantheon/<gem-name>.md`, confirm it is active, and say:
"Loaded: **<gem-name>**. Protocol is active for this session."
Then briefly (2-3 lines) state what the gem does and when to invoke it.

## `<gem-name> unload`
Acknowledge the gem is no longer active. Say: "Unloaded: **<gem-name>**."

## `<gem-name> launch`
Read the file `~/.claude/pantheon/<gem-name>.md` and immediately begin executing its protocol against the current conversation context. Do not describe what you are about to do — just run it.

---

## Gem Index

| Gem | Trigger |
|-----|---------|
"""

FOOTER = """
_✦ = authored gem (written from live practice)_

---

*{count} gems — github.com/dkschrei/pantheon*
"""


def first_trigger(text):
    """First entry of the frontmatter `trigger:` list."""
    fm = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if not fm:
        return "—"
    try:
        data = yaml.safe_load(fm.group(1)) or {}
    except yaml.YAMLError:
        # Unreachable while tests/validate-schema.sh enforces a strict parse.
        # Reported rather than swallowed: the previous generator hid exactly
        # this behind a bare except and silently blanked 18 gems' triggers.
        print(f"  WARNING: unparseable frontmatter — run tests/validate-schema.sh", file=sys.stderr)
        return "—"
    triggers = data.get("trigger")
    if isinstance(triggers, list):
        triggers = triggers[0] if triggers else None
    return str(triggers).strip() if triggers else "—"


rows, skipped = [], []
for pattern_file in sorted((REPO_ROOT / "patterns").glob("*/pattern.md")):
    name = pattern_file.parent.name
    trigger = first_trigger(pattern_file.read_text())
    if trigger == "—":
        skipped.append(name)
        continue
    rows.append(f"| {name} | {trigger} |\n")

OUTPUT_FILE.write_text(HEADER + "".join(rows) + FOOTER.format(count=len(rows)))

print(f"✓ commands/pantheon.md regenerated — {len(rows)} gems")
if skipped:
    # Never drop a gem silently; an incomplete pattern is a finding, not a no-op.
    print(f"  SKIPPED {len(skipped)} pattern(s) with no usable trigger: {', '.join(skipped)}")
    print("  fix the frontmatter rather than accepting the gap.")
