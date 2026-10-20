# Project Memory — a brain that doesn't forget

Read this at the start and end of every working session on a project. An AI
session has no innate memory between conversations; everything learned evaporates
when the session ends — *unless it is written down*. So memory is a discipline,
not a feature: **knowledge that matters gets persisted to files in the repo, and
every session starts by reading them.** Done consistently, the project's
accumulated understanding never resets, and each session begins as the engineer
who has worked here for months, not a stranger.

## The memory structure

Keep memory in the repo, version-controlled, next to the code it describes:

```
CLAUDE.md              ← always-on operating instructions + "Project memory" core
docs/memory/
  architecture.md      ← what the system is: components, boundaries, data flow,
                          where things live, why it's shaped this way
  decisions.md         ← decision log: what was decided, when, WHY, alternatives
                          rejected (append-only; never rewrite history)
  conventions.md       ← this repo's rules: naming, patterns, test style, error
                          handling, commit format — the "house style" in writing
  gotchas.md           ← hard-won lessons: bugs and their root causes, traps,
                          things that look right but aren't, env quirks, version
                          constraints
  state.md             ← current truth: what's done, in progress, deferred (with
                          reasons), known debt, next steps
```

Small project? Collapse it all into the `## Project memory` section of CLAUDE.md.
Growing project? Split into the files above and keep CLAUDE.md's memory section
as a short index pointing to them. The structure matters less than the habit.

## The protocol (non-negotiable habits)

**Session start — read before acting.** Load CLAUDE.md's memory section and skim
the memory files relevant to the task before touching code. Treat them as the
senior teammate's briefing: they override assumptions and prevent re-deriving
(or contradicting) past decisions. This also saves tokens — reading a 40-line
decisions file beats re-exploring half the codebase (see
`token-efficiency.md`).

**During work — capture at the moment of learning.** The instant something
durable is learned, write it where it belongs, because "I'll note it later"
means never:

- a decision with consequences → `decisions.md` (decision, date, why,
  alternatives rejected)
- a discovered convention or a user correction → `conventions.md` (a correction
  is a permanent rule, not a one-off — see `learning-and-research.md`)
- a bug's root cause, a trap, a version constraint → `gotchas.md`
- structural change → `architecture.md`

**Session end / milestone — update state.** Before finishing substantial work,
update `state.md`: what's now done, what's in progress, what was deferred and
why, debt taken. This is what makes the *next* session start exactly where this
one stopped instead of reconstructing it expensively.

## What deserves memory (and what doesn't)

Persist: decisions and their *why*; rejected alternatives (so they aren't
re-litigated); repo conventions; root causes and traps; environment/version
constraints; deferred items and debt; the current map of the system.

Don't persist: anything trivially re-derivable from the code itself, transient
details, or restatements of what's already there. Memory files must stay
*short and high-signal* — a bloated memory that nobody (human or AI) can skim is
forgetting with extra steps. Prune stale entries when they stop being true
(except `decisions.md`, which is history: mark superseded, don't delete).

## Writing memory entries

One to three lines each, dated where useful, written for a reader with zero
session context:

```
## decisions.md
2026-06-09 — Postgres over Mongo: relational integrity for orders/payments
outweighs schema flexibility. Rejected Mongo (no multi-doc constraints we need).

## gotchas.md
- Stripe webhooks arrive duplicated under retry; handlers MUST dedupe on event.id
  (caused double order confirmation emails, fixed 2026-06-09).

## conventions.md
- API errors: always {error: {code, message}} — never bare strings (user rule).
```

## Memory and the roles

The **Tech Lead** owns the protocol: ensures session-start reads happen, prompts
capture at learning moments, and updates `state.md` at milestones. Every role
both consumes memory (Architect reads `architecture.md` before redesigning;
Developer reads `conventions.md` before writing; Debugger reads `gotchas.md`
before chasing a known trap) and feeds it.

Self-check at session end: *"If this session's knowledge vanished right now,
what would the next session wish had been written down?"* Write that, then stop.
