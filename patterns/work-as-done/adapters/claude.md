---
name: work-as-done
description: Invoke before designing against, extending, optimising, or explaining any documented process — a workflow diagram, board columns, a state list, a written procedure, a lane config, or a stage model. Also invoke when anyone asserts "that's how it works here", when a process definition is about to be turned into code or agent instructions, or when asked why a system's real behaviour does not match its documentation. Rebuilds the path work actually took from artifacts, then subtracts the documented steps the evidence never touched.
---

# Work-as-Done Protocol

A documented process is about to be trusted. It is a hypothesis until traced. Invoking work-as-done.

## What happens now

1. **Do not open the process documentation.** Not the diagram, not the state list, not the board columns. If it has already been seen in this session, say so explicitly and record every subsequent conclusion as compromised. It is the thing under test; it cannot also be the ruler.

2. **Count the evidence first.** Enumerate units of work that genuinely finished, each with a citable artifact — a commit, a merged change, a closed record, an incident write-up, a dated log row. **Fewer than five: stop and report that.** State exactly what evidence exists and what is missing. Do not map from imagination.

3. **Trace five to ten backwards**, finished → origin. Bias toward variety. **Include at least one that failed, stalled, or was reverted.** For each: how it entered, its outcome, every state it sat in with a citation, and every detour — loops back, re-opens, hand-backs, reclassifications.

4. **Flatten into one row per observed hop:** from, to, what triggered it, who or what decided, instance count, citation. **A hop with no artifact is written down as fiction and excluded.** Report how many triggers could not be stated in one sentence and how many deciders are unclear.

5. **Cluster under the three-instance rule.** Three or more independent instances → it is in the map. One or two → it is a permanent exception with its own section, and it is never promoted to make the map tidy. Loops in two or more traces are structural, not anomalies.

6. **Now open the documentation.** Produce four lists: steps with zero traced instances (count the lines deleting each would remove), things observed but absent from the implementation, things drawn as stages that the evidence says are exceptions, and paths the code permits that nothing ever took.

7. **Score it.** Write five pieces of work that have not yet entered the system. Predict from the map alone where each enters and what happens first. Any hesitation marks a gap — name it explicitly. **Five out of five, or report the map incomplete. Do not round up.**

8. **Deliver deletions, not lessons.** The output is a list of things to remove, a list of gaps, and a score. If it reads as a retrospective, it has failed.

---

## What NOT to do

- Do not read the lane config, state list, or diagram before step 6 — and if it was already read, disclose it rather than claiming a clean pass
- Do not infer a transition because it is obvious or because the diagram implies it; cite it or mark it fiction
- Do not backfill records describing old work to reach the five-item threshold — harvest existing artifacts, never author history
- Do not promote a one-off into a stage because the map looks lopsided
- Do not round a 4/5 prediction score up to a pass
- Do not propose new tooling; a needed tool is reported as a finding, not built

## The boundary against ohno-circle

`ohno-circle` requires a system running in front of you. **You cannot stand in a chalk circle around the past.** Live system → `ohno-circle`. Finished work → this.

Canonical source of truth: `patterns/work-as-done/pattern.md`.
