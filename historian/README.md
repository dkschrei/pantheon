# Historian Agent

Open-sourced research tool. Run it to add gems to Pantheon and submit PRs.

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

## Quality Criteria

See `historian/pruning-criteria.md` — 4 gates every gem must pass.

## Manual Contribution

1. Read `SCHEMA.md`
2. Create `patterns/{name}/pattern.md` + `patterns/{name}/adapters/claude.md`
3. `bash tests/validate-schema.sh patterns/{name}/pattern.md`
4. `bash scripts/generate-patterns.sh`
5. Open a PR
