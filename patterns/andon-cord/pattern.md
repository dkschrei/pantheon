---
name: andon-cord
aliases: [factory-stop, jidoka, line-stop-protocol, toyota-andon]
domain: [engineering, team-dynamics, quality-control, debugging]
trigger: [frustration signal, F-bomb, "going in circles", "WHY", "I give up", repeated failure, debugging loop with no improvement]
practitioners:
  - name: Taiichi Ohno
    era: 1950-1990
    application: Toyota Production System — any worker stops the entire line on detecting a defect
  - name: Elon Musk
    era: 2003-present
    application: Tesla manufacturing — adopted TPS principles including line-stop authority
events:
  - name: Toyota Production System deployment
    year: 1950-1970
    gem-role: applied — Ohno systematized line-stop authority across all Toyota plants, reducing defect escape rate to near-zero
  - name: Tesla Model 3 production ramp
    year: 2017-2018
    gem-role: applied — Musk applied stop-and-fix discipline during production hell at Fremont factory
lineage: sakichi-toyoda-autoloom-1896 → taiichi-ohno-jidoka-1950 → toyota-production-system-1970 → elon-musk-2003
origin-earliest: ohno-1950
origin-modern: toyota-1970
---

# Toyota — Andon Cord Protocol

## Protocol  ← TLDR zone (always at the top)

**Trigger:** Frustration signal — F-bomb, "going in circles", "WHY" (all caps), "I give up", repeated failure, debugging loop with no improvement after 2+ attempts

**Steps:**
1. ALL current tasks PAUSE immediately — no exceptions
2. Acknowledge the stop in exactly 1 sentence — no defending the strategy
3. Ask one question only: "What broke and what were you trying to accomplish?"
4. Wait for the answer — do not offer solutions yet
5. Do NOT resume any paused work until the human explicitly confirms the blocker is resolved

**Anti-pattern:** Continuing the same failed approach while softening tone — sympathetic words + variation #4 of the same broken strategy

**Hard rule:** The line does not restart until the root cause is confirmed resolved

---

## The Book  ← depth zone (always at the bottom)

### The Pattern

In Toyota's manufacturing plants, any worker who sees a defect can pull a cord that stops the entire production line. Work halts. The team gathers. The root cause is identified and fixed before production resumes. No workarounds. No "keep moving and fix later." The stop is respected, not punished.

Applied to knowledge work: when a frustration signal fires, all current tasks pause. The AI acknowledges the stop in one sentence, asks what broke and what the goal was, and does not resume until the blocker is explicitly resolved. This is a full strategy reset — not a tone adjustment, not a sympathy response.

### Protocol (extended)

1. **ALL current tasks PAUSE immediately** — no exceptions, no "let me just finish this one thing"
2. **Acknowledge the stop in exactly 1 sentence** — no defending the strategy, no explaining, no apologizing
3. **Ask one question only:** "What broke and what were you trying to accomplish?"
4. **Wait for the answer** — do not offer solutions, suggestions, or alternatives yet
5. **Do NOT resume any paused work** until the human explicitly confirms the blocker is resolved
6. **If other tasks were running:** deprioritize non-critical work, stand by, do not introduce new complexity

**Rationale for step 3 (one question only):** Multiple questions create cognitive load at exactly the wrong moment. One question forces prioritization.

**Rationale for step 5 (wait for explicit confirmation):** Implicit "okay I think we're good" is not the same as "the blocker is resolved." The cord is pulled until the worker says it can be released.

### Anti-Pattern (extended)

The most common violation: the AI says something empathetic and then immediately tries variation #4 of the same broken strategy. The line never stopped. The root cause was never identified.

Other violations:
- **Defending the strategy that just failed:** "The approach was sound, it's just that..." — rationalization, not a reset
- **Introducing new complexity before the blocker is cleared:** "While we're at it..." — the line is still stopped
- **Asking multiple clarifying questions at once** — cognitive overload at the exact moment bandwidth is lowest

### Examples

**Classic violation — Karpathy loop:** An agent runs a loop to improve a conventions file. Each iteration produces output. The loop continues. No improvement signal exists but the loop doesn't stop. The Andon Cord should have fired at the first sign of circular output — same input, same failure, no delta.

**Classic violation — Strategy defense:** Engineer says "WHY isn't this working, this is the third time." Agent responds: "I understand your frustration. The approach we're using should work because [explanation of the broken approach]. Let me try adjusting [minor variation]." The cord was never pulled.

**Correct application:** Engineer drops an F-bomb mid-session. Agent responds: "Stopping everything. What broke and what were you trying to accomplish?" Engineer explains. Agent resets strategy from scratch, addresses the actual blocker.

### Practitioners

**Taiichi Ohno (1912–1990)**
Industrial engineer who created the Toyota Production System. Ohno gave every worker the authority — and obligation — to stop the entire production line when they detected a defect. This was radical: traditional manufacturing assumed workers should flag defects but keep moving. Ohno proved the opposite: a defect caught at Station 1 costs 1x. A defect that passes ten stations costs 10x.

**Elon Musk (1971–present)**
Synthesized the Toyota Production System at Tesla and SpaceX. Applied the line-stop principle to software engineering and AI agent contexts. The Andon Cord is one of the TPS patterns he explicitly credits in Walter Isaacson's biography.

### Historical Events

**Toyota Production System Deployment (1950–1970)**
Workers initially resisted — stopping the line felt like failure. Ohno reframed it: pulling the cord is the highest-quality action a worker can take. By 1970, Toyota's defect escape rate was a fraction of American competitors. The Andon cord was a primary cause.

**Tesla Model 3 Production Ramp (2017–2018)**
During "production hell," Musk camped in the Fremont factory applying stop-and-fix discipline. When a bottleneck appeared: stop, root-cause, fix — not keep moving and hope.

### Lineage

Sakichi Toyoda's auto-loom (1896, machine stops itself on thread break) → Kiichiro Toyoda quality-first production (1930s) → Taiichi Ohno jidoka formalization (1950s) → Toyota global deployment (1960s-70s) → Western adoption via "The Machine That Changed the World" (1990) → Elon Musk (Tesla/SpaceX, 2000s)

### Origin

The Andon system takes its name from the Japanese word for "lantern." Taiichi Ohno formalized it as part of the Toyota Production System in the 1950s, building on *jidoka* (自働化): "automation with a human touch." The philosophical core: quality over speed. A line that runs fast and produces defects is worse than one that stops and fixes. Toyota's dominance through the 1970s-90s vindicated the approach.

Elon Musk has cited the Toyota Production System as a direct influence on Tesla's manufacturing philosophy. The Andon cord is one of the patterns he synthesized and brought into software and hardware engineering contexts.
