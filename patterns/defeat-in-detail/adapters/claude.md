---
name: defeat-in-detail
description: Invoke when the user faces multiple adversaries, competing demands, or separate threats that cannot currently coordinate — and risks being overwhelmed by fighting them simultaneously. Trigger phrases: "pulled in multiple directions", "too many fires", "multiple competitors", "can't fight everyone at once", "coalition forming against us", "competing priorities". This skill applies the Napoleonic interior-lines doctrine: take the central position, fix the secondary threat with minimum force, destroy the primary threat decisively, then reverse.
---

# Defeat in Detail — Claude Adapter

Reference the canonical pattern at `patterns/defeat-in-detail/pattern.md`.

## When to Invoke

Invoke this skill when:
- The user faces multiple adversaries, critics, competitors, or demanding stakeholders that are not yet coordinated
- The user describes being "spread too thin" or fighting on too many fronts
- A coalition is forming against the user's project, proposal, or position — but has not yet unified
- The user must allocate scarce resources (time, capital, attention, people) across competing threats
- A decision involves sequencing: who/what to address first

Do NOT invoke when:
- All adversaries are already coordinated and attacking simultaneously (this pattern prevents that; it doesn't undo it)
- The user has vastly superior resources and doesn't need to sequence
- The "multiple threats" are actually one interconnected system (use `schwerpunkt` instead)

## Protocol

**Step 1 — Map the coalition's coordination timeline.**
Ask: "When can these threats/adversaries combine forces against you?"
- Identify each separate threat and its current coordination capability
- Name the window explicitly: "You have X days/weeks before these forces unite"
- If the window is zero (they're already coordinated), the pattern has already failed — pivot to `schwerpunkt` for the single engagement

**Step 2 — Identify the central position.**
Ask: "Where can you position to have shorter response time to either threat than they have to each other?"
- In business: a product category, a customer segment, a partnership, or a technology that sits between competing threats
- In organizational politics: an issue, relationship, or decision point where you have influence over both sides
- In resource allocation: the team, tool, or initiative that could pivot between problems faster than problems can compound

**Step 3 — Design the minimum fixing force.**
Ask: "What is the least you can deploy to keep the secondary threat occupied?"
- This is NOT a solution — it is a delay mechanism
- Common forms: a public statement that demands response, a pilot program that requires attention, a partial concession that pauses escalation, a relationship check-in that buys goodwill
- Warn: if this force is too weak, the secondary threat moves freely and the pattern collapses

**Step 4 — Strike the primary threat with full force.**
Ask: "What would it mean to *completely resolve* this threat — not damage it, but eliminate it as a threat?"
- The goal is annihilation, not attrition — a weakened-but-intact threat reconstitutes after you turn
- What does "victory" look like here? Name it concretely before executing

**Step 5 — Complete before reversing.**
Ask: "Is the primary threat actually eliminated, or just retreating?"
- A threat that retreats intact will return when you engage the secondary
- If you cannot eliminate the primary threat before the secondary threat's window closes, recalculate — maybe strike the secondary first, or find a different central position

**Step 6 — Reverse and destroy the secondary threat.**
- The secondary threat has been waiting, uncertain, without information
- Uncertainty is demoralizing — the secondary adversary often weakens during the wait
- Strike now with the same concentration you used on the primary

## Anti-Pattern Warning

If the user is already fighting multiple threats simultaneously, this pattern is the diagnosis — not the prescription. Tell them:

> "You're currently in the failure mode this pattern prevents: simultaneous multi-front engagement. The question is whether you can disengage from one front temporarily to create the interior position. What would it take to buy 30 days of stability on one of these fronts while you resolve the other?"

## Key Questions to Ask

1. "Which of these threats is closest to being able to coordinate with the others?"
2. "Which threat, if eliminated first, would most demoralize or isolate the others?"
3. "What's the minimum you could do to keep [secondary threat] occupied without fully engaging?"
4. "What would complete victory over [primary threat] look like — not backing them down, but ending the threat?"
5. "How long do you have before these threats can coordinate?"

## Related Patterns

- **`schwerpunkt`**: Use when the adversaries ARE coordinated and you must find the decisive node within a single engagement. Defeat-in-detail prevents facing that situation; schwerpunkt handles it when you do.
- **`shape-the-ground`**: Use when you have lead time to pre-position before adversaries appear. Defeat-in-detail applies when adversaries already exist but haven't yet united.
- **`two-way-door`**: Use to decide which threat to designate as primary. The sequencing choice is a two-way-door analysis: which engagement is more reversible if it goes wrong?
