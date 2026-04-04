---
description: Invoke when deciding what to build vs. delegate, identifying a moat, or when "own the whole stack" appears — checks whether the coordination layer has been claimed before building execution infrastructure
---

# Orchestration Layer

**The move:** Identify the coordination layer in the system, claim it explicitly, and route all execution outward to whoever absorbs it best.

**Trigger:** You are building or owning execution infrastructure — and haven't explicitly claimed the coordination layer above it.

---

## Protocol

1. **Draw the layers** — coordination (interfaces, relationships, routing, terms) vs. execution (making, delivering, fulfilling)
2. **Name the owner** — who holds the coordination layer right now? If unclear: it's unclaimed
3. **Audit your execution holdings** — for each: who absorbs this better? what does routing it free you to do?
4. **Claim first, route second** — own the client relationship and the interface before delegating execution
5. **Route one thing** — move at least one execution component outward before the next build cycle

**Anti-pattern:** Building execution so well that you become the execution layer — while someone else claims the coordination layer above you.

**Hard rule:** Never confuse proximity to execution with ownership of it.

---

## Historical Anchors

**Cosimo de' Medici (1397–1464)** — Built the dominant European financial network not by trading goods but by owning the correspondent routing layer between merchants across the continent.

**John D. Rockefeller (1872–1882)** — Abandoned ownership of oil wells to own pipelines and refineries — the coordination layer every independent driller had to pass through to reach any market.

**Marc Gallagher (2025–2026)** — Built Medvi to $401M revenue as a one-person operation by owning the patient relationship and routing all regulated execution to licensed operators. The first documented case of AI infrastructure reducing the cost of holding a coordination layer to near-zero.

---

*Full pattern and extended history: `patterns/orchestration-layer/pattern.md`*
