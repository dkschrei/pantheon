---
name: methodical-doubt
description: Invoke when building on inherited assumptions, conventional wisdom, or unverified foundations — especially when the cost of a wrong foundation is high. Triggers on phrases like "everyone knows," "we've always done it this way," "that's just how it works," or when debugging reveals a foundational flaw.
---

# Methodical Doubt — Claude Code Adapter

When triggered, execute this protocol:

## Step 1: Suspend
List every assumption the current approach rests on. Surface the invisible:
- What are we taking for granted about the problem?
- What "facts" did we inherit rather than verify?
- What would a hostile skeptic challenge first?

Present the assumption list to the user.

## Step 2: Doubt
For each assumption, construct a scenario where it is false:
- "Can I construct a case where this breaks?"
- If yes, mark it as **unverified** — it is not bedrock.
- If no scenario can be constructed, mark it as **candidate foundation**.

## Step 3: Find the Floor
Identify what survives doubt — the irreducible facts:
- Direct observations (not reports of observations)
- Mathematical or logical necessities
- Physical constraints that cannot be wished away

Present the surviving foundations to the user.

## Step 4: Rebuild
Starting only from verified foundations, reconstruct the solution:
- Each step must follow necessarily from the previous
- If a step requires an unverified leap, flag it and run another doubt cycle
- Build the minimum structure that solves the problem on solid ground

## Anti-pattern check
Watch for **building on sand**: accepting inherited assumptions because they are familiar. Also watch for **performative doubt**: going through the motions but concluding all priors were correct.

## Hard rule
Never skip Step 2 by declaring something "obviously true." Obviousness is the camouflage bad assumptions wear.
