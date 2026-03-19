#!/usr/bin/env python3
"""Generates PRACTITIONERS.md — index of historical figures mapped to the patterns they inspired."""
import sys
import re
import yaml
from pathlib import Path
from collections import defaultdict

REPO_ROOT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent.parent
OUTPUT_FILE = REPO_ROOT / "PRACTITIONERS.md"

def extract_frontmatter(text):
    """Extract YAML frontmatter block from a markdown file."""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.DOTALL)
    if not match:
        return {}
    try:
        return yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError:
        return {}

# Build: practitioner → list of (pattern_name, badge, era, application)
practitioner_map = defaultdict(list)

for pattern_file in sorted((REPO_ROOT / "patterns").glob("*/pattern.md")):
    pattern = pattern_file.parent.name
    text = pattern_file.read_text()
    fm = extract_frontmatter(text)

    origin_type = fm.get("origin-type", "historian")
    badge = " ✦" if origin_type == "authored" else ""

    practitioners = fm.get("practitioners", [])
    if not practitioners:
        continue

    for p in practitioners:
        name = p.get("name", "Unknown")
        era = p.get("era", "—")
        application = p.get("application", "")
        practitioner_map[name].append((pattern, badge, era, application))

# Sort practitioners alphabetically
sorted_practitioners = sorted(practitioner_map.items(), key=lambda x: x[0].split()[-1])  # sort by last name

lines = [
    "# Practitioner → Pattern Index\n\n",
    "> Every pattern in Pantheon is grounded in a real practitioner applying it to a real problem.\n",
    "> This index maps the historical figures to the gems they inspired.\n\n",
    "_✦ = authored gem (written from live practice)_\n\n",
    "---\n\n",
]

for practitioner, entries in sorted_practitioners:
    lines.append(f"## {practitioner}\n\n")
    lines.append("| Pattern | Era | Application |\n")
    lines.append("|---------|-----|-------------|\n")
    for pattern, badge, era, application in sorted(entries, key=lambda x: x[0]):
        link = f"[{pattern}{badge}](patterns/{pattern}/pattern.md)"
        lines.append(f"| {link} | {era} | {application} |\n")
    lines.append("\n")

lines.append(f"---\n\n_Total: {len(sorted_practitioners)} practitioners · {sum(len(v) for v in practitioner_map.values())} pattern appearances_\n")

OUTPUT_FILE.write_text("".join(lines))
print(f"✓ PRACTITIONERS.md generated — {len(sorted_practitioners)} practitioners across {len(practitioner_map)} entries")
