#!/usr/bin/env bash
set -eo pipefail

REPO="dkschrei/pantheon"
BRANCH="main"
RAW="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
API="https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1"
CLAUDE_COMMANDS="${HOME}/.claude/commands"
CLAUDE_SKILLS="${HOME}/.claude/skills"

# Detect whether running from a local clone or piped via curl
LOCAL_DIR=""
if [ -n "${BASH_SOURCE[0]:-}" ] && [ "${BASH_SOURCE[0]:-}" != "bash" ] && [ -f "${BASH_SOURCE[0]:-}" ]; then
  LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

echo "Installing Pantheon..."
mkdir -p "${CLAUDE_COMMANDS}" "${CLAUDE_SKILLS}"

if [ -n "$LOCAL_DIR" ] && [ -d "${LOCAL_DIR}/commands" ]; then
  # --- Local install (running from cloned repo) ---
  cp "${LOCAL_DIR}"/commands/*.md "${CLAUDE_COMMANDS}/"
  COMMANDS_COUNT=$(ls "${LOCAL_DIR}"/commands/*.md | wc -l | tr -d ' ')
  echo "  ✓ ${COMMANDS_COUNT} commands → ${CLAUDE_COMMANDS}/"

  SKILLS_COUNT=0
  for adapter in "${LOCAL_DIR}"/patterns/*/adapters/claude.md; do
    gem_name=$(basename "$(dirname "$(dirname "$adapter")")")
    cp "$adapter" "${CLAUDE_SKILLS}/pantheon-${gem_name}.md"
    SKILLS_COUNT=$((SKILLS_COUNT + 1))
  done
  echo "  ✓ ${SKILLS_COUNT} skills → ${CLAUDE_SKILLS}/"

else
  # --- Remote install (curl | bash) ---
  if ! command -v curl &>/dev/null; then
    echo "ERROR: curl is required"; exit 1
  fi
  if ! command -v python3 &>/dev/null; then
    echo "ERROR: python3 is required"; exit 1
  fi

  TREE=$(curl -fsSL "$API")

  # Install commands/*.md
  COMMANDS_COUNT=0
  while IFS= read -r path; do
    [ -z "$path" ] && continue
    filename=$(basename "$path")
    curl -fsSL "${RAW}/${path}" -o "${CLAUDE_COMMANDS}/${filename}"
    COMMANDS_COUNT=$((COMMANDS_COUNT + 1))
  done < <(echo "$TREE" | python3 -c "
import sys, json
tree = json.load(sys.stdin)['tree']
for f in tree:
    if f['path'].startswith('commands/') and f['path'].endswith('.md'):
        print(f['path'])
")
  echo "  ✓ ${COMMANDS_COUNT} commands → ${CLAUDE_COMMANDS}/"

  # Install patterns/*/adapters/claude.md as skills
  SKILLS_COUNT=0
  while IFS= read -r path; do
    [ -z "$path" ] && continue
    gem_name=$(echo "$path" | python3 -c "import sys; p=sys.stdin.read().strip().split('/'); print(p[1])")
    curl -fsSL "${RAW}/${path}" -o "${CLAUDE_SKILLS}/pantheon-${gem_name}.md"
    SKILLS_COUNT=$((SKILLS_COUNT + 1))
  done < <(echo "$TREE" | python3 -c "
import sys, json
tree = json.load(sys.stdin)['tree']
for f in tree:
    if f['path'].startswith('patterns/') and f['path'].endswith('/adapters/claude.md'):
        print(f['path'])
")
  echo "  ✓ ${SKILLS_COUNT} skills → ${CLAUDE_SKILLS}/"
fi

echo ""
echo "Pantheon installed. Restart Claude Code to activate."
echo ""
echo "Installed commands:"
for cmd in "${CLAUDE_COMMANDS}"/pantheon*.md "${CLAUDE_COMMANDS}"/pantheon.md; do
  [ -f "$cmd" ] && echo "  /$(basename "$cmd" .md)"
done | sort -u
