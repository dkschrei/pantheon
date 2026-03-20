# Gem Quality Standard — 4 Gates + 5 Challenges

Every gem must pass all 9. The 4 gates are the floor. The 5 Pantheon Challenges are the bar.

Passing the 4 gates means the gem is well-formed. Passing the 5 challenges means it deserves to be in Pantheon.

---

## Tier 1: The 4 Quality Gates

Used in Phase 2 (prune.sh). A gem that fails any gate is REVISE or DELETE before the challenges are run.

### 1. TRIGGER_SPECIFIC
Trigger condition is a precise phrase or observable signal — not vague.
- PASS: "Any proposal to build, create, add, or extend something"
- FAIL: "When things are hard" / "During complex projects"

### 2. EXECUTABLE
Protocol steps are numbered, concrete, produce a specific output. No interpretation required.
- PASS: "Delete at least 30% of the proposed scope"
- FAIL: "Think carefully about the problem" / "Apply good judgment"

### 3. DISTINCT
Running this gem produces meaningfully different output than all other gems on the same problem.
- PASS: Different trigger condition AND different output from all others
- FAIL: Near-identical to another gem → MERGE into the more specific one

### 4. GROUNDED
Has at least 1 named practitioner with a real application AND 1 named historical event.
- PASS: Taiichi Ohno + Toyota Production System deployment (1950-1970)
- FAIL: "Many great leaders" / no events cited

---

## Tier 2: The 5 Pantheon Challenges

A gem that passes the 4 gates but fails here is an interesting idea — not a Pantheon gem.

### 5. UNIVERSAL MOVE
The pattern applies across at least 3 unrelated domains (e.g. engineering, philosophy, military strategy, personal decision-making). A pattern that only works in one domain is a technique, not a cognitive move.
- PASS: Can name 3 genuinely different domains where invoking this gem produces value
- FAIL: Works only in software, only in manufacturing, only in one field

### 6. NON-OBVIOUS
Competent, experienced practitioners in this domain regularly fail to apply this — especially under pressure. If most smart people naturally do this already, it is common sense, not a gem.
- PASS: Can explain *why* experienced practitioners miss this move and under what conditions
- FAIL: "Everyone knows you should think before you act" — obvious when named

### 7. NAMED MOVE
The specific cognitive move can be stated in one precise sentence. Not what the gem produces. Not when to invoke it. The actual move.
- PASS: "Stop the line the moment a defect appears, no matter the cost to throughput."
- FAIL: "Be more systematic" / "Consider the full context" / "Think at a higher level"

### 8. VARIATION CHECK
The move is not substantially the same as any existing gem, even under a different name or in a different domain. If the core move is the same: MERGE, don't create.
- PASS: Different core move AND different trigger from all 33 existing gems
- FAIL: Same move as an existing gem → add as practitioner/alias/event, not new pattern

### 9. BEHAVIOR CHANGE
If a practitioner applied this gem to their hardest current problem right now, it would change what they actually do — not just how they frame it. "They would think more carefully" is not an answer.
- PASS: Can specify a concrete action the practitioner would take that they otherwise wouldn't
- FAIL: "It would help them reflect" / "They'd have a better mental model" — no observable change

---

## Scoring → Flag

| Result | Flag |
|--------|------|
| All 9 pass | KEEP |
| 1-2 fail (fixable) | REVISE — specify which criteria failed and what would need to change |
| Same core move as existing gem | MERGE — name the target gem and specify what to add |
| 3+ fail | DELETE — not a gem; suggest where the idea could live instead |

---

## Classification (KEEP gems only)

Every gem that passes all 9 is classified by how the pattern was surfaced:

| Type | `origin-type` | Marker | Description |
|------|--------------|--------|-------------|
| Authored | `authored` | ✦ | Pattern surfaced from lived experience; historical grounding found after the fact |
| Historian | `historian` | (none) | Pattern surfaced by researching a historical figure; practitioner is the primary origin |

The classification does not affect quality — both types must clear all 9 criteria. It affects framing: authored gems lead with the lived incident; historian gems lead with the historical practitioner.
