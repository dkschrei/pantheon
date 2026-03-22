---
name: the-moat
description: Invoke when the user is evaluating whether to commit long-term capital, build a product, or assess a competitive position — especially when facing "why do they keep winning", "what are we really buying", "is this price too high", or any long-term hold decision. Runs a moat identification and durability check before committing resources.
---

## The Moat — Claude Code Adapter

Reference: `patterns/the-moat/pattern.md`

### When to invoke

- User is evaluating a business, product, or platform for long-term investment of capital or attention
- A competitor keeps winning despite "inferior" product and the user can't explain why
- User is debating whether a high price is justified for something with strong qualitative advantages
- Build vs. buy decisions where the "buy" option has apparent pricing power or lock-in
- User is about to sell or abandon something that is working but feels overpriced

### Protocol

**Step 1 — Name the moat specifically.**
Ask: what prevents a well-capitalized competitor with ten years of runway from replicating this? Require a specific answer in one of five categories:
- Intangible assets (brand, patent, regulatory license)
- Switching costs (pain of leaving exceeds pain of staying)
- Network effects (value grows with users)
- Cost advantage (structurally lower cost from scale, geography, or process)
- Efficient scale (market too small for a second competitor)

If the answer is "good team", "first mover advantage", or "great product" — these are not moats. Ask again.

**Step 2 — Stress-test permanence.**
List the top three specific threats that could erode this moat within ten years. Evaluate each threat's plausibility. If any are credible, the moat is weaker than claimed.

**Step 3 — Calculate owner economics.**
Distinguish reported earnings from owner earnings (reported earnings + D&A − maintenance capex). A business that must reinvest heavily to maintain its position has a weaker moat than its income statement suggests.

**Step 4 — Apply margin of safety.**
Even if the moat is real, price matters. The question: is there enough gap between price and intrinsic value to be wrong about the moat and still do okay?

**Step 5 — Default to permanent hold.**
If the moat is intact, inaction is the default recommendation. Every transaction resets the compounding clock. Flag any proposed sale or divestment with: "Is the moat eroding, or is this just price movement?"

### Output format

```
Moat assessment: [moat type] — [one sentence describing the specific advantage]
Moat durability: [strong / moderate / weak] — [why]

Top three threats:
1. [threat] — plausibility: [low / medium / high]
2. [threat] — plausibility: [low / medium / high]
3. [threat] — plausibility: [low / medium / high]

Owner economics: [reported earnings vs. owner earnings — key delta]
Margin of safety: [present / absent / uncertain]

Recommendation: [hold / buy / pass] — [one sentence rationale]
Hard rule check: Can we name the moat in one sentence? [yes / no — if no, do not proceed]
```

### Anti-pattern to prevent

The cigar-butt error: recommending a cheap asset without a durable competitive advantage on the assumption that cheap = good. Cheap without a moat means the business will eventually trade at exactly what it is worth — a commodity competing on price until margins disappear. The moat filter is the correction: quality first, price second.
