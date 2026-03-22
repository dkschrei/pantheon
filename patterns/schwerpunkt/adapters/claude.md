---
name: schwerpunkt
description: Invoke when a user faces a complex system with multiple nodes and must decide where to concentrate force, resources, or attention for maximum cascading impact — especially when they feel pulled to apply effort everywhere at once, when they're outnumbered or under-resourced, or when they ask "where should we focus?" or "what's the one thing that matters most here?"
---

# Schwerpunkt — Claude Code Adapter

Reference canonical pattern: `patterns/schwerpunkt/pattern.md`

## When This Fires

- User is allocating limited resources (engineering time, capital, attention) across multiple competing priorities
- User is "fighting on multiple fronts" and losing ground everywhere
- User asks "what should we focus on first?" or "which problem is most important?"
- A system has broken down and there are many potential root causes
- User is planning a major strategic move and wants to know where to concentrate
- User is outnumbered, under-resourced, or facing an opponent larger than themselves

## Protocol

**Step 1 — Map the system, not the symptoms.**
Before identifying where to concentrate, build the full topology:
- List every node: components, dependencies, stakeholders, failure points, decision-makers
- Identify the connections: what does each node depend on? What depends on it?
- Do not skip this step to get to recommendations faster

**Step 2 — Find the center of gravity.**
Ask explicitly: "Which single node, if solved/captured/eliminated, would cause the most cascading resolution elsewhere?"
Test candidates:
- Remove this node mentally — does the system lose coherence?
- Is this node load-bearing for multiple other nodes?
- Would solving this make the remaining problems easier, smaller, or irrelevant?
The center of gravity is rarely the largest or most visible node. It is the load-bearing one.

**Step 3 — Design the holding forces.**
Identify what must be maintained at minimum viable effort to prevent catastrophic collapse while the main effort proceeds. Not everything can be abandoned — but most things can be held with less than they currently receive.

**Step 4 — Concentrate the best force at the decisive node.**
The center of gravity gets the best resources: the most capable engineer, the most capital, the most executive attention. Partial commitment to the decisive node is worse than not striking it at all.

**Step 5 — Strike with speed that forecloses response.**
Move on the decisive node before the system has time to adapt or route around the strike. Speed is a weapon, not just efficiency.

**Step 6 — Exploit the collapse.**
When the decisive node falls, the system loses coherence. Pursue immediately — don't stop to consolidate at the node. The secondary problems that were held in place will resolve faster now.

## Claude Code Application

When debugging a complex system:
- Center of gravity = the root cause whose fix eliminates the most downstream errors
- Holding force = workarounds that keep the system running while the root fix is developed
- Strike = deep fix at the root, not patches at the symptoms

When planning a sprint or roadmap:
- Center of gravity = the one feature or capability whose existence unblocks the most other work
- Holding force = minimum maintenance to keep the system operable
- Strike = full team concentration on the unblocking work before splitting effort

When facing architectural decisions:
- Center of gravity = the architectural choice that, once locked in, makes all other decisions easier
- Holding force = keep existing architecture running without major investment
- Strike = design and build the decisive architectural node first

## Anti-Pattern to Name

If the user is distributing effort proportionally across all problems, name this explicitly: "This is uniform pressure — it's expensive, slow, and lets the system adapt. We need to identify the center of gravity and hit it with everything while holding the margins with minimum force."

## The Diagnostic Question

"If you could only fix/build/solve one thing, and everything else had to stay as-is for 90 days, what would it be?" The answer is almost always the center of gravity — and the user's hesitation to commit to it is usually why they're stuck fighting everywhere at once.
