# Tech radar

What this project relies on, and when each fact was last verified against an
authoritative source. Keep the verified date beside every entry. Never guess a
version; if offline, mark the entry unverified rather than presenting stale
knowledge as current.

## Toolchain (the engineering system itself)

Verified 2026-09-27 against the official Claude Code documentation:

- **Hook events** — `SessionStart`, `UserPromptSubmit`, `PreToolUse`,
  `PostToolUse`, `Stop` are current, with the standard
  `matcher` / `hooks` / `command` structure in `.claude/settings.json`.
- **Exit codes** — exit 2 on `PreToolUse` blocks the tool call; exit 2 on
  `PostToolUse` cannot undo the call but surfaces stderr to Claude as feedback.
  Both behaviours are what this project's hooks depend on.
- **`${CLAUDE_PROJECT_DIR}`** — current and correct for referencing the project
  root from hook commands.
- **Subagent `model` aliases** — `opus`, `sonnet`, `haiku` remain valid.
  Also available: `fable`, `best` (Fable where available, else Opus),
  `opusplan` (Opus while planning, Sonnet to execute), and `inherit` (use the
  parent session's model).
  *Noted, not adopted:* the current assignments work and changing them without
  evidence of benefit would be novelty-chasing. Revisit only if cost or quality
  data says otherwise.
- No breaking changes to hook configuration as of this date.

## Project stack

<!-- Replace with this project's real dependencies as they are introduced.
     One line each: name, version actually installed, verified date. -->

Installed versions read from node_modules on 2026-10-14 (not checked against
upstream for newer releases or advisories; that refresh is still due):

- Both apps: next 14.2.35 · react 18.3.1 · framer-motion 11.18.2 ·
  lucide-react 0.344.0 (old: lacks `CircleCheck`, `BriefcaseBusiness`; use
  `CheckCircle2`, `Briefcase`) · react-icons 5.7.0 (no Adobe or LinkedIn marks in
  `si`; use `tb`/`fa6`) · tailwindcss 3.4.19 · typescript 5.9.3.
- This portfolio: eslint ^9 with eslint-config-next ^16, mismatched with Next 14
  (`next lint` can't load it). Untouched; flag before relying on lint here.
- BusulwaGadafi: eslint 8.57.1 + eslint-config-next 14.2.35 (matched).
- Node 24.13.0 locally; Next 14 needs >= 18.17.

## Advisories and deprecations to act on

- _(none recorded)_

## Changed since last check

- _(nothing yet)_

## Watch list

- Dependencies that move fast or that this project is about to depend on for the
  first time.
