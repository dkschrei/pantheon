---
name: work-as-done
aliases: [work-as-imagined-vs-work-as-done, current-state-first, normalization-of-deviance-audit, process-archaeology, the-map-is-not-the-work, start-with-what-you-do-now]
domain: [systems, engineering, decision-making, leadership, quality-control]
trigger: [documented process may be fiction, "that's how it works here", lane config, workflow diagram, about to optimize a process, extending a process nobody has traced, written procedure nobody follows, board columns, stage model, "our process is"]
practitioners:
  - name: Diane Vaughan
    era: 1986-1996
    application: Reconstructed NASA's actual Challenger launch decision from documents and testimony, showing the real process had drifted from the documented one one accepted exception at a time — and naming that drift the normalization of deviance
  - name: Erik Hollnagel
    era: 2004-present
    application: Founded resilience engineering with David Woods and made the gap itself the unit of analysis — work-as-imagined is what managers, designers and regulators believe happens; work-as-done is what actually happens
  - name: Mike Rother and John Shook
    era: 1998-present
    application: Wrote down Toyota's mapping method for the first time with the sequence made non-negotiable — the current-state map is drawn from observation before any future-state map is allowed
  - name: David J. Anderson
    era: 2010-present
    application: Built the Kanban Method on the refusal to design a process at all — "start with what you do now", because the existing process is data and a designed one is a guess
  - name: André Ombredane and Jean-Marie Faverge
    era: 1955
    application: Established in French work analysis that a job has two separate descriptions — the work as it is laid down, and the work as people actually carry it out — and that studying only the first explains nothing
events:
  - name: Challenger disaster and the reconstruction that followed
    year: 1986-1996
    gem-role: violated, then applied — NASA acted on a documented safety process that a decade of accepted exceptions had quietly hollowed out; Vaughan then rebuilt the real decision path from the archive and found the drift nobody inside could see
    magnitude: 4
    practitioner: Diane Vaughan
    outcome: Seven crew died. Vaughan's 1996 reconstruction won the inaugural Rachel Carson Prize and was nominated for the National Book Award and the Pulitzer; normalization of deviance became standard vocabulary in aviation, medicine, nuclear power and software operations, and the method — rebuild the real path from artifacts before theorising about the drawn one — became the template for modern accident investigation.
  - name: Learning to See and the current-state-first rule
    year: 1998
    gem-role: applied — Toyota's internal mapping practice was published with its ordering intact, making "draw the current state before the future state" an explicit rule rather than tacit craft
    magnitude: 3
    practitioner: Mike Rother and John Shook
    outcome: Value stream mapping spread from Toyota to manufacturing worldwide and then into healthcare, software and services; the sequencing rule is what separates it from ordinary process design, and skipping it is the single most common way the tool is misapplied.
  - name: The Kanban Method's founding principle
    year: 2010
    gem-role: applied — Anderson set out the method's principles with "start with what you do now" first, explicitly declining to define a target process
    magnitude: 2
    practitioner: David J. Anderson
    outcome: Kanban spread widely in software precisely because it required no reorganisation to adopt; the principle inverted the prevailing assumption that improving a process begins by designing a better one.
lineage: ombredane-faverge-prescribed-vs-actual-1955 → vaughan-challenger-reconstruction-1996 → rother-shook-current-state-first-1998 → anderson-start-with-what-you-do-now-2010 → hollnagel-work-as-imagined-vs-work-as-done-2014
origin-earliest: ombredane-faverge-1955
origin-modern: hollnagel-2014
origin-type: authored
---

# Work-as-Done — The Drawn Process Is a Hypothesis

## Protocol  ← TLDR zone (always at the top)

**Trigger:** You have a documented process — a diagram, a set of board columns, a written procedure, a list of the states work can be in — and you are about to design against it, extend it, optimise it, or explain it to someone. Also fires the moment anyone says *"that's how it works here."*

**Steps:**

1. **Do not look at the documented process.** If you have already seen it, say so out loud and treat every conclusion you draw as compromised. It is the thing under test; it cannot also be the ruler.
2. **Count your evidence before you use it.** List the units of work that genuinely finished, each with an artifact you can point at — a commit, a merged change, a closed record, an incident write-up. **Under five, stop and report that.** A map drawn from fewer than five real items is invention with citations.
3. **Trace five to ten of them backwards**, from finished to origin. Bias toward variety and include at least one that failed, stalled, or was undone — failures expose the real path, because that is where people stopped following the script.
4. **Record every detour.** Every loop back, re-opening, hand-back, reclassification. This is the highest-value field and the one the documented process never contains.
5. **Flatten it into one row per observed hop:** from, to, what triggered it, who or what decided, how many times it happened, and the artifact proving it. **A hop you cannot cite is written down as fiction and excluded** — not softened, not inferred.
6. **Apply the three-instance rule.** A state or step exists only if three or more independent real items passed through it. One or two is an exception, and exceptions are permanent residents — they get their own section forever and are never promoted into the map to make it tidy.
7. **Now, and only now, open the documented process.** Produce four lists: steps that exist but nothing ever used; things that really happened but appear nowhere; things drawn as steps that the evidence says are exceptions; and paths the system permits that nothing has ever taken. For each unused step, count the lines its deletion would remove.
8. **Score it.** Write down five pieces of work that have not yet entered the system and predict, from your map alone, where each enters and what happens first. Any item where you hesitate or could argue two answers marks a gap — name it. **Five out of five or the map is incomplete. Do not round up.**

**Anti-pattern:** *Ratifying the diagram.* Reading the documented process first, then going looking for evidence — which duly arrives, because a mostly-correct diagram makes its own fictional parts look plausible and every trace can be bent to fit a shape you already hold.

**Hard rule:** No claim about how work moves without an artifact you can point at. The documented process is a hypothesis until traced, and it is never evidence for itself.

---

## The Book  ← depth zone (always at the bottom)

### The Pattern

There are always two processes. The one that is written down, drawn, and taught — and the one that work actually takes. Everyone knows this in the abstract and almost nobody acts on it, because the written one is enormously cheaper to read than the evidence, and because it is usually largely correct.

That last part is the trap. The documented process is accurate exactly where it describes habits people already have, and fictional exactly where it describes habits they intend to acquire. Being right about the spine is what lets the invented limbs survive unexamined. The move is to refuse the drawing entirely until the real path has been rebuilt from artifacts, and then to use the drawing only as something to subtract from.

The distinguishing discipline is subtraction. This is not a retrospective, which produces lessons; it produces **deletions and a score**. Lessons are agreed with and forgotten. A deletion is a change, and a score is a test that can be failed again next quarter.

### Protocol (extended)

1. **Lanes are output, never input.** The single most important sequencing rule, and the one most often broken. Once you have seen the columns, every trace you build will find them, because a trace is a story and the columns are a plot you already know. Vaughan's reconstruction worked because she rebuilt the decision from the archive rather than from NASA's flight readiness procedure. Rother and Shook made the same rule explicit for manufacturing: current state first, always, and the future state is not permitted until it exists.

2. **Count evidence before mapping, and be willing to stop.** The most valuable outcome this protocol can produce is often "there is not enough here to map." A system with three finished items has no repeatable path yet — it has three anecdotes. Reporting that honestly is a result. Producing a beautiful map from it is the failure mode this entire protocol exists to prevent.

3. **Trace backwards, not forwards.** Forwards you narrate intent; backwards you follow artifacts. Start at a finished thing and ask what immediately preceded it, and what preceded that. You end at the origin having passed through only states that left traces.

4. **Include failures deliberately.** People follow the documented process when things go well. The real structure of a system is only visible when something breaks, because that is when the undocumented paths get used. A trace set with no failures in it is a trace set of the happy path, which is the part the diagram already got right.

5. **Detours are the product.** Loops, re-opens, hand-backs. Nobody draws these, because nobody designs them — they accrete. They are also usually where the time goes. A loop appearing in two or more traces is structural, not an anomaly, and should be named as a permanent feature.

6. **Cite or delete.** Every transition carries a commit, a file and line, a record identifier, a log entry. This rule is what separates the artifact from a well-informed opinion, and the moment it is relaxed the whole thing decays into the drawing it was supposed to test.

7. **Three instances, and exceptions stay exceptions.** The strong temptation at clustering time is to promote a one-off into a stage so the map looks clean. Resist it permanently. A map that includes rare paths as though they were normal is unusable for prediction, which is the only thing it is for.

8. **The prediction test is the whole point.** Everything before it is preparation. If the map cannot tell you what happens to a new piece of work without deliberation, it does not describe a process — it describes a history. Hesitation is the signal, and the honest move is to name the hesitation rather than resolve it by choosing.

### Anti-Pattern (extended)

**Ratifying the diagram.** The team opens the process documentation, agrees it looks broadly right, finds a few examples that fit, and proceeds to optimise it. Every fictional step survives, now with evidence attached. This is the default outcome of any process review that does not forbid reading the documentation first.

**Backfilling the record.** Discovering there is not enough evidence, and writing records now that describe work finished months ago. This manufactures the very thing the protocol exists to test against. Harvest what exists; never author history.

**Promoting the exception.** A one-off gets drawn as a stage because the map looked lopsided without it. The map now predicts wrongly, in a way that is very hard to detect later.

**Confusing the maturity model with the path.** Many organisations have a stage model describing how sophisticated they intend to become. It shares a word with the states work passes through and has nothing to do with them. Mapping one while believing you are mapping the other is common and produces confident nonsense.

**Treating the map as permanent.** It describes a system at a moment. Steps deleted for having no instances can reappear. The score decays. Rerun it.

### Examples

**NASA, 1977-1986.** The documented process required O-ring erosion to be treated as an unacceptable deviation. The real process, rebuilt afterwards from the archive, had absorbed erosion as expected behaviour across successive flights, each acceptance justified by the last. No individual step looked like a violation from inside. Only the reconstructed path showed the drift, and only because it was rebuilt from artifacts rather than from the procedure. Seven people died in the gap between the two processes.

**a2os, 2026-07 to 2026-08 (the surfacing case).** A programme with unusually rigorous records — 74 job files, 114 dated log rows, 7 failure write-ups, 595 commits — and a carefully drawn seven-column operating diagram. Tracing nine finished items backwards found: one permitted state that zero of 74 items ever entered, carried through fourteen files as though it were live; an intake route drawn as the front door that nothing had ever come through; an independent review step drawn as a stage with two instances in 595 commits, which the three-instance rule classes as an exception; and a self-correction loop nobody had drawn at all, which consumed 25 of one job's 26 hours and which no record counted. The diagram was right about approve → build → accept, and that accuracy is precisely what had protected the rest of it from examination. The prediction test scored four out of five: nothing in the system could say what happens to a defect, because three defects had taken three different routes and no rule said which.

### Practitioners

**Diane Vaughan** — sociologist at Columbia. Her *The Challenger Launch Decision: Risky Technology, Culture, and Deviance at NASA* (University of Chicago Press, 1996) rebuilt the launch decision from documents and testimony rather than from NASA's account of its own process, and found an incremental descent into poor judgement in which each deviation had been made acceptable by the ones before it. The book won the inaugural Rachel Carson Prize and was nominated for the National Book Award and the Pulitzer. It is the canonical demonstration that the real path can only be recovered from artifacts, and that people inside a drifted process cannot see the drift.

**Erik Hollnagel** — Danish safety researcher, a founding figure of resilience engineering with David Woods, working across aviation and healthcare. He made this gap the unit of analysis and gave it its durable names: work-as-imagined, what designers, managers, regulators and authorities believe happens or should happen; work-as-done, what actually happens. His related efficiency-thoroughness trade-off principle explains *why* the two diverge — people continually adjust what they do to match conditions, and the written process cannot follow them.

**Mike Rother and John Shook** — Shook was the first American manager at Toyota; with Rother of the University of Michigan he wrote down Toyota's mapping method for the first time in *Learning to See* (Lean Enterprise Institute, 1998). Their contribution to this gem is not the notation but the ordering: current-state map first, from observation, and only then a future-state map. Skipping that sequence is the most common way the tool fails.

**David J. Anderson** — set out the Kanban Method's principles in 2010, leading with "start with what you do now." The method deliberately declines to define a target process, on the grounds that the existing one contains real value and a designed one is a guess. It inverted the prevailing assumption that improving a process begins by drawing a better one.

**André Ombredane and Jean-Marie Faverge** — their *L'analyse du travail: facteur d'économie humaine et de productivité* (PUF, Paris, 1955) is foundational to French ergonomics and work analysis. Its lasting move was to insist that a job requires two separate descriptions — what the work is laid down as, and how people actually carry it out — and that analysing only the first explains nothing about performance, error, or safety.

### Historical Events

**The Challenger disaster and its reconstruction, 1986-1996** (magnitude 4). The most consequential recorded instance of a documented process being trusted while the real one had silently diverged. Vaughan's decade-later reconstruction supplied both the diagnosis and the method, and normalization of deviance entered standard vocabulary across aviation, medicine, nuclear power and software operations.

**Publication of *Learning to See*, 1998** (magnitude 3). Toyota's mapping practice reached the world with its ordering rule intact. Value stream mapping spread through manufacturing and then into healthcare, software and services, and current-state-first became an explicit rule rather than tacit craft.

**The Kanban Method's founding principles, 2010** (magnitude 2). "Start with what you do now" was placed first, deliberately refusing to specify a target process. Adoption spread rapidly in software precisely because no reorganisation was required.

### Lineage

The distinction is first stated plainly in French work analysis: Ombredane and Faverge, 1955, separating the work as laid down from the work as performed. Vaughan supplies the method in 1996 — rebuild the real path from the archive, and the drift becomes visible from outside in a way it never was from inside. Rother and Shook turn the sequencing into a rule for industry in 1998: current state before future state, no exceptions. Anderson generalises the refusal in 2010: do not design a process, start from the one you have. Hollnagel gives the pair its durable names and makes the gap itself the object of study, so that "work-as-imagined versus work-as-done" becomes shared vocabulary across safety-critical fields.

Four disciplines that mostly did not read each other — ergonomics, organisational sociology, manufacturing, software — converged on the same instruction, which is the strongest available evidence that the move is real and not a local technique.

### Origin

The earliest clear statement is Ombredane and Faverge, *L'analyse du travail*, PUF, 1955, which established in French ergonomics that describing a job as it is prescribed tells you almost nothing about how it is performed, and that both descriptions are required. The idea's modern form belongs to Hollnagel, whose work-as-imagined and work-as-done framing carried it out of ergonomics into safety science, healthcare and software operations, where it now names a gap that everyone can see once it has been pointed at.

### Neighbours, and the boundary

**`ohno-circle`** is the sibling and shares the parent principle: reality over representation. The dividing line is sharp and worth holding. Ohno's move requires a system running in front of you — go and stand there, watch it for longer than feels reasonable, let observation dictate the action. **You cannot stand in a chalk circle around the past.** When the work already finished, direct observation is unavailable and artifacts are the only floor there is. Invoke `ohno-circle` for a live system; invoke this one for a finished one.

**`time-and-motion`** measures a live process to make it faster. This one reconstructs a finished path to find out whether it is real. Different question — fast versus true — and different output: a timing breakdown versus a list of things to delete.

**`red-bead`** also refuses to trust the obvious account of a failure, but its target is attribution — the system rather than the worker. This gem's target is the process description itself.

### Research Context

Surfaced in August 2026, while mapping a governed software programme whose records were unusually complete. The conditions that made it urgent are general: work is increasingly executed by agents against written process definitions, which means a fictional step in a diagram is no longer merely misleading — it is executable, and it will be executed. Documented processes have become code, and untested code that has never run is the oldest known source of confident failure.
