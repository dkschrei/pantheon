---
name: two-way-door
aliases: [bezos-door, reversibility-gate, type1-type2, one-way-two-way]
domain: [decision-making, leadership, engineering, systems]
trigger: [decision paralysis, over-analysis, slow execution, fear of commitment, analysis paralysis, should we wait for more data]
practitioners:
  - name: Jeff Bezos
    era: 1994-present
    application: Built Amazon into the world's largest e-commerce and cloud company by moving fast on reversible decisions and deliberating only on irreversible ones
events:
  - name: Bezos Leaves D.E. Shaw to Found Amazon
    year: 1994
    gem-role: applied — classified the decision as a one-way door, applied his regret minimization framework, decided the regret of not trying outweighed the risk of failure
  - name: Launch of Amazon Web Services
    year: 2006
    gem-role: applied — AWS started as internal infrastructure experiments (two-way doors), iterated rapidly through dozens of service designs before committing to the public platform (one-way door)
  - name: Amazon Prime Launch
    year: 2005
    gem-role: applied — free two-day shipping was a massive financial commitment (one-way door) that Bezos deliberated carefully, requiring detailed modeling before greenlighting, while individual fulfillment experiments leading up to it were treated as two-way doors
  - name: Fire Phone Failure
    year: 2014
    gem-role: applied — Bezos treated the Fire Phone as a two-way door bet, moved fast, lost an estimated $170M, but absorbed the loss and redeployed the team to Echo/Alexa, which succeeded
  - name: Kodak's Digital Camera Hesitation
    year: 1975-2012
    gem-role: violated — Kodak invented the digital camera in 1975 but treated every move into digital as a one-way door threatening their film business, deliberating for decades while competitors moved, ultimately filing for bankruptcy in 2012
lineage: Sun Tzu → Boyd (OODA Loop) → Bezos
origin-earliest: Sun Tzu-500bc
origin-modern: Bezos-1997
---

# Two-Way Door

## Protocol

**Trigger:** You face a decision and the team is slowing down to analyze, debate, or gather more data before acting.
**Steps:**
1. **Classify the door.** Ask: "If this decision is wrong, can we reverse it at acceptable cost within a reasonable timeframe?" If yes → two-way door. If no → one-way door.
2. **Two-way door → move fast.** Decide with ~70% of the information you wish you had. Assign an owner, set a review date, ship it. Do not convene a committee.
3. **One-way door → slow down.** Escalate to the right level. Demand the six-page memo. Model the consequences. Sleep on it. This is the only type that earns heavy process.
4. **After acting, watch the door.** Set a concrete check-in (1 week, 1 month). If a two-way door turns out wrong, walk back through it quickly — no post-mortems, no blame, just reverse.
**Anti-pattern:** Treating every decision as a one-way door — the "Day 2" disease where process accretes, speed dies, and the organization becomes unable to experiment.
**Hard rule:** Never apply one-way-door process to a two-way-door decision. The cost of slowness on reversible decisions compounds faster than the cost of being occasionally wrong.

---

## The Book

### The Pattern

Bezos observed that most organizational dysfunction comes from a single misclassification: treating reversible decisions with the gravity reserved for irreversible ones. The result is a company that moves at the speed of its most cautious process for every decision, regardless of stakes. His move was to split the world in two — one-way doors (irreversible, high-consequence) and two-way doors (reversible, low-consequence) — and run completely different operating systems for each. Two-way doors get speed; one-way doors get rigor. The discipline is in the classification, not the decision itself.

### Protocol (extended)

**Step 1 — Classify the door.**
The entire pattern hinges on this step. Most decisions are two-way doors, but organizational instinct is to treat them as one-way. Ask three questions:
- What is the worst case if this is wrong?
- Can we undo it? How long would that take?
- What do we lose by waiting another week/month to decide?

If the undo cost is low relative to the delay cost, it's a two-way door.

**Step 2 — Two-way door: move fast.**
Bezos's 2016 shareholder letter: "Most decisions should probably be made with somewhere around 70% of the information you wish you had. If you wait for 90%, in most cases, you're probably being slow." For two-way doors, the decision should be made by a small team or individual with context, not escalated up the chain. Speed is the variable you're optimizing.

**Step 3 — One-way door: slow down.**
One-way doors are rare but existential: major acquisitions, platform architecture that creates lock-in, pricing models that set customer expectations, public commitments. These deserve Amazon's famous six-page narrative memo, broad input, and genuine deliberation. The key insight is that slowing down here doesn't feel inefficient because you've already accelerated everything else.

**Step 4 — Watch the door.**
A two-way door only stays two-way if you actually monitor and reverse when needed. Set explicit check-in dates. When a two-way door experiment fails, reverse it immediately with zero stigma. Bezos famously said: "If you double the number of experiments you do per year, you're going to double your inventiveness."

### Anti-Pattern (extended)

The anti-pattern is **"Day 2"** — Bezos's term for organizational death. Day 2 companies apply heavyweight process uniformly: every decision requires a meeting, every feature requires a committee, every change requires sign-off from people who lack context. The result is that reversible decisions take weeks instead of hours, experiments stop happening, and the organization optimizes for avoiding mistakes rather than creating value.

Real symptoms:
- A two-pizza team needs VP approval to launch an A/B test
- Engineers write design docs for changes they could ship and revert in an afternoon
- "Let's wait for Q3 planning" applied to a feature that takes two days to build
- Post-mortems on failed experiments that were explicitly designed to be reversible

### Examples

**Amazon's "Just Do It" Awards.** Bezos created an internal award for employees who took action on their own initiative, even when the action turned out to be wrong. The award specifically celebrated the *decision to act* on two-way doors rather than waiting for permission. This institutionalized the pattern: you were rewarded for correct classification (this is reversible → act fast) regardless of outcome.

**The Regret Minimization Framework (1994).** When deciding to leave D.E. Shaw, Bezos projected himself to age 80 and asked which he'd regret more: trying and failing, or never trying. This is the one-way door protocol in its purest form — when a decision is irreversible (you can't un-leave a hedge fund career at the same level), you need a different decision framework than expected value. You need to model regret.

**AWS's Experimental Architecture.** AWS didn't launch as a grand plan. It started with internal services (S3, EC2) that were experiments — two-way doors. Amazon could have unwound them if they failed. But once they opened the platform to external customers and developers built on it, it became a one-way door — you can't shut down infrastructure that thousands of companies depend on. Bezos correctly identified the transition point and applied different decision processes before and after.

**Fire Phone → Echo.** The Fire Phone (2014) was treated as a two-way door bet: expensive to build, but Amazon could absorb a failure. When it flopped, the team and technology were redirected to build the Amazon Echo and Alexa platform. A Day 2 company would have spent years in post-mortems and been afraid to make the next hardware bet. Bezos reversed through the door and walked through a better one.

### Practitioners

**Jeff Bezos** — Articulated and operationalized this pattern across Amazon for over two decades. Every annual shareholder letter from 1997 onward reinforces the distinction. Amazon's structural decisions — two-pizza teams, single-threaded owners, the six-page memo for big decisions — all derive from this classification. The result: a company with 1.5 million employees that still launches experiments at startup speed.

### Historical Events

**Bezos Leaves D.E. Shaw (1994).** Jeff Bezos was a 30-year-old SVP at D.E. Shaw, one of the most prestigious hedge funds on Wall Street. He identified the internet's growth rate (2,300% per year) and saw an opportunity in online retail. This was a genuine one-way door — leaving a lucrative career at the top of finance. He applied what he later called the "Regret Minimization Framework": project to age 80, ask which path you'd regret not taking. The answer was clear. He drove to Seattle and started Amazon in a garage.

**AWS Launch (2006).** Amazon Web Services started as a solution to Amazon's own infrastructure scaling problems. Internal teams built services (storage, compute) that happened to be useful independently. Bezos recognized that offering these externally was initially a two-way door — if it didn't work, they still had internal infrastructure. But he also recognized the transition to one-way: once external customers depended on AWS, shutting it down was unthinkable. The careful classification let Amazon move fast during experimentation and commit fully once the door swung one way.

**Kodak's Collapse (1975-2012).** The anti-example. Kodak engineer Steve Sasson invented the digital camera in 1975. For 37 years, Kodak's leadership treated every digital initiative as a one-way door that threatened their film business. They studied, piloted, hedged, and deliberated while competitors (Canon, Sony, then smartphones) walked through the two-way door repeatedly. By the time Kodak committed to digital, it was too late. Filed for bankruptcy in 2012.

### Lineage

The distinction between reversible and irreversible actions appears in military strategy as early as **Sun Tzu** (~500 BC), who distinguished between "death ground" (irreversible commitment) and "open ground" (freedom to maneuver and retreat). **John Boyd** formalized this into the OODA Loop in the 1960s-70s: Observe-Orient-Decide-Act, where the speed of iteration through reversible decisions creates a decisive advantage. Boyd showed that fighter pilots who cycled faster through two-way-door decisions (maneuvers that could be reversed) overwhelmed opponents stuck in one-way-door thinking. **Jeff Bezos** translated this into organizational architecture: structure the company so that two-way doors are fast by default, and reserve heavyweight process exclusively for the rare one-way doors.

### Origin

The earliest articulation of this pattern in Bezos's own words appears in his **1997 Letter to Shareholders**, where he wrote about making "bold rather than timid investment decisions where we see a sufficient probability of gaining market leadership advantages." But the framework crystallized publicly in his **2015 Letter to Shareholders**, where he introduced the Type 1 / Type 2 language explicitly:

> "Some decisions are consequential and irreversible or nearly irreversible — one-way doors — and these decisions must be made methodically, carefully, slowly, with great deliberation and consultation. If you walk through and don't like what you see on the other side, you can't get back to where you were before. We can call these Type 1 decisions. But most decisions aren't like that — they are changeable, reversible — they're two-way doors. If you've made a suboptimal Type 2 decision, you don't have to live with the consequences for that long. You can reopen the door and go back through."

Bezos identified that as companies grow, there is a natural tendency to apply the Type 1 process to Type 2 decisions — and that this tendency, if unchecked, is what kills them. The two-way door framework is his answer to the question every founder faces: how do you stay fast at scale?
