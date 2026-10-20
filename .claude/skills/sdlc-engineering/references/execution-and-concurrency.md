# Execution, Concurrency & Performance

Read this when the system involves timing, scale, or things happening at once:
multiple users, parallel work, background jobs, async/streaming, large datasets,
or anything that needs to stay fast as usage grows. Concurrency bugs can look
correct and pass every test, then fail unpredictably under real timing.
Performance problems are usually invisible at prototype scale and arrive when
real data and real traffic do.

## Concurrency is invisible in prototypes

Prototypes are tested by one developer doing one thing at a time. Production is
many independent timelines interacting — simultaneous clicks, overlapping jobs,
retries, multiple agents touching shared state, out-of-order events. When
designing any workflow, ask: *"What happens if two things happen at the same
time?"*

## Race conditions

Behavior that depends on timing rather than guaranteed ordering: two users
updating one record, duplicate jobs running at once, concurrent payment
processing, multiple agents modifying shared memory. They appear random and may
only surface under real load. Identify which resources/records/workflows can be
modified concurrently and protect them (locks, atomic operations, transactions).

## Shared mutable state is the root of the difficulty

Timing only matters when operations share state — DB rows, files, caches,
variables, queues, conversation memory, workflow state. AI systems add shared
state accidentally via memory stores, orchestration layers, session tracking.
**Minimize shared mutable state**; the less is shared, the less can go wrong.
(State design also in `system-structure.md`.)

## Sync vs async, threading & parallelism

- **Sync vs async**: choosing wrong makes prototypes slow, unresponsive, or
  needlessly complex. Async is *not* "faster" by default — it improves
  responsiveness and concurrency, not raw speed. Use async for I/O-bound waiting
  (API/model calls, network); it adds timing complexity, so map the event
  sequence explicitly instead of assuming order.
- **Threading (concurrent tasks in one process) vs parallelism (tasks across
  cores/processes)**: threading helps overlap waiting; parallelism helps
  CPU-bound work. Match the tool to whether you're waiting or computing.
- "Runs without errors" ≠ correct: concurrency bugs are valid code executing in
  an invalid *order*.

## Retries need idempotency

Retries are essential (networks fail, APIs time out) but a retry on a
non-repeat-safe operation creates duplicates — double payments, repeated emails,
duplicate inserts. Design important operations to be idempotent. (Full treatment
in `reliability.md`.)

## Don't trust event ordering

In distributed systems events arrive late, duplicated, out of sequence, or
partially processed — especially in AI orchestration with multiple agents and
queues. Systems depending on perfect ordering are fragile; design defensively.

## Background jobs & long-running processes

Some work isn't instant: AI inference, large uploads, report generation, batch
processing. Treating these as simple request/response causes timeouts, frozen
UIs, and confused users.

- Move slow or failure-prone work **out of the user request** into background
  jobs (vibe-coded apps need this sooner than expected). Jobs must be idempotent
  and observable.
- For long-running work, **decouple execution from user interaction** and give
  clear status handling (pending/processing/done/failed) so the experience feels
  intentional.

## Making things fast as they grow

- **Database indexes**: without them the database scans entire tables as data
  grows, so queries that were instant get slow. Add indexes on the columns you
  filter/sort/join by — earlier than you think, because the slowdown is invisible
  at small scale.
- **Pagination**: don't load unbounded result sets. Page data so it stays fast,
  predictable, and cheap. Prefer **cursor-based** pagination over **offset** for
  large or frequently-changing datasets (offset gets slow and can skip/duplicate
  rows as data shifts).
- **Caching**: store results of expensive or repeated work to improve speed and
  cut cost (and API/inference spend). Decide what to cache, where, and for how
  long — the hard part is invalidation: watch for stale data and wrong
  assumptions about freshness.
- **Batching**: group many items into one operation instead of one-at-a-time, to
  cut network/API round-trips and overhead. Plan how partial batch failures are
  handled (which items succeeded, which to retry).
- **Streaming & chunked responses**: for slow outputs (AI generations, large
  queries), send data as it's produced instead of making users wait for
  completion. Improves perceived responsiveness; handle partial data and
  mid-stream failures.

## Concurrency debugging is different

These bugs may work 99 times and fail once, then stop failing while you watch.
Step-through debugging is unreliable because changing timing changes behavior.
Lean on observability: timestamps, request/workflow IDs, event sequencing,
structured logging to reconstruct what happened. (More in
`debugging-and-review.md`.)

## Execution & performance checklist

| Item | Why it matters |
| ---- | -------------- |
| Ask "what if two things happen at once?" for each workflow | Real systems aren't sequential |
| Identify and protect concurrently-modified state | Prevents race conditions |
| Choose sync/async/threading/parallelism by waiting vs computing | Wrong choice = slow or complex |
| Make retried operations idempotent | Prevents duplicate side effects |
| Move slow work to background jobs with status handling | Avoids timeouts and frozen UIs |
| Add DB indexes on filtered/sorted/joined columns | Prevents silent slowdown as data grows |
| Paginate (prefer cursor for large/changing data) | Keeps queries fast and cheap |
| Cache expensive/repeated work; plan invalidation | Speed and cost, minus stale-data bugs |
| Batch high-volume operations; handle partial failure | Cuts overhead reliably |
| Stream long outputs; handle partial data | Feels fast even when processing is slow |
| Add timing observability (IDs, timestamps, tracing) | Intermittent bugs need reconstructable history |

Pre-ship question: *"What breaks — in correctness or speed — when many users,
retries, large data, or background jobs hit this at once?"*
