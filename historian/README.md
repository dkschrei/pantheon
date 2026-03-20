# Historian Agent

The historian path into Pantheon: research a historical figure's defining move, extract the cognitive pattern, validate against 9 criteria, publish the gem.

This is one of two paths. The other is the authored path (`/pantheon-gem-builder`) — patterns that surface from lived experience. Both paths clear the same quality standard.

## Run Phase 1 (Build)

```bash
git clone https://github.com/dkschrei/pantheon.git && cd pantheon
bash historian/loop.sh
```

Interactive — pauses after each hero. Review the generated gem, press ENTER to commit.

## Run Phase 2 (Prune)

```bash
bash historian/prune.sh
```

Generates `historian/pruning-report.md`. Review DELETE + MERGE sections. Check boxes and open a PR with the pruning-report.md for maintainer review.

## Quality Standard

See `historian/pruning-criteria.md` — 4 gates + 5 Pantheon challenges. All 9 must pass.

The 4 gates check whether the gem is well-formed. The 5 challenges check whether it deserves to be in Pantheon at all.

## Gem Classification

Historian gems carry `origin-type: historian` in YAML frontmatter — the practitioner's documented work is the primary source. No ✦ marker.

Authored gems (surfaced from lived experience, grounded in history after) carry `origin-type: authored` and are marked ✦ in indexes. See `/pantheon-gem-builder` for the authored path.

## Manual Contribution

1. Read `SCHEMA.md`
2. Create `patterns/{name}/pattern.md` + `patterns/{name}/adapters/claude.md`
3. `bash tests/validate-schema.sh patterns/{name}/pattern.md`
4. `bash scripts/generate-patterns.sh`
5. Open a PR — see `CONTRIBUTING.md` for the full PR checklist
