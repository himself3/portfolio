# Infrastructure & DevOps

Read this when deploying, hosting, managing configuration or secrets, setting up
version control or CI/CD, choosing a database, adding monitoring, or changing a
schema. Software only becomes useful when it can be reliably deployed, operated,
monitored, updated, and recovered. Building is half of engineering; operating
reliably is the other half.

## "Works on my machine" is not deployment

Local success hides differences that break production: environment variables,
network behavior, permissions, dependency versions, scaling conditions, security
constraints, cloud-specific behavior. Define how the system runs *outside the
laptop* before the architecture is hard to change.

## Version control: the foundation

Version control (Git) lets you track progress, experiment safely, recover from
mistakes, and collaborate without losing work. It's the substrate everything else
(CI/CD, code review, rollback) builds on. Commit in meaningful units with clear
messages, use branches for experiments, and never treat "it's just a prototype"
as a reason to skip it — it's your undo button and your safety net.

## Configuration & secrets

Hardcoded URLs, missing env vars, and (worst of all) secret keys in source code
are why prototypes "only work on my machine" and how credentials leak.

- **Separate configuration from code** using `.env`, JSON, YAML, or TOML for
  secrets, service endpoints, and feature flags.
- **Manage settings per environment** (dev/staging/prod) so the same code runs
  everywhere with different config.
- **Keep secrets out of source control** — use environment variables or a secrets
  manager; never commit credentials. (Security angle in `security-and-data.md`.)

## Dependency & license management

Every framework, SDK, AI provider, cloud service, and open-source library speeds
you up and adds risk.

- **Dependencies**: limit unnecessary packages, pin versions for reproducible
  builds, monitor for updates/vulnerabilities, and abstract external services
  behind your own interfaces so a provider swap is contained.
- **Licenses**: every library, dataset, and model has a license that governs what
  you can distribute, monetize, or modify. Track them and plan attribution to
  avoid hidden legal/compliance risk later.

## Development environment (IDE)

The editor matters once a prototype grows: a good IDE/advanced editor surfaces
errors early, supports linting/types/debugging, and reduces small mistakes that
pile up. Use the tooling that gives you fast feedback rather than whatever was
already open.

## Choosing where data lives

- **Database types**: choosing a database is a high-impact architecture decision.
  Match the store to the data and access pattern (relational for structured,
  related data and transactions; document/key-value for flexible or simple
  shapes; vector for embeddings/semantic search). The easy default early on
  affects performance, reliability, scalability, and cost later.
- **Migrations**: data models evolve. Treat schema changes as versioned,
  reversible migrations (apply forward, roll back) that preserve data integrity —
  never ad-hoc edits to a live database.
- **Backups & recovery**: even prototypes can lose critical data. Decide what to
  back up, how often, and the recovery procedure — and actually test that
  restores work, rather than assuming they do.

## Deployment is part of system design, decided early

Deployment decisions shape reliability, scalability, rollback, security,
monitoring, cost, and maintenance. Decide early — and pick the simplest reliable
path:

- **Deployment targets**: local, on-premises, cloud VMs, serverless, hybrid, and
  the role of containers — each with different benefits, limits, and operational
  burden. Choose deliberately.
- **Serverless** (Lambda/Cloud Functions/etc.): the platform handles
  infrastructure while you focus on logic. Design event-driven functions, balance
  granularity, watch cold starts and execution limits, and monitor performance.
- Decide where it runs, how config/secrets are managed, how updates ship, and how
  failures are detected.

## Automate the pipeline: CI/CD

Manual deploys, hand-edited infrastructure, and undocumented setup steps work
temporarily then become fragile. Automate what repeats:

- **CI** runs tests/linting/validation automatically on every change (GitHub
  Actions is a common way to do this straight from the repo).
- **CD** ships changes through a repeatable pipeline with environment parity
  (staging resembling prod) and safe strategies (canary, gradual rollout).
- Add infrastructure as code, deployment scripts, and automated backups as the
  project grows. The goal is sustainable change, not ceremony.

## Work management (GitHub Issues, PRs, Projects)

Managing work and changes is as much engineering as writing code. Use **Issues**
to track and break features into manageable pieces, **Pull Requests** as a
built-in review checkpoint before changes land, and **Projects** boards to
organize, prioritize, and keep scope visible as the project grows.

## Connectivity plumbing

- **DNS & domain management**: the invisible layer determining whether the app is
  reachable. Domain structure, routing, and config affect reliability and
  security; plan it rather than discovering it when something breaks.
- **Messaging queues**: as components (frontend, backend, models, APIs) grow,
  queues enable reliable asynchronous communication — messages delivered safely
  and in order without blocking. (Closely tied to background jobs in
  `execution-and-concurrency.md` and webhooks in `reliability.md`.)

## Monitoring is not optional

A deployed system without observability is operated by guesswork. Decide early
what failures you'd need to detect fast, then make them visible. (Full treatment
of logging, monitoring, alerting in `security-and-data.md`.)

## Recovery matters as much as prevention

No system is perfectly reliable. Before deploying, ask: can deployments be rolled
back? Are backups tested? Can services restart cleanly? Can failures be isolated?
Are incidents observable? (Resilience patterns in `reliability.md`.)

## DevOps checklist

| Item | Why it matters |
| ---- | -------------- |
| Use version control from the start | Your undo button, safety net, and collaboration base |
| Separate config from code; keep secrets out of source | Prevents "works on my machine" and leaks |
| Pin and limit dependencies; track licenses | Contains instability and legal risk |
| Choose the database type deliberately | High-impact, hard-to-reverse decision |
| Version schema changes as reversible migrations | Protects data integrity |
| Define and test backups/recovery | Restores you never tested may not work |
| Decide deployment target and path early | Prevents operational surprises |
| Automate testing and deploys (CI/CD, env parity) | Reduces human error; enables safe rollout |
| Track work via Issues/PRs/Projects | Managing change is engineering too |
| Set up monitoring before problems occur | Operational visibility |

Pre-ship question: *"If this system failed tonight, would I know what happened
and how to recover it?"*
