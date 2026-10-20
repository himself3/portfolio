# System Structure

Read this when deciding how an application is organized — its architecture,
boundaries, components, data flow, APIs, and how the pieces fit together. AI
generates code fast but does not decide how that code should be structured to
make sense over time. Structure is what separates a quick demo from a prototype
you can actually extend, debug, and scale. The recurring failure mode: everything
tangled together, logic leaking across files, small changes becoming risky.

## System design: design the system before prompting

Think in components and responsibilities, not files and prompts. A system is a
set of parts that each do one job and communicate in defined ways. Before
generating code:

- **List components and their single responsibility** — and what each is allowed
  to know about the others. Clear boundaries give AI a frame to generate
  maintainable code within; without them it mixes everything together.
- **Map data flow** — where data enters, how it moves between components, where
  it's stored, where it leaves. Most failures come from unclear data flow, not
  bad algorithms. Sketch inputs → transformations → storage → outputs first.
- **Choose boundaries before logic** — frontend vs backend, API vs database,
  business logic vs infrastructure. For each component ask: what does it own,
  what does it explicitly *not* own, how do others interact with it?
- **Design for change, not perfection** — identify what's most likely to change
  versus what must stay stable, and put boundaries around the stable core to
  protect it. You don't need a perfect diagram, just intentional structure.

## Separation of concerns

Divide the application so each part has one clear responsibility: UI, business
logic, data access, and AI components should be distinguishable, not fused. Even
small prototypes benefit — tangled code fails not because features are missing
but because everything depends on everything. Apply lightweight boundaries so a
change in one concern doesn't ripple through unrelated ones.

## Component architecture

As a prototype grows, "just a script" becomes hard to understand, reuse, or
extend. Break the app into well-defined components, each with a single
responsibility and explicit dependencies, without over-engineering. Identify
components, define their interfaces, and manage how they depend on each other so
the system stays comprehensible.

## Frontend vs backend

AI prototypes often blur this line: UI talking directly to databases, secrets
ending up in the browser, business rules that are trivially bypassed
client-side. This works early and creates security, scalability, and reliability
problems later. Keep secrets and trusted logic on the backend; treat the
frontend as untrusted. Enforce validation and authorization server-side even if
the UI also checks (never rely on client-side checks for security).

## API design basics

APIs are the contracts connecting frontends, agents, and external services. Built
reactively, they drift into inconsistent endpoints, unclear responses, and
fragile integrations. Design simple, consistent contracts: predictable naming
and structure, consistent error formats, explicit request/response shapes, and a
plan for versioning so the API can evolve without breaking consumers.

## Data contracts

A data contract is an explicit agreement about the shape and meaning of data
passed between components or services. Loosely passing data works early, then
causes inconsistencies, hidden bugs, and fragile integrations as the system
grows. Define contracts for the important interfaces, validate against them at
boundaries, and manage changes deliberately (versioning, backward compatibility)
to prevent drift.

## Data validation

Even simple prototypes fail when inputs are unexpected or outputs malformed.
Validate that data meets expectations before processing it — at every boundary
where untrusted data enters (user input, API responses, file uploads, and
especially probabilistic AI/LLM output). Validation is the first line of defense
against crashes, corruption, and unpredictable behavior. (Closely tied to types
in `quality-and-types.md`.)

## Data structures

Data structures are the foundation of how a prototype stores, organizes, and
moves information. Unclear or inconsistent structures lead to brittle code,
confusing bugs, and unpredictable failures. Choose structures that match how the
data is actually accessed and keep them consistent across the system; let the
shape of the data reflect its meaning.

## State management

State is the information the app tracks while running — user inputs, model
outputs, session data, temporary calculations. Poor state management causes
unpredictable behavior, lost data, and confusing bugs. Be deliberate about what
state exists, where it lives (client, server, database, cache), who can change
it, and how it's kept consistent. Minimize mutable shared state (see also
`execution-and-concurrency.md`).

## System structure checklist

| Item | Why it matters |
| ---- | -------------- |
| List components + single responsibility before coding | Gives structure for AI to build within |
| Map data flow (in → transform → store → out) | Most failures come from unclear data flow |
| Define boundaries: what each part owns and doesn't | Prevents tangled, risky-to-change code |
| Keep secrets/trusted logic on the backend | Frontend is untrusted; client checks aren't security |
| Design consistent API contracts with versioning | Prevents fragile, drifting integrations |
| Define and validate data contracts at boundaries | Stops drift and hidden integration bugs |
| Be deliberate about where state lives and who mutates it | Prevents lost data and unpredictable behavior |
| Protect the stable core; isolate what changes often | Lets the system absorb change without rewrites |

Pre-prototype question: *"What are the major components, what does each own, and
how does data flow between them — before I write a single prompt?"*
