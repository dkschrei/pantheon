---
name: composition-trap
aliases: [keynes-move, paradox-of-thrift, aggregate-intervention, fallacy-of-composition, macro-rationality-gap]
domain: [decision-making, systems, economics, leadership, engineering]
trigger: [system stuck despite everyone acting rationally, aggregate outcome worsening while individuals optimize, "everyone doing the right thing", collective action problem, race to the bottom, bank run, austerity paradox, individually rational but collectively destructive]
practitioners:
  - name: John Maynard Keynes
    era: 1883-1946
    application: Identified that individually rational thrift during recessions creates aggregate demand collapse; designed fiscal intervention at the national level to substitute for missing private demand — founding macroeconomics as a distinct discipline
events:
  - name: The General Theory of Employment, Interest and Money
    year: 1936
    gem-role: applied — Classical economics held that recessions self-correct as wages fall until markets clear. Keynes showed this reasoning commits a composition error: when all workers accept lower wages simultaneously, total purchasing power falls proportionally, demand collapses further, and the equilibrium locks at mass unemployment. The fix was not to fix individual wages but to inject aggregate demand via government spending — intervening at the level where the failure actually lived.
  - name: Bretton Woods Conference
    year: 1944
    gem-role: applied — Keynes proposed an International Clearing Union to address global trade imbalances. His diagnosis: each nation rationally trying to run a trade surplus creates a collective deflationary spiral (all cannot simultaneously export more than they import). His intervention was structural — an international institution with penalties on surplus nations, operating at the aggregate level of the world economy, not pressuring individual countries one at a time.
  - name: The Paradox of Thrift in the Great Depression
    year: 1929-1933
    gem-role: applied — As the Depression deepened, each household and firm rationally cut spending and hoarded cash. This was individually prudent. Collectively, it destroyed aggregate demand and deepened the contraction. Keynes diagnosed this as the trap; Roosevelt's New Deal spending programs (FERA, PWA, WPA) were the aggregate-level intervention that partially broke it.
  - name: European Austerity After 2008
    year: 2010-2013
    gem-role: violated — When the eurozone crisis hit, creditors demanded austerity from debtor nations simultaneously. Each nation cutting spending looked individually responsible. Collectively, it contracted aggregate demand across the eurozone, prolonged recession, and increased debt-to-GDP ratios — the exact composition trap Keynes had diagnosed. Nations that violated the protocol (UK, US under Obama) recovered faster than those that applied it.
lineage: Mandeville-private-vice-public-virtue (1714) → Malthus-general-glut (1820) → Marx-overproduction (1867) → Keynes-aggregate-demand (1936) → Minsky-financial-instability (1975) → Bernanke-helicopter-money (2002)
origin-earliest: Mandeville-1714
origin-modern: Keynes-1936
origin-type: historian
---

# Composition Trap

## Protocol  ← TLDR zone (always at the top)

**Trigger:** A system is stuck or declining even though every individual actor is behaving rationally. The more each agent optimizes for their own position, the worse the aggregate outcome becomes.

**Steps:**
1. **Name the individual-rational move.** What is every actor doing that looks correct at the individual level? (Saving, cutting costs, hoarding cash, running a trade surplus, laying off workers.) Confirm it is genuinely rational for each actor in isolation.
2. **Model the aggregate.** Ask: what happens when ALL actors do this simultaneously? Run the logic at the level of the whole system. Where does the sum of individually rational moves produce a collective outcome that no individual intended or wanted?
3. **Find the divergence point.** Identify the exact mechanism by which the aggregate fails. This is not "everyone is greedy" — it is a structural property of how the system aggregates. Name it precisely: aggregate demand collapses, credit dries up, the arms race accelerates, the commons is depleted.
4. **Design at the aggregate level.** The intervention must operate at the level where the failure lives — not by persuading or constraining individual actors (they are already acting rationally) but by changing the aggregate condition directly. What can inject demand, restore coordination, or change the structural incentive that makes the trap self-reinforcing?
5. **Verify the intervention does not recreate the trap one level up.** If your fix requires all nations, firms, or agents to cooperate simultaneously, you have created a composition trap at the next level. Design for unilateral sufficiency or build the coordination mechanism into the intervention itself.

**Anti-pattern:** Treating a composition trap as a moral failure of individuals. When "everyone doing the right thing" creates collective disaster, the problem is structural — not individual virtue or vice. Telling individuals to spend more, save less, or trust more cannot fix a system-level failure. The intervention that fails: targeting individuals when the mechanism operates at the aggregate.

**Hard rule:** Never design the aggregate-level fix by scaling up the individual-level fix. A recession is not fixed by telling households to spend — it requires spending at the aggregate level. A tragedy of the commons is not fixed by telling each person to consume less — it requires changing the commons structure.

---

## The Book  ← depth zone (always at the bottom)

### The Pattern

Keynes's defining move, repeated across his career: he identified situations where classical economics reasoned from the individual to the aggregate by simple addition — assuming that what is rational for one actor is rational for all, and that aggregate outcomes are just scaled-up versions of individual outcomes. He showed this commits the fallacy of composition. Thrift is a virtue for the individual and a poison for the economy when universalized. Wage flexibility clears a single labor market and locks the whole economy at unemployment when applied everywhere. His response was not to change individual behavior but to design institutions and policies that operated directly at the aggregate level, compensating for what individual rationality could not produce collectively.

### Protocol (extended)

**Step 1 — Name the individual-rational move.**
Composition traps are invisible until named. The first step is identifying the specific individually-rational behavior that, when generalized, produces system failure. It helps to use the form: "It is rational for [actor type] to [behavior] because [individual reason]." If this statement is true, you may have a composition trap. If the individual reason would not survive if all actors did it simultaneously, you have confirmed one.

**Step 2 — Model the aggregate.**
Run the logic to scale. A thought experiment: if every actor of this type adopts this behavior at the same time, what changes? Identify the feedback loops. Usually the composition trap has a self-reinforcing mechanism: each actor cutting spending reduces income for all other actors, which makes cutting spending more rational for each, which reduces income further. Map the loop explicitly.

**Step 3 — Find the divergence point.**
The divergence is the structural feature that makes individual and aggregate rationality point in opposite directions. Common types:
- **Demand failure**: Spending creates income for others; saving destroys it. What is individually prudent is collectively deflationary.
- **Coordination failure**: An outcome is available that all would prefer, but getting there requires simultaneous action that no individual has incentive to take first.
- **Commons depletion**: Each extraction from a shared resource is individually rational; collective extraction destroys the resource.
- **Arms race**: Each defensive investment forces others to invest, returning everyone to the same relative position at higher cost.
Naming the divergence type points to the class of intervention that works.

**Step 4 — Design at the aggregate level.**
The aggregate-level intervention does not rely on changing individual preferences or persuading individual actors. It changes the structure of the aggregate itself:
- **Fiscal injection**: Government spending directly adds to aggregate demand without requiring individual actors to change behavior.
- **Coordination mechanism**: An institution (central bank, international clearinghouse, commons governance body) that solves the simultaneity problem.
- **Structural change**: Redesigning the system so that individual-rational behavior no longer produces aggregate failure (cap-and-trade converts commons depletion into a market, aligning incentives).

**Step 5 — Verify the fix.**
Ask: does this intervention itself depend on a composition trap being avoided? If all nations must simultaneously adopt the fix, it recreates the problem. Design for unilateral sufficiency where possible. Where multilateral action is required, build the coordination mechanism in.

### Anti-Pattern (extended)

**The moral fallacy:** The most common failure is diagnosing a composition trap as a failure of individual virtue. In the 1930s, opponents of stimulus argued that the Depression was caused by profligacy, and that fiscal discipline (individual virtue) would restore confidence. It did the opposite — fiscal contraction at the aggregate level deepened the demand collapse. The same error recurred in 2010–2013 European austerity: individually responsible fiscal restraint, collectively contractionary. The diagnostic is the irony: the harder individuals try to do the "right" thing, the worse the aggregate becomes. This is not a moral signal. It is a structural alarm.

**The scaling fallacy:** Taking the individual-level fix and applying it universally. If one firm cuts costs and gains market share, the prescription is: all firms should cut costs. When all firms cut costs simultaneously, aggregate demand collapses and everyone loses market share. The individual-level prescription inverts at scale. Beware any policy recommendation that says "we need everyone to [individually sensible action]" without modeling what happens when they all do it.

### Examples

**The Paradox of Thrift (canonical):**
A household facing uncertainty rationally increases savings. When every household increases savings simultaneously, total spending falls, GDP contracts, incomes fall, and savings rates — as a fraction of a smaller income base — may not even improve. The prudent household has been made poorer by the prudence of all other households. Keynes's fix: government must dis-save (spend) when private agents save, maintaining aggregate demand directly.

**Bank runs:**
Each depositor rationally withdraws when they suspect the bank may fail. When all depositors withdraw simultaneously, the bank fails — whether or not it was solvent before the run. The individual-rational move creates the outcome it feared. Fix: deposit insurance changes the aggregate-level payoff structure, making the run no longer individually rational.

**Eurozone austerity 2010–2013:**
The IMF's standard prescription for an indebted nation (cut spending, restore fiscal balance) is individually sound. Applied simultaneously to Greece, Portugal, Spain, Ireland, and Italy — while Germany also ran fiscal surpluses — it contracted aggregate eurozone demand precisely when private demand had collapsed. GDP fell further in the countries that applied the prescription most stringently. The composition trap operated at the continental level.

**Traffic and induced demand:**
Each driver rationally takes a highway that reduces their individual commute. New highways induce new trips; aggregate congestion returns to the original level or worsens. Each improvement at the individual level is neutralized by the aggregate response. Fix must operate at the aggregate level: congestion pricing, mass transit investment that changes the aggregate distribution of transport choices.

### Practitioners

**John Maynard Keynes (1883–1946):** Applied the pattern across economic theory, wartime finance, and international monetary design. The General Theory (1936) is the canonical application: a book-length demonstration that classical economists committed the composition fallacy in their unemployment theory, followed by a systematic redesign at the aggregate level. At Bretton Woods (1944), Keynes designed the International Clearing Union to prevent nations from simultaneously running trade surpluses — an international institution to break what would otherwise be a composition trap at the level of the world economy.

### Historical Events

**The General Theory (1936):** Keynes's diagnosis of the Great Depression as a composition trap — individually rational thrift and wage flexibility creating aggregate demand failure — redirected economics for a generation. The policy prescription (fiscal stimulus) operated at the aggregate level, not by changing individual behavior. Countries that applied it (US New Deal, post-WWII full-employment policies) outperformed those that applied the classical individual-level prescription (austerity).

**Bretton Woods (1944):** Keynes proposed a supranational clearinghouse with automatic penalties on trade surplus nations. His model showed that individually rational national trade protection creates a global contraction trap — no nation has incentive to liberalize unilaterally. The clearinghouse mechanism was the aggregate-level coordination structure that would solve what bilateral negotiations could never solve. Keynes lost the negotiation to Harry Dexter White; the weaker IMF structure that resulted did not include surplus penalties — and the global trade imbalances Keynes predicted duly materialized.

**European Sovereign Debt Crisis (2010–2013):** A textbook violation. The Troika (EU, ECB, IMF) imposed simultaneous austerity on Southern European economies. Each nation cutting its deficit was individually rational and contractually required. The aggregate effect — synchronized fiscal contraction across the eurozone at the depth of a demand recession — deepened the crisis. Nations that violated the protocol (UK, which retained monetary sovereignty) recovered faster despite higher debt loads.

### Lineage

Bernard Mandeville (1714) first described the paradox that private vice (spending, luxury) produces public virtue (employment, trade) — an early composition inversion, though he lacked the analytical machinery to convert it into policy. Malthus (1820) argued for the possibility of a "general glut" — aggregate demand falling below supply — against Ricardo's dismissal; he was correct but could not formalize it. Marx (1867) identified overproduction and underconsumption as structural features of capitalism, with the right diagnosis but a different intervention. Keynes (1936) formalized the mechanism, named the failure (aggregate demand deficiency), and designed the policy instrument (fiscal multiplier). Minsky (1975) extended the pattern to financial systems: individually rational lending cycles create aggregate fragility that collapses catastrophically. Bernanke (2002, 2008) operationalized the aggregate-level fix at the central bank level — "helicopter money" and quantitative easing as direct aggregate demand interventions when individual actors freeze.

### Origin

The fallacy of composition — the error of assuming what is true of the parts is true of the whole — was named by Aristotle but had been committed by economists for 150 years before Keynes. Classical economics built its macro theory by scaling up micro theory: if a single worker accepts a lower wage and gets a job, then all workers accepting lower wages will get jobs. Keynes showed this fails because wages are also income: when all wages fall, purchasing power falls, goods go unsold, and firms hire fewer workers despite lower wages — not more.

What made Keynes's move distinctive was not the diagnosis alone but the policy design that followed from it. Once the problem was located at the aggregate level, the fix had to operate there. This led directly to the fiscal multiplier — the mechanism by which government spending at the aggregate level compensates for the demand that individually-rational private saving withdraws. Keynes designed an intervention architecture, not just a critique.
