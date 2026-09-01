#!/usr/bin/env bash
# Usage: bash tests/validate-schema.sh patterns/musk-filter/pattern.md
set -euo pipefail

FILE="${1:-}"
[[ -z "$FILE" ]] && { echo "Usage: $0 <pattern.md>"; exit 1; }
[[ -f "$FILE" ]] || { echo "ERROR: file not found: $FILE"; exit 1; }

REQUIRED_FIELDS=(name aliases domain trigger practitioners events lineage origin-earliest origin-modern)
ERRORS=0

# The frontmatter must actually PARSE as YAML. SCHEMA.md says it is YAML, but
# nothing checked it, and 18 files carried values containing ": " unquoted —
# which YAML reads as a nested mapping. A strict parser dropped every one of
# their triggers, and the dispatcher generator silently did exactly that behind
# a bare except. Grep-based field checks cannot see this.
if command -v python3 >/dev/null 2>&1; then
  if ! python3 - "$FILE" <<'PYCHECK'
import re, sys
try:
    import yaml
except ImportError:
    sys.exit(0)            # no pyyaml here; the grep checks still run
text = open(sys.argv[1]).read()
m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
if not m:
    sys.exit(0)            # missing frontmatter is reported by the check below
try:
    yaml.safe_load(m.group(1))
except yaml.YAMLError as e:
    mark = getattr(e, "problem_mark", None)
    where = f" (line {mark.line + 1} of the frontmatter)" if mark else ""
    print(f"{getattr(e, 'problem', 'invalid YAML')}{where}")
    sys.exit(1)
PYCHECK
  then
    echo "FAIL: $FILE — frontmatter is not valid YAML (quote any value containing \": \")"
    ERRORS=$((ERRORS + 1))
  fi
fi

if ! grep -q "^---" "$FILE"; then
  echo "FAIL: $FILE — no YAML frontmatter found"
  exit 1
fi

# Extract YAML frontmatter (between first and second ---)
FRONTMATTER=$(awk '/^---/{if(++count==2)exit; if(count==1)next} count==1' "$FILE")

for field in "${REQUIRED_FIELDS[@]}"; do
  if ! echo "$FRONTMATTER" | grep -q "^${field}:"; then
    echo "FAIL: $FILE — missing YAML field: ${field}"
    ERRORS=$((ERRORS + 1))
  fi
done

for section in "## Protocol" "## The Book" "### The Pattern" "### Protocol (extended)" "### Anti-Pattern (extended)" "### Examples" "### Practitioners" "### Historical Events" "### Lineage" "### Origin"; do
  if ! grep -qF "$section" "$FILE"; then
    echo "FAIL: $FILE — missing section: ${section}"
    ERRORS=$((ERRORS + 1))
  fi
done

if [[ $ERRORS -eq 0 ]]; then
  echo "PASS: $FILE"
else
  echo "TOTAL FAILURES: $ERRORS in $FILE"
  exit 1
fi
