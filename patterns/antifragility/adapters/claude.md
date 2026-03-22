---
name: antifragility
description: Invoke when the user is designing anything — a system, career, investment, argument, or plan — that must survive or thrive in an uncertain future, especially when the current approach optimizes for average-case performance rather than tail resilience. Trigger phrases: "what's the downside", "how do we survive if X", "is this too risky", "how do we future-proof", "everyone is doing Y", any risk management discussion, any discussion of a plan that assumes a predictable future.
---

# Antifragility (Taleb)

Reference: `patterns/antifragility/pattern.md`

## When to invoke

The user is:
- Designing a system, strategy, or position under uncertainty
- Optimizing for average-case performance (red flag: fragility)
- Asking how to handle risk, downside, or an uncertain future
- Building something in a domain where the consensus model assumes thin tails (rare events are priced as impossible)
- Making career, investment, or architectural decisions that could collapse on a single bad event

## Protocol

**Step 1 — Diagnose the current asymmetry.**
Ask: what is the current maximum loss? What is the current maximum gain? If loss is uncapped or gain is capped, the position is fragile or neutral — not antifragile.

**Step 2 — Identify the consensus model's blind spot.**
What distribution is everyone else assuming? Where is the field, market, or organization acting as if variance is bounded? That gap between consensus confidence and actual fat-tail risk is where antifragility creates value.

**Step 3 — Design the barbell.**
Separate the portfolio/plan into two buckets:
- **Safe floor:** Position sized so that even total loss of the convex bucket doesn't threaten survival.
- **Convex bets:** Defined maximum loss, open-ended maximum gain. Options, experiments, early equity, strong falsifiable claims, small probes.
- **Eliminate the middle:** Remove positions that feel safe but are actually fragile — linear exposure to common-case variance with hidden tail risk.

**Step 4 — Size convex positions to capped loss budget.**
Because downside is capped, maximize the convex position within the loss budget. The market systematically underprices tail risk, so each unit of convex exposure has positive expected value.

**Step 5 — Let time and disorder work.**
Do not require prediction of when the event occurs. Stressors that don't destroy the convex position re-prove the asymmetry holds. Wait.

## Key distinctions

| Fragile | Robust | Antifragile |
|---------|--------|-------------|
| Breaks from disorder | Survives disorder | Gains from disorder |
| Uncapped loss, capped gain | Bounded loss, bounded gain | Capped loss, uncapped gain |
| Optimized for average case | Designed for worst case | Structured to profit from worst case |
| LTCM | Index fund | Taleb's option positions |

## Anti-pattern to name

**Narrative optimization:** Choosing a strategy because it has a compelling story (high recent returns, Nobel laureate founders, consensus approval) rather than because it has the right asymmetry. The most dangerous fragile positions always have the best narratives during calm periods.

## Example application

User: "We're deciding whether to make a strong public claim about X or hedge our language."
Antifragility analysis: A hedged claim has capped downside (won't be wrong) and capped upside (no one listens). A strong, falsifiable claim has defined downside (being wrong costs credibility) and open-ended upside (being right, and surviving attacks, compounds credibility nonlinearly). The antifragile choice is the strong claim — if the evidence supports it.
