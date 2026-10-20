# Decision log (ADRs)

One decision per entry, written when the decision is made while the reasoning is
fresh. Append-only: decisions are **superseded, never rewritten** — the value is
an honest timeline, not a tidy story.

Record decisions that shape structure, non-functional characteristics,
dependencies, interfaces, or construction techniques. Skip the trivia.

---

## ADR-0001 — Adopt the engineering autopilot
Status: Accepted · 2026-09-27
Context: Standards applied only when remembered are applied inconsistently.
Options: (a) instructions alone — cheap, but probabilistic.
  (b) instructions + deterministic hooks — enforces the checkable floor every
  time, including inside subagents; small maintenance cost.
Decision: (b).
Consequences: + production-grade, human-authored and safety rules hold under
  pressure and in delegated work.
  − hook rules need occasional tuning; false positives must be fixed promptly or
  they erode trust in the whole gate.

---

## ADR-0002 — Busulwa Gadafi site is a separate app and repo, nested but ignored
Status: Accepted · 2026-10-14
Context: User asked for a second portfolio (Busulwa Gadafi, brand designer) and
  gave it its own GitHub repo (himself3/Busulwa-portfolio). It lives in
  `BusulwaGadafi/` inside this repo's working tree.
Options: (a) a route inside this Next app — shares deploy, mixes two people's sites.
  (b) separate Next.js app in its own repo, nested folder ignored by this repo.
  (c) plain HTML — no build, but inconsistent with the user's stack.
Decision: (b), same stack as this portfolio (user chose Next.js).
Consequences: + independent deploys and history; no cross-contamination.
  − root `tsconfig.json` must exclude `BusulwaGadafi` and `.gitignore` must
  ignore it, or the root build type-checks the other app; ESLint in the child
  needs `"root": true` (see gotchas).

---

## ADR-0003 — Narrow the quality hook's "placeholder" rule
Status: Accepted · 2026-10-14
Context: `/\bplaceholder\b/i` blocked the HTML `placeholder` attribute and
  Tailwind's `placeholder:` variant: real UI, not stubs. Per ADR-0001, false
  positives must be fixed promptly.
Options: (a) avoid the attribute (worse UX); (b) narrow the regex.
Decision: (b) `(?<![:\w-])placeholder\b(?!\s*=|:)`, and exempt the rulebook
  (`.claude/hooks|agents|skills/`, absolute or relative paths), which must
  contain the words it bans.
Consequences: + attribute/variant/pseudo-element pass; "// placeholder until X"
  in app code still blocks (tested). − the rulebook is no longer self-scanned.

---

## ADR-0004 — BusulwaGadafi icons: AnimateIcons (animated Lucide)
Status: Accepted · 2026-10-14
Context: User asked for animated icons, first from iconsax.io, then "the most
  beautiful" of lordicon, potlabicons, heroicons-animated, animateicons,
  lucide-animated, itshover, movingicons.
Options: Iconsax animated set is Premium-only (Lottie/GIF, paid, client needs
  own licence). Lordicon free = attribution + no-derivatives + CDN/download
  limits. lucide-animated (MIT) lacks mail/newspaper/megaphone/monitor/target.
  itshover/potlab/movingicons: thin coverage or unclear licence.
Decision: `@animateicons/react` 0.12.0 (MIT, React 18 peer, updated 2026-10-05),
  its `/lucide` set. Bundles its own motion copy (~25 kB first icon); respects
  prefers-reduced-motion inside startAnimation. Parent controls trigger via
  `lib/icon-trigger.ts` (hover + keyboard focus). Brand logos stay Tabler (`tb`).
Consequences: + one consistent stroke family, local, no attribution.
  − second motion runtime alongside framer-motion; fingerprint/newspaper/
  book-marked substituted (fingerprint-pattern, file-text, book-open-text).

---

## ADR-0006 — BusulwaGadafi background: halftone dots under glassmorphism panes
Status: Accepted · 2026-10-14 · supersedes the background part of ADR-0005
Context: User iterated: studio wall → flat sky → photo from /public → "a suitable
  shade of white and orange dots" → "background in glassmorphism style, the rest
  liquid glass and transparent". The /public photos were then removed by the user.
Decision: Light theme is the default (warm white #F8F6F2). Background = one
  SVG <pattern> dot grid + generated halftone clusters (two corners) + four
  classic frosted `.bg-pane`s (blur 22px, milky fill). Foreground stays clear
  liquid glass. Alternate scenes deleted (git history keeps them). Panes are not
  in the parallax (moving large backdrop-filters re-blurs every glass surface).
  BrandStack's palette/typeface cards use a 0.9 frost: they overlap, and clear
  glass measured 2.2:1 for their 11-12px labels.
Consequences: + one coherent scene, ~140 DOM circles instead of ~1,900.
  − light-mode glass reads near-white where nothing sits behind it.

---

## ADR-0005 — BusulwaGadafi: liquid glass on a flat studio-wall background
Status: Background part superseded by ADR-0006 · 2026-10-14
Context: User asked for "completely liquid glass and transparent" UI and a new
  background with no gradients.
Decision: Near-zero glass tint, light 12px frost for legibility, gradient rim
  (::after mask ring) + inset glows. Real refraction (`backdrop-filter:
  url(#liquid-lens)`) only on controls (`.liquid`, `.btn-glass`) and only in
  Chromium (`html.lens`, set by the head script); Safari/Firefox get clear
  frosted glass. Background = flat Swiss-poster wall (grid, crop marks,
  registration target, orange sun, steel arch) in `Environment.tsx`; shapes kept
  to the edges for text contrast. prefers-reduced-transparency → near-solid fill.
Consequences: + glass reads clearly over crisp shapes. − refraction is
  Chromium-only and costly, so it is limited to small controls.

---

<!-- Template:
## ADR-000N — <short title>
Status: Accepted | Superseded by ADR-000M · <date>
Context: <the forces and constraints>
Options: <real alternatives, including the boring existing one>
Decision: <what was chosen>
Consequences: + <what improves>  − <what is accepted as the cost>
-->
