---
name: composition-trap
description: Invoke when a system is failing despite all individuals acting rationally — when "everyone doing the right thing" is making the collective outcome worse. Trigger phrases: "everyone is cutting costs", "the market won't recover on its own", "race to the bottom", "collective action problem", "bank run", "austerity", "tragedy of the commons", individual-rational behavior producing aggregate failure.
---

# Composition Trap (Keynes)

Reference: `patterns/composition-trap/pattern.md`

## When to invoke

The user is facing:
- A system declining even though each actor is behaving rationally
- A collective action problem where individual optimization makes the aggregate worse
- A policy or intervention debate where the "sensible" individual-level fix keeps failing at scale
- A race to the bottom, bank run, commons depletion, or austerity paradox
- Any situation where "if everyone does the right thing" leads to collective disaster

## Protocol

**Step 1 — Name the individual-rational move.**
State explicitly: "It is rational for [actor] to [behavior] because [individual reason]." Confirm this is true in isolation. Then ask: what happens when ALL actors of this type do this simultaneously?

**Step 2 — Model the aggregate.**
Run the individual logic to full scale. Where does the sum of rational individual moves produce an outcome no individual intended? Map the self-reinforcing loop:
- Saving → less spending → less income → more saving (demand collapse)
- Withdrawal → bank failure → more withdrawal (bank run)
- Cutting costs → lower aggregate demand → lower revenue → more cost cuts (deflationary spiral)

**Step 3 — Find the divergence point.**
Name the structural mechanism:
- **Demand failure** — spending creates income for others; withholding destroys it
- **Coordination failure** — mutual gain exists but no one has incentive to move first
- **Commons depletion** — shared resource destroyed by individually rational extraction
- **Arms race** — defensive moves by all return everyone to parity at higher cost

**Step 4 — Design at the aggregate level.**
The intervention must NOT try to change individual behavior (individuals are already acting rationally). It must change the aggregate condition directly:
- Inject what individuals are rationally withholding (fiscal spending, liquidity, coordination)
- Change the structure so that individual rationality no longer produces aggregate failure
- Build the coordination mechanism so simultaneous action is no longer required

**Step 5 — Verify the fix doesn't recreate the trap one level up.**
If your fix requires all actors to cooperate simultaneously, you've moved the composition trap up one level. Design for unilateral sufficiency or embed the coordination structure in the intervention.

## Diagnostic questions

When analyzing a system failure, ask:
- Is each actor doing what seems rational for their own situation? If yes → possible composition trap
- Does the collective outcome worsen as more actors adopt the "rational" behavior? If yes → confirmed composition trap
- Would persuading individuals to behave differently fix it? If no → the fix must be structural/aggregate

## Anti-pattern to name

**The moral fallacy:** Diagnosing a composition trap as individual failure and prescribing individual virtue. The more individuals try to do the "right thing," the worse the aggregate becomes — this is not a moral signal, it is a structural alarm. The prescription that fails: "everyone needs to [individually sensible behavior]" without modeling the aggregate effect.

## Key distinction from related patterns

| Pattern | What it addresses |
|---------|-------------------|
| Composition Trap | Individual rationality → aggregate failure; fix is at aggregate level |
| Antifragility | Designing for tail events; fix is in position structure |
| Copernican Inversion | Deadlocked debate; fix is inverting the question |
| Falsification | Theory too comfortable; fix is designing to be wrong |

## Example application

User: "We're debating whether to cut spending company-wide to survive this downturn."

Composition trap analysis: Cutting spending is individually rational for each division. If all divisions cut simultaneously, the company's aggregate revenue-generating capacity (headcount, products, customer relationships) contracts faster than costs. The composition trap fires at the firm level. Apply the protocol: identify which spending is aggregate-demand-generating (sales, product development) vs. genuinely removable overhead. Protect the former — cutting it triggers the internal version of deflationary spiral. The fix is structural (identify the minimal viable aggregate demand floor to maintain), not uniform cuts.
