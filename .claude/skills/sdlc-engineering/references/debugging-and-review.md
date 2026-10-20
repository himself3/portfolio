# Debugging & Review

Read this when something is broken, when reviewing code (yours, the user's, or
AI-generated) before it ships, or when verifying that work is actually complete.
The unifying idea: debugging and review are about replacing *guessing* with
*evidence*, and about catching problems before users do.

## Debugging is understanding the system, not just fixing the bug

The goal of debugging isn't to make the symptom disappear — it's to understand
*why* the system behaved as it did. Guessing your way through failures
(reload, tweak, hope) produces fragile prototypes where the "fix" doesn't address
the cause. This matters more with AI-generated code, which you didn't write and
therefore understand less by default. Build the habit before the prototype
breaks: when something fails, the first move is to understand the system's actual
behavior, then change it deliberately.

## Rubber ducking: explanation forces clarity

The most effective debugging technique sounds trivial — explain the problem,
step by step, as if to someone (or something) that knows nothing. The act of
describing your code, architecture, workflow, or AI prompt out loud surfaces the
hidden assumption or contradiction that was invisible while you were inside it.

Practically, when stuck or before asking for help: state what the code is
*supposed* to do, what it *actually* does, what you've already ruled out, and
what you expected at the exact point it diverged. Very often the bug becomes
obvious mid-explanation. When helping a user debug, walk them through the flow
this way rather than immediately patching.

## Debug with evidence, not speculation

When a web app or system breaks, the failure mode to avoid is reload-tweak-hope.
Get visibility into what's actually happening before changing anything:

- For web/frontend: use browser developer tools — inspect the DOM, watch network
  requests and their actual payloads/status codes, read console errors, profile
  performance. Diagnose from what the browser is really doing.
- For backend/services: read the actual logs, status codes, and stack traces.
  Reproduce the failure deliberately before attempting a fix.
- Form a hypothesis, change one thing, observe whether the evidence changes.
  Avoid changing several things at once — you won't know what fixed (or broke) it.

## Concurrency bugs need timing evidence

If a bug is intermittent — works 99 times, fails once, stops failing while you
watch it — suspect concurrency. Step-through debugging is unreliable here
because changing timing changes behavior. Reach for timestamps, request/workflow
IDs, event sequencing, and structured logging to reconstruct what actually
happened. (See `execution-and-concurrency.md`.)

## Reviewing AI-generated code

Generated code that runs is a draft, not a verdict. Review it the way you'd
review an unfamiliar contributor's pull request, looking specifically for the
things that "compiles and runs" doesn't catch:

- **Correctness vs. plausibility** — does it actually do the asked thing, or
  just something that looks right? AI errors often arrive as confident,
  professional-looking completed work rather than as visible errors.
- **Weak typing & assumptions** — `any`, unvalidated external data, assumed
  response shapes. (See `quality-and-types.md`.)
- **Security** — hardcoded secrets, missing auth checks, injection, unsafe
  uploads, permissive CORS. (See `security-and-data.md`.)
- **Error handling** — what happens on the unhappy path?
- **Consistency** — does it match patterns already in the codebase, or invent a
  third way to do the same thing?

## The habit of review (avoid both extremes)

Two failure modes when reviewing AI output: rubber-stamping everything (trusting
without verification) and micromanaging every token (so slow it erases the time
saved). The sustainable middle ground: focus review attention on the parts that
carry real risk — auth, data handling, money, irreversible actions, shared state
— and let low-stakes code through with a lighter touch. Match scrutiny to
consequences.

## Verify outside the ideal scenario

"Works on my machine," with clean test data, on the happy path, is not done.
Before declaring completion, verify behavior with realistic/messy data, on
error paths, and in conditions closer to production. Then run the **Definition of
Done gate in SKILL.md** and report honestly what's covered and what isn't.

## Debugging & review checklist

| Item | Why it matters |
| ---- | -------------- |
| Explain the problem step by step (rubber duck) | Explanation exposes hidden assumptions |
| Diagnose from real evidence (devtools, logs, traces) | Replaces guess-and-reload |
| Change one thing at a time | Keeps cause and effect clear |
| Suspect concurrency for intermittent bugs | Timing bugs defeat step-through debugging |
| Review generated code like an unfamiliar PR | Runs ≠ correct/safe |
| Match review scrutiny to risk | Sustainable, not rubber-stamp or micromanage |
| Verify on messy data and error paths before shipping | Happy-path success hides real failures |

Debugging question: *"What does the evidence actually show is happening, versus
what I assume is happening?"*
