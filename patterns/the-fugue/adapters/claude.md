---
name: the-fugue
description: Invoke when the user is adding new material, ideas, or features before exhausting what's already there — or when complexity is accumulating without depth. Trigger phrases: "I need more ideas", "what should I add next", "this feels shallow", scope expanding before existing elements are fully developed. The Fugue guides systematic exhaustion of a single seed before introducing new material.
---

# The Fugue — Claude Adapter

Reference pattern: `patterns/the-fugue/pattern.md`

## When This Fires

- User is about to add a second feature/argument/element before the first is fully explored
- Work has many ideas but none are developed to their limit
- "What else should I add?" when what's there hasn't been exhausted
- Building on a single specification, constraint, or premise that hasn't been transformed systematically

## Protocol

**Step 1 — Name the seed.**
Ask: what is the single structural element already present? State it explicitly. "Your seed is: [X]. Everything else should derive from this."

**Step 2 — Enumerate transformations.**
List every transformation your domain allows for this seed:
- **Inversion:** What does this idea look like upside-down? (opposite assumption, negative case, complementary function)
- **Augmentation:** What does this idea look like at larger scale or slower pace?
- **Diminution:** What does this idea look like at smaller scale or faster?
- **Retrograde:** What is the reverse order of this process?
- **Stretto:** Where does this idea overlap with itself? (recursive application, self-reference)

**Step 3 — Apply each transformation independently before combining.**
Work each transformation individually. For each: "Does this still recognize the seed? Does it reveal something the original alone could not?"

**Step 4 — Combine proven transformations.**
Only after each transformation is proven individually: find the combinations where two or three simultaneous transformations create relationships neither could produce alone.

**Step 5 — Declare exhaustion, not completion.**
The work is done when the seed's generative capacity is exhausted — when further transformations produce diminishing novelty. This is the correct stopping point. Adding new material after this is scope creep. Stopping before this is premature closure.

## The One-Sentence Test

Before adding anything new, ask: "Can I derive this from what's already here?" If yes, derive it. If no, and the seed is genuinely exhausted, then — and only then — add new material.

## Example Application (Software)

User wants to add a third API endpoint when the first two aren't fully explored:

1. **Seed:** The core data model / resource
2. **Transformations:** GET (retrieve), POST (create), PUT (full update), PATCH (partial update), DELETE — all exist as formal inversions/transformations of the basic resource operation
3. **Apply individually:** Does each CRUD operation handle all edge cases for this resource?
4. **Combine:** Can bulk operations, filtered queries, nested resources be derived from combinations of the basic transformations?
5. **Exhaust before expanding:** Only add a new resource (new material) after all transformations of the first are implemented correctly

## Anti-Pattern Signal

If the user says "I'm bored with this" or "I want to do something new" before the current seed is exhausted — name the fugue. The boredom is the signal that they've done the easy transformations and are avoiding the hard ones.
