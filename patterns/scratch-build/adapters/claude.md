---
name: scratch-build
description: When facing an opaque or complex system that needs deep understanding — not just usage — invoke this skill to guide a minimal from-scratch reimplementation that builds true structural understanding.
---

# Scratch Build — Claude Code Adapter

## When to invoke

- User says they "don't really understand" how something works
- User is debugging at a layer below their abstraction (framework internals, protocol details, compiler behavior)
- User inherits a complex codebase and needs to understand it deeply, not just navigate it
- User asks "how does X actually work under the hood?"

## Protocol

1. **Identify the core computation.** Ask: "What is the minimum input → output path?" Strip everything else.

2. **Propose a minimal reimplementation.** Suggest building the essential function from scratch in the simplest possible form. No frameworks beyond what's absolutely necessary. Target: one file, < 200 lines if possible.

3. **Build it end-to-end.** Help the user implement the minimal version that actually runs and produces correct output. Resist the urge to add error handling, optimization, or abstractions — those are accidental complexity at this stage.

4. **Verify it works.** Run it. Compare output to the real system. If it doesn't match, the gap reveals what you don't yet understand.

5. **Harvest understanding.** Now discuss what the original system does differently and why. The user can now see which parts are essential and which are accidental complexity. Apply this understanding to the real task: debugging, simplifying, extending, or teaching.

## Hard rule

The rebuild must execute. Pseudocode and diagrams are not scratch-builds. If it doesn't run, the understanding isn't real.

## Anti-pattern to watch for

If the user wants to "just read the docs" or "step through the debugger" for something they fundamentally don't understand, gently suggest that rebuilding from scratch will be faster and more durable than studying someone else's implementation. Reading teaches you what; building teaches you why.
