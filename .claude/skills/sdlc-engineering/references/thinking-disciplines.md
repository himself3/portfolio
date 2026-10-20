# Thinking Disciplines

Read this for the mindset habits that apply across the whole lifecycle — how to
take shortcuts consciously, anticipate failure, contain risk, prompt AI
effectively, and review what AI produces. These aren't about a specific
technology; they're the judgment that turns AI from a code generator into a
system builder. Pull these in on almost any task, especially when moving fast.

## Technical debt: take shortcuts on purpose, not by accident

Every shortcut, quick fix, and temporary workaround creates technical debt. Debt
is not inherently bad — it's often necessary early. The danger is debt that's
invisible, undocumented, and allowed to accumulate.

- **Intentional debt** (a conscious tradeoff made to move faster, expecting
  cleanup later) is manageable. **Accidental debt** (complexity that grows
  unacknowledged) is what causes long-term friction.
- Common sources: hardcoded values/assumptions, tight coupling, missing
  interfaces between features, minimal validation/error handling, rapid feature
  layering without review.
- Manage without killing momentum: document temporary decisions, use modular
  boundaries, refactor high-impact areas between iterations, and avoid stacking
  quick fixes on quick fixes. Set a rule for when a temporary solution must be
  revisited.

Habit: when taking a shortcut, say so — label it in notes/comments so it's
visible and revisitable. Separate exploratory parts from foundational ones.

## Blast radius: know how far a change can reach

Blast radius is how much of the system a single change can affect. Hidden
coupling and shared dependencies make small changes trigger large, unexpected
failures. Before a change, ask what else depends on the thing you're touching,
and contain impact: reduce coupling, isolate risky changes behind boundaries,
and prefer changes whose effects are local and predictable. Before a major
architectural change, ask how safely the system can recover if it fails.

## Edge case thinking: anticipate the unhappy path before coding

Prototypes work in the happy path and fail when real users push the edges.
Before writing code, anticipate unusual inputs (empty, huge, malformed,
duplicate, wrong type), rare scenarios, and partial failures; plan fallback
behavior; and deliberately test those conditions. Edge cases are where "works on
my machine" quietly breaks. (Pairs with error handling in `reliability.md`.)

## Production thinking: build as if it will run for real

Prototypes are fast, messy, and changing; production thinking is the mindset that
the system may have to survive real users, real data, and real failure. Without
slowing iteration, keep one eye on: anticipating failure, protecting data
integrity, observing behavior, deploying safely, and securing the system.
Prototypes become production accidentally — assume yours will. (This mindset
threads through DevOps, security, and reliability references.)

## Documentation as you go: capture context while you have it

Vibe-coded systems move fast and lose context just as fast. Capture decisions,
assumptions, and the *why* behind non-obvious choices while you're building, not
after. Documentation needn't be heavy — a few lines preserving intent and
tradeoffs is enough to let future-you (or the user) change things safely. The
goal is preserved context, not volume.

## Right-sized prompting: scope each AI request well

When directing AI to build, asking for too much in one prompt produces
incomplete or confusing results; asking for too little wastes effort. Size
prompts to a coherent unit of work, structure work in layers (scaffold, then
fill in, then refine), and give enough context and constraints to get reliable
output. Break large features into manageable pieces rather than one giant ask.
This is itself an engineering discipline: it makes AI output more predictable
and reviewable.

## Evaluating AI-generated code: speed without blind trust

AI-generated code lets you move fast but introduces hidden risk if accepted
without review. It often works on the surface while hiding inconsistencies,
missing edge cases, weak typing, or security gaps. Evaluate practically: does it
actually do what was asked (not just something plausible)? Does it handle errors
and edge cases? Any secrets, missing auth, or injection risks? Does it match
existing patterns? Match scrutiny to risk — heavy on auth, data, money, and
irreversible actions; lighter on low-stakes code. (Detailed review tactics in
`debugging-and-review.md`.)

## Analysis paralysis: don't let planning replace building

The opposite failure mode also exists: endlessly researching frameworks,
redesigning architecture, and evaluating AI-generated options instead of
building. Planning is valuable up to the point of enough clarity to start
(goal, core workflow, success criteria); past that, more planning is avoidance.
Set a bias toward building a small real thing and learning from it. (Balances the
planning discipline in `planning-and-requirements.md`.)

## Thinking-disciplines checklist

| Item | Why it matters |
| ---- | -------------- |
| Label shortcuts as intentional debt; document the why | Keeps complexity visible and revisitable |
| Check what depends on a change before making it | Contains blast radius |
| Anticipate edge cases and partial failures before coding | Happy-path success hides real failures |
| Keep production realities in mind during prototyping | Prototypes become production accidentally |
| Document decisions and context as you build | Context is lost fast in fast development |
| Right-size AI prompts; build in layers | More predictable, reviewable output |
| Evaluate AI code for correctness, edge cases, security | Runs ≠ correct or safe |
| Plan enough to start, then build | Avoids analysis paralysis |

Recurring question: *"Am I making this tradeoff consciously, and do I understand
how far its effects reach?"*
