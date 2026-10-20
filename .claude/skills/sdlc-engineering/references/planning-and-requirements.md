# Planning & Requirements

Read this when starting something new, scoping a feature, deciding whether/how to
build something, or weighing effort against long-term cost. AI lets you go from
idea to implementation instantly, which tempts you to skip straight to code.
Unclear requirements don't disappear when skipped — they resurface later as
instability and rework. Good planning isn't heavy documentation; it's *enough
clarity to reduce avoidable confusion.* (For the opposite failure — over-planning
— see Analysis Paralysis in `thinking-disciplines.md`.)

## The three things to establish before significant code

1. **Primary goal** — what problem is this solving, in one sentence?
2. **Core workflow** — the main path through it, start to finish.
3. **Success criteria** — how will you know it worked vs. quietly failed?

If you can't answer these from the conversation, ask one focused question rather
than building the wrong thing fast.

## Requirements thinking: define intent before generating

AI turns ideas into code instantly but can't decide what the system is *supposed*
to do. Define intent, boundaries, and expectations first. Think in layers, from
"why" down to "how":

- **Business requirements** — the problem, the user, and what success looks like.
  It's easier than ever to build the wrong thing fast; this is the guard against
  that. Define scope and constraints, and tie technical decisions to real goals.
- **Product requirements** — what to build to solve it: core functionality, user
  flows, expected behaviors, and feature priorities. Keeps the prototype focused.
- **Design & technical requirements** — how the system should behave: user
  workflows, system constraints, and key architectural decisions. Capture these
  lightweightly so the prototype stays maintainable and ready to scale.

You don't need formal documents — just enough clarity at each layer that you're
not encoding contradictory assumptions.

## Think about the whole lifecycle, not just v1

Before building, ask: *how will this evolve after the first release?* Software
changes continuously through new requirements, feedback, bug fixes, operational
failures, security updates, and scaling pressure. The first version being perfect
matters less than the system absorbing change safely. For each feature, consider
how it will be tested, monitored, and maintained — not just built.

## Data shape comes before workflow

Define the shape of important data objects *before* building workflows around
them. Most downstream ambiguity traces back to data whose shape was never made
explicit. (See `quality-and-types.md` and the data-contracts section of
`system-structure.md`.)

## MVP: prove something real, don't shrink the dream

A Minimum Viable Product is not just a smaller version of the idea — it's a
focused way to validate something specific. Fast building makes it easy to
produce a feature-heavy prototype that validates nothing. Define what you're
trying to *learn* or prove, build the smallest thing that tests it, and resist
adding features that don't serve that validation.

## Scope creep: protect the boundaries

Adding features is cheap with AI, so simple systems balloon into overlapping,
inconsistent functionality. Check each addition against the primary goal; if it
doesn't serve the core workflow or the thing you're validating, it's scope creep.
Clear boundaries up front keep the system focused and manageable.

## Cost of ownership: the invisible bill

Speed of building is one cost; operating and maintaining is the larger one. Every
dependency, cloud service, external API, AI/LLM call, and abstraction adds
ongoing cost that's invisible during prototyping:

- **Inference / API cost** — per-call costs scale with usage and can dominate at
  volume. Estimate roughly before committing to an architecture that calls them
  on every request. (Track this live — see Cost Observability in
  `security-and-data.md`.)
- **Operational complexity** — each moving part is something to monitor, update,
  secure, and debug.
- **Vendor dependence** — what if the provider changes pricing, breaks an API,
  or goes down?
- **Maintenance burden** — dependencies need updating; abstractions need
  understanding by whoever inherits the system.

For each new dependency, ask "what does this cost to *operate and maintain*, not
just to add?" Prefer the simplest thing that meets the real requirement.

## Trade-offs and constraints

AI makes coding fast but doesn't decide what matters most. Every feature, design
decision, and prompt has consequences. Make priorities explicit: what are you
optimizing for (speed, reliability, low cost, flexibility) and what are you
trading against it? Naming the constraint up front prevents silently optimizing
for the wrong thing.

## Planning checklist

| Item | Why it matters |
| ---- | -------------- |
| Define goal, core workflow, success criteria before coding | Reduces misalignment and rework |
| Work through business → product → technical requirements | Prevents building the wrong thing |
| Consider how the system evolves after v1 | Software exists beyond initial release |
| Define important data shapes early | Prevents downstream ambiguity |
| Scope an MVP around what you need to validate | Avoids feature-heavy prototypes that prove nothing |
| Check each addition against the goal | Contains scope creep |
| Estimate operational/inference cost of dependencies | Invisible costs become permanent |
| Make priorities and trade-offs explicit | Prevents optimizing for the wrong thing |

Pre-prototype question: *"What parts of this system will still require attention
six months after launch?"*
