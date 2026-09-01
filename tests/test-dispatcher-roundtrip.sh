#!/usr/bin/env bash
# Running scripts/generate-commands.py must REGENERATE the dispatcher, never
# replace it with something else.
#
# The bug this exists for: the generator emitted a plain "Available Patterns"
# listing, so anyone who ran it silently destroyed the list|show|load|unload|
# launch routing that /pantheon depends on. Nothing failed. The damage was only
# visible by reading the diff.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
DISPATCHER="${REPO_ROOT}/commands/pantheon.md"
BACKUP=$(mktemp)
cp "$DISPATCHER" "$BACKUP"
trap 'cp "$BACKUP" "$DISPATCHER"; rm -f "$BACKUP"' EXIT

python3 "${REPO_ROOT}/scripts/generate-commands.py" >/dev/null

# 1. The routing must survive a regeneration.
grep -q '\$ARGUMENTS' "$DISPATCHER" || { echo "FAIL: regeneration removed \$ARGUMENTS — the dispatcher can no longer route"; exit 1; }
for action in 'list' 'show' 'load' 'unload' 'launch'; do
  grep -qE "\`(<gem-name> )?${action}\`" "$DISPATCHER" || { echo "FAIL: regeneration removed the '${action}' action"; exit 1; }
done
grep -q '^# Pantheon Dispatcher' "$DISPATCHER" || { echo "FAIL: regeneration replaced the dispatcher with a different document"; exit 1; }
echo "PASS: regeneration preserves dispatcher routing"

# 2. Every gem on disk must be listed — a gem may never vanish silently.
LISTED=$(grep -cE '^\| [a-z][a-z0-9-]* \|' "$DISPATCHER")
ON_DISK=$(find "${REPO_ROOT}/patterns" -name pattern.md | wc -l | tr -d ' ')
[[ "$LISTED" -eq "$ON_DISK" ]] || { echo "FAIL: $ON_DISK patterns on disk but $LISTED listed — a gem was dropped"; exit 1; }
echo "PASS: all $ON_DISK gems listed"

# 3. Running it twice must change nothing.
FIRST=$(shasum < "$DISPATCHER")
python3 "${REPO_ROOT}/scripts/generate-commands.py" >/dev/null
SECOND=$(shasum < "$DISPATCHER")
[[ "$FIRST" == "$SECOND" ]] || { echo "FAIL: generator is not stable across runs"; exit 1; }
echo "PASS: generator is stable across runs"

echo "All dispatcher tests passed"
