# Knowledge Currency — staying current, permanently

Read this alongside `learning-and-research.md`. That file covers *verifying
before building*; this one covers *staying current over time* — the discipline
that keeps this brain from slowly rotting as the industry moves. Technology
changes faster than any training snapshot, and an engineer who stopped learning
three years ago is dangerous precisely because they're still confident.

Honest framing of the mechanism: nothing here updates by magic. What makes
currency automatic is (1) a standing trigger that fires when knowledge is stale,
(2) a cheap refresh routine that runs when internet access exists, and (3)
persistence so what's learned survives the session. All three are wired in.

## The tech radar — the project's living knowledge file

`docs/memory/tech-radar.md` is the durable record of what this project runs on
and what's known-current about it. Structure:

```
# Tech radar — last verified: 2026-08-12

## Stack (verified versions)
- Next.js 15.4 (app router) — verified 2026-08-12
- Postgres 16 via Supabase — verified 2026-08-12
- Stripe API 2026-06-30 — verified 2026-08-12

## Advisories / deprecations to act on
- <lib> X.Y has a known CVE → upgrade path noted

## Changed since last check
- <framework> moved <API> from A to B; our usage in src/… needs review

## Watch list
- <thing we depend on that is moving fast>
```

Rules: record the *verified date* beside each fact; prefer authoritative primary
sources (official docs, release notes, changelogs, security advisories) over
blogs; and match the version the project actually installs, never "latest" in
the abstract.

## When a refresh fires

- **Staleness trigger (automatic).** The session-start hook checks
  `tech-radar.md`. If it is missing or older than 7 days, it injects a directive
  to run a refresh. You don't have to remember; the system asks.
- **Before building on anything uncertain** — a library API, a config format, a
  platform limit, a security practice. Verify first, then build
  (`learning-and-research.md`).
- **When something surprises you** — an error that contradicts your model of how
  a tool works usually means your model is out of date. Check the changelog.
- **Before a one-way door** — technology and dependency choices deserve current
  evidence: maintenance status, release cadence, open critical issues, license,
  and community trajectory, not a remembered impression.
- **When the user mentions something you don't recognize** — a tool, model,
  standard, or version. Look it up rather than guessing or bluffing.

## The refresh routine (cheap, delegated, bounded)

Delegate to the **researcher agent** (light model, read-only, background-safe) so
it costs little and doesn't pollute the lead's context:

1. Read the project's manifest (`package.json`, `requirements.txt`, `composer.json`,
   etc.) for actual installed versions.
2. For the handful of dependencies that matter — the framework, the datastore
   client, the payment/auth SDK — check current stable version, breaking changes
   since ours, and any security advisories.
3. Check anything the project is about to depend on for the first time.
4. Write findings to `tech-radar.md` with today's date, and add anything
   actionable (a CVE, a breaking change touching our code) to `state.md` as work.
5. Keep it tight: a handful of targeted lookups, not a survey of the industry.

If there is **no internet access**, say so plainly, mark the radar entries as
unverified, and proceed on the last known state — never present stale knowledge
as current, and never invent a version number.

## Currency without churn (the veteran counterweight)

Staying current is not chasing novelty. Two rules keep this healthy:

- **New information changes decisions only when it changes the tradeoff.** A new
  framework release is not a reason to migrate; a security advisory or an
  end-of-life notice is. Upgrades are decisions — run them through
  `decision-frameworks.md` (usually one-way doors when data or public contracts are
  involved).
- **Boring technology still wins the core.** Currency means knowing what's true
  now — including knowing that the proven thing is still the proven thing.

## Learning that compounds

Every correction, failure, and discovery is knowledge that must outlive the
session: user corrections become rules in `conventions.md`; root causes and
traps become entries in `gotchas.md`; verified facts and versions go in
`tech-radar.md`; decisions and their why go in `decisions.md`. That persistence
is the difference between a system that learns and one that merely reads. A
session that discovered something and wrote nothing down has forgotten it.

Self-check: *"Is anything I'm about to rely on older than my last verification —
and did what I learned this session get written down where the next session will
find it?"*
