---
description: Access Pantheon gems on demand. /pantheon list — show all gems. /pantheon <gem> show — display gem. /pantheon <gem> load — load into context. /pantheon <gem> launch — invoke immediately.
---

# Pantheon Dispatcher

Arguments received: $ARGUMENTS

Parse the arguments and execute exactly one of the following actions:

---

## `list` (or no arguments)
Output the gem index table below. Nothing else.

## `<gem-name> show`
Read the file `~/.claude/pantheon/<gem-name>.md` and display its full content.
If the file does not exist, say: "Gem not found: <gem-name>. Run /pantheon list to see available gems."

## `<gem-name> load`
Read the file `~/.claude/pantheon/<gem-name>.md`, confirm it is active, and say:
"Loaded: **<gem-name>**. Protocol is active for this session."
Then briefly (2-3 lines) state what the gem does and when to invoke it.

## `<gem-name> unload`
Acknowledge the gem is no longer active. Say: "Unloaded: **<gem-name>**."

## `<gem-name> launch`
Read the file `~/.claude/pantheon/<gem-name>.md` and immediately begin executing its protocol against the current conversation context. Do not describe what you are about to do — just run it.

---

## Gem Index

| Gem | Trigger |
|-----|---------|
| andon-cord | frustration signal |
| anomaly-isolation | anomalous data |
| antifragility | building something that needs to survive uncertainty |
| axiom-blitz | messy domain with no formal foundation |
| build-the-machine | monumental goal |
| cannae | enemy has superior mass |
| carve-at-joints | messy domain with no clear categories |
| complementarity | two valid but contradictory frameworks |
| composition-trap | system stuck despite everyone acting rationally |
| constraint-saturation | predicting unknown structure |
| copernican-inversion | irresolvable debate |
| defeat-in-detail | multiple adversaries |
| domain-cartographer | apprentice needs to map a domain they know nothing about |
| eat-the-world | technology exists but isn't reaching users |
| extraction-principle | direct questions have failed or subject controls access to information |
| falsification | theory feels too comfortable |
| federal-decentralization | scaling organization |
| feynman-clarity | I don't understand why |
| flow-line | batch processing |
| gedankenexperiment | two trusted principles contradict |
| gestalt-first | starting without a complete picture |
| grammar-theft | creative ceiling |
| imperial-self-correction | emotional reaction driving a decision |
| inflection-point | strategic shift |
| insurgents-advantage | outgunned or outresourced in a contest you need to win |
| lion-and-fox | political decision |
| masters-release | reluctance to fully train AI |
| material-honesty | design review |
| methodical-doubt | inherited assumptions |
| mind-forge | complex system design |
| mobilize-the-language | belief gap blocking action |
| musk-filter | build request |
| ohno-circle | premature solution |
| orchestration-layer | building execution when you should be routing |
| outside-view | making a prediction |
| pain-blindness | nobody likes this but everyone uses it |
| phantom-machine | impossible problem |
| platform-gravity | emerging compute paradigm with no commercial market yet |
| premeditatio | high-stakes uncertainty ahead |
| red-bead | blaming workers for defects |
| render-to-understand | surface understanding only |
| schwerpunkt | complex opposing system |
| scratch-build | facing a complex system you need to master |
| shape-the-ground | facing a confrontation |
| strip-to-structure | stuck in domain complexity |
| structural-unlock | structural bottleneck |
| subtraction | blank-canvas paralysis |
| taste-gate | feature list growing |
| the-combination | cutthroat competition |
| the-endurance | primary mission destroyed |
| the-fabian | outmatched opponent |
| the-fugue | one idea but don't know where to go |
| the-gollum-effect | protecting AI capability from colleagues |
| the-latticework | high-stakes decision |
| the-moat | build vs buy |
| the-ratchet | inner loop velocity decreasing |
| time-and-motion | optimize process |
| two-way-door | decision paralysis |
| vertical-integration | supply chain dependency |
| vessel-and-soul | about to store information and unsure where it belongs |

_✦ = authored gem (written from live practice)_

---

*60 gems — github.com/dkschrei/pantheon*
