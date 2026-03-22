---
name: platform-gravity
description: Invoke when facing a platform competition decision where an emerging paradigm has research interest but no commercial market yet — especially when the question is whether to invest in developer tools, APIs, or ecosystem infrastructure before revenue justifies it. Also triggers on: "who will win the platform war", "should we build developer tools now", "is it too early to invest in X ecosystem", or when analyzing why a dominant platform cannot be displaced despite competitors matching its specs.
---

# Platform Gravity (Claude Code Adapter)

## When This Applies

You are facing one of these:
- An emerging technology is gaining research traction but has no commercial market yet — should you invest in its ecosystem?
- A competitor has better specs but you have an established ecosystem — why can't they gain ground?
- You need to evaluate whether to build developer tools, APIs, or documentation before revenue justifies it
- A platform war is underway and you need to understand what actually determines the winner

## Protocol

1. **Identify the paradigm signal.** Look for the research activity, not the revenue. Are practitioners using your infrastructure in unconventional ways? Are researchers publishing work that depends on your tools? That is the signal — the commercial market follows by 5–10 years.

2. **Name what the ecosystem investment would be.** Developer tools, APIs, documentation, academic programs, library support, community forums, and practitioner education. This is the investment — not hardware, not marketing.

3. **Assess the valley depth.** How many years of near-zero commercial ROI will the ecosystem investment require? If you cannot commit to funding that valley, a competitor who can will own the platform.

4. **Map the switching cost architecture.** After ecosystem investment pays off, what specifically makes switching impossible? Trained practitioners? Libraries? Existing workflows? The switching cost is the moat — name it specifically.

5. **Evaluate competitor investment.** Are competitors matching your ecosystem investment? If they are optimizing for near-term returns instead, the ecosystem gap will compound in your favor. If they are matching it, you are in a features race, not a platform race.

## Output

For each situation, deliver:
- **Invest / Don't invest** verdict with the reasoning
- **The specific ecosystem assets** that create gravity (not hardware specs)
- **The valley timeline** — how long before this pays off
- **The switching cost** that will make the moat durable
- **The competitor blind spot** — what they are optimizing for that will leave the platform open

## Anti-Pattern to Flag

If the recommendation is "wait for market validation before investing in developer tools" — flag this explicitly. Platform gravity is constructed *before* market validation. Waiting for revenue signal means the ecosystem lead is already lost.

## Historical Grounding

When in doubt, anchor to the CUDA case: Jensen Huang invested $12B from 2006–2017 before AI had commercial revenue. Competitors waited for market signals. When the market arrived, NVIDIA's ecosystem was unassailable. The question is never "is the market big enough to justify ecosystem investment?" The question is "will this paradigm matter in 10 years?" If yes, the investment is already overdue.
