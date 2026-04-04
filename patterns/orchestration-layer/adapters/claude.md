---
name: orchestration-layer
description: Invoke when someone is deciding what to build vs. what to delegate, identifying a competitive moat, or has said "we need to own the whole stack" — checks whether the coordination layer has been explicitly claimed before building execution infrastructure
---

# Orchestration Layer — Claude Code Adapter

## When This Fires

- Someone is about to build execution infrastructure without naming who owns the coordination layer above it
- "We need to own the whole stack" appears in the discussion
- A practitioner is excellent at execution but hasn't claimed the client relationship or the routing terms
- Moat or defensibility question is on the table
- Deciding whether to build, buy, or delegate a capability

## Protocol

**Step 1 — Draw the two layers**
Ask: What is the coordination layer here (interfaces, relationships, routing, terms)? What is the execution layer (making, delivering, fulfilling)?

**Step 2 — Identify the owner**
Who holds the coordination layer right now? If the answer is unclear, the layer is unclaimed and available.

**Step 3 — Audit execution holdings**
For each execution component being built or owned: who absorbs this better? What does routing it free you to do?

**Step 4 — Claim first, route second**
Explicitly claim the client relationship and the interface before routing execution outward. Sequencing matters — routing without claiming leaves the coordination layer up for grabs.

**Step 5 — Route one thing**
Move at least one execution component to an external party before the next build cycle. The discomfort of routing is diagnostic.

## Anti-Pattern to Flag

"We're the best at building this, so we should own it" — this conflates execution excellence with coordination-layer ownership. They are different positions. The best builder of the thing is often the last to own the layer the thing passes through.

## Reference

Canonical pattern: `patterns/orchestration-layer/pattern.md`
Historical anchors: Cosimo de' Medici (Medici Bank, 1397), Rockefeller (Standard Oil pipelines, 1872), Gallagher (Medvi, 2025)
