---
name: feynman-clarity
aliases: [feynman-technique, explain-it-simply, rubber-duck-debugging, clarity-test]
domain: [debugging, learning, communication, problem-solving]
trigger: ["I don't understand why", "why isn't this working", stuck debugging loop, "it should work but doesn't", can't explain simply]
practitioners:
  - name: Richard Feynman
    era: 1940-1988
    application: Manhattan Project debugging, Challenger investigation, physics education reform
  - name: Albert Einstein
    era: 1905-1955
    application: general relativity via thought experiments — plain-language mental models before mathematics
  - name: Socrates
    era: 470-399bc
    application: Socratic method — expose contradictions in assumed knowledge through simple questions
events:
  - name: Manhattan Project debugging
    year: 1943-1945
    gem-role: applied — Feynman found critical calculation errors by demanding plain-language explanation of every assumption
  - name: Challenger disaster investigation
    year: 1986
    gem-role: applied — Feynman bypassed NASA bureaucracy, asked simple questions, demonstrated O-ring failure with ice water in 30 seconds
  - name: Feynman Lectures on Physics
    year: 1961-1963
    gem-role: applied — rebuilt physics curriculum using plain-language explanation as quality bar
lineage: socratic-method-470bc → aristotle-analytics-350bc → descartes-clear-ideas-1637 → einstein-thought-experiments-1905 → feynman-clarity-1950s
origin-earliest: socrates-470bc
origin-modern: feynman-1950
---

# Richard Feynman — Feynman Clarity Test

## Protocol  ← TLDR zone (always at the top)

**Trigger:** "I don't understand why this isn't working" / debugging loop with no progress after 2+ attempts / explanation of the bug keeps growing in complexity

**Steps:**
1. STOP — close all debuggers, logs, and tool output
2. State the goal in one sentence (plain English, no jargon)
3. State what it's actually doing in one sentence (plain English)
4. Walk the gap step by step as if teaching a 12-year-old — stop at the first step you can't explain simply
5. That step = the root cause. Investigate it specifically.
6. Fix the root cause, not the symptom you've been chasing

**Anti-pattern:** Adding more logs, more tools, more data while the root cause remains unexplained

---

## The Book  ← depth zone (always at the bottom)

### The Pattern

Richard Feynman's teaching method: if you cannot explain something simply, you don't understand it yet. The corollary for debugging: if you cannot explain each step of why something fails in plain language — no jargon, no hand-waving — you have not yet identified the root cause. You've identified a symptom.

The technique is to stop all tools and logs and explain the system aloud as if teaching a 12-year-old. The moment you cannot explain a step simply is the moment you've found the gap.

### Protocol (extended)

1. **Stop** — close all debuggers, logs, and tool output. No more data until step 5.
2. **State the goal** — in one sentence, plain English: "This system should [do X] when [Y happens]."
3. **State what it's doing** — in one sentence, plain English: "Instead, it's [doing Z]."
4. **Walk the gap** — explain every step between the goal and the actual behavior as if teaching a 12-year-old. For each step, ask: "Why?" If the answer is "I don't know" or requires jargon, stop — you've found the gap.
5. **The step you can't explain simply = the root cause.** Investigate that specific step now.
6. **Fix the root cause**, not the symptom you've been chasing.

**Rationale for step 1 (stop all tools):** More data without clearer thinking produces more confusion. The investigation must pause before it can reset.

**Rationale for step 4 (12-year-old standard):** Jargon is a hiding place for gaps. "The middleware layer intercepts the request" is not an explanation — "the request goes through X before reaching Y" is. If you can't say the latter, you don't know what X does.

### Anti-Pattern (extended)

Adding complexity to the investigation while the root cause remains unexplained. More logs. More print statements. More tools. More variations of the same failing approach. The investigation grows larger but understanding doesn't grow deeper.

Other violations:
- "It must be a [framework/library/environment] bug" — before being able to explain exactly why
- Asking for someone else to look at it before completing steps 2-4 yourself
- Accepting "it just works now" after a random change — without understanding why
- Jumping to solutions before the diagnosis is complete

### Examples

**Correct application — Null pointer hunt:** An engineer spends an hour on a null pointer exception. Tools show where it crashes. Step 1: stop tools. Step 2: "The user object should be populated after login." Step 3: "It's null when the profile page loads." Step 4: walking the gap — "Login sets the user... session stores it... profile page retrieves it from session... wait, I can't explain why the session variable is accessible at login but not at profile load. That's the gap." Root cause found: session scope mismatch.

**Classic violation — The growing investigation:** Agent is asked why an API call fails. Agent checks logs, adds more logging, tries a different endpoint, checks network tab, searches Stack Overflow, tries a header variation. 45 minutes pass. The investigation has grown but understanding hasn't. Feynman Clarity Test applied: "Walk me through the auth flow." — "It sends the token... wait, I can't explain which token it sends or where it came from." Gap found immediately.

### Practitioners

**Richard Feynman (1918–1988)**
Theoretical physicist who won the Nobel Prize in 1965. His rule: if you cannot explain something in plain language without jargon, you've memorized it — you haven't understood it. Applied as a debugging tool: when something wasn't working, stop and explain it from scratch until the gap becomes obvious.

**Albert Einstein (1879–1955)**
Derived general relativity through thought experiments — plain-language mental models — before mathematics. His principle: "If you can't explain it simply, you don't understand it well enough."

**Socrates (470–399 BC)**
Original practitioner. The Socratic method: stop, ask simple questions, expose contradictions in assumed knowledge. Socrates claimed superiority only in knowing he didn't know — that epistemic humility is the foundation of the clarity test.

### Historical Events

**Manhattan Project (1943–1945)**
Feynman joined at 24 and became known for finding errors senior physicists had missed — not through superior mathematics, but by asking "explain this to me simply" until the error surfaced.

**Challenger Investigation (1986)**
Feynman bypassed NASA's formal process, called engineers directly, and asked simple questions. Discovered that NASA managers and engineers had different failure probability estimates: 1-in-100 vs 1-in-100,000. Demonstrated O-ring failure live on television with a glass of ice water in 30 seconds. The clarity test applied to an engineering disaster.

**Feynman Lectures on Physics (1961–1963)**
Caltech asked Feynman to teach introductory physics. He rebuilt the curriculum from scratch: if a concept couldn't be explained without jargon, the curriculum didn't understand it well enough yet. The lectures are still in print.

### Lineage

Socratic method (470 BC) → Aristotle's first principles explanation (350 BC) → Descartes' clear and distinct ideas (1637) → scientific method plain-language hypothesis (Enlightenment) → Einstein's thought experiments (1905) → Feynman's clarity rule (1950s) → rubber duck debugging (1999, *The Pragmatic Programmer*)

### Origin

Feynman developed his approach at MIT and Princeton, noticing that many physicists could manipulate equations without understanding what they described. His test: explain it without the equations.

The technique became formalized posthumously as the "Feynman Technique": choose a concept, explain in plain language as if teaching a child, identify where the explanation breaks down, return to source, repeat until smooth. The debugging application is a direct translation: treat a broken system like a physics problem. Explain it from first principles. The gap in your explanation is the bug.
