---
name: federal-decentralization
description: Invoke when designing or diagnosing a multi-unit organization structure — teams, divisions, microservices, agents, or subsidiaries — where the tension is between central control (coherent strategy, no local initiative) and full autonomy (local initiative, no coordination or capital discipline). Trigger phrases: "how do we scale without micromanaging", "the teams aren't aligned", "division heads fighting each other", "centralized vs decentralized", "autonomous teams but still need control", "org design", or any situation where a multi-unit system needs both local initiative and organizational coherence.
---

# Federal Decentralization — Autonomy at the Edge, Control at the Capital

## When to Invoke

You're designing or diagnosing a multi-unit system — an organization, a microservice architecture, a multi-agent system, a holding structure — where both of these are true:
1. Units need local initiative to be effective (one-size-fits-all won't work)
2. Resources (capital, compute, headcount, attention) must be allocated rationally across units

Apply this pattern before designing the governance model, not after the units are already in conflict.

## Protocol

**Step 1 — DRAW THE AUTHORITY LINE**
Separate every decision type into two buckets. Write it down explicitly:
- **Unit authority:** operating decisions — product direction, engineering choices, hiring, process design, customer relationships, tactical priorities
- **Center authority:** capital decisions — budget allocation, investment approval above a threshold, resource reallocation across units, market territory assignment

If you cannot draw this line cleanly, the ambiguity will default to micromanagement. Resolve the ambiguity before deployment.

**Step 2 — STANDARDIZE THE SCORECARD, NOT THE METHOD**
Define the metrics every unit must report, in the same format, on the same interval. Do not standardize how they achieve those metrics. Examples:
- Corporate: "All divisions report ROI and contribution margin monthly in this template."
- Engineering: "All teams report cycle time, defect rate, and deployment frequency weekly."
- Multi-agent: "All agents log task completion rate, error rate, and token cost per task."

The center needs comparable data to allocate rationally. It does not need operational conformity.

**Step 3 — MAKE UNITS COMPETE FOR RESOURCES**
Run periodic resource allocation reviews. Units propose investments with projected return metrics. The center allocates based on projected performance, not politics, seniority, or relationship. Units that outperform attract more resources and grow. Units that underperform lose resources until they fix the problem or are restructured/exited.

**Step 4 — PROTECT THE SEAMS**
Define explicit, non-overlapping territory for each unit — market segment, customer type, product category, service domain. Cannibalization between units wastes resources and creates destructive internal competition. Sloan's price ladder is the template: each GM division owned a price band, and the bands were designed to upgrade customers from one division to the next without competing for the same buyer.

**Step 5 — HOLD THE LINE ON AUTONOMY**
When a unit makes an operating decision you disagree with: do not intervene unless it violates (a) the financial floor, (b) explicit written policy, or (c) ethical/legal constraints. If you override unit decisions for preference reasons, the units will learn that autonomy is theater and stop exercising initiative.

## Anti-Pattern

**Pseudo-decentralization:** Announcing unit autonomy while routing every significant decision through central approval. Recognition signs: approval thresholds are so low that units must escalate constantly; significant hires require corporate sign-off; division heads spend >30% of their time in alignment meetings with corporate functions. Result: bureaucratic overhead added to centralized decision-making, with no entrepreneurial benefit. The worst outcome: accountability also evaporates, because unit heads learn the center will override them anyway, so they stop owning results.

## Hard Rule

**The center controls capital, not operations.** If the center cannot enforce this line on itself — if it cannot resist intervening in operating decisions when it disagrees — the model collapses into either pseudo-decentralization or inconsistent mixed governance. The hard rule exists precisely because the temptation to intervene is always present and always feels justified.

## Applying in Software / AI Contexts

**Microservice architecture:** Each service team owns its implementation decisions (language, framework, data model). The platform team controls compute allocation, deployment gates, and cost thresholds. Services compete for infrastructure resources based on usage and SLA performance — not on internal politics.

**Multi-agent systems:** Each agent owns its task execution strategy. An orchestrator controls token budget allocation, task routing, and agent scaling. Agents that perform better on their task class receive more routing; agents that waste budget or fail tasks receive less. The orchestrator does not specify how agents implement solutions.

**Engineering team structure:** Each squad owns its service domain, technical decisions, and deployment cadence. Platform/infrastructure centrally controls compute allocation, security policy, and shared tooling. Squads report identical engineering metrics (deployment frequency, MTTR, error rate) to enable rational resource allocation decisions.

**Product division design:** Separate product lines each with their own PM, engineering, design, and GTM. Central product leadership controls roadmap prioritization (capital allocation) and market territory. Divisions report identical business metrics. No division can be given a resource allocation that starves another without an explicit trade-off decision at the center.

## The Sloan Proof

In 1921, Ford had 55% US auto market share. GM was near-bankrupt. Sloan implemented federal decentralization — five divisions, five price bands, full operational autonomy with centralized capital allocation. By 1927, GM surpassed Ford and never relinquished the lead. Ford's functionally centralized model could not field diverse products simultaneously. GM's federal structure could.

The key was not that any individual GM product was better than Ford's Model T. The structural advantage was that GM could evolve five products independently, in parallel, each adapting to its specific segment, while Ford's centralized model serialized all adaptation through Henry Ford's personal judgment.

## Reference

Canonical pattern: `patterns/federal-decentralization/pattern.md`
Origin: Alfred Sloan, "Organization Study" memo (1920) → formalized by Peter Drucker in "Concept of the Corporation" (1946)
Lineage: Hamilton federal treasury (1789) → Sloan GM divisional model (1920) → Welch GE business units (1981) → Buffett Berkshire subsidiaries (1965-present)
