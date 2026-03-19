#!/usr/bin/env bash
# Generates PRACTITIONERS.md — practitioner-to-pattern index
# Usage: bash scripts/generate-practitioners.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

python3 "${SCRIPT_DIR}/generate-practitioners.py" "$REPO_ROOT"
