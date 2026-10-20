# Conventions

This project's house rules. A correction from the user belongs here as a
permanent rule, not a one-off fix. Read before writing code; conform exactly.

## Standing (from the engineering brain)

- Production-grade only: no placeholders, stubs, TODOs, or mock data in real
  code paths. Genuine blockers are surfaced loudly, never faked past.
- Human-authored quality: comment the why not the what; domain-meaningful names;
  no padding, marketing adjectives, banner comments, or emoji.
- Interfaces use one professional SVG icon family — never emoji as icons.
- Match the surrounding codebase's style over personal preference.

## Project-specific

- Never invent facts about real people: no made-up clients, jobs, dates, stats
  or contact details. Ask, or use clearly labelled sample content the user
  approved, and leave unknown contact channels `null` (UI hides them).
- Commit or push only when the user says so in that request; "commit" is not
  "push".
- Contact forms on these static sites hand off via `mailto:`; never show a fake
  "sent" state.
- One icon family per site: Lucide for UI; brand logos from a matching set
  (react-icons `si`/`fa6` in this portfolio, Tabler `tb` in BusulwaGadafi).
- CV source is `cv/resume.html`; regenerate with `npm run cv` (warns if it
  exceeds one page).
