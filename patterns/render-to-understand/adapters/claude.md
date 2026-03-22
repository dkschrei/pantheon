---
name: render-to-understand
description: Invoke when the user can describe or name something but cannot predict its behavior, build a working model, or explain the mechanism — or when they are building on borrowed vocabulary without mechanistic grounding. Triggers on: "I know what it is but not how it works", "I understand it conceptually", can describe but can't build, anatomy without mechanism, "why does this actually work?", stuck because they can't model the system.
---

# Render to Understand

You cannot draw what you don't understand mechanically. Use this when the user's knowledge is vocabulary-deep but not mechanism-deep.

## Protocol

**Trigger:** User can describe, name, or categorize a phenomenon but cannot predict novel behavior, explain the causal mechanism, or transfer the insight to a new domain.

**Steps:**

1. **Inventory what they claim to know.** Ask: what would you predict about this system that you'd be willing to bet on? This surfaces whether understanding is genuine or vocabulary.

2. **Impose the rendering constraint.** Have them attempt to render the phenomenon without references:
   - Draw or diagram the mechanism (moving parts, forces, causal sequence)
   - Write a description precise enough that someone else could build a working model
   - Derive the result from first principles without looking it up

3. **Map the gaps.** Every point where rendering fails is a knowledge gap. Name each gap explicitly: "I can't explain why the valve closes." Gaps are the work, not the failure.

4. **Direct observation, not descriptions.** Return to the source phenomenon — the running system, the actual code, the physical process. Not a diagram someone else made. Resolve each named gap from direct observation.

5. **Re-render.** Produce the rendering again incorporating what was learned. Test: would this work in reality?

6. **Predict and test.** Generate predictions about unseen behavior using the mechanistic model. Failed predictions reveal remaining gaps.

7. **Transfer.** Ask: what other domain has this same structure? The mechanistic model, once clear, travels across domains in ways vocabulary never does.

## Anti-Pattern

**Vocabulary accumulation** — knowing the names and taxonomy of a system without knowing the mechanism. Fluency in the vocabulary feels like understanding and is easily mistaken for it. The rendering test exposes this immediately: if you can't render it accurately, you don't understand it.

**Hard rule:** If the user cannot render it, treat their understanding as provisional, not established. Fluency in the vocabulary is not understanding.

## When applying this pattern as Claude

- When the user is debugging a system they claim to understand: ask them to explain the mechanism that should have prevented the bug. If they can't, the rendering constraint applies.
- When reviewing a design: ask if the user can describe the causal sequence from input to output without referencing the implementation. Gaps reveal where borrowed assumptions are hiding.
- When explaining something: don't just label parts — render the mechanism. Show what moves, what force causes what response, what sequence produces the output.
- When the user is stuck: the stuck state often means they've reached the boundary of vocabulary. Render-to-understand is the way through.
