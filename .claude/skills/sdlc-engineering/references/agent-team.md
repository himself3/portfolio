# The Agent Team — autonomous AI employees

Read this when the goal is to have AI *employees* build while the human steps
back — work proceeding without someone watching every move, each agent holding a
role, coordinating with the others, and escalating to the human only when a real
decision is needed. This turns the brain's internal roles (`roles-and-behaviors.md`)
into actual separate workers running in parallel. The brain is the mind; this is
the org chart and the working agreement that lets several minds build as a team.

The model in one line: **a human hands a goal to a lead; the lead writes a spec
and plan; specialist agents execute the plan in phases, each in its own context,
checking each other's work; the human is consulted by exception, not
continuously.** This is spec-driven, loop-based development — you direct the loop,
you don't babysit the keystrokes.

## How this maps to the real tooling (Claude Code subagents)

Claude Code implements this natively, so build on it rather than inventing:

- **Subagents** are specialist workers defined as Markdown files with YAML
  frontmatter in `.claude/agents/` (project) or `~/.claude/agents/` (all
  projects). Frontmatter sets the agent's `name`, `description` (when to use it),
  allowed `tools`, and `model`; the body is its system prompt — its role,
  standards, and behavior.
- **Isolation**: each subagent runs in its **own context window**, so a worker
  can read dozens of files without polluting the lead's context or the others'.
  Results flow back as summaries. This is also the main token-control lever.
- **Foreground vs background**: foreground blocks and passes permission prompts
  to the human; **background runs concurrently while the human keeps working** and
  auto-declines anything that would need a prompt — this is the "employees keep
  building, ask me only when necessary" behavior. Set `background: true` for
  always-concurrent workers.
- **The lead orchestrates**: the main session (run on the most capable model)
  plans and delegates; specialists run on cheaper/faster models where that fits
  (judgment on the lead, implementation on mid, search on light).
- **Spec Kit** (GitHub's spec-driven-development toolkit) is the natural source of
  the shared spec: it turns a goal into a structured specification and phased plan
  the agents work from. Use it (or an equivalent `spec.md` + `plan.md`) as the
  single source of truth the whole team builds against.

Honest cost note: a team of agents can use several times the tokens of a single
session, because each carries its own context. That is exactly why the
`token-efficiency.md` and `memory-system.md` disciplines are mandatory here, not
optional — they are what make autonomous teams affordable.

## The team (each is the brain's role, made into an employee)

Define agents from the roles in `roles-and-behaviors.md`. A practical SaaS-grade
team — scale up or down to the project:

- **Tech Lead / Orchestrator** (most capable model, foreground): owns the goal,
  writes/curates the spec and phased plan, delegates, integrates results, runs
  the Definition of Done gate, and is the one who escalates to the human. The
  only agent that talks to the human by default.
- **Architect**: turns the spec into structure — components, data flow,
  boundaries, the 13-layer coverage check (`production-stack.md`). Produces the
  plan the implementers follow.
- **Implementer(s)** (mid model, can run in parallel on separate slices/files):
  write production-grade code within the architect's boundaries, matching repo
  conventions and the human-authored standard.
- **Reviewer** (capable model): reads every implementer's output as an unfamiliar
  PR — correctness vs plausibility, security, edge cases, AI-tells. Gate before
  merge. Pairs naturally as a "chain": implementer → reviewer → fixer.
- **QA/Test**: writes and runs tests, attacks the unhappy path, blocks "done"
  without evidence.
- **Security**: activates whenever data/auth/secrets/payments appear; audits for
  the threats in `security-and-data.md`. Has standing veto on its domain.
- **DevOps/SRE**: deployment, config, CI/CD, monitoring, recovery.
- **Researcher** (light model, background): looks up current/authoritative facts
  on demand (`learning-and-research.md`) so others don't guess.

Each agent's system prompt should: state its role and standards by pointing at
the relevant reference file(s); inherit the non-negotiables (production-grade,
human-authored, bug-prevention, the DoD gate); and define its escalation rule
(below). Keep each worker's tools scoped to its job (e.g. researcher read-only).

## Coordination: how employees work together without the human

- **Single source of truth**: the spec/plan plus the project memory files
  (`memory-system.md`) are how agents stay aligned. An agent reads them before
  acting and updates them after — this is the team's shared "inboxes," the
  durable channel through which work and decisions are communicated and the next
  agent (or the next session) picks up exactly where the last left off.
- **Phased execution**: the lead breaks the plan into phases; agents complete a
  phase, the reviewer/QA verify it, then the next phase starts. Defects are caught
  per-phase, not at the end (cheaper in both bugs and tokens).
- **Handoffs as artifacts**: an agent's output (code, a decision in
  `decisions.md`, a test result, a review finding) is the message to the next
  agent. Write the handoff so a fresh-context worker can act on it with no other
  knowledge.
- **Parallel where independent, sequential where coupled**: independent slices
  (separate files/features) run concurrently; coupled work (a shared contract)
  is sequenced. The lead decides which.

## Escalation: when to ask the human (and when not to)

The point is autonomy *with judgment*, not unsupervised recklessness. Every agent
follows this rule:

**Proceed without asking** when: the decision is reversible, low-stakes, and
within the spec; the safe default is clear (apply it and note it); it's a normal
implementation/review/test choice.

**Escalate to the human (via the lead)** when any of these is true — the
"stop and check" triggers:

- a **product/scope decision** the spec doesn't answer (what should this *do*?);
- something **irreversible or expensive**: deleting data, spending money, public
  deploys, destructive migrations;
- a **security/privacy/legal** judgment call, or anything touching real user data
  or payments credentials;
- a **genuine blocker**: missing credential, access, or external decision
  (surface loudly per `production-grade.md` — never fake past it);
- **conflicting requirements** or a spec that looks wrong;
- the **standing mistake-catching duty** fires: the requested thing looks like a
  defect or hazard.

Escalations are batched and specific: the lead presents the decision, the
options, its recommendation, and what it needs — so the human decides quickly and
the team continues. Silence is not consent for the "stop and check" cases.

## The human's role in the loop

The human sets the goal and constraints, approves the spec/plan, answers
escalations, and reviews at phase boundaries — directing the loop rather than
watching it run. Everything else the team owns. A good session: human gives goal
→ lead returns spec + plan for approval → human approves (or adjusts) → team
builds in phases in the background → lead surfaces only escalations and
phase-completions → human reviews the finished, gated result.

## Guardrails (so autonomy stays safe)

- Background agents auto-deny permission prompts — so *grant tools deliberately*
  and keep destructive capabilities (prod deploy, data deletion) on foreground or
  human-gated paths.
- The Reviewer and Security agents are not optional and not overridable by an
  implementer in a hurry — quality gates survive deadline pressure.
- Everything the team does lands in version control and memory files, so the
  human can audit what happened and why after the fact.
- The production-grade, human-authored, and Definition-of-Done standards bind
  every agent equally; speed never lowers them.

Setup question before turning a team loose: *"Is the spec clear enough, are the
escalation triggers and tool permissions set so the team can build safely without
me — and will I be able to see and trust what they did?"*
