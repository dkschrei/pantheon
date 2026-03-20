# Contributing to Pantheon

Every gem that clears the quality standard makes the library more useful for every practitioner who installs it. The standard is deliberately high. Most ideas don't pass it. That's not a failure — it's what makes the library worth having.

---

## What makes a gem a true gem

One question: **what did this practitioner actually do differently when faced with this class of problem?**

Not what they believed. Not what they said. Not a philosophy or a framework. The specific cognitive move — the thing they did that others didn't, that explains the result.

A gem must clear 9 criteria: 4 quality gates (well-formed?) and 5 Pantheon challenges (worth having?).

See `historian/pruning-criteria.md` for the full standard.

---

## Two paths into Pantheon

### Path 1 — Authored ✦
A problem surfaces in lived practice. The pattern that solved it is extracted, distilled, and grounded in history after the fact. The origin is the lived experience; history confirms it is not new.

**Use:** `/pantheon-gem-builder` — runs the full 9-criteria intake and builds the gem if it passes.

### Path 2 — Historian
A historical figure's defining move is surfaced through deep research. The practitioner's documented work is the primary source. The gem is named for the pattern, not the person.

**Use:** `historian/loop.sh` — runs the historian agent against the seed list.

Both paths clear the same 9 criteria. Both paths produce the same gem format. The classification (`origin-type: authored` vs `origin-type: historian`) affects framing, not quality.

---

## The gem builder (authored path)

```
/pantheon-gem-builder
```

Runs a structured intake:
1. Capture — describe the situation and the insight
2. 4 quality gates — TRIGGER_SPECIFIC, EXECUTABLE, DISTINCT, GROUNDED
3. 5 Pantheon challenges — universal move, non-obviousness, named move, variation check, behavior change
4. Verdict — KEEP / REVISE / MERGE / DELETE
5. Classification — authored ✦ or historian
6. Build — all files created and indexes updated

If the verdict is REVISE or DELETE, the builder stops. Nothing is written. Fix the gem and run it again.

---

## The historian loop (historian path)

```bash
git clone https://github.com/dkschrei/pantheon.git && cd pantheon
bash historian/loop.sh   # Phase 1: build gems from seed-list.md
bash historian/prune.sh  # Phase 2: generate pruning-report.md
```

The prune phase applies all 9 criteria (4 gates + 5 challenges) to existing historian gems. Review `historian/pruning-report.md`, check boxes on DELETE and MERGE sections, open a PR.

---

## Manual contribution

If contributing without the builder or historian loop:

```bash
mkdir -p patterns/{gem-name}/adapters

# Write the gem using SCHEMA.md as template
# Validate
bash tests/validate-schema.sh patterns/{gem-name}/pattern.md
bash scripts/generate-patterns.sh

# PR
git checkout -b gem/{gem-name}
git add patterns/{gem-name}/ PATTERNS.md PRACTITIONERS.md
git commit -m "feat(patterns): {gem-name} — {hero}"
git push origin gem/{gem-name}
```

---

## PR checklist

- [ ] `/pantheon-gem-builder` verdict is KEEP (or 9-criteria self-assessment documented)
- [ ] `validate-schema.sh` passes
- [ ] All YAML frontmatter fields present, `origin-type` set correctly
- [ ] Protocol is numbered steps, not prose
- [ ] Anti-pattern names a specific failure mode
- [ ] ≥1 real practitioner + ≥1 real historical event
- [ ] Variation check run against all existing gems — not a duplicate or near-duplicate
- [ ] `PRACTITIONERS.md` updated with new practitioners
- [ ] `PATTERNS.md` and `commands/pantheon.md` updated with new entry and count
- [ ] ✦ marker applied if `origin-type: authored`

---

## What Pantheon is not

- A collection of good ideas
- A note-taking system for interesting concepts
- A thesaurus of variations on the same move
- A place for domain-specific techniques

Pantheon is a library of cognitive moves — specific, non-obvious, universally-applicable things that the best practitioners do when everyone else fails. The test: would a practitioner be meaningfully worse off not having this gem in their permanent context? If the answer is "probably not," it is not a Pantheon gem.
