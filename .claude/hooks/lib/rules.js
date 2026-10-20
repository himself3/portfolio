// Detection rules shared by the quality hooks.
// Each rule: { id, severity, test(line, ctx) -> bool, message }
// severity: 'block' (must fix before done) | 'warn' (fix unless deliberate)

const CODE_EXT = /\.(js|jsx|ts|tsx|mjs|cjs|py|rb|php|go|rs|java|kt|swift|cs|vue|svelte|html|css|scss|sql)$/i;
const MARKUP_EXT = /\.(html|jsx|tsx|vue|svelte)$/i;
const DOC_EXT = /\.(md|mdx|txt)$/i;

// Emoji ranges (pictographs, symbols, dingbats). Deliberately excludes common
// typographic marks and religious/ornamental glyphs used as real content.
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\u{FE0F}?/u;

const SECRET_PATTERNS = [
  /\b(sk_live_|pk_live_|sk_test_)[A-Za-z0-9]{8,}/,
  /\b(AKIA|ASIA)[A-Z0-9]{12,}/,
  /\bghp_[A-Za-z0-9]{20,}/,
  /\b(api[_-]?key|secret|password|passwd|token)\s*[:=]\s*['"][^'"\s]{8,}['"]/i,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];

const PLACEHOLDER = [
  /\bTODO\b(?!\.md)/,
  /\bFIXME\b/,
  /\bnot[ _-]?implemented\b/i,
  /\bimplement (this|later)\b/i,
  // The word, but not real UI: the JSX/HTML attribute written without spaces
  // (placeholder="..." / {...}), an options key with a string value, Tailwind's
  // placeholder: variant, or the ::placeholder pseudo-element. "Placeholder: swap
  // later", `const placeholder = ...` and `placeholder: true` still block.
  /(?<![:\w-])placeholder\b(?!=["'{]|\s*:\s*["'`]|:[a-z[])/i,
  /\bfor now\b/i,
  /\bin a real (app|application|implementation)\b/i,
  /\bmock (data|response)\b/i,
  /\bdummy (data|value)\b/i,
  /\bcoming soon\b/i,
];

// Comments that narrate the obvious — the loudest AI code tell.
const NARRATION = /^\s*(\/\/|#|\*)\s*(increment|decrement|loop (through|over)|iterate (over|through)|set (the )?variable|create (a|an) (new )?(empty )?(array|list|object|variable)|return (the )?(result|value)|initialize|declare|define (a|the)|import (the )?(necessary|required)|call (the )?function|check if|add \d+ to)\b/i;

const GENERIC_NAMES = /\b(const|let|var|def|function)\s+(data|data\d|result|result\d|temp|tmp|obj|arr|item|items|thing|stuff|foo|bar|val|res|ret)\b\s*[=(:]/;

const MARKETING = /\b(robust|comprehensive|powerful|seamless|cutting[- ]edge|state[- ]of[- ]the[- ]art|production[- ]ready solution|blazing[- ]fast|world[- ]class)\b/i;

function isCode(file) { return CODE_EXT.test(file); }
function isMarkup(file) { return MARKUP_EXT.test(file); }
function isDoc(file) { return DOC_EXT.test(file); }

// Lines exempt from the WORD rules (placeholder, narration, naming, marketing,
// emoji): URLs, test fixture naming, and docs/rulebook that discuss the rules.
// Secret scanning never consults this; see scanLine.
function isExempt(file, line) {
  if (/\.(test|spec)\.[a-z]+$/i.test(file)) return /mock|dummy|placeholder|TODO/i.test(line);
  if (/\/(docs|memory)\//.test(file.replace(/\\/g, '/'))) return true;
  // The engineering system's own rulebook (hooks, agent briefs, skill docs) defines
  // these rules, so it necessarily contains the words it bans. Paths may be
  // absolute or repo-relative, hence the optional leading separator.
  if (/(^|\/)\.claude\/(hooks|agents|skills)\//.test(file.replace(/\\/g, '/'))) return true;
  if (/^\s*(\*|\/\/)?\s*https?:\/\//.test(line)) return true;
  return false;
}

function scanLine(file, line, n) {
  const hits = [];

  // Credentials are checked everywhere, rulebook and docs included: hook source
  // runs on every tool call, so it is the last place a leaked key should hide.
  for (const p of SECRET_PATTERNS) {
    if (p.test(line)) {
      hits.push({ id: 'secret', severity: 'block', line: n,
        message: 'Possible hardcoded secret/credential. Move to environment config and never commit it.' });
      break;
    }
  }

  if (isExempt(file, line)) return hits;

  if (isCode(file) || isDoc(file)) {
    for (const p of PLACEHOLDER) {
      if (p.test(line)) {
        hits.push({ id: 'placeholder', severity: 'block', line: n,
          message: 'Placeholder/stub detected. Production-grade standard: implement the real logic, or surface the blocker to the user explicitly — never leave a fake that looks finished.' });
        break;
      }
    }
  }

  if (isCode(file)) {
    if (NARRATION.test(line)) {
      hits.push({ id: 'narration', severity: 'warn', line: n,
        message: 'Comment narrates what the code obviously does (AI tell). Comment the WHY, or delete it.' });
    }
    if (GENERIC_NAMES.test(line)) {
      hits.push({ id: 'generic-name', severity: 'warn', line: n,
        message: 'Generic identifier (data/result/temp/item...). Use a domain-meaningful name.' });
    }
  }

  // Emoji: banned as UI icons and in code/comments/commits. Allowed only in
  // genuine product content (rare) — flagged as warn so it can be justified.
  if ((isCode(file) || isMarkup(file)) && EMOJI.test(line)) {
    hits.push({ id: 'emoji', severity: 'block', line: n,
      message: 'Emoji in code/interface. Use a professional SVG icon set (Lucide, Heroicons, Phosphor, or the project\'s existing family) — emojis as icons are the loudest AI-UI tell.' });
  }

  if (MARKETING.test(line) && (isDoc(file) || /^\s*(\/\/|#|\*)/.test(line))) {
    hits.push({ id: 'marketing', severity: 'warn', line: n,
      message: 'Marketing adjective in code/docs prose (AI tell). State what it does, plainly.' });
  }

  return hits;
}

function scanText(file, text) {
  const out = [];
  const lines = String(text).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    // cap work on very large files
    if (i > 4000) break;
    out.push(...scanLine(file, lines[i], i + 1));
  }
  return out;
}

module.exports = { scanText, isCode, isMarkup, isDoc, EMOJI };
