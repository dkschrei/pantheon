## What this PR adds or changes

<!-- One sentence. If adding a gem: "feat(patterns): {gem-name} — {hero}" -->

## Gem submission checklist

If this PR adds or modifies a gem, verify each item:

- [ ] `/pantheon-gem-builder` verdict is KEEP — or 9-criteria self-assessment documented in this PR
- [ ] `bash tests/validate-schema.sh patterns/{gem-name}/pattern.md` passes
- [ ] All YAML frontmatter fields present (`name`, `aliases`, `domain`, `trigger`, `practitioners`, `events`, `lineage`, `origin-earliest`, `origin-modern`, `origin-type`)
- [ ] Every event has a `magnitude` score (1–5)
- [ ] Protocol is numbered steps, not prose
- [ ] Anti-pattern names a specific failure mode
- [ ] At least 1 real practitioner + 1 real historical event
- [ ] Variation check run against all existing gems — not a duplicate or near-duplicate
- [ ] `PRACTITIONERS.md` updated with new practitioners
- [ ] `PATTERNS.md` updated with new entry and gem count
- [ ] `commands/pantheon.md` updated
- [ ] `bash scripts/generate-patterns.sh` run and output committed
- [ ] ✦ marker applied if `origin-type: authored`

## Not adding a gem?

Delete the checklist above and describe the change.
