# Pantheon

<p align="center">
  <img src="assets/logo.svg" alt="Pantheon" width="600" />
</p>

> "Elon Musk didn't invent first principles thinking. Toyota didn't invent the factory stop. Steve Jobs didn't invent subtraction. Every modern genius is a synthesizer — standing on shoulders built across centuries of human problem-solving. Pantheon codifies those shoulders into a deployable AI library."

---

## What is Pantheon?

Pantheon is a library of executable cognitive patterns — distilled from history's greatest problem solvers and packaged as AI skills you can drop into any AI coding environment.

These are not quotes. Not principles. Not motivational frameworks. They are **protocols**: trigger conditions, step-by-step procedures, and anti-patterns that your AI can run when it detects the right context. History's best mental models, made executable.

Every pattern answers the same question: *what did this genius actually do differently when faced with this class of problem?*

---

## Live Dashboard

**[pantheon-lilac.vercel.app](https://pantheon-lilac.vercel.app)** — interactive force-graph visualization of all gems, practitioners, and historical events. Click any node to explore.

---

## Install (Claude Code)

```bash
curl -fsSL https://raw.githubusercontent.com/dkschrei/pantheon/main/install.sh | bash
```

Restart Claude Code after installing.

---

## Available Patterns

See [`PATTERNS.md`](PATTERNS.md) for the full dispatch table.

| Trigger | Pattern | Genius |
|---------|---------|--------|
| frustration signal / *"Why the \*\*\*\* did you just do that?"* | Andon Cord | Toyota |
| Any build/automate/create request | Musk Filter | Elon Musk |
| "Why isn't this working" / stuck debugger | Feynman Clarity Test | Richard Feynman |

> **Ever had that moment?** The one where your AI agent does something so wrong you swear out loud at your terminal.
> That word — the one you almost never use — is the most precisely calibrated frustration signal in human communication.
> Toyota solved this in 1960 with a physical cord anyone could pull to stop the entire production line.
> Pantheon installs that cord into your AI.

See [`PBNJ.md`](PBNJ.md) for the PB&J test — every pattern applied to the same problem so you can see exactly what each one does.

See [`PRACTITIONERS.md`](PRACTITIONERS.md) for the practitioner index — every historical figure mapped to the patterns they inspired.

---

## Pattern Format

Every pattern follows a canonical schema: trigger conditions, protocol, anti-pattern, real examples, and origin. See [`SCHEMA.md`](SCHEMA.md).

```
patterns/
  {pattern-name}/
    pattern.md          ← canonical content (platform-agnostic)
    adapters/
      claude.md         ← Claude Code skill
      cursor.md         ← (coming) .cursorrules entry
      openai.md         ← (coming) system prompt drop-in
```

---

## The Stacking Demo

Same problem. Three patterns. Three different lenses.

**Problem:** "I want to build a reporting dashboard."

**`/pantheon-musk-filter`:**
→ Who specifically requires this? What breaks without it? Delete 30% of scope first.

**`/pantheon-feynman-clarity`:**
→ Explain in plain English what decision this dashboard helps make.
  If you can't answer that, you don't understand the problem yet.

**`/pantheon-andon-cord`:**
→ (If you're adding this because your team is frustrated with existing reports)
  Stop. Ask: what broke and what were you trying to accomplish?

Three useful outputs. You synthesize. You decide. This is not a prompt library — it's a council of advisors.

---

## Why this exists

I burned through a session's worth of Claude tokens because an agent automated a broken process instead of questioning whether the process should exist. Classic Step 5 before Step 1. I needed the Musk Filter — I just didn't have it installed anywhere.

The Andon Cord came from the same frustration: agents that see you're stuck and keep going anyway, trying variation #4 of the same failed approach. Toyota solved this problem in 1960. It's a pull cord. Anyone can use it.

The patterns in this library are not new. They have been sitting in history books, biographies, and manufacturing manuals for decades. Pantheon is the packaging. Your AI gets the shoulders of giants, available in the moment you need them.

---

## Status

**v0.9 — Feature complete. Public launch: May 6, 2026 (Anthropic Developer Conference, SF)**

- [x] Schema v1.0 — YAML frontmatter + two-zone format (Protocol TLDR + The Book)
- [x] 33 gems — historian path (32) + authored path (1 ✦)
- [x] 9-criteria quality standard — 4 gates + 5 Pantheon challenges
- [x] Two gem paths — Historian agent loop + `/pantheon-gem-builder` for authored gems
- [x] 69 practitioners indexed across 78 pattern appearances
- [x] PB&J test — all 33 gems validated against the same input
- [x] Contributing open — see `CONTRIBUTING.md`
- [ ] Public launch — May 6, 2026

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full standard and both contribution paths.

Two ways in: the **historian path** (research a historical figure's defining move) and the **authored path** (`/pantheon-gem-builder` — patterns surfaced from lived experience). Both clear the same 9-criteria quality standard.

---

*Built by [@dkschrei](https://github.com/dkschrei) — 2026*
