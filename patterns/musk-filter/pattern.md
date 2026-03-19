---
name: musk-filter
aliases: [pre-build-gate, elon-filter, 5-step-algorithm, question-delete-simplify]
domain: [engineering, decision-making, process-design, product-management]
trigger: [build request, "let's add", "we should create", automation proposal, scope creep, planning phase, before first line of code]
practitioners:
  - name: Elon Musk
    era: 2002-present
    application: SpaceX rocket cost reduction, Tesla Gigafactory design, Boring Company tunneling
  - name: Henry Ford
    era: 1908-1927
    application: Model T production — systematically eliminated steps to hit $290 price point (from $825 at launch)
  - name: Taiichi Ohno
    era: 1950-1990
    application: Toyota muda elimination — remove waste before optimizing remaining steps
events:
  - name: SpaceX Falcon 9 cost reduction
    year: 2002-2010
    gem-role: applied — Musk decomposed rocket costs to raw materials, eliminated 90% of assumed requirements; cost per kg to orbit dropped 10x
  - name: Karpathy loop incident
    year: 2026
    gem-role: violated — agent applied loop automation (Step 5) without questioning whether the loop should exist (Step 1); result: token burn, no improvement
  - name: Ford Model T price reduction
    year: 1908-1916
    gem-role: applied — eliminated every non-essential manufacturing step until Model T reached $290
lineage: aristotle-analytics-350bc → descartes-systematic-doubt-1637 → ford-waste-elimination-1908 → ohno-muda-1950 → musk-filter-2002
origin-earliest: aristotle-350bc
origin-modern: musk-2002
---

# Elon Musk — Musk Filter (Pre-Build Gate)

## Protocol  ← TLDR zone (always at the top)

**Trigger:** Any proposal to build, create, add, or automate — before the first line of code is written

**Steps:**
1. QUESTION IT — who specifically requires this, and what breaks if it doesn't exist? If unclear: kill it
2. DELETE IT — remove at least 30% of the proposed scope; if nothing was deleted, look harder
3. SIMPLIFY — tighten what remains; one way to do it, not three
4. ACCELERATE — find the fastest path through the simplified scope
5. AUTOMATE — only now; automation of a broken process = faster broken process

**Anti-pattern:** Starting with automation (Step 5) before questioning whether the thing should exist (Step 1)

**Hard rule:** Never jump to Step 5 without completing Steps 1-4. Block execution if this rule is violated.

---

## The Book  ← depth zone (always at the bottom)

### The Pattern

Elon Musk's 5-step engineering algorithm for eliminating bureaucracy and building lean systems: **Question → Delete → Simplify → Accelerate → Automate** — in that exact order, never skipped. The fatal mistake of engineers is jumping to Step 5 (automate) before completing Steps 1-2. Automation of a broken process creates a faster broken process. The order is mandatory.

### Protocol (extended)

Run these steps sequentially. Do not proceed to the next step until the current one is complete.

**Step 1 — QUESTION IT**
- Who specifically requires this? (Name or role, not "users" or "the team")
- What breaks if this doesn't exist?
- If you cannot answer both questions clearly: kill it. Do not proceed.

**Step 2 — DELETE IT**
- What can be removed entirely from the proposed scope?
- Target: delete at least 30% of what was originally proposed
- Apply to: steps, rules, files, agents, integrations, acceptance criteria, any requirement
- If you haven't deleted anything, you didn't look hard enough
- "We might need it later" is not a reason to keep it

**Step 3 — SIMPLIFY**
- Only runs after Steps 1 and 2 are complete
- Simplify what remains — tighten language, reduce dependencies, remove optionality
- Never optimize something that shouldn't exist (that's Step 2's job)

**Step 4 — ACCELERATE**
- Only runs after Steps 1, 2, and 3 are complete
- Find the fastest path through the simplified scope
- Speed up the lean version, not the original bloated one

**Step 5 — AUTOMATE**
- Only runs after Steps 1, 2, 3, and 4 are complete
- Automation of a broken or unproven process = faster broken process
- Automate only what has been proven lean and correct by the previous steps

### Anti-Pattern (extended)

Starting with automation (Step 5) before questioning whether the thing should exist (Step 1). A process exists, someone proposes automating it, everyone agrees because automation sounds like progress, the automated version ships — and now you have a faster version of a process that shouldn't have existed.

Other violations:
- Optimizing (Step 3) before deleting dead weight (Step 2)
- Speeding up (Step 4) a process that hasn't been simplified (Step 3)
- Treating "we've always done it this way" as an answer to Step 1
- Adding features because they seem useful rather than because someone specifically needs them

### Examples

**Classic violation — Karpathy loop incident:** An agent was asked to run a loop to improve conventions.md. The loop (Step 5: automate) was applied before anyone questioned whether the loop was the right tool (Step 1), or pruned the file first (Step 2). Result: token burn, circular output, no real improvement. The Musk Filter would have killed the loop at Step 1.

**Classic violation — Nick vs Nick-v2 confusion:** An agent tried to optimize (Step 3) an existing conventions file when the real fix was deleting and restructuring ambiguous rules (Step 2). Wrong step, wrong order.

**Correct application:** Someone proposes "Let's build an automated reporting dashboard." Step 1: "Who specifically needs this? What breaks without it?" — no clear answer. Kill it. Two weeks of engineering saved.

### Practitioners

**Elon Musk (1971–present)**
Described the 5-step algorithm in a 2021 presentation and Walter Isaacson's 2023 biography. Emerged from SpaceX experience: engineers consistently jumped to optimization (Step 3) and automation (Step 5) without questioning requirements (Step 1). "Requirements are definitely dumb. It doesn't matter who gave them to you."

**Henry Ford (1863–1947)**
Model T launched at $825 in 1908. By 1916: $290. Ford achieved this by eliminating manufacturing steps — not optimizing the existing process. He questioned every requirement before touching the line. Delete before optimize.

**Taiichi Ohno (1912–1990)**
Formalized waste elimination as *muda* (無駄) in the Toyota Production System. Seven types of waste must be eliminated before any optimization is applied. Direct ancestor of the Musk Filter.

### Historical Events

**SpaceX Falcon 9 (2002–2010)**
Musk decomposed rocket costs to raw materials: raw materials cost 2% of typical aerospace price. Result: cost per kg to orbit from ~$54,000 (Space Shuttle) to ~$2,720 (Falcon 9).

**Karpathy Loop Incident (2026)**
A Nexus agent was asked to run a loop to improve conventions.md. Loop automation (Step 5) applied before questioning whether the loop was the right tool (Step 1) or pruning the file first (Step 2). Token burn, circular output, no real improvement. The canonical modern example of Step 5 before Step 1.

### Lineage

Aristotle's *Posterior Analytics* (350 BC, question assumptions) → Descartes' *Meditations* (1637, systematic doubt before building) → Taylor's Scientific Management (1911, eliminate wasted motion) → Ford waste elimination (1908-1916) → Ohno muda (1950s) → Lean Manufacturing (1990s) → Musk Filter (2002-present)

### Origin

Elon Musk described this 5-step algorithm in a 2021 interview and Walter Isaacson's 2023 biography as his core engineering philosophy, first developed at SpaceX for rocket manufacturing and later applied to Tesla production lines and software systems.

His framing: "The first step is to make the requirements less dumb. The requirements are definitely dumb; it doesn't matter who gave them to you. Step two is try very hard to delete the part or process. Step three is simplify or optimize. Step four is accelerate the cycle time. Step five is automate."

He noted the most common error among smart engineers: "It is a mistaken assumption to automate things that should just not exist."
