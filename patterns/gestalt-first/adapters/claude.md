---
name: gestalt-first
description: Invoke when the user is building any part of a project before they have a complete picture of the finished whole — or when parts feel disconnected in hindsight, rework follows integration, or they describe designing-while-building. Triggers on: "I'll figure out the rest as I go", "I started writing the intro but I'm not sure where it's going", section-by-section design without a known end, API design before user journey is defined, integration failures after parts are assembled.
---

# Gestalt First

Mozart's move: complete the whole internally before externalizing any part. Execution is transcription. If you're discovering what something should be while building it, the internal work isn't done.

## Protocol

**Trigger:** The user is about to begin (or has already begun) work on a component of a larger artifact without having formed a complete picture of the finished whole. Or: they are experiencing rework caused by parts not fitting each other after assembly.

**Steps:**

1. **Stop execution.** Ask the user to state the complete finished artifact — not the component they're working on, but the whole. What is the full user journey? What is the complete argument? What is the last thing the user does or reads? If they can't state it, they're not ready to build any part.

2. **Test for gaps.** Ask: what does every major component do, and how does it connect to its neighbors? For each gap ("I'm not sure how X connects to Y"), that is internal work to do before external work begins.

3. **Resolve gaps before building.** Work backward from the end state. If the ending is known, the shape of every part is constrained. Parts that feel uncertain become clearer when viewed from the whole they serve.

4. **Execute as transcription.** Once the whole is clear, implementation should confirm the internal model, not discover it. If a part surprises the user (doesn't fit, needs rethinking), stop — the internal model was incomplete. Return to the whole.

5. **When a contradiction surfaces during execution:** don't patch the part in isolation. Update the complete internal picture first, then update affected parts from the corrected whole. Patching parts without re-grounding in the whole produces compounding incoherence.

## Anti-Pattern

**Sequential assembly** — building A without knowing B-Z, building B without knowing C-Z. Each part is designed for a local context that doesn't represent the whole. Integration surfaces the mismatch. Rework is not a failure of execution — it is the structural consequence of sequential assembly applied to problems that have a definite whole.

**Hard rule:** If the user cannot state the complete finished thing, they are not ready to build any part of it.

## When applying this pattern as Claude

- When a user asks you to write "the first part" of something (a document, a spec, a piece of code) without stating what the last part does: invoke this before generating anything.
- When reviewing a design that shows signs of integration rework: name the pattern explicitly — the rework is not a bug, it's the cost of sequential assembly.
- When generating multi-component artifacts: apply gestalt-first to your own output. Know the complete structure before writing section 1. Don't discover the ending while writing the conclusion.
- When a user describes building an API before the user experience is defined, or writing a module before the architecture is clear: this is the trigger. The missing whole needs to be formed first.
- For long outputs (multi-section documents, multi-file code): outline the complete whole in a single view before writing any section. Each section should be the externalization of a pre-existing internal structure, not a discovery.
