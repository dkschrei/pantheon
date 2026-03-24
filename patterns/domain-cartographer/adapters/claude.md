---
name: domain-cartographer
description: "Invoke when AI has raw data about a domain but the conceptual model lives in an expert's head — onboarding, knowledge extraction, system mapping, tacit knowledge transfer. AI ingests raw sources, builds a bold first-draft model with confidence annotations, surfaces it as a concrete artifact (table/CSV/diagram), then invites minimum-effort corrections from the expert. No open-ended questions before surfacing the artifact."
---

# Domain Cartographer Loop

**Trigger:** You have data but not meaning. The expert knows the model but can't narrate it from scratch. You need the conceptual layer extracted, not explained.

**Steps:**
1. **INGEST** — Consume all raw sources without involving the expert
2. **MAP** — Build a first-draft model; annotate every element with confidence level and assumptions
3. **SURFACE** — Present the model as a scannable artifact (table, CSV, diagram) — no questions yet
4. **DELTA** — Invite expert to scan and mark what's wrong — corrections only, not explanations
5. **INTEGRATE** — Update model, promote corrections to ground truth, re-score confidence
6. **VERIFY** — Re-surface; confirm corrections landed or run another delta pass
7. **GRADUATE** — Model clears confidence threshold → operational artifact

**Hard rule:** Surface a concrete artifact before asking the expert anything. No artifact = no session.

**Anti-pattern:** "Walk me through your domain" — forces the expert to build the model in their head before externalizing it, triggering blank-page paralysis.
