# Autopilot — how the standards run themselves

Read this to understand (and maintain) the automatic layer. Everything in this
brain is worthless if it depends on someone remembering to invoke it. Autopilot
makes the discipline fire on its own, in three tiers, with no slash commands and
no ceremony from the human.

## The three tiers, and why all three are needed

| Tier | Mechanism | Nature | What it guarantees |
| ---- | --------- | ------ | ------------------ |
| 1. Context | `CLAUDE.md` + `SessionStart` hook | Always loaded | The brain, memory, and repo state are present before the first prompt |
| 2. Judgment | Skills + subagents (`description` fields) | Model-invoked | The right specialist engages for the work at hand |
| 3. Enforcement | Hooks (`settings.json`) | Deterministic | The standards fire *every* time, even if the model forgets |

Tiers 1 and 2 are probabilistic — powerful, but they depend on the model
choosing well. Tier 3 is code: it runs on lifecycle events regardless of what
the model decides, and it also runs **inside subagents**, so a delegated worker
is held to the same bar as the lead. Judgment sets direction; enforcement
guarantees the floor.

## What fires, and when

- **SessionStart → `hooks/session-start.js`**
  Injects, as context: the autopilot directive, `docs/memory/*` (state,
  decisions, conventions, gotchas, architecture), and live repo state (branch,
  uncommitted changes, recent commits). This is the never-forget layer made
  automatic — the session opens already knowing the project, instead of
  re-deriving it expensively.

- **UserPromptSubmit → `hooks/route.js`**
  Reads the request and injects the phase routing before work starts: security
  work names the security agent and its rules; architecture work demands the
  architect and a plan before volume code; UI work pulls in the craft standards,
  design system, icon rule, and reduced-motion; ops, debugging, testing, and data
  each get their directives. Any build request gets the production-grade standard
  and the mandatory review/QA gates. Trivial prompts pass silently.

- **PreToolUse → `hooks/guard.js`**
  Blocks (exit 2) irreversible or costly operations before they run — recursive
  deletes, `DROP`/`TRUNCATE`, unbounded `DELETE`/`UPDATE`, force pushes, hard
  resets, production deploys/publishes, migration resets, piping remote scripts
  to a shell — and tells the team to escalate to the human instead. Also refuses
  to read credential files into context or write real secrets. This is the
  escalation rule turned into a mechanism rather than a promise.

- **PostToolUse (Write|Edit) → `hooks/quality-scan.js`**
  Scans every file the team writes and returns findings for immediate correction:
  hardcoded secrets, placeholders/stubs/TODO/"for now"/mock data in real paths,
  emoji in code or interfaces, narration comments, generic identifiers, marketing
  prose. Blocking findings return exit 2 so the model fixes them before moving
  on; a loop guard stops after three passes and requires the issue be reported
  instead. Clean professional code passes silently.

- **Stop → `hooks/done-gate.js`**
  Before the turn ends, re-scans what actually changed on disk for production-
  grade violations and checks whether project memory was updated. Challenges once
  per session (loop-safe), requiring fixes or an explicit explanation, plus the
  honest Definition of Done report.

## Maintaining it

- Rules live in `hooks/lib/rules.js` — one place to tune severity or add patterns.
  Prefer precision over zeal: a false positive that nags on correct code erodes
  trust in the whole gate faster than a missed warning does.
- Every hook fails **open** (exit 0 on internal error) and is time-bounded. A
  broken hook must never break the human's session.
- Hooks are project-scoped in `.claude/settings.json` so they travel with the
  repo and apply to everyone working in it.
- The `$CLAUDE_PROJECT_DIR` variable keeps paths correct regardless of the
  working directory; scripts are Node (guaranteed present with Claude Code) so
  they run identically on Windows, macOS, and Linux.

## The division of labour to preserve

Hooks enforce what is **mechanically checkable** (secrets, placeholders, emoji,
destructive commands, memory freshness). They cannot judge whether the
architecture is sound, the UX is clear, or the abstraction earns its keep — that
stays with the roles and the veteran instincts. Don't try to encode taste in a
regex, and don't leave a checkable rule to memory. Put each in the tier where it
belongs.
