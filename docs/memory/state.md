# Current state

The living answer to "where is this project right now?" Update before finishing
any substantial session — this is what lets the next session start here instead
of reconstructing context.

## Done

- Engineering autopilot installed (brain, agents, hooks, design intelligence).
- Kamugisha portfolio (this repo): glass/neumorphic redesign, real tech logos,
  project gallery (VorxxPOS, Viewix with website+app links), one-page CV.
  Pushed through c324bff.
- BusulwaGadafi/ (separate repo himself3/Busulwa-portfolio): pushed as 7097dc0
  (2026-10-14). Still draft content (contact null, sample projects).
- 2026-10-20: Samaritan's Purse ICT Officer application (CV + cover letter) in
  `applications/samaritans-purse-ict-officer/` — gitignored on purpose (personal
  documents). `scripts/build-cv.mjs` now takes `<in.html> <out.pdf>`.
  Deadline 2026-11-06 17:00. Open: VPN/firewall experience unconfirmed (left
  out); ICT duties not yet attributed to a specific employer; referees.

## In progress

- BusulwaGadafi: no production build has been run yet (RAM ~50-120 MB free
  at the time); run `npm run build` there before deploying. Swap in real
  content when the user provides it.

## Deferred (and why)

- BusulwaGadafi real content: bio, contact, projects, portrait. Not provided yet;
  draft/sample content is in `content/site.ts` (see its README table).

## Known debt

- BusulwaGadafi has no automated test suite; verification so far is a scripted
  headless-browser run (scratchpad, not in repo).

## Next

- Finish the BusulwaGadafi gates, then ask the user for real content and whether
  to commit/push it.
