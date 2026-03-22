---
name: red-bead
description: Invoke when a defect, failure, or underperformance triggers an impulse to blame or retrain an individual — before statistical evidence determines whether the problem is systemic (common cause) or incident-specific (special cause). Trigger phrases: "who caused this", "we need to retrain X", "X keeps making mistakes", "how do we motivate the team to do better", or any performance management response that skips process analysis.
---

# Red Bead — System Before Worker

## When to Invoke

You're diagnosing a failure or defect. Someone (or something) is being blamed. The response is aimed at a person — retraining, discipline, incentives, replacement. Before proceeding, apply this pattern.

## Protocol

**Step 1 — COLLECT**
Gather time-series data on the failure rate or metric. A single incident is not evidence. Ask: how often has this happened over the last 20–30 occurrences? If no data exists, flag that the response is being designed without statistical grounding.

**Step 2 — CLASSIFY THE VARIATION**
- Is the defect rate *within* normal historical variation? → **Common cause** (systemic)
- Is this a distinct outlier, or is there an identifiable "something different" about this specific incident? → **Special cause** (assignable)

If you cannot answer this question from available data, say so explicitly. Operating without classification is the root of most quality management failure.

**Step 3 — INTERVENE AT THE RIGHT LEVEL**
- **Common cause** → change the system: the process design, the environment, the tooling, the specification, the workload. The individual cannot fix a common-cause problem by trying harder.
- **Special cause** → investigate the specific incident: what was different? Find and address the assignable cause.

**Step 4 — FLAG TAMPERING**
If someone proposes adjusting individual behavior, adding an approval gate, or running a training program in response to a common-cause problem: name it as tampering. Tampering adds variation and produces the illusion of action while making outcomes less predictable.

## Anti-Pattern

**Tampering**: Treating every defect as a special cause. Adjusting individual behavior, process parameters, or procedures in response to random variation within control limits. Each adjustment adds noise on top of noise. The classic version: ranking and firing the bottom 10% of performers in a stable system — the distribution immediately reconstitutes itself with the remaining people.

## The Principle

Deming's finding: **85–94% of quality problems are common cause** — built into the system by management decisions, not caused by individual worker failure. The Red Bead Experiment proves it: workers operating a defective process with maximum effort still produce defects at the rate the process dictates. Praise and punishment change nothing. Only changing the process changes the outcome.

## Applying in Software / AI Contexts

- **Incident retrospectives:** When an on-call engineer is blamed for a production incident — check whether the same failure mode has occurred before. If yes and it's within normal variation, it's a systemic design gap, not a human error.
- **Code review failures:** When a bug escapes review — ask whether review processes are designed to catch this class of bug, not whether the reviewer was attentive.
- **AI agent errors:** When an AI agent produces a wrong output — distinguish between common-cause (the prompt/system design produces this error at a predictable rate) and special-cause (something anomalous about this specific input). Common cause → fix the system prompt, the retrieval, the architecture. Special cause → investigate that input.
- **Test failure spikes:** Before adding more tests or tightening CI gates after a failure — determine whether the failure rate is within normal variation or a genuine signal that the system changed.

## Key Deming Quotes

- "Eighty-five percent of the reasons for failure are deficiencies in the systems and process rather than the employee. The role of management is to change the process rather than badgering individuals to do better."
- "A bad system will beat a good person every time."
- "You can not inspect quality into a product."

## Reference

Canonical pattern: `patterns/red-bead/pattern.md`
Origin: Walter Shewhart (Bell Labs, 1924) → W. Edwards Deming (Japan, 1950 onward)
