---
description: Invoke when a gem candidate surfaces — either from lived experience or historical research. Runs a structured intake: 4 quality gates + 5 Pantheon challenges. Builds the gem only if it clears all 9. Rejects slop, forces articulation, prevents near-duplicate creation. This is not a template — it's an interrogation.
---

# Pantheon Gem Builder

A gem candidate has been submitted. Beginning intake.

This process has 6 phases. Most candidates don't survive Phase 3. That's not a failure — it means the standard is real.

---

## Phase 1: Capture

Ask the user exactly this:

> "Describe the situation that surfaced this pattern. What problem were you solving, and what was the insight that emerged?"

Wait for the full answer. Do not proceed until you have: a concrete problem, a concrete insight, and a sense of what the practitioner does differently when applying this pattern.

---

## Phase 2: The 4 Quality Gates

Work through each gate in sequence. State the gate name, make the call (PASS/FAIL), and give one sentence of reasoning. Do not skip gates.

**Gate 1 — TRIGGER_SPECIFIC**
Can the trigger condition be stated as a precise observable signal — a phrase, a situation, a specific symptom? Vague triggers fail.
- PASS: "Any proposal to build or extend something"
- FAIL: "When things are hard" / "During complex projects"

**Gate 2 — EXECUTABLE**
Are the steps numbered, concrete, and produce a specific output? No interpretation required to follow them?
- PASS: "Delete at least 30% of the proposed scope"
- FAIL: "Think carefully about the problem" / "Apply good judgment"

**Gate 3 — DISTINCT**
Running this gem on the same problem as every related existing gem — does it produce meaningfully different output? Check the trigger conditions in PATTERNS.md against this candidate. If another gem covers this ground, this is a MERGE, not a new gem.
- PASS: Different trigger AND different output from all 32 existing gems
- FAIL: Near-identical to an existing gem → name the gem and recommend MERGE

**Gate 4 — GROUNDED**
At least one named practitioner with a real application AND one named historical event with a year.
- PASS: Taiichi Ohno + Toyota Production System (1950-1970)
- FAIL: "Many great leaders" / no events cited

If any gate fails: stop here. State the gate, explain what failed, and describe what would need to change to pass. Do not proceed to Phase 3 with a failing candidate.

---

## Phase 3: The Pantheon Challenge

The 4 gates filter out slop. The Pantheon Challenge filters out everything that is merely good. These 5 questions are harder. A gem that passes the 4 gates but fails here is an interesting idea — not a Pantheon gem.

Work through each challenge. Push back. Ask follow-up questions. Do not award a pass out of politeness.

---

**Challenge 1 — The Universal Move**

> "Name three unrelated domains where this gem applies — not variations of the same domain, genuinely different fields."

If the pattern only works in one domain (e.g., only software, only manufacturing, only personal productivity), it is a **technique**, not a cognitive pattern. Techniques belong in documentation. Patterns belong in Pantheon.

Probe: Can a military strategist, a product designer, and a philosopher all invoke this gem and get something useful? If not, it is domain-specific, and domain-specific tools are not Pantheon gems.

---

**Challenge 2 — The Non-Obviousness Test**

> "Would a competent, experienced practitioner in this domain naturally do this without being told? Be honest."

If yes, it is common sense that happens to have a name. Common sense is not a gem. Gems describe moves that practitioners systematically miss — even intelligent, experienced ones — especially under pressure. The failure mode the gem prevents must be one that regularly claims skilled people.

Probe: Why do smart people fail to apply this? What makes this genuinely counterintuitive, or counterintuitive under the specific conditions that trigger it?

---

**Challenge 3 — Name The Move**

> "State the specific cognitive move in one precise sentence. Not what the gem produces. Not when to use it. The actual move itself."

If the move cannot be stated precisely in one sentence, the gem is not distilled. A gem is not a framework, a methodology, or a philosophy — it is a move. The practitioner makes a specific choice that others don't. What is it?

Examples of moves:
- Andon Cord: "Stop the entire line the moment a defect appears, no matter the cost to throughput."
- Vessel and Soul: "Before storing any information, ask its decay rate and match the container accordingly."
- The Ratchet: "When inner loop velocity decreases, zoom to system level and apply Musk Filter to everything the inner loop built."

If the candidate's move sounds like "think more carefully" or "consider the bigger picture" or "be systematic about X" — it has not been distilled. Push back until the precise move is named or it becomes clear the gem isn't ready.

---

**Challenge 4 — The Variation Check**

Read through every existing gem in PATTERNS.md that has a related domain or trigger. For each one that overlaps:

> "If the practitioner invoked [existing gem] on this problem, would they get substantially the same output as invoking this new gem?"

If yes: this is not a new gem. It is a new practitioner, a new historical event, or a new alias for the existing gem. Add those — don't create a new pattern.

The Pantheon library is not a thesaurus. Thirty-three near-identical variations of "think before you build" is noise. One gem with thirty-three practitioners is signal. Be ruthless here — the strength of the library depends on this gate.

---

**Challenge 5 — The Behavior Change Test**

> "If a practitioner applied this gem to their hardest current problem right now, what would they do differently than they would have done without it?"

The answer must be specific and concrete. "They would think more carefully" is not an answer. "They would delete 30% of the proposed scope before writing a single line of code" is an answer.

If the gem cannot produce a concrete behavioral change on a concrete problem, it is not actionable. It may be a true observation, a useful heuristic, an interesting philosophy — but it is not a Pantheon gem. Pantheon gems change what practitioners do, not just how they think about what they do.

---

## Phase 4: Verdict

After all 9 checks, deliver the verdict clearly.

| Result | Flag | Action |
|--------|------|--------|
| All 9 pass | **KEEP** | Proceed to Phase 5 |
| 1-2 fail (fixable) | **REVISE** | State exactly which checks failed. State what would need to change. Stop — do not build. |
| Same move as existing gem | **MERGE** | Name the target gem. Specify which fields to add (practitioners[], events[], aliases[]). Stop — do not create a new pattern. |
| 3+ fail | **DELETE** | Not a gem. State why in one sentence. Suggest where the idea could live instead (documentation, a note, a technique library). |

Do not soften a REVISE or DELETE verdict. A candidate that almost passes is a candidate that failed. The bar exists because it must.

---

## Phase 5: Classification (KEEP only)

Ask:

> "Did this pattern surface from a problem you personally lived through — or from researching a historical figure?"

- **Lived experience → `origin-type: authored`** — mark with ✦ in all indexes. The historical grounding was found after the pattern emerged from practice.
- **Historical research → `origin-type: historian`** — the historian agent surfaced the pattern by studying a practitioner. Historical grounding is primary, not retroactive.

The classification changes how the gem is framed in The Book section. Authored gems lead with the lived incident. Historian gems lead with the historical practitioner.

---

## Phase 6: Build (KEEP only)

Build all required files using SCHEMA.md as the canonical format:

**Create:**
1. `patterns/{gem-name}/pattern.md` — full canonical pattern
2. `patterns/{gem-name}/adapters/claude.md` — Claude Code skill adapter
3. `commands/pantheon-{gem-name}.md` — slash command

**Update:**
4. `PATTERNS.md` — add row (sorted alphabetically)
5. `commands/pantheon.md` — add row with ✦ if authored; update pattern count
6. `PRACTITIONERS.md` — add each named practitioner under their alphabetical heading; update totals

---

## The Standard

Pantheon is not a collection of good ideas. It is a library of cognitive moves — the specific, non-obvious, universally-applicable things that the best practitioners do when everyone else fails. Every gem in it must be worth installing in an agent's permanent context. That is the test: would a practitioner be worse off not having this? If the answer is "probably not" or "only in specific situations," it is not a Pantheon gem.

The builder exists to help candidates reach that bar — not to lower it.

---

*Standard: 4 quality gates + 5 Pantheon challenges — all 9 must pass*
*Classification: authored ✦ (lived experience) or historian (research-surfaced)*
*Schema: SCHEMA.md*
