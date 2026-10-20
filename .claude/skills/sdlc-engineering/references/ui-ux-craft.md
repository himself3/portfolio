# UI/UX Craft

Read this whenever building anything a user sees or touches. The UI/UX role in
`roles-and-behaviors.md` gives the instincts; this file is the craft — the
principles the best design education teaches, distilled for building. The goal is
interfaces that feel designed by an experienced human: clear, calm, consistent,
and usable by everyone — not the generic, over-decorated look of generated UI.

## Usability heuristics (Nielsen's ten, as working reflexes)

The standard evaluation lens for any interface. Check designs against these:

1. **Visibility of system status** — always show what's happening: loading,
   saving, progress, success. Silence reads as broken.
2. **Match the real world** — speak the user's language and follow their mental
   model, not internal jargon ("Invoice sent", not "TX_COMPLETE").
3. **User control & freedom** — easy undo/cancel/back; never trap users in a
   flow. Prefer undo over confirmation dialogs where feasible.
4. **Consistency & standards** — same words/patterns for the same thing
   everywhere; follow platform conventions. Users bring expectations from every
   other product; meet them.
5. **Error prevention** — design so mistakes can't happen: constraints, sensible
   defaults, confirm only the destructive and irreversible.
6. **Recognition over recall** — show options instead of making users remember
   them; visible state beats memorized state.
7. **Flexibility & efficiency** — shortcuts and faster paths for repeat users
   without confusing novices.
8. **Aesthetic & minimalist design** — every element competes for attention;
   remove what doesn't serve the user's task.
9. **Help users recognize and recover from errors** — plain-language messages:
   what failed, why, what to do next. Never raw codes or "Something went wrong"
   with no path forward.
10. **Help & documentation** — ideally unnecessary; where needed, contextual and
    task-focused (empty states that teach, inline hints), not a manual.

## Visual hierarchy: guide the eye deliberately

Users scan; hierarchy decides what they see first. Build it with **size, weight,
color/contrast, and position** — the primary action and key content should
dominate; secondary things recede.

- One clear primary action per screen/section; don't make three buttons shout.
- **The blur test**: squint (or blur the design); if you can still spot the
  primary action and the content structure, the hierarchy works.
- Group by proximity (related things close, unrelated separated by space) —
  people perceive grouped elements as related (Gestalt). Whitespace *is* the
  grouping tool; don't fill it.

## Layout, spacing & typography (where "generated" look dies)

Most amateur/AI-looking UI fails here, not in features:

- **Use a spacing scale** (e.g. 4/8px steps) consistently; arbitrary one-off
  margins read as sloppy. Be generous — cramped UIs feel cheap.
- **Typography**: a deliberate type scale (one or two families; clear steps for
  display/heading/body/caption), line-height ~1.4–1.6 for body, line length
  ~45–75 characters. Hierarchy through weight and size, not decoration.
- **Alignment**: pick a grid and stick to it; misaligned edges are the fastest
  tell of careless UI.
- **Color**: a restrained palette — neutrals doing most of the work, one primary,
  semantic colors (success/warning/danger) used only for meaning. Don't
  communicate by color alone (accessibility).
- **Icons**: one professional SVG icon family (Lucide, Heroicons, Phosphor,
  Feather, Tabler — or the product's existing set), consistent stroke weight,
  sized on the type grid. Emojis are never icons; a 🚀 on a feature card is the
  loudest amateur/AI tell an interface can carry.
- Borders are not the only separator: spacing and subtle background shifts often
  group better than boxes around everything.

## Design every state, not just the happy one

A screen isn't designed until all its states are: **loading** (skeletons/spinners
with restraint; no frozen UI — see streaming/long-running in
`execution-and-concurrency.md`), **empty** (teach what goes here and offer the
first action — empty states are onboarding), **error** (human message + recovery
path), **partial/degraded** (some data unavailable), and **success** (clear
confirmation). Plus interaction states on every control: hover, focus, active,
disabled.

## Forms: where users suffer most

Labels always visible (placeholders are not labels — they vanish). Validate
inline at the right moment (on blur/submit, not on first keystroke), say exactly
what's wrong next to the field, never clear the user's input on error, preserve
state on failure, sensible input types/keyboards on mobile, and one clear submit.
Long forms: group logically or break into steps with progress shown.

## Accessibility is a requirement, not polish (WCAG AA as the bar)

Roughly 16% of people live with a disability, and accessible design helps
everyone. Build to these from the start:

- **Contrast**: ≥4.5:1 for body text, ≥3:1 for large text and UI components.
- **Keyboard**: every interactive element reachable and operable by keyboard,
  visible focus states, logical tab order, no traps.
- **Semantics**: real HTML elements (button, nav, label, headings in order);
  ARIA only where semantics can't express it. Images get alt text; forms get
  programmatic labels.
- **Touch targets**: ≥44×44px with breathing room.
- **Motion**: honor `prefers-reduced-motion`; nothing flashing.
- Test once with keyboard only and once with a screen reader pass; it catches
  most failures cheaply.

## Responsive & performance as UX

Design mobile-first or at minimum mobile-seriously: layouts reflow (flex/grid),
nothing depends on hover alone, content priority decides what survives on small
screens. And speed is experience: optimize images, avoid layout shift, show
something fast — perceived performance (skeletons, streaming) counts
(`production-stack.md` CDN layer).

## Consistency at scale: think in a system

Even small apps benefit from system thinking: define tokens (colors, spacing,
type, radii) once and reuse; build components (button, input, card, modal) once
with all their states and reuse them — never restyle ad hoc per page. This is
what makes a product feel *designed* and keeps change cheap (one fix updates
everywhere). Match the existing product's visual language when extending it —
consistency with context beats personal flair (`human-authored-code.md` applies
to design too).

## Tooling: UI/UX Pro Max (when installed)

If the ui-ux-pro-max skill is present (.claude/skills/ui-ux-pro-max/), use its
search engine for concrete, data-backed choices before styling — it generates a
complete design system (pattern, style, palette, typography, effects,
anti-patterns) and answers domain queries:

    python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<product query>" --design-system -p "<Project>"
    python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain style|typography|color|ux|chart
    python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack react|nextjs|vue|...

Treat its output as expert-curated options, not verdicts: the principles in this
file and the product's own context decide what fits. Persist the accepted system
with --persist so design-system/MASTER.md becomes the single source of truth.

## UI/UX checklist

| Item | Why it matters |
| ---- | -------------- |
| Evaluate against the ten heuristics before shipping | Catches usability failures cheaply |
| One primary action; hierarchy passes the blur test | Users scan, not read |
| Spacing scale, type scale, grid alignment, restrained palette | Where "generated look" is killed |
| Design loading/empty/error/partial/success + control states | A screen is its states |
| Forms: visible labels, inline errors, preserved input | Where users abandon |
| WCAG AA: contrast, keyboard, semantics, targets, motion | 16% of users, and better for all |
| Mobile-seriously + perceived performance | Most traffic, most impatience |
| Tokens + reusable components, consistent with the product | Designed feel; cheap change |

Pre-ship question: *"Walk the screen as a first-time user on a phone with a slow
connection and a screen reader — does every state still make sense?"*
