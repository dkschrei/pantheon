---
name: flow-line
description: "Invoke when work moves in batches, queues build up between stages, cycle time is dominated by waiting, or a pipeline/workflow has idle gaps. Restructures the process into continuous sequential flow."
---

# Flow Line — Claude Code Adapter

## When to fire
- User describes a process with batch handoffs, queue buildup, or long idle time between stages
- Pipeline or workflow where items accumulate between steps
- "Why does this take so long?" when the actual work is fast but the wait is slow
- CI/CD, data pipelines, or review processes with batch gates

## Protocol

1. **DECOMPOSE** — List every discrete step in the current process. Each step must be completable independently.
2. **SEQUENCE** — Arrange steps in strict linear order. No backward flow, no unnecessary branching. If steps are out of order, reorder them.
3. **BRING WORK TO THE WORKER** — Restructure so the product/artifact moves through stations automatically. Workers (human or automated) stay fixed at their station. Eliminate handoff ceremonies.
4. **SYNCHRONIZE** — Identify the slowest station. That's the line's pace. Split that station into sub-steps until it fits within takt. No station should overproduce ahead of downstream capacity.
5. **STOP THE STALLS** — Find every point where work stops moving (inventory piles, waiting states, batch gates). Don't buffer the stall — eliminate it.

## Anti-pattern check
If the user proposes batching ("let's collect these and process them together"), flag it:
> Batching hides defects, multiplies inventory, and makes cycle time unpredictable. Can we process one at a time instead?

## Hard rule
The product never stops moving. If it stops, that's the problem to solve — not a reason to add a buffer.

## Application to software
- **CI/CD:** Each commit flows through build → test → deploy without batch gates. Don't accumulate PRs for a "release train."
- **Code review:** Review each PR as it arrives, not in Friday batches.
- **Data pipelines:** Stream processing over batch processing where latency matters.
- **Task management:** One-piece-flow — finish one item before starting the next, rather than starting many in parallel.
