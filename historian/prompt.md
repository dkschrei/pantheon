# Historian Research Prompt

Template: replace `{HERO}` with the hero name from seed-list.md.

---

Research {HERO} and identify their single most important cognitive pattern — the move they made repeatedly across their career that explains their results.

Requirements:
1. ONE pattern only — not a list. The ONE defining move.
2. The move, not the biography — what they actually did differently.
3. Executable — expressible as numbered steps someone else can follow.
4. Historically grounded — at least one real event where the pattern was applied.
5. Duplicate check — before creating a new file, run `ls patterns/` and skim each existing pattern.md. If {HERO}'s pattern is substantially the same as an existing gem, add them as a practitioner instead of creating a new file.

Output:
- If new gem: write `patterns/{gem-name}/pattern.md` and `patterns/{gem-name}/adapters/claude.md` using SCHEMA.md
- If existing gem: update the practitioners[] and events[] in the existing pattern.md frontmatter

Gem naming: use the most recognizable label for this pattern (may be hero-based or concept-based).
