#!/usr/bin/env bash
# Asserts the CONTRACT install.sh actually implements: one dispatcher command,
# one adapter file per gem, and no per-gem skill files.
#
# The previous version demanded ≥3 command files and ≥3 skill files. Both were
# left over from the pre-dispatcher layout and had been failing on main ever
# since that layout changed, so the suite reported red for a design decision
# rather than a defect — and stopped being read.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

echo "Testing install.sh in temp dir: $TMPDIR"

HOME="$TMPDIR" bash "${REPO_ROOT}/install.sh" >/dev/null

# 1. Exactly one command: the dispatcher.
COMMANDS=$(find "${TMPDIR}/.claude/commands" -name '*.md' 2>/dev/null | wc -l | tr -d ' ' || true)
[[ "$COMMANDS" -eq 1 ]] || { echo "FAIL: expected exactly 1 command (the dispatcher), got $COMMANDS"; exit 1; }
[[ -f "${TMPDIR}/.claude/commands/pantheon.md" ]] || { echo "FAIL: dispatcher not installed"; exit 1; }
echo "PASS: dispatcher installed, and only the dispatcher"

# 2. The dispatcher must still route. A listing-shaped file is the known regression.
for action in 'list' 'show' 'load' 'unload' 'launch'; do
  grep -q "\`<gem-name> ${action}\`\|\`${action}\`" "${TMPDIR}/.claude/commands/pantheon.md" \
    || { echo "FAIL: dispatcher lost the '${action}' action — was it overwritten by generate-commands.py?"; exit 1; }
done
grep -q '\$ARGUMENTS' "${TMPDIR}/.claude/commands/pantheon.md" \
  || { echo "FAIL: dispatcher has no \$ARGUMENTS — it cannot route"; exit 1; }
echo "PASS: dispatcher routes list|show|load|unload|launch"

# 3. Every gem the dispatcher lists must resolve to a file, or show/load/launch lies.
LISTED=$(grep -cE '^\| [a-z][a-z0-9-]* \|' "${TMPDIR}/.claude/commands/pantheon.md")
MISSING=0
while read -r gem; do
  [[ -f "${TMPDIR}/.claude/pantheon/${gem}.md" ]] || { echo "  MISSING: ${gem}"; MISSING=$((MISSING + 1)); }
done < <(grep -oE '^\| [a-z][a-z0-9-]*' "${TMPDIR}/.claude/commands/pantheon.md" | sed 's/| //')
[[ "$MISSING" -eq 0 ]] || { echo "FAIL: $MISSING of $LISTED listed gems have no adapter installed"; exit 1; }
echo "PASS: all $LISTED listed gems resolve to an installed adapter"

# 4. No per-gem skill files — gems are on-demand via /pantheon only.
# find, not ls: with `set -o pipefail` a no-match ls aborts the whole script,
# which is how this check silently stopped running at all.
SKILLS=$(find "${TMPDIR}/.claude/skills" -name 'pantheon-*.md' 2>/dev/null | wc -l | tr -d ' ' || true)
[[ "$SKILLS" -eq 0 ]] || { echo "FAIL: expected 0 pantheon skill files, got $SKILLS"; exit 1; }
echo "PASS: no per-gem skill files"

# 5. Re-running changes nothing.
BEFORE=$(find "${TMPDIR}/.claude" -type f -exec shasum {} + 2>/dev/null | sort | shasum)
HOME="$TMPDIR" bash "${REPO_ROOT}/install.sh" >/dev/null
AFTER=$(find "${TMPDIR}/.claude" -type f -exec shasum {} + 2>/dev/null | sort | shasum)
[[ "$BEFORE" == "$AFTER" ]] || { echo "FAIL: re-running install.sh changed the installed tree"; exit 1; }
echo "PASS: re-run is idempotent"

echo "All install tests passed"
