# Production-Grade by Default

Read this on every task that produces code. The standard is absolute: **ship
production-quality, complete, professional code — never prototype placeholders,
stubs, or mock implementations standing in for real logic.** "Prototypes become
production" is not a reason to write loose prototype code; it's the reason to
write production code from the first line, because the first line is what ends up
in production.

This overrides any instinct to "just get something working." Getting something
working *is* the job — working means production-ready, not demo-ready.

## What "production-grade" means concretely

Every piece of code you deliver should be:

- **Complete** — implements the actual logic, not a skeleton. No function that
  `return`s a hardcoded value where real computation belongs. No "this is where
  you'd call the API" comments instead of the call.
- **Correct on the unhappy path too** — handles errors, bad input, empty/null,
  and external failures, not just the happy path.
- **Validated at boundaries** — untrusted input and LLM output checked before use.
- **Secure** — no hardcoded secrets, parameterized queries, real auth checks.
- **Observable** — meaningful logging/error surfacing so failures are diagnosable.
- **Consistent with the codebase** — matches existing patterns, naming, structure.
- **Readable and maintainable** — human-professional quality (see
  `human-authored-code.md`).

If it isn't all of these, it isn't done — it's a draft, and drafts don't ship.

## Banned by default (these are defects, not shortcuts)

Do not produce, unless the user *explicitly* asks for a throwaway/sketch:

- **Placeholder logic**: `// TODO: implement`, `throw new Error("not implemented")`,
  functions that return `null`/`{}`/`[]` where real logic belongs, `pass` bodies.
- **Mock/fake data baked into real code paths**: hardcoded sample responses,
  `const users = [{id:1,name:"John Doe"}]` standing in for a real query, fake
  delays simulating work. (Real mocking belongs in tests, not production paths.)
- **Stubbed integrations**: "pretend this calls Stripe" — either wire the real
  integration or, if truly blocked, see the escalation rule below.
- **Happy-path-only code**: no error handling, assumes every call succeeds.
- **Hardcoded config that should be environment-driven**: URLs, keys, limits.
- **Silent simplifications**: quietly ignoring an edge case the feature implies.
- **"For now" / "for demo purposes" code**: the temporary version is how
  unfinished code reaches production.

## When something genuinely can't be completed now

Sometimes a real blocker exists — a missing credential, an undecided business
rule, an external dependency you can't reach. The professional move is **not** to
silently drop in a placeholder and present it as finished. Instead:

1. Implement everything that *can* be done to production standard.
2. At the genuine boundary of the unknown, make the gap **explicit and loud**, not
   hidden: a clearly named configuration point, a typed interface awaiting a
   value, or a documented assumption — never a fake that looks real.
3. **Tell the user plainly** what's blocked, why, and exactly what you need from
   them to finish it (the API key, the decision, the endpoint).

The difference: a placeholder pretends to be done and causes a silent failure
later; an explicit, surfaced gap is honest engineering and the user can resolve
it. Catching this is part of the standing mistake-catching duty.

## When the user says "just make it work" / "quick prototype"

Moving fast does not mean shipping fragile code — it means scoping tighter, not
lowering quality. Build a *smaller* thing to full production standard rather than
a bigger thing full of stubs. If the user explicitly wants a genuine throwaway
sketch, that's their call: confirm it briefly, then comply — but the default is
always production-grade, and you should gently note when "quick" is steering them
toward something they'll have to rewrite.

## Self-check before declaring code done

- Did I implement the real logic everywhere, or is there a stub/placeholder/mock
  hiding in a real code path?
- Does every external call and input have a failure path?
- Are there any "TODO", "for now", "in a real app", or fake-data tells left?
- Would this survive a real user and real data today, not "once it's finished"?
- If something genuinely couldn't be completed, did I surface it loudly and tell
  the user what's needed — rather than papering over it?

If any answer is wrong, it's not done. Finish it or surface the blocker; never
present a placeholder as complete.
