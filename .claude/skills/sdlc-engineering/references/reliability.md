# Reliability

Read this when the system depends on anything that can fail — external APIs, AI
providers, networks, payments, webhooks, user retries — which is almost
everything. Prototypes fail hard: one broken dependency and the whole experience
collapses. Reliability engineering is about designing so that failures (which are
inevitable) are contained, recovered from, and survivable. From a user's
perspective, downtime and failed requests *are* bugs, so reliability is a
feature, not an afterthought.

## Error handling: plan for failure from the first line

Vibe coders build the happy path; real users, systems, and APIs never behave
that way. Treat error handling as a mindset applied from planning, not a layer
bolted on later. Before building, write a short "failure map":

- **Invalid/incomplete user input** — validate required fields, types, ranges;
  reject oversized/over-complex input; return clear messages saying what to do
  next.
- **API/AI calls** (unreliable by nature) — handle timeouts, rate limits, partial
  or malformed responses; validate the *structure* of LLM output before using
  it; always assume the model may return something unexpected.
- **Missing dependencies / offline services / bad file paths / type mismatches.**

Error messages should describe what failed, give context and debugging detail,
say what the user should do next, and never expose secrets.

**Prevent the crash cascade**: a single unhandled error shouldn't chain-react
into a full crash. For each critical function, note its assumptions and decide
how it behaves when those assumptions aren't met. Set sensible defaults; don't
assume success every time. Fail gracefully.

## Graceful degradation: lose a feature, not the system

Identify single points of failure, then design fallback behavior so the system
keeps serving its core purpose when a part fails. Examples: cached/stale data
when a live source is down, a default response when an AI call fails, a disabled
non-essential feature instead of a broken page. The goal is reducing
functionality gracefully rather than collapsing.

## Idempotency: make repeats safe

Idempotency means performing the same operation multiple times has the same
effect as performing it once. Without it, retries and double-clicks create
duplicate charges, duplicate records, repeated emails, and inconsistent state.
Identify every action that could be repeated (intentionally or via retry), then:

- assign a unique identifier per action (request ID, transaction ID, idempotency key)
- check whether an action was already processed before executing it again
- keep a minimal record of processed actions
- prefer naturally repeat-safe operations (upserts over blind inserts)

This is the safety mechanism that makes retries and webhooks usable at all.

## Retry strategies: retry the right thing, the right way

Retries turn transient failures into successes — but retrying the wrong thing
turns small failures into outages and duplicate data. Design retries
deliberately:

- **Only retry transient/idempotent failures** (timeouts, 503s, rate limits),
  not deterministic ones (a 400 will fail every time).
- **Use exponential backoff with jitter** so retries don't hammer a struggling
  service in synchronized waves.
- **Cap attempts** and have a final-failure path (dead-letter queue, alert,
  user-facing error).
- Pair retries with idempotency, always.

## Timeouts & circuit breakers: contain slow failures

The worst failures are slow ones — a hung dependency that freezes your app and
cascades. Set explicit timeouts on every external call (never wait forever). Add
circuit breakers around dependencies that can fail: after repeated failures,
"open" the circuit and fail fast (or serve a fallback) instead of piling on
requests, then probe periodically to see if the dependency recovered. Decide
failure boundaries early; the goal is predictable behavior when the world
misbehaves, not over-engineering.

## Rate limiting: protect the system from overload and runaway cost

Rate limiting protects a system from overload, abuse, and runaway costs (very
real with paid APIs and AI inference). A small success or a retry storm shouldn't
become an outage or a surprise bill. Decide where limits belong (per user, per
IP, per endpoint, per API key), what the limit is, and what happens when it's
exceeded (queue, reject with 429, degrade). Respect *upstream* providers' limits
too, and back off when throttled.

## Webhooks: treat them as unreliable event ingestion, not simple callbacks

Inbound webhooks (payment completed, signup, job finished) arrive with real
concerns: they can be duplicated, retried, delivered out of order, or spoofed.
Verify signatures/authenticity, respond quickly then process asynchronously,
make handlers idempotent, and handle missing/duplicate/out-of-order events
defensively.

## Event handling

Real apps are event-driven (clicks, API responses, job completions, model
finishes), not simple request/response. Poor event handling causes missed
actions, duplicated work, and unpredictable behavior. Define what events exist,
what must happen for each, and how to avoid double-processing (idempotency
again).

## Reliability checklist

| Item | Why it matters |
| ---- | -------------- |
| Write a failure map for inputs, APIs, and AI calls before building | Plan for failure, don't bolt it on |
| Validate input and LLM output structure before use | Stops bad data from propagating |
| Set defaults and guard assumptions to prevent cascades | One error shouldn't crash everything |
| Design fallback behavior for single points of failure | Degrade, don't collapse |
| Make repeatable actions idempotent (unique IDs, dedup) | Prevents duplicate side effects |
| Retry only transient failures, with backoff + jitter + caps | Avoids retry storms and duplicates |
| Set timeouts on every external call; add circuit breakers | Contains slow/hung failures |
| Rate-limit to protect against overload and runaway cost | Success and retries shouldn't cause outages |
| Verify, ack-fast, and idempotently process webhooks | They're unreliable event sources |

Pre-ship question: *"When (not if) this dependency fails, does the system
degrade safely, avoid duplicates, and recover on its own?"*
