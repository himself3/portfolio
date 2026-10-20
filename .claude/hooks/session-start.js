#!/usr/bin/env node
// SessionStart — seeds every session automatically: project memory, repo state,
// and the standing operating directives. stdout is injected as context, so the
// brain and the team are active from the first prompt with nothing typed.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function read(p, max = 4000) {
  try { return fs.readFileSync(p, 'utf8').slice(0, max); } catch { return ''; }
}
function sh(cmd) {
  try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'], timeout: 4000 }).toString().trim(); }
  catch { return ''; }
}

try {
  let input = '';
  try { input = fs.readFileSync(0, 'utf8'); } catch {}
  const evt = (() => { try { return JSON.parse(input); } catch { return {}; } })();
  const cwd = evt.cwd || process.cwd();

  const out = [];
  out.push('## Engineering autopilot active');
  out.push('You are operating as the veteran engineering team defined in CLAUDE.md and the sdlc-engineering skill. Roles switch automatically by phase; specialist agents are delegated to without being asked; standards (production-grade, human-authored, no emoji-as-icons, Definition of Done) are enforced by hooks on every edit.');

  // Project memory — the never-forget layer.
  const memDir = path.join(cwd, 'docs', 'memory');
  const memFiles = ['state.md', 'decisions.md', 'conventions.md', 'gotchas.md', 'architecture.md'];
  const found = [];
  for (const f of memFiles) {
    const body = read(path.join(memDir, f), 2500);
    if (body.trim()) found.push(`### memory/${f}\n${body.trim()}`);
  }
  if (found.length) {
    out.push('\n## Project memory (authoritative — do not re-derive)');
    out.push(found.join('\n\n'));
  } else {
    out.push('\n## Project memory');
    out.push('No docs/memory/ yet. Create it as soon as durable knowledge appears (decisions + why, conventions, gotchas, current state) and keep it updated — that is what makes the next session start where this one ended.');
  }

  // Repo state — cheap orientation instead of expensive re-exploration.
  const branch = sh('git rev-parse --abbrev-ref HEAD');
  if (branch) {
    const status = sh('git status --porcelain');
    const recent = sh('git log --oneline -5');
    out.push('\n## Repo state');
    out.push(`Branch: ${branch}`);
    if (status) out.push(`Uncommitted changes:\n${status.split('\n').slice(0, 25).join('\n')}`);
    if (recent) out.push(`Recent commits:\n${recent}`);
  }

  // Knowledge currency: trigger a refresh when the tech radar is stale.
  const radar = path.join(memDir, 'tech-radar.md');
  let radarAge = null;
  try { radarAge = (Date.now() - fs.statSync(radar).mtimeMs) / 86400000; } catch { radarAge = null; }
  if (radarAge === null) {
    out.push('\n## Knowledge refresh due');
    out.push('No docs/memory/tech-radar.md exists. When you have web access, delegate to the researcher agent: read the project manifest for actual installed versions, verify current stable versions and any security advisories for the few dependencies that matter, and write findings with today\'s date to docs/memory/tech-radar.md. Do not guess versions; if offline, say so and mark entries unverified.');
  } else if (radarAge > 7) {
    out.push('\n## Knowledge refresh due');
    out.push(`Tech radar last verified ${Math.floor(radarAge)} days ago. When you have web access, delegate a bounded refresh to the researcher agent (installed versions, breaking changes since ours, security advisories for key dependencies), update docs/memory/tech-radar.md with today's date, and add anything actionable to state.md.`);
  }

  out.push('\n## Standing directives');
  out.push('- Read memory before acting; capture durable knowledge the moment it appears; update state before finishing.');
  out.push('- Delegate to specialist agents (architect, implementer, reviewer, qa-test, security, devops, researcher) rather than doing everything inline. Reviewer and qa-test are mandatory gates before declaring work done; security is mandatory whenever data, auth, secrets or payments appear.');
  out.push('- Work token-lean: search before reading, edit instead of regenerating, never paste files back.');
  out.push('- Escalate to the human only for scope decisions, irreversible/costly actions, security-privacy judgment, genuine blockers, or a suspected mistake in the request. Otherwise proceed on the safe default and note it.');

  process.stdout.write(out.join('\n'));
} catch {
  // Never break a session because of a hook.
}
process.exit(0);
