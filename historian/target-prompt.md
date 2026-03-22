You are building a gem for the Pantheon library. Research the following input and identify the single most important cognitive pattern it represents:

{TARGET}

## Step 1 — Classify each input

The input may be a single item or a comma-separated mix. For each item, determine its type:
- **Practitioner**: A person who applied a pattern (e.g. "Jensen Huang", "Elon Musk")
- **Organization/Subject**: A company, institution, or domain (e.g. "Nvidia", "Toyota", "Bell Labs")
- **Historical Event**: A significant moment or era (e.g. "AI Arms Race", "Manhattan Project", "2008 Financial Crisis")
- **Concept/Method**: An idea, technology, or approach (e.g. "GPU computing", "kaizen", "CUDA")

For each item identified, briefly note: what is this? What is it primarily known for?

## Step 2 — Find the connecting pattern

What is the single cognitive move that best explains the result across all the inputs? If the items represent different patterns, pick the most significant or novel one not already in the library.

The pattern must be:
1. ONE pattern only — the ONE defining move or mental model
2. The move, not the biography — what was actually done differently that explains the result
3. Executable — expressible as numbered steps someone else can follow today
4. Historically grounded — at least one real event where the pattern was applied (or violated)
5. Distinct — run `ls patterns/` and skim existing patterns. If this pattern is substantially the same as an existing gem, add the new practitioners/events to that gem instead of creating a new file

## Step 3 — Map practitioners and events

For each practitioner identified in Step 1:
- Add them to the gem's `practitioners[]` with their era and how they applied the pattern

For each organization or historical event identified in Step 1:
- Add as an entry in `events[]` with year and gem-role (applied/violated + brief description)

For eras and organizations (not individual people):
- Identify the person most responsible for the pattern in that context
- Use the event/era as the primary evidence in events[]
- Name the gem after the pattern itself, not the event or person

## Output

- If new gem: write `patterns/{gem-name}/pattern.md` and `patterns/{gem-name}/adapters/claude.md` using SCHEMA.md
- If existing gem: update practitioners[] and events[] in the existing pattern.md frontmatter

Gem naming: use the most recognizable label for the underlying cognitive pattern. Prefer concept names over person names unless the person IS the concept (e.g. "feynman-clarity").

Add discoverable aliases: include the names of key practitioners, organizations, and concepts as aliases so users can find this gem by searching any of the input terms.

## YAML Safety Rules (CRITICAL — read before writing frontmatter)

The pattern.md frontmatter is parsed by a strict YAML parser. Violations break the entire build. Follow these rules without exception:

1. **Single-quote ALL `application:` values** — they always contain complex text. No exceptions.
   ```yaml
   application: 'Invested $12B in CUDA before AI had commercial revenue — seeding the ecosystem a decade early'
   ```

2. **Single-quote ALL `gem-role:` values** — they contain em dashes (—) and complex descriptions.
   ```yaml
   gem-role: 'applied — Huang launched CUDA in 2006 and invested $12B over the next decade'
   ```

2b. **Add `magnitude: N` to every event** — integer 1–5, no quoting needed. Score the historical impact of the event itself, not just its relevance to the gem. See SCHEMA.md for the scale. This is a judgment call — make a defensible choice and move on.
   ```yaml
   magnitude: 4
   ```

3. **Only use schema-defined fields** in frontmatter. The valid fields are: `name`, `aliases`, `domain`, `trigger`, `practitioners` (with sub-fields: `name`, `era`, `application`), `events` (with sub-fields: `name`, `year`, `gem-role`), `lineage`, `origin-earliest`, `origin-modern`, `origin-type`. Do NOT add extra fields like `outcome`, `practitioner`, `context`, `result`, or any other invented sub-fields.

4. **Escape single quotes inside single-quoted values** by doubling them: `'it''s fine'`

5. **Flow arrays `[...]`** for short lists: `aliases: [cuda, nvidia, huang]`

After writing, run:
  bash scripts/generate-patterns.sh
  bash scripts/generate-practitioners.sh
  python3 scripts/generate-commands.py .
