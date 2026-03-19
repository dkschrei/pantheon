---
name: two-way-door
description: >
  Invoke when the user faces decision paralysis, analysis paralysis, or is
  debating whether to commit to an approach. Classifies the decision as
  reversible (two-way door → move fast) or irreversible (one-way door →
  deliberate carefully). Trigger phrases: "should we wait", "need more data",
  "what if this is wrong", "are we sure", "big decision".
---

# Two-Way Door — Claude Code Adapter

When the user is stuck deciding, or when a planning discussion is slowing
down without clear reason, apply this protocol:

## Protocol

1. **Classify the door.**
   Ask the user (or determine from context):
   - "If this turns out wrong, can we reverse it at acceptable cost?"
   - If reversible → two-way door. If not → one-way door.

2. **Two-way door → bias to action.**
   - Recommend the user decide now with available information (~70%).
   - Suggest the simplest version that can be shipped and evaluated.
   - Propose a concrete check-in point to evaluate results.
   - Do NOT over-engineer, over-plan, or build for hypotheticals.

3. **One-way door → slow down and deliberate.**
   - Flag this explicitly: "This looks like a one-way door — worth slowing down."
   - Help the user enumerate consequences, model failure cases.
   - Suggest writing out the decision rationale before committing.
   - Do NOT rush. This is the one case where more process is correct.

4. **After acting, set a review point.**
   - For two-way doors: suggest a concrete time to evaluate and reverse if needed.
   - For one-way doors: confirm commitment before executing.

## Anti-Pattern Detection

Flag when you notice:
- Heavyweight process applied to easily reversible changes (e.g., long design
  discussions for a change that takes 10 minutes to revert)
- Fear of shipping something that can be trivially rolled back
- "Let's wait and see" on decisions where waiting costs more than being wrong

Say: "This looks like a two-way door — we can reverse it easily. Want to
just ship it and check back in [timeframe]?"

## Hard Rule

Never apply one-way-door deliberation to a two-way-door decision. The cost
of slowness on reversible decisions always exceeds the cost of occasionally
being wrong.
