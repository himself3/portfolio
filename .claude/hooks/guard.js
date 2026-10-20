#!/usr/bin/env node
// PreToolUse — the automatic escalation guardrail. Blocks irreversible, costly,
// or secret-exposing operations before they run and tells the team to escalate
// to the human instead. Exit code 2 blocks the tool call.
const fs = require('fs');

const DESTRUCTIVE = [
  { re: /\brm\s+(-[a-zA-Z]*\s+)*-[a-zA-Z]*[rf][a-zA-Z]*\s+[^|]*(\/|\*|~|\.\.)/, why: 'recursive/forced delete' },
  { re: /\b(DROP|TRUNCATE)\s+(TABLE|DATABASE|SCHEMA)\b/i, why: 'destructive schema change' },
  { re: /\bDELETE\s+FROM\b(?![\s\S]*\bWHERE\b)/i, why: 'unbounded DELETE with no WHERE' },
  { re: /\bUPDATE\s+\w+\s+SET\b(?![\s\S]*\bWHERE\b)/i, why: 'unbounded UPDATE with no WHERE' },
  { re: /\bgit\s+push\b[^\n]*\s(--force|-f)\b/, why: 'force push (rewrites shared history)' },
  { re: /\bgit\s+reset\s+--hard\b/, why: 'hard reset (discards work)' },
  { re: /\bgit\s+clean\s+-[a-zA-Z]*f/, why: 'force clean (deletes untracked files)' },
  { re: /\b(vercel|netlify|fly|railway)\s+deploy\b[^\n]*--prod|\bnpm\s+publish\b|\bwrangler\s+publish\b/, why: 'production deploy/publish' },
  { re: /\b(prisma\s+migrate\s+reset|db\s+push\s+--accept-data-loss|--force-reset)\b/, why: 'migration reset (data loss)' },
  { re: /\bdocker\s+system\s+prune\b[^\n]*(-a|--all)/, why: 'prune all docker data' },
  { re: /\bchmod\s+777\b/, why: 'world-writable permissions' },
  { re: /\bcurl\b[^\n]*\|\s*(sudo\s+)?(ba)?sh\b/, why: 'piping remote script straight to a shell' },
];

const SECRET_FILES = /(^|[\\/])\.env(\.|$)|(^|[\\/])(id_rsa|id_ed25519)$|\.pem$|\.p12$|credentials\.json$|serviceAccount.*\.json$/i;

try {
  let raw = '';
  try { raw = fs.readFileSync(0, 'utf8'); } catch {}
  const evt = (() => { try { return JSON.parse(raw); } catch { return {}; } })();
  const tool = evt.tool_name || '';
  const input = evt.tool_input || {};

  if (tool === 'Bash') {
    const cmd = String(input.command || '');
    for (const d of DESTRUCTIVE) {
      if (d.re.test(cmd)) {
        console.error(
          `BLOCKED by engineering guardrail: ${d.why}.\n` +
          `Command: ${cmd.slice(0, 200)}\n` +
          `This is irreversible or costly, so it requires the human's explicit approval per the escalation rule. ` +
          `Stop, explain to the user exactly what you intend to run and why, present the safer alternative if one exists, and proceed only after they confirm.`
        );
        process.exit(2);
      }
    }
    process.exit(0);
  }

  // Never write secrets into tracked files; never read key material into context.
  const file = input.file_path || input.path || '';
  if (file && SECRET_FILES.test(file)) {
    if (tool === 'Read') {
      console.error(
        `BLOCKED: reading ${file} would pull credentials into context.\n` +
        `Work from .env.example / variable names instead. If you need a value, ask the user to set it themselves.`
      );
      process.exit(2);
    }
    if (tool === 'Write' || tool === 'Edit' || tool === 'MultiEdit') {
      console.error(
        `CAUTION: editing ${file}. Never commit real credentials. Update .env.example with placeholder names instead, and confirm with the user before writing real values.`
      );
      process.exit(2);
    }
  }
} catch {}
process.exit(0);
