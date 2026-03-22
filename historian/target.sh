#!/usr/bin/env bash
# Historian targeted research — research any person, event, era, or mix of keywords.
# Usage: bash historian/target.sh "Jensen Huang"
#        bash historian/target.sh "Jensen Huang, Nvidia, AI Arms Race"
#        bash historian/target.sh "The Berlin Airlift"
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
PROMPT_TPL="${SCRIPT_DIR}/target-prompt.md"

TARGET="${*}"

if [[ -z "$TARGET" ]]; then
  echo "Usage: bash historian/target.sh \"<person, event, concept, or mix>\""
  echo ""
  echo "Examples:"
  echo "  bash historian/target.sh \"Jensen Huang\""
  echo "  bash historian/target.sh \"Jensen Huang, Nvidia, AI Arms Race\""
  echo "  bash historian/target.sh \"The Berlin Airlift\""
  exit 1
fi

if ! command -v claude &>/dev/null; then
  echo "ERROR: claude CLI not found. Install: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

echo ""
echo "=== Researching: $TARGET ==="
echo ""

# Use Python for template substitution — handles em dashes, commas, slashes, any special chars
PROMPT=$(python3 -c "
import sys
tpl = open(sys.argv[1]).read()
print(tpl.replace('{TARGET}', sys.argv[2]), end='')
" "$PROMPT_TPL" "$TARGET")

# Sanitize target for git commit message (strip special chars)
COMMIT_LABEL=$(echo "$TARGET" | tr -cd '[:alnum:] ,.-' | sed 's/  */ /g' | xargs)

cd "$REPO_ROOT"
if ! claude --dangerously-skip-permissions -p "$PROMPT"; then
  echo "ERROR: Claude failed on '$TARGET'"
  exit 1
fi

bash scripts/generate-patterns.sh
bash scripts/generate-pbnj.sh
bash scripts/generate-practitioners.sh
python3 scripts/generate-commands.py "$REPO_ROOT"

if ! git diff --quiet || ! git diff --staged --quiet; then
  git add patterns/ commands/ PATTERNS.md PBNJ.md PRACTITIONERS.md tests/pbnj-outputs/
  git commit -m "feat(patterns): $COMMIT_LABEL gem added (targeted research)"
  git push
  echo ""
  echo "✓ Committed + pushed: $TARGET"

  # Verify Vercel deployment succeeded
  if command -v vercel &>/dev/null || npx vercel --version &>/dev/null 2>&1; then
    echo "Waiting for Vercel deployment..."
    VERCEL_OK=false
    for i in 1 2 3 4 5 6 7 8 9 10; do
      sleep 6
      DEPLOY_LINE=$(npx vercel ls 2>/dev/null | grep "Production" | head -1 || true)
      if echo "$DEPLOY_LINE" | grep -q "● Ready"; then
        VERCEL_OK=true
        break
      elif echo "$DEPLOY_LINE" | grep -q "● Error"; then
        echo "✗ Vercel: Deployment FAILED"
        echo "  Last deploy: $DEPLOY_LINE"
        echo "  Run 'npx vercel logs' for details"
        exit 1
      fi
    done
    if $VERCEL_OK; then
      echo "✓ Vercel: Live and ready"
    else
      echo "⚠ Vercel: Deploy timed out — check 'npx vercel ls'"
    fi
  fi
else
  echo "WARNING: No new files detected — may have been merged into an existing gem."
  echo "Check the output above to see which gem was updated."
fi
