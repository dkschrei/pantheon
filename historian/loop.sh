#!/usr/bin/env bash
# Historian Phase 1 — Build Loop
# Usage: bash historian/loop.sh
# Interactive: pauses after each hero for review
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
PROGRESS="${SCRIPT_DIR}/.progress"
SEED="${SCRIPT_DIR}/seed-list.md"
PROMPT_TPL="${SCRIPT_DIR}/prompt.md"

touch "$PROGRESS"

# Extract unchecked heroes
mapfile -t HEROES < <(grep "^- \[ \]" "$SEED" | sed 's/^- \[ \] //' | sed 's/ —.*//')
echo "Phase 1 — ${#HEROES[@]} heroes remaining"

for hero in "${HEROES[@]}"; do
  grep -qF "$hero" "$PROGRESS" && { echo "SKIP: $hero"; continue; }

  echo ""
  echo "=== $hero ==="
  echo "--- RESEARCH PROMPT ---"
  sed "s/{HERO}/$hero/g" "$PROMPT_TPL"
  echo "--- END PROMPT ---"
  echo ""
  echo "Execute the prompt above, write gem files, then press ENTER..."
  read -r

  echo "$hero" >> "$PROGRESS"
  sed -i.bak "s/- \[ \] ${hero}/- [x] ${hero}/" "$SEED" && rm "${SEED}.bak"

  cd "$REPO_ROOT"
  bash scripts/generate-patterns.sh

  if ! git diff --quiet || ! git diff --staged --quiet; then
    git add patterns/ commands/ PATTERNS.md historian/seed-list.md
    git commit -m "feat(patterns): $hero gem added"
    echo "✓ Committed: $hero"
  else
    echo "WARNING: No changes detected — may be duplicate, check patterns/"
  fi
done

echo ""
echo "Phase 1 complete. Run: bash historian/prune.sh"
