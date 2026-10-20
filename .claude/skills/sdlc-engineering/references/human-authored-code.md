# Writing Like a Human Professional

Read this whenever producing code, commits, docs, config, or any artifact a
person will read. The standard: the work must read as if a seasoned human in that
profession made it. This is a quality bar, not a trick — the markers of machine
generation (padding, narration, generic structure, absent judgment) are
themselves defects. A senior engineer's output is lean, opinionated, fits its
context, and carries judgment. Aim for that.

The single strongest signal of human authorship is **fitting into the existing
codebase**: matching its conventions, patterns, naming, file layout, and style so
the new code is indistinguishable from what's already there. Always read
surrounding code before adding to it, and conform.

## Code

**Comment the why, not the what.** Most lines need no comment. Comment the
non-obvious: why this approach over the naive one, a gotcha, a constraint, a
link to context. Never narrate mechanics.

```
# AI tell:
i = i + 1  # increment i
users = []  # create an empty list for users

# Human:
# Stripe webhooks can arrive twice; dedupe on event ID before processing.
if event.id in processed_events:
    return
```

**Name for domain meaning.** Generic names are a tell and a comprehension cost.

```
# AI tell:        data, result, temp, item, handleData(), processItem(), doStuff()
# Human:          pendingInvoices, retryAfter, chargeUser(), parseWebhook()
```

**Cut ceremony.** No wrapper functions called once, no try/catch that only
rethrows, no defensive scaffolding nobody needs, no exhaustive docstrings on
trivial helpers. Write the minimum that's clear, and delete dead weight. Real
code has uneven density — a one-liner where it's a one-liner, depth where depth
is earned — not suspiciously uniform, padded functions.

**No decoration.** Avoid emoji, banner comments, ASCII section dividers, and
"=====" art. They almost never appear in professional codebases.

**Match the house style exactly.** Indentation, quotes, import ordering, error
patterns, naming conventions, test layout — mirror what the repo already does,
even if you'd personally choose differently. Consistency with context beats
personal preference.

**Handle errors like a practitioner**, not a tutorial: specific catches where you
can act on them, let others propagate, fail with useful messages. Avoid the AI
habit of wrapping everything in broad try/except that hides problems.

## Prose around code (responses, PR descriptions, commits)

**Drop the marketing adjectives.** "Robust", "comprehensive", "powerful",
"seamless", "production-ready", "scalable solution" — these are AI tells and add
nothing. State what it does and what to watch for.

**Don't preface and summarize.** AI sandwiches code between "Here's a clean,
robust solution that…" and a bulleted recap of what it just wrote. A professional
lets the code stand and adds only genuinely useful context (a caveat, a decision,
a next step).

**Commit messages** follow the repo's existing convention; describe the change
and its reason concisely (e.g. `fix: dedupe webhook events to prevent double
charges`), not a generated-sounding essay.

**Docs** are concise and specific to this project — assume a competent reader,
skip the throat-clearing, don't restate the obvious. No "In this section we
will…" tutorial framing in reference docs.

## Interfaces & visual assets (the UI has AI-tells too)

Generated *interfaces* give themselves away as readily as generated code. The
professional standard:

- **Real icon systems, never emojis as icons.** Feature cards headed by 🚀 ✨ 💡,
  emoji bullets, emoji in buttons/navigation — the single loudest AI-UI tell.
  Use a professional icon library (Lucide, Heroicons, Phosphor, Feather, Tabler —
  or the project's existing set) rendered as SVG: consistent stroke weight, sized
  on the type grid, colored with the palette's tokens. One icon family per
  product; never mix families, never mix icons with emoji.
- Emojis are equally banned from commit messages, code comments, logs, docs,
  README headers, and CLI output. (Rare exception: content where the user's
  *product* genuinely calls for them, e.g. a chat app's message body.)
- **Professional assets throughout**: a real favicon and og-image, not defaults;
  purposeful imagery or well-crafted CSS/SVG graphics, not clip-art or sparkle
  stock; loading/empty states designed (per `ui-ux-craft.md`), never a bare
  default spinner.
- **Real components, consistently**: buttons, inputs, cards, modals built once
  with all their states and reused — not restyled ad hoc per page. Follow the
  product's existing component and icon conventions exactly, the same way code
  follows the repo's style.
- Same generic-vs-deliberate rule as prose: no gradients-on-everything, no
  sparkle motifs, no "AI-purple" defaults adopted unthinkingly — every visual
  choice should look chosen by a designer for *this* product (`ui-ux-craft.md`
  carries the full craft).

## Quick self-check before shipping any artifact

Reread and ask: *would a senior engineer in this codebase have written it this
way, or does it smell generated?* Look for and remove:

- comments narrating what the code obviously does
- generic names (`data`, `result`, `temp`, `handleX`, `processX`)
- padding: single-use wrappers, redundant try/catch, docstrings on trivial code
- marketing adjectives and preface/summary prose
- emoji, banner/divider comment art
- emojis standing in for icons in any interface; mixed icon families; default
  favicons/spinners where a designed asset belongs
- style that doesn't match the surrounding code

If you find these, fix them. The aim is work a human teammate would assume a
human wrote — because it carries the restraint and judgment that machine output
usually lacks.
