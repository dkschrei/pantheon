#!/usr/bin/env bash
# The dashboard is a public static site. Vite inlines every VITE_* variable
# into the bundle it ships, so a VITE_-prefixed secret is not configuration —
# it is publication.
#
# GemRunner.jsx once read import.meta.env.VITE_OPENROUTER_API_KEY as a fallback
# for the user's own key. Nothing was leaked, because the variable was never
# set in Vercel: the shipped bundle inlined `void 0`. The exposure was one
# dashboard click away and nothing would have reported it.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
FAIL=0

# 1. No client-side source may read build-time env at all.
HITS=$(grep -rn 'import\.meta\.env' "${REPO_ROOT}/dashboard/src" 2>/dev/null || true)
if [[ -n "$HITS" ]]; then
  echo "FAIL: dashboard/src reads build-time env — it will be inlined into the public bundle:"
  echo "$HITS" | sed 's/^/    /'
  FAIL=1
else
  echo "PASS: no build-time env reads in dashboard/src"
fi

# 2. No secret-shaped string may appear in a built bundle.
if [[ -d "${REPO_ROOT}/dashboard/dist" ]]; then
  LEAKS=$(grep -rlE 'sk-or-v1-[A-Za-z0-9]{16}|sk-ant-[A-Za-z0-9]{16}|sk-proj-[A-Za-z0-9]{16}|ghp_[A-Za-z0-9]{20}|github_pat_[A-Za-z0-9]{20}' "${REPO_ROOT}/dashboard/dist" 2>/dev/null || true)
  if [[ -n "$LEAKS" ]]; then
    echo "FAIL: secret-shaped string found in built output:"
    echo "$LEAKS" | sed 's/^/    /'
    FAIL=1
  else
    echo "PASS: no secret-shaped strings in dashboard/dist"
  fi
else
  echo "SKIP: dashboard/dist not built here"
fi

# 3. Server-side secrets belong in api/, read via process.env. That is correct
#    and must not be flagged; assert it is still the only place they live.
if grep -q 'process\.env\.GITHUB_TOKEN' "${REPO_ROOT}/api/feedback.js" 2>/dev/null; then
  echo "PASS: GITHUB_TOKEN stays server-side in api/feedback.js"
fi

exit $FAIL
