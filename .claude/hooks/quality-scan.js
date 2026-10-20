#!/usr/bin/env node
// PostToolUse (Write|Edit|MultiEdit) — scans every file the team writes for
// production-grade and human-authored violations. Exit code 2 returns the
// findings to Claude, which then fixes them before moving on. This is what
// makes the standards automatic rather than remembered.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { scanText } = require(path.join(__dirname, 'lib', 'rules.js'));

const MAX_ROUNDS = 3; // loop guard: stop nagging on the same file forever

function attemptsFile(sessionId, file) {
  const key = Buffer.from(`${sessionId}:${file}`).toString('base64url').slice(0, 60);
  return path.join(os.tmpdir(), `sdlc-scan-${key}`);
}

try {
  let raw = '';
  try { raw = fs.readFileSync(0, 'utf8'); } catch {}
  const evt = (() => { try { return JSON.parse(raw); } catch { return {}; } })();

  const input = evt.tool_input || {};
  const file = input.file_path || input.path || input.filePath;
  if (!file) process.exit(0);
  if (/node_modules|\.git[\\/]|\.min\.|package-lock|bun\.lock|vendor[\\/]/.test(file)) process.exit(0);

  let text = '';
  try { text = fs.readFileSync(file, 'utf8'); } catch { process.exit(0); }
  if (text.length > 400000) process.exit(0);

  const hits = scanText(file, text);
  if (!hits.length) process.exit(0);

  const blocking = hits.filter(h => h.severity === 'block');
  const warnings = hits.filter(h => h.severity === 'warn');

  // Loop guard
  const af = attemptsFile(evt.session_id || 'x', file);
  let rounds = 0;
  try { rounds = parseInt(fs.readFileSync(af, 'utf8'), 10) || 0; } catch {}
  if (blocking.length && rounds >= MAX_ROUNDS) {
    console.error(`[quality] ${path.basename(file)}: unresolved findings remain after ${rounds} passes — note them explicitly to the user in your Definition of Done report rather than looping.`);
    process.exit(0);
  }

  const fmt = (h) => `  line ${h.line} [${h.id}] ${h.message}`;
  const lines = [];
  lines.push(`[quality gate] ${path.basename(file)}`);
  if (blocking.length) {
    lines.push('MUST FIX before continuing:');
    lines.push(...blocking.slice(0, 12).map(fmt));
  }
  if (warnings.length) {
    lines.push('Fix unless deliberate:');
    lines.push(...warnings.slice(0, 8).map(fmt));
  }

  if (blocking.length) {
    try { fs.writeFileSync(af, String(rounds + 1)); } catch {}
    console.error(lines.join('\n'));
    process.exit(2); // feed back to Claude to correct
  }

  console.error(lines.join('\n'));
  process.exit(0);
} catch {
  process.exit(0);
}
