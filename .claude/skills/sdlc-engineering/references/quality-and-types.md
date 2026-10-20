# Quality, Types & Testing

Read this when writing or reviewing code, defining data structures, deciding
what to validate, or setting up tests. Fast generation increases the speed at
which inconsistency and hidden bugs spread. These practices create fast feedback
loops that catch problems early, before they compound.

## Review generated code critically

AI-generated code is frequently syntactically correct while quietly fragile.
Watch for: excessive `any`/loose types, missing null handling; inconsistent
object shapes and naming across files; unsafe casts and loosely validated
external data; missing error handling, unreachable code, accidental globals;
silent assumptions about API/response shape; deprecated patterns and duplicated
logic. Working code is not automatically correct, consistent, or safe — treat the
first generation as a draft to review. (Deeper review tactics in
`debugging-and-review.md`; the mindset in `thinking-disciplines.md`.)

## Type discipline = clarity, not bureaucracy

Types move assumptions out of your head into rules the system enforces.

- Define the shape of important data objects first; types are communication tools
  and living documentation, not just compiler rules.
- Use descriptive type names reflecting business meaning (`PendingInvoice`, not
  `Obj2`).
- Define **shared data contracts** early for APIs, workflows, and agent
  interactions so different parts interpret data the same way.
- Minimize overly broad types; each `any` is a place a future edge case hides.

## Validate at boundaries (static types aren't enough)

A type is a promise, not a guarantee reality matches. Validate untrusted data
where it enters: API responses, uploaded files, user input, database records,
third-party integrations, and **AI/LLM output** (probabilistic — never assume it
matches the expected shape). Be flexible at the edges, structured at the core:
user records, payments, auth state, and workflow states stay predictable and
validated. (Data Validation also covered in `system-structure.md`.)

## Linting: automated review for the mistakes humans miss

Set up linting early, before inconsistent patterns spread. It catches unused
variables, unreachable code, missing error handling, unsafe async patterns, and
risky comparisons automatically. Treat warnings as signals worth understanding —
before silencing one, ask "is this preventing a category of problem I haven't hit
yet?" Caveats: linting checks consistency, not architecture, business logic, or
security; and overly rigid rule sets cost more than they're worth, so prioritize
safety/clarity rules over stylistic preference.

## The testing toolbox

Different tests catch different failures. Match the type to the risk; you don't
need all of them on every task.

- **Unit tests** — individual functions/components in isolation. Fast feedback on
  core logic.
- **Integration tests** — components working together (e.g., code + database, or
  your app + an API). Catch interface mismatches.
- **Regression tests** — protect features that already work so new changes don't
  silently break them. Protect your most critical paths first; especially
  valuable when iterating fast with AI, which can change things unpredictably.
- **Property-based / fuzz tests** — generate many/unexpected inputs to surface
  edge cases you wouldn't think to write by hand.
- **Readiness testing** — does it hold up under real usage (load, edge cases,
  failure scenarios), not just the happy path on your machine?
- **Performance & scalability testing** — load testing, stress testing, and
  capacity planning. A prototype fine for one user on a laptop can fail when
  users arrive, requests spike, or data grows. Test before scaling matters.

For each feature, consider how it will be tested before declaring it done, and
test the non-happy paths: bad input, empty data, failures, edge values.

## Mock external services

External services fail more often than your own code and you don't control them.
Mocking lets you build, test, and demo without depending on them — and lets you
deliberately simulate their failure modes (timeouts, errors, malformed
responses) so your error handling is actually exercised.

## Testing in production (done responsibly)

Real users create conditions no staging environment fully replicates. Done
carefully, validating in production is one of the safest ways to confirm change:
**separate deployment from release** using feature flags, canary releases, and
gradual rollouts so new functionality can be observed on a slice of traffic and
rolled back fast if it misbehaves. (Pairs with CI/CD in
`infrastructure-and-devops.md`.)

## Quality checklist

| Item | Why it matters |
| ---- | -------------- |
| Review generated code for weak typing & assumptions | Prevents fragile "works for now" code |
| Define data shapes & shared contracts early | Keeps the system consistent |
| Validate external/untrusted input and LLM output at boundaries | They're unpredictable |
| Set up linting early, tuned to safety over style | Catches common mistakes automatically |
| Pick the right test types for the risk (unit/integration/regression/etc.) | Different tests catch different failures |
| Protect working features with regression tests | New changes shouldn't break old behavior |
| Load/stress test before scale matters | Happy-path-at-1-user hides scaling failures |
| Mock external services to test failure modes | Exercises error handling without flaky deps |
| Use flags/canaries to release safely in prod | Validate with real traffic, roll back fast |

Pre-prototype question: *"What assumptions about data shape and load am I making
that the system itself should enforce or be tested against?"*
