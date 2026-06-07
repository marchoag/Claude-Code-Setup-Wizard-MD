#!/usr/bin/env node
// Authorship & human-contribution tracker (no deps).
// Records human creative contributions to this AI-assisted project as they happen,
// to support attribution and any copyright claim in the *human-authored* expression
// and the human's selection, coordination, and arrangement of the work.
//
// This is evidentiary support and disclosure — NOT legal advice, and NOT a
// guarantee of copyright registrability.
//
// Usage:
//   node scripts/contribution.js start "<session focus>" [--human "Name"]
//   node scripts/contribution.js add <type> "<text>"
//   node scripts/contribution.js status
//   node scripts/contribution.js end [--pr <N>]
//   node scripts/contribution.js summary
//
// Types: authored | edit | selection | rejection | decision | direction | ai-assisted | verify

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const draftPath = path.join(__dirname, '..', 'MD-ACTIVE', '.contribution-draft.json');
const ledgerJsonPath = path.join(__dirname, '..', 'MD-ARCHIVE', 'reference', 'AUTHORSHIP-LOG.json');
const ledgerMdPath = path.join(__dirname, '..', 'MD-ARCHIVE', 'reference', 'AUTHORSHIP-LOG.md');

// Contribution types, grouped for rendering. The first group carries authorship
// weight; ai-assisted is disclosure; verify is the human review record.
const TYPES = {
  authored: 'Human-authored & directed',
  edit: 'Human-authored & directed',
  selection: 'Human-authored & directed',
  rejection: 'Human-authored & directed',
  decision: 'Human-authored & directed',
  direction: 'Human-authored & directed',
  'ai-assisted': 'AI-assisted (disclosed)',
  verify: 'Verification',
};
const GROUP_ORDER = ['Human-authored & directed', 'AI-assisted (disclosed)', 'Verification'];

const AUTHORSHIP_STATEMENT =
  'AI-assisted work. Copyright is claimed only in the human-authored expression and ' +
  'in the human’s selection, coordination, and arrangement of the material. ' +
  'AI-generated portions were produced under human direction, reviewed, and edited ' +
  'by the human author named above.';

function nowUTC() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function git(args) {
  try {
    return execSync(`git ${args}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

function ensureDir(p) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJson(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

function writeJson(p, data) {
  ensureDir(p);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function readDraft() { return readJson(draftPath, null); }

function fail(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

// ---- rendering -------------------------------------------------------------

function renderSession(s) {
  const lines = [];
  const window = s.startedAtUTC
    ? `${s.startedAtUTC}${s.endedAtUTC ? ` → ${s.endedAtUTC}` : ' (open)'}`
    : 'n/a';
  const commits = (s.commits && s.commits.length) ? s.commits.join(', ') : 'none';
  const pr = s.pr ? ` · PR #${s.pr}` : '';
  lines.push(`## ${(s.startedAtUTC || '').slice(0, 10)} — "${s.title || 'Untitled session'}"`);
  lines.push(`Human author: ${s.human || 'Unknown'} · Window: ${window} · Commits: ${commits}${pr}`);
  lines.push('');

  for (const group of GROUP_ORDER) {
    const items = (s.contributions || []).filter((c) => TYPES[c.type] === group);
    if (!items.length) continue;
    lines.push(`### ${group}`);
    for (const c of items) {
      const t = (c.atUTC || '').slice(11, 16);
      lines.push(`- [${c.type}] ${c.text}${t ? `  (${t}Z)` : ''}`);
    }
    lines.push('');
  }

  lines.push('### Authorship statement');
  lines.push(AUTHORSHIP_STATEMENT);
  lines.push('');
  return lines.join('\n');
}

function renderLedger(sessions) {
  const header = [
    '# 🖋 Authorship & Human Contribution Log',
    '',
    'A contemporaneous, human-confirmed record of human creative contributions to this',
    'AI-assisted project: decisions, human-authored material, selections, rejections, and',
    'edits, plus disclosure of AI-assisted portions. Maintained to support attribution and',
    'any copyright claim in the human-authored expression and the human’s selection,',
    'coordination, and arrangement of the work.',
    '',
    '**What this is not:** legal advice, and not a guarantee of copyright registrability.',
    'Authorship is a qualitative judgment; this log is evidentiary support, not a verdict.',
    'Prompting alone is generally weak; human-authored text, edits, selection, and',
    'arrangement are what carry a claim.',
    '',
    '---',
    '',
  ].join('\n');
  // Newest session first.
  const body = [...sessions].reverse().map(renderSession).join('\n');
  ensureDir(ledgerMdPath);
  fs.writeFileSync(ledgerMdPath, header + body, 'utf8');
}

function attestationBlock(s) {
  const items = (s.contributions || [])
    .filter((c) => TYPES[c.type] === 'Human-authored & directed')
    .map((c) => `- [${c.type}] ${c.text}`);
  const ai = (s.contributions || []).filter((c) => c.type === 'ai-assisted').map((c) => `- ${c.text}`);
  return [
    '## Authorship',
    `Human author: ${s.human || 'Unknown'}`,
    '',
    '**Human-authored & directed**',
    items.length ? items.join('\n') : '- (none recorded)',
    '',
    ai.length ? '**AI-assisted (disclosed)**\n' + ai.join('\n') + '\n' : '',
    AUTHORSHIP_STATEMENT,
  ].join('\n');
}

// ---- commands --------------------------------------------------------------

function flag(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const cmd = process.argv[2];

if (cmd === 'start') {
  const title = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : '';
  const human = flag('human') || git('config user.name') || 'Unknown';
  if (readDraft()) {
    console.log('A contribution draft is already open. Run "status" to view, or "end" to finalize.');
    process.exit(0);
  }
  writeJson(draftPath, {
    title,
    human,
    startedAtUTC: nowUTC(),
    startCommit: git('rev-parse HEAD'),
    contributions: [],
  });
  console.log(`Authorship log started for "${title}" (author: ${human}).`);
  process.exit(0);
}

if (cmd === 'add') {
  const type = process.argv[3];
  const text = process.argv[4];
  if (!type || !TYPES[type]) fail(`Unknown type "${type || ''}". Valid: ${Object.keys(TYPES).join(', ')}`, 2);
  if (!text) fail('Missing entry text. Usage: add <type> "<text>"', 2);
  const draft = readDraft();
  if (!draft) fail('No open draft. Run "start" first.', 2);
  draft.contributions.push({ atUTC: nowUTC(), type, text });
  writeJson(draftPath, draft);
  console.log(`Logged [${type}]: ${text}`);
  process.exit(0);
}

if (cmd === 'status') {
  const draft = readDraft();
  if (!draft) { console.log('No open contribution draft.'); process.exit(0); }
  console.log(renderSession(draft));
  process.exit(0);
}

if (cmd === 'end') {
  const draft = readDraft();
  if (!draft) fail('No open draft to finalize. Run "start" first.', 2);
  draft.endedAtUTC = nowUTC();
  const pr = flag('pr');
  if (pr) draft.pr = pr.replace(/^#/, '');
  const range = draft.startCommit ? `${draft.startCommit}..HEAD` : '';
  const log = range ? git(`log ${range} --pretty=format:%h`) : '';
  draft.commits = log ? log.split('\n').filter(Boolean) : [];

  const sessions = readJson(ledgerJsonPath, []);
  sessions.push(draft);
  writeJson(ledgerJsonPath, sessions);
  renderLedger(sessions);
  fs.unlinkSync(draftPath);

  console.log(`Session finalized into ${path.relative(process.cwd(), ledgerMdPath)}.`);
  console.log('\n--- paste into PR body ---\n');
  console.log(attestationBlock(draft));
  process.exit(0);
}

if (cmd === 'summary') {
  const sessions = readJson(ledgerJsonPath, []);
  renderLedger(sessions);
  console.log(`Ledger rebuilt: ${path.relative(process.cwd(), ledgerMdPath)} (${sessions.length} sessions).`);
  process.exit(0);
}

console.log('Usage: node scripts/contribution.js <start|add|status|end|summary>');
console.log('Types: ' + Object.keys(TYPES).join(', '));
process.exit(1);
