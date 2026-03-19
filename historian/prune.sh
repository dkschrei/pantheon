#!/usr/bin/env bash
# Historian Phase 2 — Pruning Pass
# Generates historian/pruning-report.md for Dana's review
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
REPORT="${SCRIPT_DIR}/pruning-report.md"
TOTAL=$(ls -d "${REPO_ROOT}"/patterns/*/ 2>/dev/null | wc -l | tr -d ' ')

cat > "$REPORT" << HEADER
# Pantheon Pruning Report
**Generated:** $(date '+%Y-%m-%d')
**Total gems evaluated:** ${TOTAL}

Review DELETE and MERGE sections only. Check boxes to approve.
Nick executes approved cuts. KEEP and REVISE require no decision.

---
HEADER

echo "Phase 2 — evaluating ${TOTAL} gems against pruning-criteria.md"
echo "Enter flag for each: KEEP / REVISE: reason | fix / MERGE: gem-name | reason / DELETE: reason"

for pattern_file in "${REPO_ROOT}"/patterns/*/pattern.md; do
  gem=$(basename "$(dirname "$pattern_file")")
  name=$(grep "^name:" "$pattern_file" | head -1 | sed 's/^name: *//')
  echo ""
  echo "[$gem] Read pattern then enter flag:"
  read -r result

  case "$result" in
    KEEP*)
      echo "- **${name}** (\`${gem}\`) — passes all 4 criteria" >> "$REPORT"
      ;;
    REVISE*)
      printf "\n### %s (\`%s\`)\n- Result: REVISE\n- Detail: %s\n- Dana action: auto-approved (Nick fixes)\n" \
        "$name" "$gem" "${result#REVISE: }" >> "$REPORT"
      ;;
    MERGE*)
      printf "\n### %s (\`%s\`)\n- Result: MERGE into %s\n- Dana action: [ ] Approved  [ ] Reject\n" \
        "$name" "$gem" "${result#MERGE: }" >> "$REPORT"
      ;;
    DELETE*)
      printf "\n### %s (\`%s\`)\n- Result: DELETE\n- Reason: %s\n- Dana action: [ ] Approved  [ ] Reject\n" \
        "$name" "$gem" "${result#DELETE: }" >> "$REPORT"
      ;;
  esac
done

echo ""
echo "Pruning report: historian/pruning-report.md"
echo "Send to Dana for DELETE/MERGE approval."
