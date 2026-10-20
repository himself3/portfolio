# Gotchas

Hard-won lessons: root causes, traps, environment quirks, version constraints.
Each entry should save a future session the time it cost to learn.

Format: one or two lines, dated, with the consequence that made it matter.

- 2026-10-12 · Importing from `react-icons/<pack>` without `experimental.optimizePackageImports`
  made the dev page bundle 67 MB; hydration never finished, so every animated
  (opacity:0 initial) element stayed invisible. Keep the packs listed in next.config.
- 2026-10-12 · Headless Edge on Windows does not exit after `--print-to-pdf`/`--screenshot`.
  Wait for the output file, then `taskkill /PID <pid> /T /F` the tree you spawned.
  Never kill msedge by image name: it takes down the user's browser.
- 2026-10-13 · Full-page CDP screenshots (`captureBeyondViewport`) leave black holes
  in `backdrop-filter` layers outside the viewport. Verify glass UI with
  per-section viewport screenshots instead.
- 2026-10-13 · `next build` can hang on Google Fonts (`ECONNRESET`, retries). Network,
  not code; retry once the font host responds.
- 2026-10-14 · ESLint cascades configs up the tree: `BusulwaGadafi/` picked up this
  repo's `.eslintrc.json` (ESLint 9 / next 16 config) and crashed. Child app's
  `.eslintrc.json` needs `"root": true`.
- 2026-10-14 · This machine has 8 GB and often sits under 100 MB free (Kiro, user's
  `next dev`, Memory Compression). `next build` and headless Edge then hang. Check
  free RAM first; verify against the user's running dev server instead of building.
- 2026-10-14 · BusulwaGadafi `next.config.mjs` also honours `NEXT_DIST_DIR`, so a
  verification build never overwrites the user's `next dev` `.next` folder.
- 2026-10-14 · Running `next build` here while `next dev` runs clobbers `.next`.
  Use `NEXT_DIST_DIR=.next-verify` (wired in next.config.js), and revert the
  `tsconfig.json` include line the build adds for it.
