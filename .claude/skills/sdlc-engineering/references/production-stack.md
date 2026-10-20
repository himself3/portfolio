# The Production Stack (the layers under "full-stack")

Read this whenever building or operating anything beyond a toy, and especially
when the Architect or DevOps/SRE role is driving. Its purpose is to kill one
specific, dangerous misconception: that "full-stack" means just **Frontend +
Backend**. That's the vibe-coder's mental model. The production reality is a tall
stack of layers, and a feature isn't real until the layers it depends on are
handled. Most production incidents come from the layers people forget exist.

Treat this as a coverage map: for any system, walk the layers and ask "is this
one handled, deliberately deferred, or silently ignored?" Silent gaps here are
how prototypes fall over under real users. Scale the rigor to the stakes, but
*see* every layer.

## The layered reality (top to bottom)

| # | Layer | Where the depth lives |
| - | ----- | --------------------- |
| 1 | Frontend (UI, UX, states, accessibility) | `system-structure.md`, UI/UX role in `roles-and-behaviors.md` |
| 2 | APIs & Backend Logic | `system-structure.md` |
| 3 | Database & Storage | `infrastructure-and-devops.md` |
| 4 | Auth & Permissions | `security-and-data.md` |
| 5 | Hosting & Deployment | `infrastructure-and-devops.md` |
| 6 | Cloud & Compute | this file + `infrastructure-and-devops.md` |
| 7 | CI/CD & Version Control | `infrastructure-and-devops.md` |
| 8 | Security & RLS (row-level security) | `security-and-data.md` |
| 9 | Rate Limiting | `reliability.md` |
| 10 | Caching & CDN | `execution-and-concurrency.md` + this file (CDN/edge) |
| 11 | Load Balancing & Scaling | this file |
| 12 | Error Tracking & Logs | `security-and-data.md` (observability) + this file |
| 13 | Availability & Recovery | this file + `reliability.md` |

Layers 1–9 are taught in depth in the files above; the rest of this file teaches
the operational layers that the simplistic model ignores most often: **Cloud &
Compute, CDN/edge, Load Balancing & Scaling, Error Tracking, and Availability &
Recovery.**

## Layer 6 — Cloud & Compute

Where and how the code actually runs: VMs, containers, serverless functions,
managed platforms, and the tradeoffs between them. The compute model shapes cost,
cold-start behavior, scaling, and operational burden.

- Choose the compute model to fit the workload: long-running services vs. bursty
  event-driven functions vs. batch. Don't default to whatever's familiar.
- Make compute **stateless** wherever possible (state in a DB/cache/object store,
  not in process memory) — this is the precondition for scaling horizontally and
  for surviving instance restarts. (See state management in `system-structure.md`
  and shared-state cautions in `execution-and-concurrency.md`.)
- Watch resource limits: memory/CPU caps, execution timeouts, concurrency limits,
  and serverless cold starts. Generated code often ignores these until prod.
- Treat compute cost as a design parameter (see cost observability in
  `security-and-data.md`).

## Layer 8 addition — Row-Level Security (RLS)

Beyond authentication (who you are) and authorization (what you can do), RLS
enforces access **at the data layer**: a row is only visible/editable to the
users entitled to it, enforced by the database itself rather than by hope in
application code. In multi-tenant or multi-user systems this is the difference
between "user A can see user B's data if a query forgets a `WHERE` clause" and
"the database refuses regardless of the query."

- For multi-tenant/multi-user data, enforce tenancy/ownership at the data layer
  (RLS policies where the database supports them), not only in app code — defense
  in depth, because one missing filter shouldn't leak everyone's data.
- Default-deny: a new row/table should be inaccessible until a policy grants
  access, not open until someone remembers to lock it.
- Test access control with the *wrong* user, not just the right one. (Full auth
  and data-trust treatment in `security-and-data.md`.)

## Layer 10 addition — CDN & edge delivery

Caching (what/where/how long, and invalidation) is covered in
`execution-and-concurrency.md`. The CDN layer adds *geographic* delivery: static
assets and cacheable responses served from edge locations near the user.

- Serve static assets (JS/CSS/images/media) and cacheable responses via a CDN to
  cut latency and origin load.
- Set cache headers deliberately (TTLs, immutable hashed asset names) and have an
  invalidation/versioning story so users don't get stale assets after a deploy.
- Never route private/per-user data through a shared cache without scoping —
  cache-key mistakes leak one user's data to another. (Ties to RLS and privacy.)

## Layer 11 — Load Balancing & Scaling

A prototype serving one developer says nothing about behavior under real traffic.
Scaling is how the system keeps responding as load grows.

- **Vertical scaling** (bigger instance) is simple but capped and a single point
  of failure. **Horizontal scaling** (more instances behind a load balancer) is
  how real systems grow and stay resilient — and it *requires* stateless compute
  (Layer 6) and shared state in a DB/cache, not in memory or local disk.
- A **load balancer** distributes traffic across instances and routes around
  unhealthy ones; pair it with **health checks** so traffic only goes to
  instances that can serve it.
- Find the real bottleneck before scaling — often the **database**, not the app
  tier. Throwing app instances at a DB-bound problem just moves the queue.
  (Indexes, pagination, caching, connection limits: `execution-and-concurrency.md`.)
- Plan for **autoscaling** behavior (scale-out triggers, min/max, warm-up) and
  cap it so a traffic spike or a retry storm can't autoscale into a huge bill.
- Load- and stress-test before scale matters (`quality-and-types.md`).

## Layer 12 addition — Error Tracking

Logs (Layer covered in `security-and-data.md`) record what happened; **error
tracking** aggregates, deduplicates, and alerts on exceptions so failures surface
*proactively* instead of being discovered when a user complains.

- Capture unhandled exceptions and key handled errors with enough context (stack,
  request/correlation ID, environment, version) to diagnose — but **redact
  sensitive data first** (errors often carry user input/PII). See
  `security-and-data.md`.
- Group and rate the noise so real regressions stand out; alert on new or spiking
  errors. Tie errors to a release so you can tell *which deploy* introduced them.
- For intermittent/timing errors, correlation IDs and timestamps are what make
  them reconstructable (`execution-and-concurrency.md`, `debugging-and-review.md`).

## Layer 13 — Availability & Recovery

"Does it work?" is a point-in-time question; availability is "does it keep
working, and how fast does it come back when it doesn't?" To a user, downtime and
data loss *are* the product failing.

- **Eliminate single points of failure** where the stakes justify it: redundancy
  across instances/zones, a managed/replicated datastore, no one box whose death
  takes everything down. (Horizontal scaling + load balancing, Layers 6/11.)
- **Failover & health checks**: detect unhealthy components and route around them
  automatically; degrade gracefully rather than collapsing (graceful degradation,
  retries, timeouts, circuit breakers — `reliability.md`).
- **Backups *and tested* restores**: a backup you've never restored is a guess.
  Define what's backed up, how often, and the actual recovery procedure
  (`infrastructure-and-devops.md`).
- **Recovery objectives**: know, at least roughly, how much data you can afford to
  lose (RPO) and how long recovery may take (RTO) for critical data — these drive
  backup frequency and redundancy choices.
- **Rollback**: every deploy should be reversible quickly (CI/CD, canaries —
  `infrastructure-and-devops.md`).
- **Observe availability**: monitor uptime and the user-facing error rate, and
  alert when it degrades (`security-and-data.md`), so you learn it from your
  monitoring, not from users.

## Using this map

- **Architect**: when designing, walk all 13 layers and decide which the system
  needs now, which later, and which genuinely don't apply — explicitly, not by
  omission.
- **DevOps/SRE**: layers 5–13 are largely your domain; treat them as part of
  "done," not post-launch extras.
- **Tech Lead**: if the user's request implies a layer they haven't thought about
  (e.g. "add user data" implies Auth + RLS + backups), surface it per the
  standing mistake-catching duty.

Pre-ship question: *"Which of the 13 layers does this feature actually touch, and
have I handled each one — or am I silently relying on a layer I never built?"*
