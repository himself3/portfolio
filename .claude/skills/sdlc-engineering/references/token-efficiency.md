# Token Efficiency — work lean, especially in Claude Code

Read this when driving long sessions or whole projects in Claude Code. Context
(tokens) is the working memory of a session: everything read, generated, and
discussed consumes it, and when it runs low, quality degrades and sessions end
early. A professional treats context like a senior engineer treats attention —
spent deliberately, on what the task actually needs. Token efficiency is not
stinginess; it's what makes long, high-quality work sessions possible.

## Read surgically, not wholesale

The biggest token waste is reading more code than the task needs.

- **Search first, read second**: locate the relevant spot with grep/glob (a
  symbol, an error string, a route), then read *that region*, not the whole file.
- **Read whole files only when genuinely needed** (small files, files being
  rewritten, files whose overall structure matters).
- **Never re-read what's already in context** unless it changed. After editing a
  file, you know its state — don't reload it to "check."
- **Don't dump large artifacts into context**: huge logs, lockfiles, build
  output, datasets. Grep/tail/head the relevant slice; summarize the rest.
- **Use memory files instead of re-exploration** (`memory-system.md`): reading a
  40-line `architecture.md` replaces re-discovering the codebase every session —
  this is the single largest recurring saving on a long project.

## Generate surgically, not wholesale

- **Edit, don't regenerate**: change the lines that change. Rewriting a 300-line
  file to alter 10 lines burns tokens and risks unrelated regressions.
- **Plan before generating volume**: a few lines of plan (which files, what
  changes) prevents thousand-token wrong-direction drafts. Thinking is cheaper
  than re-doing.
- **Build in slices** (SKILL.md §7): implement → verify → proceed. Defects caught
  per-slice cost a fix; defects found at the end cost re-reading and re-working
  everything in context.
- **Don't echo code back**: after editing, reference the change ("dedupe added in
  `webhooks.py`") instead of pasting the result; the user can open the file. Same
  for explanations — concise, no restating what was just done at length.
- **Right-size the unit of work** (`thinking-disciplines.md`): one coherent
  feature per pass, not the whole app in one prompt and not twenty micro-prompts.

## Keep the session lean over time

- **Front-load orientation cheaply**: session start = read CLAUDE.md + relevant
  memory files + targeted searches — not a tour of the repository.
- **Persist instead of carrying**: long-running facts (decisions, conventions,
  state) belong in memory files, not in conversation context where they cost
  tokens forever and vanish at session end. Write them down, then rely on the
  file.
- **Compact at milestones**: in Claude Code, when a long session's context is
  filling with stale history, update `state.md` first, then use `/compact`
  (or start a fresh session) — memory files make this safe, because nothing
  durable lives only in the conversation. Compacting without persisting first is
  how knowledge gets lost.
- **Batch related small tasks** into one pass over a file rather than reopening
  it repeatedly across turns.
- **Prefer tools over recall for big spaces**: query/grep a large codebase or
  dataset per-question rather than ingesting it all "to be safe."

## Anti-patterns (the token burners)

- Reading entire directories or files "for context" without a target.
- Re-reading unchanged files; re-running searches already answered.
- Regenerating whole files for small diffs.
- Pasting full file contents back into the chat after writing them.
- Long narrations of what's about to be done, then doing it, then summarizing it
  — say it once, briefly.
- Re-deriving project knowledge every session instead of reading memory.
- Letting a session sprawl across many unrelated tasks without compacting.

## The balance

Never sacrifice correctness for tokens: read enough to be *sure* (the
production-grade and bug-prevention standards still rule), verify against current
docs when uncertain (`learning-and-research.md`), and review properly. Efficiency
means cutting *waste* — redundant reads, wholesale regeneration, unpersisted
re-derivation — not cutting diligence. A wrong fix costs far more tokens than the
careful read that would have prevented it.

Self-check: *"Is this read/generation targeted at what the task needs, or am I
spending context to feel thorough?"*
