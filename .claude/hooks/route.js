#!/usr/bin/env node
// UserPromptSubmit — reads the request and injects the phase/role routing plus
// the mandatory standards for that kind of work. This is what makes role
// switching automatic: the right specialists are named before work begins,
// without the user typing a command.
const fs = require('fs');

const ROUTES = [
  { id: 'security', re: /\b(auth|login|signup|sign in|password|session|token|jwt|oauth|permission|role|rls|payment|stripe|checkout|billing|card|pii|personal data|gdpr|secret|api[- ]key|encrypt|upload)\b/i,
    line: 'SECURITY-CRITICAL: delegate to the security agent before and after implementation. Authn + authz enforced server-side, parameterized queries, secrets in env, data-layer ownership (RLS) for multi-tenant data, PII never logged. Never store card data yourself.' },
  { id: 'architecture', re: /\b(architect|structure|design the|schema|data model|refactor|rewrite|new (app|project|service|system)|set ?up (a|the) (project|app)|scaffold|boilerplate|from scratch)\b/i,
    line: 'ARCHITECTURE PHASE: delegate to the architect agent first — components and responsibilities, data flow, boundaries, deliberate DB/dependency choice, and a walk of the 13 production-stack layers. No volume code until the plan exists.' },
  { id: 'ui', re: /\b(ui|ux|interface|design|style|css|layout|page|screen|component|button|form|modal|responsive|animation|animate|scroll|landing|theme|colou?r|font|typography)\b/i,
    line: 'UI/UX WORK: apply ui-ux-craft (heuristics, hierarchy, spacing/type scales, WCAG AA, all states: loading/empty/error/success). If the ui-ux-pro-max skill is installed, generate/consult its design system as token source of truth. Professional SVG icon family only — never emojis as icons. Motion must be purposeful, transform/opacity only, and honour prefers-reduced-motion.' },
  { id: 'deploy', re: /\b(deploy|ship|release|production|hosting|ci\/?cd|pipeline|docker|migration|migrate|backup|monitor|logging|alert|env(ironment)? var|nginx|domain|dns)\b/i,
    line: 'OPERATIONS: delegate to the devops agent — config separated from code, secrets managed, reversible migrations, tested backups, observability before problems, rollback path. Irreversible or costly actions (public deploy, destructive migration, data deletion, spending) must be escalated to the human first.' },
  { id: 'debug', re: /\b(bug|broken|not working|fails?|error|crash|exception|debug|fix|wrong|unexpected|intermittent|flaky|slow)\b/i,
    line: 'DEBUGGING: understand before changing. Reproduce, read real evidence (logs, stack traces, devtools, network), form a hypothesis, change one thing at a time. Intermittent/timing-dependent → suspect concurrency and use correlation IDs/timestamps. Fix the root cause, then add a regression test.' },
  { id: 'test', re: /\b(test|tests|testing|qa|coverage|regression|verify|validate)\b/i,
    line: 'QUALITY: delegate to the qa-test agent — attack the unhappy path (empty, huge, malformed, duplicate, null, concurrent), mock external services to exercise their failures, real runnable tests with real assertions.' },
  { id: 'data', re: /\b(database|db|sql|query|postgres|mysql|mongo|supabase|prisma|index|table|cache|redis)\b/i,
    line: 'DATA LAYER: explicit schema and contracts, indexes on filtered/sorted/joined columns, pagination for unbounded sets, parameterized queries only, versioned reversible migrations.' },
];

const DECISION = /\b(should (i|we)|which (one|is better|should)|choose|choosing|decide|decision|vs\.?|versus|compare|trade[- ]?off|better to|worth it|migrate|switch to|rewrite|replace)\b/i;

const BUILD = /\b(build|create|add|implement|make|write|develop|feature)\b/i;

try {
  let raw = '';
  try { raw = fs.readFileSync(0, 'utf8'); } catch {}
  const evt = (() => { try { return JSON.parse(raw); } catch { return {}; } })();
  const prompt = String(evt.prompt || evt.user_prompt || '');
  if (!prompt.trim()) process.exit(0);

  const matched = ROUTES.filter(r => r.re.test(prompt));
  const isDecision = DECISION.test(prompt);
  const isBuild = BUILD.test(prompt);
  if (!matched.length && !isBuild && !isDecision) process.exit(0);

  const out = ['## Auto-routing for this request'];
  if (isBuild) {
    out.push('BUILD REQUEST: run the loop — orient, anticipate failure modes and edge cases, build, then verify. Production-grade only: real logic everywhere, no placeholders/stubs/TODOs/mock data in real paths. If genuinely blocked (missing credential or undecided rule), stop and say exactly what you need instead of faking it. Match the existing codebase style; output must read as written by a senior human, with no AI tells.');
  }
  if (isDecision) {
    out.push('DECISION POINT: classify reversibility first. Two-way door (reversible) → decide fast at ~70% information, timebox research, note the rationale, move on. One-way door (data model with live data, datastore, auth, payments, public API, anything risking data integrity or customer trust) → slow down, list real alternatives including the boring existing option, name what you are trading away and the second-order effects, record an ADR in docs/memory/decisions.md, and escalate to the human with a recommendation before committing. Ask whether a pilot, flag, or abstraction can convert a one-way door into a two-way one. Watch for sunk cost, novelty bias, and optimism override.');
  }
  for (const m of matched) out.push(m.line);
  out.push('Mandatory gates before you call this done: reviewer agent, then qa-test agent, then the Definition of Done report (functionality, error handling, validation, observability, edge cases, security, context). Name anything deferred out loud.');

  process.stdout.write(out.join('\n'));
} catch {}
process.exit(0);
