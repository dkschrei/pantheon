#!/usr/bin/env bash
# Historian Phase 1 — Build Loop
# Usage: bash historian/loop.sh
# Autonomous: calls Claude Code for each hero, writes gem files, commits
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
PROGRESS="${SCRIPT_DIR}/.progress"
SEED="${SCRIPT_DIR}/seed-list.md"
PROMPT_TPL="${SCRIPT_DIR}/prompt.md"

touch "$PROGRESS"

# Verify claude CLI is available
if ! command -v claude &>/dev/null; then
  echo "ERROR: claude CLI not found. Install: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

# Extract unchecked heroes
mapfile -t HEROES < <(grep "^- \[ \]" "$SEED" | sed 's/^- \[ \] //' | sed 's/ —.*//')
echo "Phase 1 — ${#HEROES[@]} heroes remaining"

for hero in "${HEROES[@]}"; do
  grep -qF "$hero" "$PROGRESS" && { echo "SKIP: $hero"; continue; }

  echo ""
  echo "=== $hero ==="

  PROMPT=$(sed "s/{HERO}/$hero/g" "$PROMPT_TPL")

  cd "$REPO_ROOT"
  if ! claude --dangerously-skip-permissions -p "$PROMPT"; then
    echo "ERROR: Claude failed on $hero — skipping"
    continue
  fi

  echo "$hero" >> "$PROGRESS"
  HERO_ESCAPED=$(printf '%s\n' "$hero" | sed 's/[[\.*^$()+?{|]/\\&/g')
  sed "s/- \[ \] ${HERO_ESCAPED}/- [x] ${hero}/" "$SEED" > "${SEED}.tmp" && mv "${SEED}.tmp" "$SEED"

  bash scripts/generate-patterns.sh

  # Run PB&J test on any newly written pattern
  for new_pattern in $(git diff --name-only HEAD 2>/dev/null | grep "^patterns/.*/pattern.md" | awk -F/ '{print $2}'); do
    echo "  Running PB&J test: $new_pattern"
    bash tests/pbnj-test.sh "$new_pattern" 2>/dev/null || echo "  WARNING: PB&J test failed for $new_pattern"
  done
  bash scripts/generate-pbnj.sh
  bash scripts/generate-practitioners.sh

  if ! git diff --quiet || ! git diff --staged --quiet; then
    git add patterns/ commands/ PATTERNS.md PBNJ.md PRACTITIONERS.md historian/seed-list.md historian/.progress tests/pbnj-outputs/
    git commit -m "feat(patterns): $hero gem added"
    git push
    echo "✓ Committed + pushed: $hero"
  else
    echo "WARNING: No changes detected for $hero — may be a duplicate merge"
  fi
done

echo ""
echo "Phase 1 complete. Run: bash historian/prune.sh"
