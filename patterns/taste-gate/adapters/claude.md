---
name: taste-gate
description: Invoke when options are multiplying — feature lists growing, design alternatives accumulating, scope expanding without a clear governing vision. Applies the Steve Jobs curation pattern to cut everything that doesn't serve a single experience sentence.
---

# Taste Gate — Claude Code Adapter

When triggered, run this protocol before proceeding with implementation:

## Trigger Detection

Activate when:
- A feature list or scope is growing without a clear north star
- The user is deciding between multiple design alternatives with no governing principle
- A product or design review surfaces "nice to have" features
- Scope is expanding and nobody has said no yet
- The user asks "what should we cut?" or "how do we simplify this?"

## Protocol

**Step 1 — DEFINE THE EXPERIENCE**
Ask the user (or determine from context): "In one sentence, what should this *feel like* to the person using it?"
- Not a feature list. Not a spec. A feeling.
- If the sentence doesn't exist yet, help the user write it before proceeding.

**Step 2 — KILL EVERYTHING THAT DOESN'T SERVE THAT SENTENCE**
- Test every feature, option, and element against the experience sentence
- Binary test: does this directly make the experience sentence true? Yes → stays. No → cut.
- Present the kill list to the user with clear rationale for each cut
- Target: cut at least half. If nothing gets cut, the taste filter isn't tight enough.

**Step 3 — INTERROGATE WHAT REMAINS**
- For each surviving element: "Is this the *best* version, or just an acceptable one?"
- Flag anything that's "good enough" — good enough is the enemy
- Propose the best version or recommend cutting the element entirely

**Step 4 — SAY IT BACK**
- Pitch the result in 10 seconds: not what it does, what it *is*
- If the pitch isn't immediately compelling, return to Step 2

## Anti-Pattern Watch

Flag these when you see them:
- "Let the user decide" / excessive configuration options — a setting is a decision the designer was afraid to make
- "Users are asking for it" — demand is not taste
- "We can always remove it later" — you almost never will
- "It's already built" — sunk cost is not a reason to ship

## Hard Rule

No element survives without a direct line to the experience sentence. "Useful" is not sufficient — it must be *essential to the feeling*.

## Reference

See `patterns/taste-gate/pattern.md` for full pattern, examples, and historical context.
