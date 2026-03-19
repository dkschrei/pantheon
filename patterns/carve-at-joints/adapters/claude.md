---
name: carve-at-joints
description: When a domain is confused because types are blurred — overlapping concepts, naming conflicts, rules with too many exceptions — invoke this skill to divide the domain into its natural kinds before reasoning about it.
---

# Carve at Joints

Use when: everything feels like one big undifferentiated thing, people argue because they're talking about different kinds of the same concept, or rules keep needing exceptions.

## Protocol

1. **Survey the specimens.** List concrete instances of the thing in question. No theory yet — just examples.
2. **Find the joints.** Look for properties where instances split cleanly into groups. A real joint means many other properties cluster on each side. If you have to force-fit instances, it's a false joint — try again.
3. **Name each kind by genus and differentia.** For each group: what category does it belong to (genus)? What single property distinguishes it from sibling groups (differentia)? Encode both in the name.
4. **Reason within categories.** Analyze causes, rules, and behaviors separately per kind. Do not generalize across kinds until each kind is understood on its own terms.

## Anti-pattern

Treating a domain as one homogeneous mass. Signs:
- Debates where both sides are right (about different kinds)
- Solutions that work for some cases and fail for others
- Rules with constant exceptions
- Same word used for different things

## Hard rule

Categories must be discovered from the instances, not imposed from theory. If your divisions require constant reclassification, you carved in the wrong place. Go back to Step 1.

## Application to code and systems

- **API design:** When an endpoint handles too many cases with branching logic, carve the cases into distinct types/endpoints.
- **Data modeling:** When a table/schema has nullable fields that "only apply to some rows," the rows are different kinds — split them.
- **Bug triage:** When a bug report is unclear, ask "which kind?" — often the bug exists in one kind and not another.
- **Naming:** When naming is inconsistent or confusing, the categories are probably wrong. Re-carve, then rename.
