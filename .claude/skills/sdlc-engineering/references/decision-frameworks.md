# Decision Frameworks — how to decide, not just what to know

Read this whenever a call has to be made: what to build, which approach, whether
to refactor, when to ship, how much reliability is enough. Knowledge tells you
what is true; these frameworks tell you how to *choose* under uncertainty, with
incomplete information, against competing goods. This is the difference between
an assistant that knows things and an engineer that decides well.

The governing rule: **match the rigour to the reversibility and the stakes.**
Over-deliberating a reversible choice is as much a failure as rushing an
irreversible one.

## 1. Classify first: one-way vs two-way doors

Before analysing anything, ask whether the decision is reversible.

- **Two-way door** — reversible at low cost (a component library, a feature flag,
  an internal API shape, a copy change). *Most decisions are these.* Decide fast
  on ~70% of the information, act, and observe. Delegating and moving is the
  correct behaviour; agonising here is waste.
- **One-way door** — expensive or impossible to reverse (primary datastore,
  language/runtime, public API contract, data model for existing records, auth
  model, vendor lock-in, anything touching customer data irreversibly). Slow
  down: enumerate options, prototype the risky assumption, write it down, take
  the extra scrutiny.

Treating everything as reversible is dangerous; treating nothing as reversible is
paralysing. Say which kind it is out loud — it tells the human how much of their
attention the decision deserves. **Escalate one-way doors to the human; own the
two-way doors.**

Two refinements experienced engineers apply before accepting a classification:

- **Reversibility is often negotiable.** Before treating a door as one-way, ask
  whether a pilot, staged rollout, feature flag, adapter, or exit clause converts
  it into a two-way door. Preserving optionality is usually cheaper than being
  right first time.
- **Context changes the classification.** A protocol swap is two-way in a
  prototype and one-way once real users and data depend on it. Re-classify when
  the system's stage changes.

## 2. Make the trade-off explicit (there is no perfect architecture)

Every design decision is a compromise between quality attributes. Name which you
are optimising and which you are sacrificing:

**Reliability · Performance · Cost · Security · Operability · Maintainability ·
Speed-to-ship**

No decision optimises all of them. Two disciplines from the architecture canon:

- **Scenario-based reasoning (ATAM-style)**: don't argue about "performance" in
  the abstract; state a concrete scenario and answer it. *"Users double within 10
  minutes — what happens?" "The database fails — what does the user see?"* This
  converts vague preference into testable consequence and exposes hidden
  interactions.
- **Sensitivity and risk points**: identify which single decisions the whole
  design hangs on. Those deserve the prototype and the ADR; the rest don't.

State trade-offs in the form: *"Choosing X over Y buys us A, and costs us B; we
accept B because C."* If you cannot articulate the trade-off, you are not ready
to decide.

## 3. Record the why: Architecture Decision Records

For any decision that is hard to reverse, affects multiple parts of the system,
involves a real trade-off, or has been debated more than once — write an ADR into
the repo (`docs/memory/decisions.md` or `docs/adr/`). Short, plain language:

```
# ADR-007: Postgres over MongoDB for orders
Date: 2026-08-12   Status: Accepted
Context: Orders need multi-row transactional integrity; team knows SQL; volume
  is modest (<50k orders/mo) with growth uncertain.
Options: Postgres (relational integrity, mature tooling) | MongoDB (schema
  flexibility, weaker multi-document guarantees).
Decision: Postgres.
Trade-off accepted: less schema flexibility early, for correctness guarantees
  on money. Reversibility: one-way door once orders exist — migration is costly.
Consequences: schema changes need migrations; add read replica if reporting
  load grows.
```

ADRs exist to fight decision amnesia — they capture not just what was chosen but
*why*, so nobody re-litigates it or reverse-engineers intent later. Keep them
next to the code (docs nobody can find are docs nobody reads), write them at
decision time, and mark superseded ones rather than deleting them.

Minimum viable ADR — written when the decision is made, while the reasoning is
fresh, kept in the repo so it is diffable:

```
## ADR-0007 — Postgres over MongoDB for orders
Status: Accepted · 2026-08-12
Context: Orders/payments need multi-row transactional integrity; team knows SQL;
  volume modest (<100k orders/yr).
Options: (a) Postgres — relational integrity, mature tooling, familiar.
  (b) MongoDB — flexible schema, but lacks the multi-document constraints needed.
Decision: Postgres.
Consequences: + integrity, familiar ops, easy reporting.
  − migrations needed for shape changes; indexes must be added deliberately.
```

Decisions are **superseded, never rewritten** — the value is an honest timeline of
reasoning, not a polished fiction that the architecture was inevitable.

## 4. Deciding what to build (prioritisation)

Most products fail not by building badly but by building the wrong things well —
industry studies repeatedly find the majority of shipped features see little or
no use. Use the lightest framework that fits the stakes:

- **MoSCoW** (Must / Should / Could / Won't) — fastest; use to agree scope for a
  single release and to communicate what's out. Categorical, not ranked.
- **ICE** (Impact × Confidence × Ease) — quick triage of experiments and small
  bets when speed matters more than rigour.
- **RICE** (Reach × Impact × Confidence ÷ Effort) — for ranking a real backlog.
  The confidence multiplier is the honest part: it penalises speculation. Watch
  its failure mode — cheap features float to the top; don't let it bury the
  strategically important-but-hard.
- **Cost of delay / WSJF** — when sequencing time-sensitive work.

Two rules that matter more than the formula: tie every candidate to a specific
outcome metric, and re-score when evidence arrives. Scores inform the order; they
don't dictate it.

## 5. Estimation and uncertainty

- Give **ranges, not points** ("2–4 days, most likely 3"), and state the
  assumptions the range depends on.
- **Reference-class forecasting**: anchor on how long *similar past work actually
  took*, not on an imagined smooth path. Inside-view estimates are systematically
  optimistic.
- **Cone of uncertainty**: estimates made before design are worth far less than
  those made after; re-estimate at phase boundaries rather than defending the
  first number.
- Decompose: estimate the parts, and name explicitly what is *unknown* rather
  than folding it silently into a buffer.

## 6. Anticipating failure before committing

- **Pre-mortem**: before building, imagine it is six months later and this failed
  badly — write the reasons. This surfaces risks that optimism hides, and it is
  cheap. Do it for any one-way door.
- **Blast radius**: what else breaks if this is wrong? Prefer changes whose
  effects are local and observable.
- **Reversibility engineering**: when uncertain, prefer the option that keeps
  options open — a flag, an adapter, a smaller commitment first. Buying
  optionality is usually worth a small efficiency cost.

## 7. Deciding how reliable is enough (SLOs and error budgets)

Reliability is not maximised; it is *chosen*. Define an SLO (the target, e.g.
99.9% of requests succeed) and treat the remainder as an **error budget** — the
amount of unreliability you have agreed to spend. As long as the budget holds,
ship features freely; when it is exhausted, reliability work takes priority over
new features until the budget recovers. This converts an emotional argument
("should we harden or ship?") into a data-driven one, and it is why the SRE canon
treats the budget as a *permission* mechanism rather than a punishment.

Related operational decisions: alert on symptoms users feel, not causes; make
postmortems **blameless** — assume everyone acted sensibly given what they knew,
and fix the environment rather than the person; every serious incident yields at
least one concrete action item with an owner.

## 8. Deciding when to refactor or rewrite

- **Refactor when you're already there**: improve the code you're touching for a
  feature; avoid separate "cleanup projects" that never get scheduled.
- **Rule of three**: duplicate once, tolerate; the third occurrence justifies the
  abstraction. Premature abstraction costs more than duplication.
- **Rewrites are one-way doors** and usually lose: they discard embedded
  knowledge of every bug already fixed. Prefer strangler-fig (incremental
  replacement behind a stable interface) unless the system genuinely cannot meet
  a hard requirement.
- Debt is worth paying down where it *slows change you are actually making*, not
  where it merely offends taste.

## 9. Judge decisions by process, not only outcome

Good decisions can have bad outcomes and vice versa (resulting bias). Evaluate:
*given what was knowable at the time, was the reasoning sound and the risk
appropriately sized?* This is what makes learning possible — and it is why the
reasoning gets recorded, not just the result.

## 10. Deciding when to ask the human

Decide autonomously when the choice is a two-way door, within the agreed scope,
and has a clear safe default. Escalate when it is a one-way door, irreversible or
costly, a security/privacy/legal judgment, a product/scope question the spec
doesn't answer, or when the request itself looks mistaken. When escalating,
present: the decision, the options with trade-offs, your recommendation with
reasoning, and what you need. Never escalate a decision you should simply make.

## 11. Guard against the biases that corrupt engineering decisions

Name these when you feel them; naming usually defuses them.

- **Sunk cost** — "we've already built half of it." Irrelevant; decide from here.
- **Novelty bias / résumé-driven design** — the exciting tool in the core. Boring
  proven technology wins where failure is expensive; spend the innovation budget
  where the product differentiates.
- **Optimism override** — assuming the happy path and the best-case estimate.
- **Urgency distortion** — treating everything as an emergency, which quietly
  turns one-way doors into rushed guesses.
- **Authority shortcut / consensus comfort** — deferring to the loudest voice or
  a popular blog post instead of the evidence in *this* context.
- **Availability bias** — reaching for the last tool used rather than the right one.
- **Analysis paralysis** — the mirror failure: if it's a two-way door and an hour
  has passed, decide.

## 12. Evidence over opinion

Where a decision claims to improve delivery or reliability, tie it to a signal
rather than asserting it: the DORA four (deployment frequency, lead time for
change, change failure rate, time to restore) for delivery, and SLIs/SLOs with an
error budget for reliability — the budget turns "ship or harden?" from an argument
into arithmetic. If a claim can't be tied to a signal, say so honestly.

## The decision drill (run this in seconds, not meetings)

1. Reversible or not? → sets the rigour.
2. What am I optimising, and what am I trading away?
3. What are the two or three real options (including "do nothing" and "do less")?
4. What would make me wrong — and how would I find out early?
5. Decide, act, and record the why if it was hard to reverse.
