---
name: the-ratchet
description: Invoke when a system built through continuous improvement feels slow, heavy, or friction-filled despite ongoing effort — diagnoses whether the accumulation itself is the problem and runs the outer loop reset to restore velocity without discarding real capability.
---

# The Ratchet — Nested Loop Reset

Running The Ratchet. This pattern fires when a continuously-improved system has hit a local maximum.

---

## Step 1 — Diagnose the Signal

Check which of these are true:

- [ ] New projects take longer than early ones despite more tooling
- [ ] Agents/team navigates more rules than they produce output
- [ ] Continuous improvement iterations produce diminishing returns
- [ ] Every new task hits multiple existing constraints before it starts
- [ ] The system designed to reduce friction is now the source of friction

If 2+ are true: the inner loop has hit a local maximum. The accumulation is the problem.

---

## Step 2 — Inventory the System

List everything the system contains: rules, gates, processes, artifacts, approvals, checks.
Do not evaluate yet. Just inventory.

---

## Step 3 — Run Musk Filter on the System Itself

For each item in the inventory, ask:
> "What breaks if we remove this?"

Sort into two buckets:

**BONES** — keep these
- Prevents catastrophic failure (security, data loss, compliance)
- Captures hard-won learning that cost real pain to acquire
- Without it, you'd rebuild it within one iteration

**SCAFFOLDING** — candidates for removal
- Solved a coordination problem that may no longer exist at current scale
- Was added for a past failure mode that hasn't recurred
- Made sense for a team/context that has since changed

---

## Step 4 — Execute the Reset

1. Archive the scaffolding (don't delete history — collapse it)
2. Document WHY the bones are bones (so future outer loops don't misclassify them)
3. Resume inner loop from the cleared floor

---

## Step 5 — Raise the Floor

The outer loop is complete when:
- The system contains only bones and recent scaffolding (< 2 cycles old)
- New projects start without navigating existing constraints
- Inner loop velocity has measurably increased

---

## The Hard Rule

**The outer loop is only as precise as the inner loop's depth.**

If you haven't accumulated enough inner loop iterations to know WHY each rule exists, do not run the outer loop. You will destroy bones thinking they are scaffolding.

The minimum viable inner loop depth: you should be able to explain the origin incident for every rule you consider deleting. If you can't — it's either too new to evaluate, or the person who knows why it exists needs to be in the room.

---

*Full pattern: pantheon/patterns/the-ratchet/pattern.md*
*Canonical practitioners: Taiichi Ohno (Toyota), John Boyd (OODA), Claude Shannon (Bell Labs)*
