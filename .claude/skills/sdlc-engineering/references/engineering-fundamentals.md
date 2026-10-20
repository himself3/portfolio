# Engineering Fundamentals

Read this when choosing an architecture, designing APIs, reasoning about
performance at scale, or whenever a decision rests on how computers and networks
actually work. The rest of the brain covers *how to build professionally*; this
file covers the *substance* a senior engineer is expected to know cold. Shallow
fundamentals is why prototypes collapse at scale: the code was fine, the
underlying model was wrong.

Veteran framing throughout: know these deeply, then reach for the simplest one
that fits. Fundamentals exist to make you *choose well*, not to justify
complexity.

## Complexity & data structures (the cost model in your head)

Big-O is not interview trivia; it is the ability to predict what happens when
data grows 1000×.

- Know the cost of what you write: hash map lookup O(1), sorted-array binary
  search O(log n), linear scan O(n), nested loop over the same collection O(n²),
  sorting O(n log n). The classic production bug is an accidental O(n²) — a loop
  doing a lookup inside a loop — invisible with 50 rows, fatal with 50,000.
- Choose the structure by access pattern: **array/list** for ordered iteration,
  **hash map/dict** for keyed lookup, **set** for membership/dedupe, **queue/
  stack** for ordering, **tree/heap** for ranked or range access, **graph** for
  relationships. Picking the right one usually beats micro-optimizing the wrong
  one.
- The same logic maps to databases: an index is a data structure that turns O(n)
  scans into O(log n) seeks (`execution-and-concurrency.md`).
- Memory matters too: streaming/chunking beats loading a large dataset into RAM.

## Networking (what actually happens between click and response)

- **DNS** resolves a name to an address (cached at many layers; TTLs explain
  "why is it still pointing at the old server?").
- **TCP** is reliable/ordered (web, APIs); **UDP** is fast/lossy (video, games,
  DNS). Handshakes cost round-trips, which is why latency ≠ bandwidth.
- **TLS/HTTPS** encrypts in transit; certificates expire — an unmonitored expiry
  is a classic self-inflicted outage. Terminate TLS deliberately (edge vs origin).
- **HTTP** semantics are part of your API's contract: methods (GET safe/
  cacheable, PUT/DELETE idempotent, POST not), status codes that mean what they
  say (400 vs 401 vs 403 vs 404 vs 409 vs 422 vs 429 vs 500 vs 503), headers for
  caching (`Cache-Control`, `ETag`) and conditional requests. HTTP/2 multiplexes
  over one connection; HTTP/3 (QUIC/UDP) removes head-of-line blocking.
- **Latency budget thinking**: memory ns → SSD µs → same-region network ms →
  cross-continent ~100ms+. A chatty design that makes 30 sequential cross-region
  calls cannot be fixed by faster code.

## API paradigms (pick by shape of the problem)

- **REST/HTTP+JSON** — the sane default: resource-shaped, cacheable, universally
  understood. Version it; keep error shapes consistent (`system-structure.md`).
- **GraphQL** — one flexible endpoint; clients request exactly the fields they
  need. Good for varied clients/aggregation; costs you caching simplicity and
  invites expensive nested queries (guard depth/complexity; watch N+1).
- **gRPC** — binary, schema-first (protobuf), fast; ideal for internal
  service-to-service calls, weaker for browsers/public APIs.
- **WebSockets** — bidirectional persistent connection for realtime (chat,
  collaboration, live dashboards). **SSE** is the simpler one-way alternative;
  **polling** is often good enough — don't reach for sockets by reflex, they add
  state, scaling, and reconnect complexity.
- **Webhooks** — the inbound event channel; verify signatures, ack fast, process
  idempotently (`reliability.md`).

## Proxies & gateways (the traffic layer people confuse)

The distinction, plainly:

- **Forward proxy** sits in front of *clients*, making requests on their behalf —
  egress control, corporate filtering, anonymity, caching outbound.
- **Reverse proxy** sits in front of *servers*, receiving requests and forwarding
  them to backends — this is the one you deploy (nginx, Caddy, Envoy, cloud LBs).
  It gives you TLS termination, load balancing, compression, static caching,
  request routing, and a place to enforce limits.
- **Load balancer** distributes across instances with health checks (L4 by
  connection, L7 by request content) — usually a role your reverse proxy plays
  (`production-stack.md` Layer 11).
- **API gateway** is a reverse proxy with product concerns bolted on: auth,
  rate limiting, quotas, routing/versioning, request shaping, usage metering —
  the front door for public APIs.
- **CDN** is a globally distributed reverse-proxy cache at the edge
  (`production-stack.md` Layer 10).
- **Service mesh** (Istio/Linkerd) moves service-to-service concerns — mTLS,
  retries, timeouts, tracing — into sidecars. Powerful and heavy: justified at
  many-service scale, overkill below it.

## Architecture styles (and the veteran's default)

- **Monolith** — one deployable. Simple to build, test, deploy, and debug; scales
  further than the internet claims.
- **Modular monolith** — one deployable, strict internal module boundaries with
  explicit interfaces. **This is the correct default for almost every new
  system**: you get clean boundaries now and the *option* to extract services
  later, without paying distributed-systems tax on day one.
- **Microservices** — independently deployable services owning their own data.
  Buys independent scaling/deployment and team autonomy; costs you network
  failures between every call, distributed transactions, eventual consistency,
  versioning across services, and an operational burden (tracing, discovery,
  orchestration) that needs real DevOps maturity. Adopt when *organizational* or
  scaling pain demands it — not because it sounds modern. Splitting a system you
  don't yet understand produces a distributed monolith: all the cost, none of the
  benefit.
- **Event-driven** — services communicate by publishing/consuming events; great
  decoupling and buffering, at the cost of harder reasoning about order,
  duplication, and end-to-end debugging (`execution-and-concurrency.md`).
- **Serverless** — per-request compute, no servers to manage; watch cold starts,
  execution limits, and cost at sustained volume (`production-stack.md` Layer 6).

Boundaries should follow *business capabilities* (billing, catalog, identity),
not technical layers — and a service that can't own its data isn't a service.

## Distributed systems (the truths that bite)

- **The fallacies**: the network is *not* reliable, latency is *not* zero,
  bandwidth is *not* infinite, topology *will* change. Every remote call can fail,
  hang, or arrive twice — hence timeouts, retries with backoff, circuit breakers,
  and idempotency (`reliability.md`).
- **CAP, honestly**: when a network partition happens you choose consistency or
  availability. Most business systems want strong consistency where money and
  identity live, and can tolerate eventual consistency for feeds, counts, and
  caches. Say which you chose and why.
- **Replication** (copies for read scale/HA — mind replica lag: "I saved it but
  don't see it" is usually a read hitting a stale replica) vs **sharding**
  (splitting data across nodes for write scale — the shard key decides your
  future pain; pick one that spreads load and matches your queries).
- **Queues & pub/sub** decouple producers from consumers, absorb spikes, and let
  slow work happen out-of-band. Assume at-least-once delivery: consumers must be
  idempotent, and need a dead-letter path for poison messages.
- **Sagas** replace distributed transactions across services: a sequence of local
  transactions with compensating actions when a step fails.
- **Observability is the debugger** for distributed systems: correlation IDs,
  structured logs, traces, metrics (`security-and-data.md`).

## AI-era infrastructure

- **Prompt caching** reuses the model's processing of a repeated prefix (system
  prompt, long context) across calls — large latency and cost savings; structure
  prompts with the stable part first.
- **Semantic caching** returns a stored answer when a *new* query is semantically
  close to a previous one (embedding similarity) rather than byte-identical. Cuts
  cost hard on repetitive workloads; tune the similarity threshold carefully —
  too loose and users get subtly wrong answers.
- **Vector databases / embeddings** store meaning as vectors for similarity
  search; the retrieval half of **RAG** (retrieve relevant context → put it in the
  prompt → generate). Retrieval quality, chunking, and freshness dominate RAG
  quality far more than model choice.
- Treat all model output as untrusted input: validate structure before use, and
  constrain what AI-driven actions may do (`security-and-data.md`).

## Fundamentals checklist

| Item | Why it matters |
| ---- | -------------- |
| Know the complexity of what you write; avoid accidental O(n²) | Invisible at 50 rows, fatal at 50,000 |
| Choose data structures by access pattern | Beats micro-optimizing the wrong one |
| Respect HTTP semantics, status codes, caching headers | They are part of your API contract |
| Think in latency budgets, not just code speed | Round-trips dominate at distance |
| Pick the API paradigm by problem shape (REST default) | Realtime/binary/flexible each cost something |
| Know forward vs reverse proxy, gateway, LB, CDN, mesh | The traffic layer is where scale is managed |
| Default to a modular monolith; earn microservices | Premature splitting = distributed monolith |
| Assume the network fails; design idempotent, timed-out calls | The fallacies always win eventually |
| Choose consistency deliberately per data type | Money ≠ feed counts |
| Use prompt/semantic caching and sound retrieval for AI | Cost and quality live here |

Design question: *"Do I understand what actually happens — over the network, in
the data structure, under partition — or am I hoping the framework handles it?"*
