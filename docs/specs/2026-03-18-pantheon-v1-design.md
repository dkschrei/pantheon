# Pantheon v1.0 — Design Spec

**Date**: 2026-03-18
**Status**: Approved for implementation
**Target**: Public launch by May 6, 2026 (Anthropic Developer Conference, SF)
**Author**: Dana Schreiber

---

## Vision

Every human being who has ever lived has a brain designed for higher-level thinking, reasoning, and synthesis. Our species evolved over thousands of years solving hard problems — survival, leadership, creation, conflict. That collective knowledge is a series of lessons accumulated across time, from the first humans to today.

Nothing we do now is unique. Every clever decision is predicated on a pattern from the past. Those who understand that patterns repeat — and who have access to the historical record — learn from what came before and apply those teachings to their current situation.

Pantheon catalogs that record. Not as a history lesson. As a deployable reasoning layer.

**The product:** Take any problem as input. Apply a Pantheon pattern. Observe the output. Different patterns produce different lenses on the same problem — the user synthesizes and decides.

**The audience:** Hardcore solo engineers building autonomous agent farms. People who think in meta terms. Vibe engineers who want to unlock friction, not read motivation books.

---

## What Pantheon Is Not

- Not a prompt library
- Not motivational quotes
- Not a list of principles
- Not a history textbook

**It is:** executable cognitive protocols with trigger conditions, step-by-step procedures, and anti-patterns — proven across real historical events, available in the moment you need them.

---

## The Two-Layer Model

Every pattern serves two readers simultaneously:

```
Layer 1 — The Protocol (TLDR)
  Who: Elon-brained builders who want the rule now
  What: Trigger conditions + executable steps + anti-pattern
  Time to value: 30 seconds
  Access: invoke the skill, get the protocol, make the decision

Layer 2 — The Book (depth)
  Who: people who want to understand why the rule works
  What: practitioners, historical events, lineage chain
  Time to value: 5 minutes to 5 hours depending on depth
  Access: open the pattern.md file, read as far as you want
```

The protocol is always at the top. The book is always at the bottom. One file, two audiences.

---

## The Gem Schema

Each pattern is a markdown file with YAML frontmatter. The frontmatter is the machine-readable layer — the Historian agent reads it, the index is built from it, future graph queries run against it.

### YAML Frontmatter

```yaml
---
name: musk-filter
aliases: [first-principles-filter, pre-build-gate, elon-filter]
domain: [engineering, decision-making, process-design]
trigger: [build request, automation proposal, scope creep, "let's add", "we should create"]
practitioners:
  - name: Elon Musk
    era: 2002-present
    application: SpaceX rocket manufacturing, Tesla production lines
  - name: Henry Ford
    era: 1908-1920
    application: Model T production line elimination of unnecessary steps
events:
  - name: SpaceX cost-reduction breakthrough
    year: 2002-2008
    gem-role: applied — Musk decomposed rocket costs to raw materials, eliminated 90% of assumed requirements
  - name: Tesla Gigafactory production ramp
    year: 2017-2019
    gem-role: applied — deleted assumed manufacturing steps, reduced part count by 70%
lineage: aristotle-first-principles → descartes-systematic-doubt → taylor-scientific-management → musk-filter
origin-earliest: aristotle-350bc
origin-modern: musk-2002
---
```

### File Structure

```markdown
# {Canonical Pattern Name}

## Protocol  ← TLDR zone (top, always fast)

**Trigger:** {when this fires — specific, not vague}
**Steps:** {numbered, executable, no interpretation needed}
**Anti-pattern:** {the specific failure mode this prevents}
**Hard rule:** {if there is one — a line that cannot be crossed}

---

## The Book  ← depth zone (bottom, read if you want)

### The Pattern
{The distilled mental model in 2-3 sentences. What the genius actually does differently. Not biography — the move.}

### Protocol (extended)
{Full step-by-step with rationale for each step}

### Anti-Pattern (extended)
{What it looks like in practice when this fires wrong. Real failure modes.}

### Examples
{Real incidents where the pattern applied or was violated. Specific > generic. Nexus examples welcome.}

### Practitioners
{Each practitioner: who they are, how they applied this gem, what they built with it}

### Historical Events
{Real moments in history where this gem was deployed or violated — with outcomes}

### Lineage
{The chain of transmission: origin → evolution → modern hero}
{How did this idea travel through time to reach its current most prominent practitioner?}

### Origin
{Earliest known source. Historical grounding, not hype. 1-2 paragraphs.}
```

### Attribution Model

Gems are named by their most recognizable label — the name people already use for this pattern, whether that's the hero or the concept:
- `musk-filter` — hero-based, most recognizable label for this pattern
- `andon-cord` — concept-based, Toyota's own name for it
- `feynman-clarity` — hero-based

**Rule**: use whatever label a vibe engineer would Google when looking for this pattern. The aliases field captures every alternate name.

```yaml
aliases: [musk-filter, cartesian-doubt, feynman-method, aristotle-analytics]
```

Commands match the gem directory name exactly:
- `/pantheon-musk-filter` invokes `patterns/musk-filter/adapters/claude.md`

**v1.0 scope: Claude Code adapters only.** `adapters/cursor.md` and `adapters/openai.md` are v0.2.

---

## Repository Structure

```
pantheon/
  patterns/                        ← canonical gem files
    {name}/
      pattern.md                   ← full gem (frontmatter + Protocol + The Book)
      adapters/
        claude.md                  ← Claude Code skill (Protocol block only)
        cursor.md                  ← (v0.2) .cursorrules entry
        openai.md                  ← (v0.2) system prompt drop-in

  commands/                        ← Claude Code slash commands
    pantheon.md                    ← index: all gems + triggers (30-second scan)
    pantheon-{name}.md             ← one per gem, references adapter

  historian/                       ← open-sourced Historian agent
    README.md                      ← how to run it yourself
    seed-list.md                   ← curated list of 100+ heroes to research
    prompt.md                      ← the research prompt (what Nick asks per hero)
    pruning-criteria.md            ← the 4 quality criteria for Phase 2
    loop.sh                        ← runner script (for community use)

  docs/
    specs/                         ← design documents
      2026-03-18-pantheon-v1-design.md  ← this file

  SCHEMA.md                        ← canonical gem format (reference)
  PATTERNS.md                      ← dispatch table (auto-generated from frontmatter)
  CONTRIBUTING.md                  ← how to submit a gem via PR
  README.md                        ← thesis + install + quickstart + stacking demo
  .gitignore
```

---

## The Historian Agent Loop

Nick runs two sequential phases to build the library from the seed list to v1.0.

### Phase 1 — Build Loop

**Input**: `historian/seed-list.md` (40-50 curated heroes, modern to ancient)
**Model**: HIGH tier (nemotron-49b) — quality over speed
**Checkpointing**: Nick writes `historian/.progress` after each hero (name + status). If loop restarts, skip completed heroes.

```pseudocode
load seed-list.md → heroes[]
load .progress → completed[]
remaining = heroes - completed

for each hero in remaining:
  1. RESEARCH
     prompt = load historian/prompt.md
     result = llm(prompt.format(hero=hero))
     # result contains: gem_name, pattern_summary, protocol_steps,
     #                  anti_pattern, examples, origin_text, lineage_chain

  2. CHECK FOR EXISTING GEM
     existing = find patterns/{result.gem_name}/pattern.md
     if existing:
       # Add hero as new practitioner, don't create new gem
       read existing pattern.md YAML frontmatter
       append to practitioners[] and events[]
       rewrite pattern.md with updated frontmatter
       log: "updated {gem_name} with practitioner {hero}"
     else:
       # New gem — write from scratch
       write patterns/{result.gem_name}/pattern.md  (full schema)
       write patterns/{result.gem_name}/adapters/claude.md  (Protocol only)
       write commands/pantheon-{result.gem_name}.md

  3. COMMIT
     git add patterns/{gem_name}/ commands/
     git commit -m "feat(patterns): {gem_name} — {hero}"

  4. CHECKPOINT
     append hero → historian/.progress

  5. ERROR HANDLING
     if research produces no clear single pattern:
       log hero to historian/skipped.md with reason
       continue to next hero (do not escalate unless >10% of list skipped)
     if pattern.md write fails:
       log to historian/errors.md
       continue

generate updated PATTERNS.md dispatch table from all frontmatter
```

**Phase 1 complete when**: `remaining` list is empty OR manually stopped by Dana.

---

### Phase 2 — Pruning Loop

**Runs after Phase 1 completes.** Nick evaluates every gem against 4 criteria and writes a structured report for Dana's review.

```pseudocode
gems = list all patterns/*/pattern.md

for each gem:
  evaluate against criteria:
    □ TRIGGER_SPECIFIC  — trigger is a precise condition, not "when things are hard"
    □ EXECUTABLE        — protocol steps can be followed without interpretation
    □ DISTINCT          — not a duplicate or near-duplicate of another gem
    □ GROUNDED          — has ≥1 real practitioner + ≥1 real historical event in frontmatter

  flag = score(gem, criteria):
    all 4 pass   → KEEP
    1-2 fail     → REVISE (specify which criteria + proposed fix)
    duplicate    → MERGE  (specify which gem to merge into + which to delete)
    3-4 fail     → DELETE

  write to pruning-report.md

sort report: DELETE first, MERGE second, REVISE third, KEEP last
```

**Pruning Report Format** (`historian/pruning-report.md`):

```markdown
# Pruning Report — {date}
Total gems evaluated: {n}
Recommended: {keep} KEEP / {revise} REVISE / {merge} MERGE / {delete} DELETE

---

## DELETE (approve to remove)

### {gem-name}
- **Reason**: fails TRIGGER_SPECIFIC + GROUNDED (trigger too vague, no real events cited)
- **Dana action**: [ ] Approved  [ ] Reject (keep as-is)

---

## MERGE (approve to consolidate)

### {gem-name-a} → merge into {gem-name-b}
- **Reason**: nearly identical protocol to {gem-name-b}, only surface differences
- **Proposed**: keep {gem-name-b}, add {hero-a} as practitioner
- **Dana action**: [ ] Approved  [ ] Reject (keep both)

---

## REVISE (approve for Nick to fix)

### {gem-name}
- **Reason**: fails EXECUTABLE — step 3 says "think carefully" (not a step)
- **Proposed fix**: replace step 3 with "List 3 specific assumptions you are making"
- **Dana action**: [ ] Approved  [ ] Reject (keep as-is)

---

## KEEP (no action needed)

- {gem-name-1} — passes all 4 criteria
- {gem-name-2} — passes all 4 criteria
...
```

**Dana's review workflow**: read DELETE + MERGE sections only (≤10 mins). Check boxes. Send back to Nick. KEEP and REVISE sections require no decision.

Nick executes all approved actions. Library is v1.0.

---

### Install Script Spec

`install.sh` — full specification:

```bash
#!/usr/bin/env bash
set -euo pipefail

PANTHEON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_COMMANDS="${HOME}/.claude/commands"
CLAUDE_SKILLS="${HOME}/.claude/skills"

echo "Installing Pantheon..."

# Validate source structure
[[ -d "${PANTHEON_DIR}/commands" ]] || { echo "ERROR: commands/ not found. Is this the pantheon repo root?"; exit 1; }
[[ -d "${PANTHEON_DIR}/patterns" ]] || { echo "ERROR: patterns/ not found."; exit 1; }

# Create target dirs if missing
mkdir -p "${CLAUDE_COMMANDS}"
mkdir -p "${CLAUDE_SKILLS}"

# Install commands (slash commands — manual invoke)
cp "${PANTHEON_DIR}"/commands/*.md "${CLAUDE_COMMANDS}/"
echo "✓ Commands installed → ${CLAUDE_COMMANDS}/"

# Install skills (auto-trigger adapters)
for adapter in "${PANTHEON_DIR}"/patterns/*/adapters/claude.md; do
  gem_dir=$(dirname "$(dirname "$adapter")")
  gem_name=$(basename "$gem_dir")
  cp "$adapter" "${CLAUDE_SKILLS}/pantheon-${gem_name}.md"
done
echo "✓ Skills installed → ${CLAUDE_SKILLS}/"

echo ""
echo "Pantheon installed. Restart Claude Code to activate."
echo "Available commands: /pantheon, $(ls "${PANTHEON_DIR}"/commands/ | grep -v '^pantheon\.md' | sed 's/\.md$//' | sed 's/^/\//' | tr '\n' ' ')"
```

**Update behavior**: re-running install.sh overwrites existing files. No merge/diff needed — patterns are read-only skills.

---

### Seed List — Starting Point (40-50 heroes)

Scoped to realistic Phase 1 timeline (~14 days, 3-4 heroes/day):

**Modern builders** (10): Musk, Jobs, Bezos, Fadell, Karpathy, Altman, Andreessen, Grove, Ive, Ohno
**Scientists** (10): Feynman, Shannon, Von Neumann, Turing, Einstein, Tesla, Curie, Pauling, Bohr, Hawking
**Philosophers/strategists** (8): Aristotle, Descartes, Marcus Aurelius, Seneca, Sun Tzu, Machiavelli, Kant, Popper
**Industrial pioneers** (6): Ford, Taylor, Carnegie, Rockefeller, Sloan, Deming
**Military/leaders** (6): Alexander, Napoleon, Hannibal, Shackleton, Churchill, Washington
**Artists/creators** (5): Da Vinci, Michelangelo, Mozart, Picasso, Bach
**Economists/investors** (5): Munger, Buffett, Kahneman, Keynes, Taleb

Total: ~50 heroes. Phase 2 (post-launch): expand chronologically, add ancient/non-Western thinkers.

**Expected output**: 35-45 gems (some heroes share patterns → new practitioners on existing gems rather than new files).

---

## Install + Usage Experience

### Install

```bash
curl -fsSL https://raw.githubusercontent.com/dkschrei/pantheon/main/install.sh | bash
```

Script does:
1. Copies `commands/*.md` → `~/.claude/commands/`
2. Copies `patterns/*/adapters/claude.md` → `~/.claude/skills/`
3. Prints quickstart
4. Done — no config, no account, no runtime

### Usage

```bash
# Discover — what's available?
/pantheon
→ scannable index: gem name + one-line trigger condition

# Apply — run one pattern on your problem
/pantheon-musk-filter
/pantheon-andon-cord
/pantheon-feynman-clarity

# Stack — run multiple patterns, compare lenses
/pantheon-musk-filter          → strip it down to what's required
/pantheon-fadell-pre-experience → fix what surrounds it first
/pantheon-feynman-clarity      → what do you actually know vs. assume
→ user synthesizes the three outputs, picks the frame that fits
```

**Stacking is the differentiator.** The same problem viewed through 3 patterns produces 3 different valuable outputs. That's not a prompt library — that's a council of advisors.

---

## Launch Plan

**Quality bar for going public:**
- 25+ gems passing all 4 pruning criteria
- Minimum 6 domains covered (reasoning, engineering, leadership, creativity, systems, philosophy)
- Spans ancient to modern (not just 2020s tech culture)
- `/pantheon` index scannable in 30 seconds
- Install script tested on a clean machine
- `historian/` open-sourced with full instructions

**Timeline:**

```
Mar 18 - Apr 4:   Nick runs Phase 1 — 50 heroes researched (~3/day), gem files written
                  ~35-45 gems produced, commands/ updated, .progress checkpointed
Apr 4  - Apr 10:  Nick runs Phase 2 — pruning report generated
                  Dana reviews DELETE + MERGE sections (one sitting, ≤30 mins)
                  Nick executes approved cuts
Apr 10 - Apr 17:  Dana spot-checks 10 gems, install.sh tested on clean machine
                  CONTRIBUTING.md + historian/README finalized
Apr 17 - Apr 21:  Repo goes public
                  Origin story post drops (Karpathy loop → midnight brainstorm → Pantheon)
Apr 21 - May 6:   Community traction builds
                  Community gems arrive via PR
                  Peter Yang DM goes out (after repo has visible activity)
May 6:            Anthropic Developer Conference — SF
                  Pantheon is live, has community contributions, demo ready
```

**Buffer**: 2 weeks between public launch and conference. If Phase 1 slips, pull from buffer — conference date is fixed.

**Conference demo (90 seconds):**
Same problem, 3 patterns, 3 outputs. Show the stacking behavior live. That's the hook.

---

## What Ships in v0.2 (post-launch)

- Multi-platform adapters (cursor.md, openai.md)
- Historian agent public CLI (community can run their own research)
- Lineage reverse-lookup (trace any gem back to its earliest known origin)
- Graph index (relationships between gems, practitioners, events)
- Chronological sweep (Phase C: stone age forward)

---

## The Origin Story (for README + conference)

"I burned through a session's worth of Claude tokens because an agent automated a broken process instead of questioning whether it should exist. Classic Step 5 before Step 1.

I couldn't sleep. I opened Claude on my personal machine at midnight and talked through the frustration. The Musk Filter was already in my head — I'd applied it intuitively for years without naming it. That night it had a name. And so did the Andon Cord, and the Feynman Clarity Test.

None of these ideas are new. They've been in history books and biographies and manufacturing manuals for decades. Pantheon is the packaging. Your AI gets the shoulders of giants, available in the moment you need them."

---

*Spec approved: 2026-03-18*
*Next: implementation plan (writing-plans skill)*
