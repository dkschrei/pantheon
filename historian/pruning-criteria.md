# Pruning Criteria — 4 Quality Gates

Every gem must pass all 4. Used in Phase 2 (prune.sh).

---

## 1. TRIGGER_SPECIFIC
Trigger condition is a precise phrase or observable signal — not vague.
- PASS: "Any proposal to build, create, add, or extend something"
- FAIL: "When things are hard" / "During complex projects"

## 2. EXECUTABLE
Protocol steps are numbered, concrete, produce a specific output. No interpretation required.
- PASS: "Delete at least 30% of the proposed scope"
- FAIL: "Think carefully about the problem" / "Apply good judgment"

## 3. DISTINCT
Running this gem produces meaningfully different output than all other gems on the same problem.
- PASS: Different trigger condition AND different output from all others
- FAIL: Near-identical to another gem → MERGE into the more specific one

## 4. GROUNDED
Has at least 1 named practitioner with a real application AND 1 named historical event.
- PASS: Taiichi Ohno + Toyota Production System deployment (1950-1970)
- FAIL: "Many great leaders" / no events cited

---

## Scoring → Flag

| Criteria passed | Flag |
|----------------|------|
| All 4 | KEEP |
| 1-2 fail | REVISE — specify criterion + proposed fix |
| Substantially same as another | MERGE — specify which gem to merge into |
| 3-4 fail | DELETE |
