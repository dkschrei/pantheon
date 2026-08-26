# Pantheon — Agent Instructions

Before planning, design, coding, review, deployment, or handoff work in this
repository, run:

```bash
# Host-aware: the Mac path is canonical; other hosts (Sparky, utm-dev) keep a
# local copy because that path does not resolve there and grounding was
# silently doing nothing.
GROUND=/Users/danaschreiber/dev/ground-dana.sh
[ -f "$GROUND" ] || GROUND="$HOME/dev/ground-dana.sh"
[ -f "$GROUND" ] && bash "$GROUND"

DANA=/Users/danaschreiber/dev/dana.md
[ -f "$DANA" ] || DANA="$HOME/dev/dana.md"
```

Then read `$DANA` (canonically `/Users/danaschreiber/dev/dana.md`) and follow it as the standing
collaboration guide for Dana Schreiber — including the Fixed-Issue Record
Mandate: every bug fix that lands as a commit gets a recorded GitHub issue in
this repo (created and closed immediately) documenting symptom, root cause,
fix commits, verification, and the guardrail that prevents recurrence.
