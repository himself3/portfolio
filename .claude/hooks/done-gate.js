#!/usr/bin/env node
// Stop — the automatic Definition of Done gate. Before the team finishes a turn,
// re-checks the work actually changed on disk for production-grade violations and
// unpersisted project memory. Loop-safe: challenges at most once per session.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const { scanText } = require(path.join(__dirname, 'lib', 'rules.js'));

function sh(cmd, cwd) {
  try { return execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000 }).toString().trim(); }
  catch { return ''; }
}

try {
  let raw = '';
  try { raw = fs.readFileSync(0, 'utf8'); } catch {}
  const evt = (() => { try { return JSON.parse(raw); } catch { return {}; } })();
  if (evt.stop_hook_active) process.exit(0); // already inside a stop-hook cycle

  const cwd = evt.cwd || process.cwd();
  const flag = path.join(os.tmpdir(), `sdlc-done-${String(evt.session_id || 'x').slice(0, 40)}`);
  if (fs.existsSync(flag)) process.exit(0); // only challenge once per session

  const changed = sh('git diff --name-only HEAD', cwd).split('\n').filter(Boolean)
    .concat(sh('git ls-files --others --exclude-standard', cwd).split('\n').filter(Boolean));
  if (!changed.length) process.exit(0);

  const problems = [];
  for (const rel of changed.slice(0, 60)) {
    if (/node_modules|\.min\.|lock|vendor[\\/]/.test(rel)) continue;
    const abs = path.join(cwd, rel);
    let text = '';
    try { text = fs.readFileSync(abs, 'utf8'); } catch { continue; }
    if (text.length > 400000) continue;
    const blocking = scanText(rel, text).filter(h => h.severity === 'block');
    if (blocking.length) {
      problems.push(`${rel}: ${blocking.slice(0, 3).map(h => `line ${h.line} (${h.id})`).join(', ')}`);
    }
  }

  const memState = path.join(cwd, 'docs', 'memory', 'state.md');
  let memStale = false;
  try {
    const st = fs.statSync(memState);
    memStale = (Date.now() - st.mtimeMs) > 6 * 60 * 60 * 1000; // untouched in 6h of work
  } catch { memStale = true; }

  if (!problems.length && !memStale) process.exit(0);

  const msg = ['Definition of Done gate — finish these before ending the turn:'];
  if (problems.length) {
    msg.push('Production-grade violations still on disk (placeholders, secrets, or emoji-as-icons):');
    msg.push(...problems.slice(0, 10).map(p => '  - ' + p));
    msg.push('Fix them, or state explicitly to the user why each remains.');
  }
  if (memStale) {
    msg.push('Project memory not updated this session. Write docs/memory/state.md (done / in progress / deferred + why / debt) and record any decisions, conventions, or gotchas learned — so the next session starts where this one ended.');
  }
  msg.push('Then give the user the honest Done report: functionality, error handling, validation, observability, edge cases, security, and anything deferred.');

  try { fs.writeFileSync(flag, '1'); } catch {}
  console.error(msg.join('\n'));
  process.exit(2);
} catch {
  process.exit(0);
}
