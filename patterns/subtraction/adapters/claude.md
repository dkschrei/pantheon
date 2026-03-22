---
name: subtraction
description: Invoke when the user is starting creative, design, or system work — or when they are about to add something to an existing thing. Trigger phrases: "what should I add", "what would make this better", "I want to expand/enhance/improve this", blank-canvas problems, scope creep, refactoring decisions, editing prose, architecture reviews, product direction. The pattern reframes creation as excavation: the ideal form pre-exists in the material; the work is removing what isn't it.
---

# Subtraction — Claude Code Adapter

Reference canonical pattern: `patterns/subtraction/pattern.md`

## When to invoke

- User asks "what should I add to X?"
- User is designing from scratch with no clear north star
- User is refactoring and unsure what to keep
- User is editing prose, a spec, or a product design and scope is growing
- User says something "feels cluttered" or "has too much going on"
- User is about to build something and hasn't stated what the finished ideal looks like

## The Protocol

Apply the 5 steps in order. Do not skip Step 1 — if the ideal isn't clear, the rest fails.

### Step 1: Form the ideal completely first

Before recommending any action, ask the user (or determine from context): *What is the one thing this should do — stated in one sentence, with no qualifications?*

If the user can't state it, help them find it before proceeding. Do not begin subtracting toward an unclear target.

### Step 2: Inventory everything present

List every element currently in the thing — all features, all functions, all sections, all components. Be exhaustive. Do not evaluate yet; only list.

### Step 3: Apply the subtraction question to each element

For each element: *Does the ideal from Step 1 require this?*

Not: is this well-made? Not: did this take effort? Only: does the ideal require it?

Mark each element: required / not required / uncertain.

### Step 4: Remove what's not required

Act on the not-required elements first. For uncertain elements, ask: if I removed this, would the ideal be less visible? If no — remove it.

When suggesting code changes, spec changes, or design changes: frame every recommendation as a removal, not an addition. "Remove X" before "add Y." If you must add, explain specifically what element of the ideal cannot be revealed without the addition.

### Step 5: Stop when revealed

Before declaring work complete, run the inventory again. Is every remaining element required by the ideal? If anything is not, continue.

## Anti-patterns to name if you see them

- **Additive spiral**: "What if we also added..." — redirect to the ideal and the subtraction question
- **Sunk-cost block**: "We can't remove that, it took three weeks" — the ideal doesn't care about sunk cost
- **Premature excavation**: Beginning work before the ideal is stated — return to Step 1

## Example applications

**In code review:**
State the ideal (what this module should do). Inventory all functions. Ask for each: does the ideal require this function? If no, remove it. A function that is well-written but doesn't serve the ideal is excess marble.

**In writing/docs:**
State the ideal (what one thing should this document convey?). For each section: does the ideal require this? Cut ruthlessly. The goal is not shorter writing — it is writing from which nothing can be removed without obscuring the ideal.

**In product/feature decisions:**
State the ideal (what problem does this product solve, for whom, with what constraint?). For each feature: does the ideal require this feature? Not "would users like it" — does the *ideal* require it? If not, remove it before shipping.

**In architecture:**
State the ideal (what should this system do, stated as a contract?). For each service, each abstraction, each data store: does the ideal require this component? If not, remove it. Components that are technically sound but not required by the ideal are architectural excess.

## The hardest part

The method fails if Step 1 is skipped or approximate. Claude's job when applying this pattern: demand specificity on the ideal before doing anything else. If the user says "a good product" or "a clean codebase," that is not an ideal — it is an aspiration. An ideal is specific enough that the subtraction question produces a binary answer: required or not.

Push until the ideal can be stated as a falsifiable contract: "This does X, for Y, by doing Z, and nothing else." Then subtract toward it.
