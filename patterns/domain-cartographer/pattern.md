---
name: domain-cartographer
aliases: [cartographer-loop, knowledge-extraction-loop, tacit-knowledge-mapping, expert-correction-loop, bold-guess-protocol, minimum-viable-correction, knowledge-acquisition-loop, feigenbaum, mycin, taylor, scientific-management, malinowski, participant-observation, knowledge-engineering, knowledge-acquisition-bottleneck]
domain: [knowledge-management, onboarding, organizational-learning, AI-collaboration, systems-thinking]
trigger: [apprentice needs to map a domain they know nothing about, tacit knowledge lives in one person's head, new hire onboarding to complex domain, expert leaving and knowledge must be transferred, blank-page paralysis when asked to explain, knowledge extraction session needed]
practitioners:
  - name: Frederick Winslow Taylor
    era: 1880-1911
    application: 'Observed pig iron handlers and machinists directly before involving workers — built time-motion models from raw observation data, then surfaced concrete findings for worker correction rather than asking workers to narrate their own methods from scratch'
  - name: Bronisław Malinowski
    era: 1914-1942
    application: 'Pioneered participant observation in the Trobriand Islands — immersed in raw cultural data before constructing anthropological models, then corrected hypotheses with informants who reacted to artifacts rather than explaining from blank slate'
  - name: Edward Feigenbaum
    era: 1965-1990
    application: 'Built MYCIN by ingesting medical literature and case logs before physician interviews — surfaced diagnostic rule sets for physician scan-and-correct validation, and coined ''knowledge acquisition bottleneck'' for the failure mode this loop solves'
events:
  - name: Bethlehem Steel Pig Iron Study
    year: 1899
    gem-role: 'applied — Taylor observed pig iron handlers directly and built a time-motion model from raw data before surfacing findings to workers for correction — inverting the blank-page interrogation that prior management relied on'
    magnitude: 2
  - name: Trobriand Islands Fieldwork
    year: 1915-1918
    gem-role: 'applied — Malinowski immersed in raw cultural observation for months before building anthropological models, then corrected hypotheses with informants rather than asking for blank-page narration — establishing participant observation as standard fieldwork discipline'
    magnitude: 3
  - name: MYCIN Expert System Development
    year: 1972-1979
    gem-role: 'applied — Feigenbaum''s team at Stanford ingested medical case logs, generated diagnostic rules, and surfaced them to physicians for scan-and-correct validation — first systematic AI implementation of artifact-first knowledge extraction'
    magnitude: 3
  - name: SAP Basis L1 Landscape Mapping
    year: 2026
    gem-role: 'applied — AI ingested raw SAP system data, built annotated landscape map with confidence scores, expert ran three delta passes correcting misclassifications only, producing validated operational CSV in hours instead of weeks'
    magnitude: 1
lineage: taylor-1899 → malinowski-1915 → feigenbaum-1972 → domain-cartographer-2026
origin-earliest: taylor-1899
origin-modern: feigenbaum-1972
origin-type: authored
authored-by: Dana Schreiber
---

# Domain Cartographer Loop

## Protocol  ← TLDR zone (always at the top)

**Trigger:** An apprentice needs to build operational knowledge of a domain they know nothing about, but the expert who holds that knowledge can't narrate it from scratch. The blank page breaks the session before it starts.

**Steps:**
1. **INGEST** — Apprentice consumes all available raw sources without involving the expert
2. **MAP** — Apprentice constructs a first-draft model, annotating every element with confidence level and explicit assumptions
3. **SURFACE** — Present the model as a concrete, scannable artifact (table, map, diagram) — no open questions yet
4. **DELTA** — Expert scans the artifact, marks only what's wrong — binary corrections, not explanations
5. **INTEGRATE** — Apprentice updates model, promotes corrections to ground truth, re-scores confidence
6. **VERIFY** — Re-surface corrected model; expert confirms or runs another delta pass
7. **GRADUATE** — Model clears confidence threshold → becomes the operational knowledge artifact

**Anti-pattern:** Asking the expert "Walk me through your domain" before surfacing anything. This forces the expert to construct the model mentally before externalizing it — the hardest possible mode of knowledge transfer.

**Hard rule:** An artifact must exist before the expert is asked for any input. No artifact = no session.

---

## The Book  ← depth zone (always at the bottom)

### The Pattern

Tacit knowledge can't be extracted by asking questions — experts have no internal index they can narrate from. The Domain Cartographer Loop inverts the transfer direction: the apprentice makes bold structural guesses from raw data, surfaces them as a concrete artifact, and lets the expert apply minimum-effort corrections. The expert's role shifts from composer to auditor. Auditing is faster, lower-effort, and produces ground truth rather than narrative. The model converges through successive delta passes until it becomes operational knowledge — structured, versioned, queryable.

### Protocol (extended)

1. **INGEST** — Apprentice consumes the raw source corpus: records, logs, inventories, archives, config files, org charts — anything available without expert interpretation. The expert is not involved at this stage. Goal is maximum coverage without priming on expert framing.

2. **MAP** — Apprentice constructs a first-draft model. Every element receives a confidence annotation: high (multiple signals agree), medium (single signal), low (inferred or assumed). Every assumption is made explicit. The model will be wrong in places — that's expected. Maximum coverage beats maximum accuracy at this stage.

3. **SURFACE** — Present the model as a concrete, scannable artifact — a table, map, diagram, or structured list. Not a list of questions. The expert needs something to react to, not something to build from scratch. The blank-page problem is solved before the expert enters the room.

4. **DELTA** — Expert scans the artifact. They are not asked to explain anything. They mark what's wrong: this is misclassified, that label is incorrect, these two are the same thing, that entry is outdated. The cognitive load is recognition, not composition — scan and correct, not narrate. This is the minimum viable expert contribution.

5. **INTEGRATE** — Apprentice updates the model. Corrections become ground truth. Original guesses that were corrected are demoted and logged. Confidence scores update. The artifact version increments.

6. **VERIFY** — Re-surface the corrected model. Expert confirms changes landed correctly, or runs another delta pass on residual errors.

7. **GRADUATE** — When the artifact clears the confidence threshold — no remaining low-confidence elements, fewer than 5% corrections in the last delta pass — it graduates to the operational knowledge layer: stored, versioned, ready to use.

### Anti-Pattern (extended)

**Blank-page interrogation:** Apprentice opens with "Walk me through your domain" before surfacing anything. The expert narrates a stream-of-consciousness dump that's incomplete, unnormalized, and impossible to validate. The apprentice then has to structure it anyway — doing the hardest work in the wrong order, after the expert's bandwidth is spent. This is the failure mode Feigenbaum named the "knowledge acquisition bottleneck."

**Premature closure:** Apprentice surfaces a low-coverage draft, collects corrections on what's present, and declares the model ready. Elements not in the draft survive as silent gaps — invisible because they were never surfaced. The artifact looks complete but has holes.

**One-at-a-time labeling:** Apprentice asks "How would you classify X?" for each element individually. This turns the expert into a labeler rather than an auditor. The interaction is an order of magnitude slower, produces no artifact structure, and forces the expert to hold the whole domain in working memory one piece at a time.

**Asking for explanations instead of corrections:** "Why does this go in that category?" The expert explains reasoning instead of marking errors. The session produces narrative, not ground truth. The model doesn't update.

### Examples

**Trobriand Islands Fieldwork (1915)**

Malinowski arrived with no model of Trobriand culture. He spent months accumulating raw observation — ceremonies, transactions, disputes, daily routines — then built draft hypotheses and presented them to informants for correction. The kula exchange network, a complex multi-island trade system invisible to prior anthropologists using blank-page interviews, became legible only through this method. Informants could confirm or deny a concrete hypothesis far more readily than they could narrate the system unprompted. The loop ran for 26 months; the resulting monograph became the founding document of modern anthropological fieldwork.

**MYCIN Expert System (1972–1979)**

Feigenbaum's team at Stanford couldn't get infectious disease physicians to articulate their diagnostic rules through questioning — the knowledge was tacit. The team's move: ingest medical literature and case logs, generate a draft rule set, then enter a correction cycle with physicians who reviewed rules and marked adjustments. Physicians could audit ("that rule is wrong, this should trigger instead") far faster than they could compose rules from scratch. Through successive delta passes the rule base grew to ~600 rules performing at senior-physician level. The extraction method proved that tacit expert knowledge was accessible through bold-hypothesis-then-correction but not through open-ended elicitation.

**SAP Basis L1 Landscape Mapping (2026)**

A new L1 administrator needed operational knowledge of a complex SAP environment — hundreds of systems, transport routes, and dependencies — within days. The departing expert had no time to narrate it from scratch. An AI agent ran the loop: ingested raw system inventory exports, built an annotated landscape map with confidence scores, surfaced it for review. The expert ran three delta passes marking misclassifications and deprecated entries. Total expert contribution: less than two hours. The knowledge that had lived in one person's head was now structured, stored, and queryable — weeks of shadowing compressed into one session.

The expert's description: "mentoring an L1 admin" rather than "being interrogated." That framing is the diagnostic signal the loop worked — the expert operated in recognition mode, not composition mode.

### Practitioners

**Frederick Winslow Taylor (1880–1911)**

Taylor was the founder of scientific management, the first systematic attempt to apply observation and measurement to human labor. His signature move — which he called "the one best way" — was to observe workers in exhaustive detail before proposing any changes. At Bethlehem Steel in 1899, he studied pig iron handlers directly: how much they loaded, at what pace, with what rest intervals. He built a model from raw observational data, then surfaced it to workers for correction. Workers didn't explain their methods to him; they told him where his model was wrong. The correction loop, not the initial explanation, was where the knowledge lived. Taylor's failure mode was the anti-pattern he created once he had power: in later years he stopped asking workers to correct his models and started imposing them — at which point the loop broke and labor resistance followed.

**Bronisław Malinowski (1884–1942)**

Malinowski is the founder of modern anthropological fieldwork and the inventor of participant observation. His innovation was epistemological: he refused to build models of a culture before spending months inside it. He arrived in the Trobriand Islands in 1915 with a blank observation protocol rather than a hypothesis questionnaire. He ingested raw cultural data — ceremonies, transactions, disputes, daily routines — building a draft model from observation before asking informants anything. When he did engage informants, he presented concrete hypotheses: "I believe this transaction functions as X" — and informants corrected him or confirmed. The extract-then-correct loop is precisely his method; the blank-page interview was what he was explicitly rejecting from prior anthropological practice. His book *Argonauts of the Western Pacific* (1922) is effectively a field manual for the Domain Cartographer Loop applied to cultural knowledge.

**Edward Feigenbaum (1936–present)**

Feigenbaum is the father of expert systems and coined the phrase "knowledge acquisition bottleneck" — the exact failure mode the Domain Cartographer Loop solves. Building MYCIN at Stanford (1972–1979), his team could not extract physician diagnostic knowledge through direct questioning: physicians couldn't articulate the rules they were following. The team's solution was to ingest medical literature and case logs, generate a first-draft rule set, then present rules to physicians for scan-and-correct review. Physicians would confirm, reject, or modify rules — cognitive auditing, not explanation. MYCIN produced 600 diagnostic rules this way, performing at senior-physician level by 1979. Feigenbaum later formalized the problem as "the knowledge acquisition bottleneck" in his work on the Fifth Generation computing project — explicitly naming blank-page interrogation as the broken extraction mode and artifact-first correction as the solution.

### Historical Events

**Bethlehem Steel Pig Iron Study (1899)**

Taylor's study of pig iron handling at Bethlehem Steel became the founding case for scientific management. Taylor's team observed workers directly — how much they loaded, at what pace, with what rest intervals — and built quantitative models before engaging workers at all. When findings were surfaced, workers corrected the model where it was wrong. The result was a 3.7x productivity improvement for a subset of selected workers. The study's lasting significance wasn't the productivity gain — it was the method: systematic observation produces a model, the model is surfaced to the people who know the work, corrections flow from recognition rather than explanation.

**Trobriand Islands Fieldwork (1915–1918)**

Malinowski's fieldwork established participant observation as the canonical method for anthropological knowledge extraction. He spent 26 months living among Trobriand Islanders, accumulating raw observations across two extended visits. His explicit methodological innovation was refusing to interrogate informants about cultural meaning until he had built hypotheses from raw observation. Informants then corrected or confirmed those hypotheses. This is the loop. The resulting monograph *Argonauts of the Western Pacific* (1922) documented the kula exchange system — a complex multi-island trade network invisible to prior anthropologists who used blank-page interviews. The knowledge was only accessible through the loop: observe first, hypothesize second, correct third.

**MYCIN Expert System Development (1972–1979)**

MYCIN was the first AI system to systematically operationalize artifact-first knowledge extraction from human experts. Feigenbaum's team at Stanford ingested medical literature and bacteremia case logs, generated an initial rule set (~200 rules), then entered a structured review cycle with infectious disease physicians. Physicians reviewed rules and marked corrections — they did not explain their reasoning from scratch. Through successive delta passes, the rule base grew to ~600 rules. Formal evaluation in 1979 showed MYCIN's diagnostic recommendations matched or exceeded senior faculty physicians in 65% of cases. More important than the diagnostic performance was the extraction method: it proved that tacit expert knowledge could be systematically captured through bold-hypothesis-then-correction cycles rather than blank-page interrogation.

**SAP Basis L1 Landscape Mapping (2026)**

An L1 system administrator needed operational domain knowledge in days, not weeks. The Domain Cartographer Loop produced a validated operational landscape artifact through three delta passes in a single session. Total expert contribution: less than two hours of correction time across the full engagement. The knowledge that had lived in one person's head was now structured, stored, and queryable.

### Lineage

Taylor's time-motion observation loop (1899) → Malinowski's participant observation (1915) → Feigenbaum's knowledge acquisition protocols (1972) → AI-mediated knowledge extraction (2020s) → SAP Basis Landscape Mapping (2026)

### Origin

The pattern runs through three distinct traditions before converging in the AI era.

**Scientific management (Taylor, 1899):** Taylor's contribution was inverting the knowledge direction. Prior industrial consultants asked foremen and workers to explain how they worked. Taylor observed first, modeled second, and asked workers to correct him third. This produced actionable data where explanations had produced narrative. The method was mechanical — stopwatches and load tables — but the epistemological move was the same: artifact before interrogation.

**Anthropological fieldwork (Malinowski, 1915):** Malinowski formalized the loop as methodology, arguing explicitly that the researcher's job is to build a model from observation before engaging informants as correctors. He was reacting against the "armchair anthropology" of his predecessors who derived models from blank-page interviews conducted by missionaries and colonial administrators — precisely the anti-pattern. Participant observation established that recognition-based correction is faster, more accurate, and more honest than explanation-based elicitation.

**Knowledge engineering (Feigenbaum, 1972):** Feigenbaum named the failure mode — "knowledge acquisition bottleneck" — and demonstrated that AI could play the role of bold-guesser while the human expert played the corrector. The MYCIN knowledge acquisition sessions formalized the loop as a repeatable engineering protocol. Feigenbaum's lasting contribution wasn't MYCIN's diagnostic rules; it was proving that tacit expert knowledge is accessible through structured correction cycles that are otherwise inaccessible through open-ended elicitation.

**The AI era instantiation (2026):** The Domain Cartographer Loop emerged from a concrete knowledge extraction problem: how do you transfer deep tacit system knowledge without time for shadowing, pair work, or documentation sprints? The breakthrough was recognizing that the bottleneck wasn't the expert's knowledge — it was the extraction mode. Modern AI can ingest machine-readable raw data at scale, make structural guesses across the full corpus, and annotate confidence levels — roles previously limited by human processing capacity. This collapses the time between INGEST and SURFACE, making the full correction loop viable in a single session.
