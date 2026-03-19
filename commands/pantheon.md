---
description: List all available Pantheon patterns with trigger conditions and invoke instructions
---

# Pantheon — Cognitive Pattern Library

Executable mental models from history's greatest problem solvers. Drop them into any AI session.

---

## Available Patterns

| Command | Pattern | Genius | Trigger |
|---------|---------|--------|---------|
| `/pantheon-andon-cord` | Andon Cord | Toyota | Frustration signal — "going in circles", F-bomb, repeated failure |
| `/pantheon-musk-filter` | Musk Filter | Elon Musk | Any build / create / automate / add request |
| `/pantheon-feynman-clarity` | Feynman Clarity Test | Richard Feynman | "I don't understand why this isn't working" / debugging loops |

---

## Planned (v1.0)

| Pattern | Genius | Problem Class |
|---------|--------|---------------|
| Jobs Subtraction | Steve Jobs | Over-engineering / scope creep |
| Working Backwards | Jeff Bezos | Starting to build before defining done |
| Inversion | Charlie Munger | Can't see path forward |
| First Principles | Tesla / Musk | Iterating on broken instead of reimagining |
| Hamming's Question | Richard Hamming | Distraction from most important work |
| Kaizen | Toyota | Skipping steps that create rework |
| Shannon Compression | Claude Shannon | Signal vs noise |

---

## Usage

Invoke any pattern by name:
```
/pantheon-musk-filter
/pantheon-andon-cord
/pantheon-feynman-clarity
```

Patterns also auto-trigger when Claude detects the right context (if skills are installed).

---

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/dkschrei/pantheon/main/install.sh | bash
```

Restart Claude Code after installing.

---

*github.com/dkschrei/pantheon*
