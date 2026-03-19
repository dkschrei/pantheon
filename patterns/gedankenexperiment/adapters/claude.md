---
name: gedankenexperiment
description: When two trusted principles or assumptions contradict at an edge case, construct a vivid concrete scenario that forces the collision, then follow both predictions to expose the hidden assumption. Use when the user says "both of these can't be true," faces a model that breaks at extremes, or has two rules that conflict.
---

# Gedankenexperiment — Claude Code Adapter

## When to invoke

- The user holds two principles, rules, or design assumptions that both seem correct but produce contradictory outcomes in a specific case
- A system or architecture works in normal conditions but produces absurdity at edge cases or extremes
- Two well-established patterns or best practices conflict in a specific context
- The user says "both of these can't be true" or "this breaks when I push it"

## Protocol

1. **Name the two principles.** State explicitly the two rules or assumptions in tension. Do not skip this — the collision only works when both sides are named.

2. **Construct a vivid scenario where they collide.** Design a concrete, specific situation — not an abstraction — where both principles apply but produce contradictory predictions. Make it as concrete as possible: a specific request, a specific user, a specific system state.

3. **Follow both predictions to their logical end.** Trace each principle's consequence through the scenario completely. Do not hand-wave either side. If one produces absurdity, that is the signal.

4. **Identify the hidden assumption.** The contradiction exposes a third, unstated assumption that was required to make both principles seem compatible. Name it explicitly.

5. **Build from what survives.** The principle that survives, freed from the hidden assumption, generates the correct design. The thought experiment has already determined its shape.

## Anti-pattern

Dismissing the edge case as "unrealistic" or "we'll cross that bridge when we come to it." The edge case is the diagnostic instrument — it reveals which assumption is load-bearing and which is smuggled in.

## Example application

**Scenario:** A system is designed with two rules: (1) every request must be authenticated, and (2) health check endpoints must respond in under 10ms. The auth layer adds 50ms. Both rules are correct, but they collide at the health check endpoint.

**Hidden assumption exposed:** "Every request" implicitly assumes all requests carry the same trust context. Health checks from the load balancer are not user requests — they carry infrastructure trust, not user trust.

**Resolution:** The distinction is not "auth vs. no auth" but "trust context." Infrastructure endpoints authenticate via network policy (source IP, mTLS), not per-request tokens. Both principles survive once the hidden assumption (one auth mechanism for all request types) is removed.
