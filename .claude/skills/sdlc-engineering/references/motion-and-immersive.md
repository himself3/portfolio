# Motion & Immersive Web Craft

Read this when building animated, award-caliber web experiences — the kind of
work studios like MDX (Marcelo Design X) are known for: sites that feel alive,
where scroll tells a story, interfaces breathe, and 3D and motion create emotion.
The craft has one governing law: **motion is functional UX, not decoration** — it
guides attention, communicates hierarchy and causality, and gives a product its
personality. Animation that doesn't serve one of those jobs is noise.

This file extends `ui-ux-craft.md`; everything there (hierarchy, states,
accessibility) still rules. Motion is the layer on top.

## Motion principles (what separates choreography from chaos)

- **Purpose first**: every animation answers "what is this telling the user?" —
  entrance (this just appeared), relationship (this came from that), feedback
  (your action worked), focus (look here), continuity (you moved, not teleported).
- **Easing is the personality**: linear reads robotic. Ease-out for entrances
  (fast start, gentle landing), ease-in for exits, spring physics for
  interactive/gestural elements. Pick a small set of easings and reuse them —
  consistency of motion is part of brand.
- **Duration discipline**: micro-interactions ~150–250ms; standard transitions
  ~250–400ms; large/expressive moments up to ~700ms. Slower than that must earn
  it (hero moments, storytelling) — habitual slowness feels broken.
- **Choreography & stagger**: elements arriving together feel like a slab;
  staggered (~30–80ms apart), they feel orchestrated. Sequence with intent:
  establish context first (background, container), then content, then detail.
- **Restraint**: one or two signature moves done perfectly beat ten competing
  effects. Award-level sites feel calm; the motion is precise, not busy.

## The signature patterns of immersive sites

The recurring vocabulary of MDX-style experiences:

- **Branded loader**: a designed first moment (logo, progress, a line of
  personality copy) that masks asset loading — then hands off seamlessly into the
  hero entrance. Never a default spinner; never longer than the load it covers.
- **Hero entrance**: choreographed reveal — type sliding/fading in by line or
  word (split-text), media scaling into place, a single confident sequence that
  sets the tone in the first two seconds.
- **Scroll-driven storytelling**: sections that animate as they enter (reveals,
  parallax layers, pinned sections where content transforms while scroll
  progresses, horizontal panels, progress-linked sequences). Scroll position
  becomes the timeline.
- **Smooth scrolling**: inertia-smoothed scroll (e.g. Lenis) that makes
  scroll-linked motion feel fluid — use judiciously; it must never fight the
  user's control.
- **Micro-interactions**: hover/press states with life — magnetic buttons,
  cursor effects, link underline draws, card tilts. Small, instant, consistent.
- **Page transitions**: leaving and entering as designed moments
  (shared-element continuity, wipes/fades) so navigation feels like one
  continuous world, not page reloads.
- **3D & depth accents**: WebGL scenes, product/globe visuals, shader effects —
  as *accents* serving the story, with graceful fallbacks for weak devices.
- **Type as motion**: kinetic typography — split, masked, weight-shifting text —
  often carries these sites more than imagery does.

## The toolbox (choose by job, not fashion)

- **GSAP + ScrollTrigger** — the industry workhorse for timeline-based,
  scroll-driven, and complex choreographed animation; framework-agnostic,
  used across award-winning sites. Timelines sequence; ScrollTrigger binds
  timelines to scroll (enter/leave/scrub/pin).
- **Motion (Framer Motion)** — declarative animation for React: variants for
  orchestration/stagger, springs, layout animations, `AnimatePresence` for
  exit animations. The natural choice inside React apps.
- **Framer** (the site builder) — designing and shipping animated marketing
  sites without hand-coding; much of this aesthetic (and Marcelo's tutorials)
  lives here. Right tool for landing/brand sites; custom apps still want code.
- **Lottie / Rive** — designer-authored vector animations (icons, illustrations,
  loaders) exported as lightweight runtime files; Rive adds interactive state
  machines.
- **Three.js / React Three Fiber** — 3D scenes and WebGL; pair with care for
  asset size and device capability.
- **CSS transitions/keyframes** — still correct for simple state changes; don't
  ship a library for a hover fade.

Pick one primary animation system per project and compose within it — mixing
several leads to fighting timelines and inconsistent feel.

## Performance: smooth or it's broken

Janky motion is worse than no motion. The rules:

- **Animate only `transform` and `opacity`** (GPU-composited). Animating
  layout properties (width/height/top/left/margin) causes reflow and stutter —
  the #1 cause of janky scroll effects.
- Target 60fps; test on a mid-range phone, not a dev machine.
- `will-change` sparingly and only on elements about to animate; remove after.
- Lazy-load heavy media; modern formats (AVIF/WebP, compressed glTF for 3D);
  the loader pattern exists to *cover* loading, not excuse bloat.
- Respect the main thread: heavy 3D work budgeted, offscreen scenes paused,
  scroll handlers passive/throttled (ScrollTrigger/Lenis handle this correctly).
- Avoid layout shift: reserve space; animations must not move content the user
  is reading.

## Accessibility & UX guardrails (non-negotiable)

- **Honor `prefers-reduced-motion`**: provide a reduced experience (fades or
  none) for users who request it — vestibular disorders are real; this is WCAG
  territory, not optional polish (`ui-ux-craft.md`).
- Motion must never gate content: text readable without waiting through
  animation, navigation usable mid-transition, nothing essential conveyed *only*
  through motion.
- Scroll-hijacking caution: the user's scroll is theirs; pinned/scrubbed
  sections must stay responsive and escapable, never trap or fight input.
- Loaders never lie (fake progress erodes trust) and never outstay the load.

## Process: design motion like a system

Storyboard the key moments before coding (entrance, scroll beats, transitions);
define motion tokens (durations, easings, stagger steps) once and reuse them like
design tokens (`ui-ux-craft.md` system thinking); build the signature moments
first and polish micro-interactions after; profile on real devices before
calling it done. The production-grade and human-authored standards apply to
animation code too — real implementations, clean timelines, no copy-pasted
effect soup.

Pre-ship question: *"Does every animation here guide, explain, or delight with
purpose — and does the experience still work beautifully for someone on a slow
phone with reduced motion on?"*
