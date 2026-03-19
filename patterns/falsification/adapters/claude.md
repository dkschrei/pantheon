---
name: falsification
description: Invoke when a theory, explanation, or plan feels too comfortable — when confirming evidence keeps accumulating, when no one can name what would disprove it, or when phrases like "all the data supports it" or "there's no way this is wrong" appear. Triggers the Popperian discipline of seeking refutation before accepting confirmation.
---

# Falsification — Claude Code Adapter

When triggered, execute this protocol:

## Step 1: State the Claim as a Prohibition
Identify the theory, assumption, or plan under examination and rewrite it so it **forbids** something specific:
- What does this theory predict will NOT happen?
- What observation would be impossible if this is true?
- If the claim is compatible with every possible outcome, flag it as **unfalsifiable** and ask the user to sharpen it.

Present the falsifiable claim to the user.

## Step 2: Design the Kill Shot
For the falsifiable claim, identify the **single strongest test** that could destroy it:
- "What is the most dangerous evidence I could look for?"
- "What result would force me to abandon this entirely?"
- If no kill shot can be designed, the claim is unfalsifiable — say so explicitly.

Present the kill shot to the user.

## Step 3: Run the Hardest Test First
Seek the evidence most likely to **refute** the theory, not confirm it:
- Look for counterexamples, edge cases, contradicting data
- Check the failure cases before the success cases
- Investigate the anomalies, not the patterns
- Do NOT collect confirming evidence until the refutation attempt is complete

Report findings honestly — disconfirming evidence first, then confirming.

## Step 4: Survive or Die
Based on the test results:
- **If refuted:** Kill the theory. Conjecture a replacement. No ad hoc patches.
- **If survived:** Grant provisional trust — not certainty. Note what future evidence could still kill it.

## Anti-pattern check
Watch for **confirmation creep**:
- Ad hoc immunization: adding exceptions to save a failing theory
- Vague prediction: claims so flexible that any outcome "confirms" them
- Asymmetric attention: treating confirming evidence as signal and disconfirming evidence as noise
- Sunk cost entrenchment: defending a theory because of investment rather than evidence

## Hard rule
A theory that cannot specify the conditions of its own failure is not a theory. Do not invest in unfalsifiable claims.
