---
name: scratch-build
aliases: [karpathy-method, nano-rebuild, reimplement-to-understand]
domain: [engineering, creativity, philosophy]
trigger: [facing a complex system you need to master, inheriting opaque code, learning a new domain, debugging a system you don't fully understand]
practitioners:
  - name: Andrej Karpathy
    era: 2012-present
    application: Reimplemented neural network training from scratch (micrograd, nanoGPT, llm.c) to achieve mastery and make deep learning accessible
  - name: Richard Feynman
    era: 1940-1988
    application: Re-derived physics from first principles rather than memorizing results — "What I cannot create, I do not understand"
  - name: John Carmack
    era: 1990-present
    application: Rewrote 3D rendering engines from scratch across multiple generations to push the boundary of what was possible
events:
  - name: nanoGPT release
    year: 2023
    gem-role: applied — Karpathy reimplemented GPT-2 training in ~600 lines of PyTorch; thousands used it to understand transformers for the first time
  - name: Tesla removes radar from Autopilot
    year: 2021
    gem-role: applied — Karpathy's team rebuilt the perception stack from scratch around pure vision, having understood the system deeply enough to remove a sensor modality entirely
  - name: Feynman's blackboard quote
    year: 1988
    gem-role: applied — found on his blackboard at death: "What I cannot create, I do not understand" — the credo of scratch-build
  - name: llm.c release
    year: 2024
    gem-role: applied — Karpathy rewrote GPT-2 training in pure C (~1000 lines), stripping PyTorch, CUDA abstractions, and Python entirely to expose the raw computation
lineage: Feynman → Carmack → Karpathy
origin-earliest: Feynman-1965
origin-modern: Karpathy-2020
---

# Scratch Build

## Protocol

**Trigger:** You face a complex system you need to deeply understand — not just use, but master — and the existing implementation is too layered, abstracted, or opaque to reason about clearly.
**Steps:**
1. Pick the complex system. Identify the ONE core thing it does (e.g., "trains a neural network", "renders a 3D scene", "manages distributed state").
2. Reimplement that core function from scratch in the smallest possible form. No frameworks, no libraries, no abstractions you didn't write. Target: fits in one file, or the fewest files possible.
3. Get it working end-to-end, however ugly. The minimal version must actually run and produce correct output — not pseudocode, not diagrams, not explanations.
4. Now you understand it. Use that understanding to improve the real system, teach others, or identify what the original got wrong.
**Anti-pattern:** Studying a system by reading docs, watching talks, or stepping through someone else's code without ever building it yourself — you end up with the illusion of understanding.
**Hard rule:** The rebuild must actually execute. If it doesn't run, you didn't understand it.

---

## The Book

### The Pattern

When Karpathy needs to master something, he doesn't study it — he rebuilds it from zero in the smallest possible form. The minimal reimplementation forces confrontation with every essential component, strips away accidental complexity, and produces an artifact that is both a proof of understanding and a teaching tool for others. The rebuild is not the preparation for the work; the rebuild IS the work.

### Protocol (extended)

1. **Pick the target system.** Choose something complex enough that "reading about it" leaves gaps. The system should have a clear input-output contract you can verify.

2. **Identify the essential computation.** What is the minimum path from input to output? Everything else — error handling, optimization, edge cases, abstractions — is initially noise. For nanoGPT: text in → transformer forward pass → loss → backprop → updated weights → better text out.

3. **Reimplement from scratch in minimal form.** Use the lowest-level tools you can tolerate. Karpathy's progression: Python with no frameworks (micrograd), then PyTorch with no training libraries (nanoGPT), then pure C with no Python at all (llm.c). Each step down strips another layer of abstraction. The constraint is: one person must be able to read the entire thing in one sitting.

4. **Get it running end-to-end.** The rebuild must produce correct output. micrograd must compute correct gradients. nanoGPT must generate coherent text. This is the hard constraint that separates real understanding from hand-waving.

5. **Harvest the understanding.** Now you know which parts are essential and which are accidental complexity. You know where the original system made good tradeoffs and where it didn't. You can teach it, improve it, or simplify it with confidence.

### Anti-Pattern (extended)

**The Abstraction Tourist**: reading documentation, watching conference talks, using high-level APIs, and believing you understand the system. You can use PyTorch without understanding autograd. You can call `model.fit()` without understanding backpropagation. You can deploy Kubernetes without understanding container networking. The abstraction tourist has operational knowledge but no structural understanding — they can use the system but cannot debug it when it breaks in novel ways, cannot simplify it, and cannot teach it.

The telltale sign: when something breaks at a layer below your abstraction, you are helpless. Karpathy's micrograd makes it impossible to not understand autograd. That's the point.

### Examples

**micrograd (2020):** Karpathy built an autograd engine in ~100 lines of Python. It supports scalar-valued operations with full backpropagation. It's not useful for production — it's useful for understanding. Thousands of ML engineers used it to finally grasp how automatic differentiation actually works, after years of treating it as a PyTorch black box.

**nanoGPT (2023):** A complete GPT-2 training codebase in ~600 lines of PyTorch. No Hugging Face, no training frameworks, no config systems. Just the raw transformer, the data pipeline, and the training loop. It trains on a single GPU and produces readable text. Researchers used it to prototype new architectures because they could understand and modify every line.

**llm.c (2024):** Karpathy stripped away Python and PyTorch entirely, reimplementing GPT-2 training in pure C with raw CUDA kernels. This forced understanding of the actual computation at the hardware level — no autograd, no tensor abstractions, no garbage collection. The result matched PyTorch's output while making every floating-point operation explicit.

**Tesla Autopilot vision-only transition (2021):** After years of building the perception stack from the ground up, Karpathy's team understood the vision system deeply enough to argue that radar was not just unnecessary but actively harmful (it introduced sensor fusion ambiguities). They removed radar entirely — a move that only makes sense if you understand every component well enough to know what's load-bearing and what isn't.

### Practitioners

**Andrej Karpathy** — The modern exemplar. PhD under Fei-Fei Li at Stanford, then Director of AI at Tesla, founding member of OpenAI. His career is a sequence of scratch-builds: CS231n taught CNNs by building them from scratch, micrograd demystified autograd, nanoGPT demystified transformers, llm.c demystified GPU computation. Each rebuild made him (and his audience) meaningfully smarter about the system.

**Richard Feynman** — The patron saint of the pattern. Re-derived quantum electrodynamics rather than accepting the existing formalism. His famous blackboard quote — "What I cannot create, I do not understand" — is the scratch-build credo stated perfectly. His Feynman Lectures rebuilt physics from scratch for teaching, and in the process revealed connections the standard curriculum obscured.

**John Carmack** — Rewrote 3D rendering engines from scratch with each generation (Wolfenstein 3D → Doom → Quake → id Tech). Each rewrite wasn't just an upgrade — it was a ground-up reimplementation that forced understanding of new hardware capabilities. He didn't patch the old engine; he rebuilt to understand the new constraints.

### Historical Events

**nanoGPT release (January 2023):** Karpathy released nanoGPT on GitHub and it rapidly became the most-forked GPT implementation. Its value wasn't performance — it was legibility. For the first time, a complete GPT training pipeline fit in a codebase small enough to read in an afternoon. It became the default starting point for researchers who needed to understand transformers, not just use them.

**Tesla removes radar (May 2021):** Tesla announced that new Model 3 and Model Y vehicles would ship without radar, relying entirely on cameras for Autopilot. This was widely criticized as cost-cutting. But the decision came from Karpathy's team having rebuilt the perception pipeline deeply enough to know that vision alone was sufficient and that radar created sensor fusion problems. The scratch-build understanding gave them the confidence to simplify.

**Feynman's blackboard (February 1988):** When Feynman died, two things were written on his Caltech blackboard: "What I cannot create, I do not understand" and "Know how to solve every problem that has been solved." Both are statements of the scratch-build philosophy: understanding requires reimplementation.

### Lineage

Feynman → Carmack → Karpathy. The lineage traces through people who insist on building from scratch not because they need to ship something, but because reimplementation is how they think. Feynman did it with physics derivations. Carmack did it with rendering engines. Karpathy does it with neural network training. The medium changes; the method doesn't. The common thread: all three are famous not just for what they built, but for how deeply they understood what they built — and the understanding came from the rebuild.

### Origin

The earliest clear articulation is Feynman's, though the practice is older than any single person. What makes the Karpathy lineage distinctive is the combination of scratch-building with teaching: the minimal reimplementation is simultaneously a learning tool for the builder and a teaching tool for everyone else. Karpathy's innovation is making the scratch-build public — micrograd, nanoGPT, and llm.c are not products; they are published acts of understanding. This turns a private learning method into a public good.
