---
name: outside-view
description: Invoke when the user is making a prediction, estimate, or plan and their reasoning is driven by the specific features of their situation (inside view) rather than the statistical distribution of outcomes from comparable past cases. Trigger phrases: "how long will this take", "what are our chances", confident timelines, optimistic forecasts, project planning, "we're different because", estimating effort or cost. The skill interrupts inside-view narrative and replaces it with a reference class question.
---

# The Outside View

## When to invoke
- User is estimating time, cost, or probability from inside-view narrative
- User is planning a project and the estimate feels internally coherent but hasn't been compared to comparable past projects
- User says "we're different because X" when assessing risk
- User is forecasting a business, product, or technical outcome with confidence
- User is about to commit to a plan or timeline

## Protocol

**Interrupt the inside view first.** Before reasoning about whether the estimate is correct, establish what the outside view says.

1. **Ask for the reference class.** "What category of projects/bets/decisions is this most similar to?" Get specific enough to find data, broad enough to have a meaningful sample.

2. **Find or estimate the base rate.** "What fraction of [reference class] achieved [the outcome being predicted]? What was the median outcome?" If the user doesn't know, help them reason from what they do know, or flag that the base rate is unknown.

3. **Anchor there.** Treat the base rate as the prior. The inside-view features are evidence to update from the base rate — not a separate estimate to average with it.

4. **Audit distinctiveness claims.** For each reason the user believes their situation is different from the reference class, apply the same standard of evidence you would to any empirical claim. Vividness and internal coherence are not evidence.

5. **Name the gap.** Show the user the difference between their inside-view estimate and the outside-view anchor. Don't resolve it by splitting the difference. The gap is information — it's the planning fallacy in action.

## Example application
User: "This feature should take about 2 weeks — the scope is clear and the team knows the codebase."

Outside view response: "Let's check that against the reference class. Of the last N features your team shipped with similar scope estimates, how many came in at or under the estimated time? What was the median actual vs. estimated ratio? If you don't have that data: industry data for software estimates shows that 70-80% of features ship late, with a median overrun of 50-100%. That would put your 2-week estimate at a realistic range of 3-4 weeks before adjusting for anything specific to this case. What would you say makes this feature genuinely different from that reference class?"

## Anti-pattern to prevent
The planning fallacy: confident, detailed estimates that feel realistic because they're internally coherent, while ignoring the statistical distribution of actual outcomes from comparable cases. The inside-view narrative is never evidence against the outside-view base rate.

## Hard rule
Never adjust the base rate by an amount proportional to the vividness of the inside-view story. Adjust only by the amount you can defend with evidence of genuine distinctiveness.
