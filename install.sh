#!/usr/bin/env bash
set -eo pipefail

REPO="dkschrei/pantheon"
BRANCH="main"
RAW="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
API="https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1"
CLAUDE_COMMANDS="${HOME}/.claude/commands"
CLAUDE_GEMS="${HOME}/.claude/pantheon"

# Detect whether running from a local clone or piped via curl
LOCAL_DIR=""
if [ -n "${BASH_SOURCE[0]:-}" ] && [ "${BASH_SOURCE[0]:-}" != "bash" ] && [ -f "${BASH_SOURCE[0]:-}" ]; then
  LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

echo "Installing Pantheon..."
mkdir -p "${CLAUDE_COMMANDS}" "${CLAUDE_GEMS}"

# Clean up any previously installed individual gem commands/skills
rm -f "${CLAUDE_COMMANDS}"/pantheon-*.md
rm -f "${HOME}/.claude/skills"/pantheon-*.md

if [ -n "$LOCAL_DIR" ] && [ -d "${LOCAL_DIR}/commands" ]; then
  # --- Local install (running from cloned repo) ---

  # Install ONLY the dispatcher — not individual gem files
  cp "${LOCAL_DIR}/commands/pantheon.md" "${CLAUDE_COMMANDS}/pantheon.md"
  echo "  ✓ dispatcher → ${CLAUDE_COMMANDS}/pantheon.md"

  # Install gem adapters to ~/.claude/pantheon/ (on-demand only)
  GEMS_COUNT=0
  for cmd in "${LOCAL_DIR}"/commands/pantheon-*.md; do
    [ -f "$cmd" ] || continue
    gem_name=$(basename "$cmd" .md | sed 's/^pantheon-//')
    cp "$cmd" "${CLAUDE_GEMS}/${gem_name}.md"
    GEMS_COUNT=$((GEMS_COUNT + 1))
  done
  echo "  ✓ ${GEMS_COUNT} gem adapters → ${CLAUDE_GEMS}/"

else
  # --- Remote install (curl | bash) ---
  if ! command -v curl &>/dev/null; then
    echo "ERROR: curl is required"; exit 1
  fi
  if ! command -v python3 &>/dev/null; then
    echo "ERROR: python3 is required"; exit 1
  fi

  TREE=$(curl -fsSL "$API")

  # Install ONLY the dispatcher command
  curl -fsSL "${RAW}/commands/pantheon.md" -o "${CLAUDE_COMMANDS}/pantheon.md"
  echo "  ✓ dispatcher → ${CLAUDE_COMMANDS}/pantheon.md"

  # Install gem adapters to ~/.claude/pantheon/ (on-demand only)
  GEMS_COUNT=0
  while IFS= read -r path; do
    [ -z "$path" ] && continue
    filename=$(basename "$path")
    gem_name=$(echo "$filename" | sed 's/^pantheon-//;s/\.md$//')
    curl -fsSL "${RAW}/${path}" -o "${CLAUDE_GEMS}/${gem_name}.md"
    GEMS_COUNT=$((GEMS_COUNT + 1))
  done < <(echo "$TREE" | python3 -c "
import sys, json
tree = json.load(sys.stdin)['tree']
for f in tree:
    if f['path'].startswith('commands/pantheon-') and f['path'].endswith('.md'):
        print(f['path'])
")
  echo "  ✓ ${GEMS_COUNT} gem adapters → ${CLAUDE_GEMS}/"
fi

echo ""
echo "Pantheon installed. Restart Claude Code to activate."
echo ""
echo "Usage:"
echo "  /pantheon list              — show all gems"
echo "  /pantheon <gem> show        — display gem content"
echo "  /pantheon <gem> load        — load gem into session"
echo "  /pantheon <gem> launch      — invoke gem immediately"
