# Pantheon Pattern Schema

Every pattern in the Pantheon library follows this canonical format.
Pattern files live at `patterns/{name}/pattern.md`.
Platform adapters live at `patterns/{name}/adapters/{platform}.md`.

---

## pattern.md Format

Each file has two zones: **Protocol** (TLDR — always at the top) and **The Book** (depth layer — always at the bottom). Readers use whichever zone they have time for.

YAML frontmatter is required — it powers the index, the graph, and the Historian agent's merge logic.

```markdown
---
name: {pattern-slug}
aliases: [hero-name-pattern, alternate-label, historical-name]
domain: [engineering, decision-making, philosophy, leadership, creativity, systems]
trigger: [specific trigger phrase, situation, or keyword]
practitioners:
  - name: {Hero Name}
    era: {start-year}-{end-year or present}
    application: {one line — what they built or solved using this pattern}
events:
  - name: {Historical Event Name}
    year: {year or range}
    gem-role: {applied | violated} — {one line of what happened}
    magnitude: {1-5}  # 1=Notable 2=Significant 3=Major 4=Historic 5=Civilizational
lineage: {origin-name} → {intermediate} → {modern-hero}
origin-earliest: {name}-{year}bc or {year}
origin-modern: {name}-{year}
origin-type: authored | historian  # authored = surfaced from lived experience, ✦ marked; historian = surfaced by researching a historical figure
---

# {Pattern Name}

## Protocol  ← TLDR zone (always at the top)

**Trigger:** {precise condition — specific enough that a reader knows immediately whether it applies}
**Steps:**
1. {executable step — no vague advice}
2. {executable step}
3. {executable step}
**Anti-pattern:** {the specific failure mode this prevents — one sentence}
**Hard rule:** {if one exists — a line that cannot be crossed}

---

## The Book  ← depth zone (always at the bottom)

### The Pattern
{The distilled mental model in 2-3 sentences. What the genius actually does differently. Not biography — the move.}

### Protocol (extended)
{Full step-by-step with rationale for each step}

### Anti-Pattern (extended)
{What it looks like in practice when this fires wrong. Real failure modes with examples.}

### Examples
{Real incidents where this pattern applied or was violated. Specific > generic.}

### Practitioners
{Each practitioner: who they are, how they applied this gem, what they built}

### Historical Events
{Real moments in history where this gem was deployed or violated — with outcomes}

### Lineage
{The chain of transmission: origin → evolution → modern hero.
How did this idea travel through time to its most prominent practitioner?}

### Origin
{Earliest known source. Historical grounding, not hype. 1-2 paragraphs.}
```

---

## adapters/{platform}.md Format

Adapters translate the canonical pattern into platform-specific syntax.

### Claude Code Adapter (adapters/claude.md)

```markdown
---
name: {pattern-name}
description: {One sentence trigger condition — when Claude Code should invoke this skill.
             Be specific: include trigger phrases, contexts, and what the skill does.}
---

{Pattern content formatted as a Claude Code skill.
Reference the canonical pattern.md for source of truth.
Keep the protocol executable — Claude follows it step by step.}
```

---

## Rules for Pattern Authors

1. **Trigger first** — the trigger condition must be unambiguous. If a reader can't tell when to invoke it, rewrite it.
2. **Protocol beats prose** — numbered steps, not paragraphs. An agent must be able to execute it without interpretation.
3. **Anti-pattern is mandatory** — every pattern must name the failure mode it prevents. The anti-pattern is half the value.
4. **Examples must be real** — invented examples are weaker than real incidents. If you don't have one, note it as (pending) and add one when it fires.
5. **Origin is history, not hype** — cite where the pattern comes from. No hagiography.
6. **One genius, one domain** — patterns should have a clear owner and a specific problem class. Avoid patterns that "apply to everything."
7. **Magnitude is mandatory on every event** — assign `magnitude: 1–5` when adding any event. This is a judgment call, not a formula. Score the *impact of the event on human history*, not just on the gem's domain. A violation scored at 4 is still a 4 — failures that reshaped industries count.

### Magnitude Scale

| Score | Label | Applies when... |
|---|---|---|
| 1 | Notable | Outcome affected one organization or a small domain |
| 2 | Significant | Reshaped an industry or national economy |
| 3 | Major | Altered multiple industries or a generation's thinking |
| 4 | Historic | Permanently changed civilization's trajectory |
| 5 | Civilizational | Among the most consequential events in recorded history |

**Gem score** = sum of all event magnitudes. This is the primary quality signal: a gem with high total magnitude is a proven universal pattern, validated by history that matters. A gem with low total magnitude is a candidate — the Historian is still building the case. As the library matures, new research should mostly add events (and magnitude) to existing gems rather than create new ones. That convergence is the sign the library is working.
