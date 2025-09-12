#!/usr/bin/env node
// Simple session timer utility (no deps)
// Usage:
//  node TEMP/scripts/session-timer.js start
//  node TEMP/scripts/session-timer.js end
//  node TEMP/scripts/session-timer.js status
//  node TEMP/scripts/session-timer.js summary

const fs = require('fs');
const path = require('path');

const metaPath = path.join(__dirname, '..', '..', 'MD-ACTIVE', '.session-meta.json');
const historyPath = path.join(__dirname, '..', '..', 'MD-ARCHIVE', 'reference', 'SESSION-TIMES.json');
const summaryPath = path.join(__dirname, '..', '..', 'MD-ARCHIVE', 'reference', 'SESSION-TIMES.md');

function nowMeta() {
  const d = new Date();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const offsetMinutes = -d.getTimezoneOffset(); // minutes east of UTC
  return {
    isoUTC: new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, 'Z'),
    isoLocal: d.toISOString(),
    timezone: tz,
    offsetMinutes,
  };
}

function formatDuration(ms) {
  const totalSec = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m || h) parts.push(`${m}m`);
  if (!h && !m) parts.push(`${s}s`);
  return parts.join(' ');
}

function readMeta() {
  if (!fs.existsSync(metaPath)) return null;
  try { return JSON.parse(fs.readFileSync(metaPath, 'utf8')); } catch { return null; }
}

function writeMeta(meta) {
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');
}

function ensureDir(p) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readHistory() {
  if (!fs.existsSync(historyPath)) return [];
  try { return JSON.parse(fs.readFileSync(historyPath, 'utf8')) || []; } catch { return []; }
}

function writeHistory(entries) {
  ensureDir(historyPath);
  fs.writeFileSync(historyPath, JSON.stringify(entries, null, 2) + '\n', 'utf8');
}

function writeSummary(entries) {
  ensureDir(summaryPath);
  const totalMs = entries.reduce((acc, e) => acc + (e.durationMs || 0), 0);
  const totalH = (totalMs / 3600000).toFixed(2);
  const formatDur = (ms) => {
    const s = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h ? `${h}h ${m}m` : (m ? `${m}m ${sec}s` : `${sec}s`);
  };
  const lines = [];
  lines.push('# ⏱ Session Time Summary');
  lines.push('');
  lines.push(`- Total Sessions: ${entries.length}`);
  lines.push(`- Total Time: ${formatDur(totalMs)} (${totalH} hours)`);
  lines.push('');
  lines.push('## Recent Sessions');
  lines.push('');
  lines.push('| Date (UTC) | Start | End | Duration |');
  lines.push('|---|---|---|---|');
  const recent = entries.slice(-20);
  for (const e of recent) {
    const d = (e.startedAtUTC || '').slice(0, 10);
    const st = (e.startedAtUTC || '').slice(11, 19);
    const en = (e.endedAtUTC || '').slice(11, 19);
    lines.push(`| ${d} | ${st} | ${en} | ${formatDur(e.durationMs)} |`);
  }
  fs.writeFileSync(summaryPath, lines.join('\n') + '\n', 'utf8');
}

const cmd = process.argv[2];
if (!cmd || !['start', 'end', 'status', 'summary'].includes(cmd)) {
  console.log('Usage: node TEMP/scripts/session-timer.js <start|end|status|summary>');
  process.exit(1);
}

if (cmd === 'start') {
  const meta = readMeta() || {};
  const now = nowMeta();
  meta.startedAtUTC = now.isoUTC;
  meta.startedAtLocal = now.isoLocal;
  meta.timezone = now.timezone;
  meta.offsetMinutes = now.offsetMinutes;
  delete meta.endedAtUTC;
  delete meta.endedAtLocal;
  delete meta.durationMs;
  writeMeta(meta);
  console.log(`Session start recorded: ${meta.startedAtUTC} (UTC) / ${meta.startedAtLocal} (${meta.timezone})`);
  process.exit(0);
}

if (cmd === 'end') {
  const meta = readMeta();
  if (!meta || !meta.startedAtUTC) {
    console.error('No session start found. Run "start" first.');
    process.exit(2);
  }
  const now = nowMeta();
  meta.endedAtUTC = now.isoUTC;
  meta.endedAtLocal = now.isoLocal;
  const start = Date.parse(meta.startedAtUTC);
  const end = Date.parse(meta.endedAtUTC);
  meta.durationMs = Math.max(0, end - start);
  writeMeta(meta);
  console.log(`Session end recorded: ${meta.endedAtUTC} (UTC) / ${meta.endedAtLocal} (${now.timezone})`);
  console.log(`Duration: ${formatDuration(meta.durationMs)}`);
  // Append to history and update summary
  const entries = readHistory();
  entries.push({
    startedAtUTC: meta.startedAtUTC,
    endedAtUTC: meta.endedAtUTC,
    durationMs: meta.durationMs,
  });
  writeHistory(entries);
  writeSummary(entries);
  process.exit(0);
}

if (cmd === 'status') {
  const meta = readMeta();
  if (!meta || !meta.startedAtUTC) {
    console.log('No active session.');
    process.exit(0);
  }
  const start = Date.parse(meta.startedAtUTC);
  const end = meta.endedAtUTC ? Date.parse(meta.endedAtUTC) : Date.now();
  const dur = Math.max(0, end - start);
  const open = !meta.endedAtUTC;
  console.log(open ? 'Session in progress' : 'Last session');
  console.log(`Start (UTC):  ${meta.startedAtUTC}`);
  console.log(`Start (Local): ${meta.startedAtLocal} (${meta.timezone})`);
  if (meta.endedAtUTC) {
    console.log(`End (UTC):    ${meta.endedAtUTC}`);
    console.log(`End (Local):  ${meta.endedAtLocal}`);
  }
  console.log(`Duration: ${formatDuration(dur)}`);
  process.exit(0);
}

if (cmd === 'summary') {
  const entries = readHistory();
  writeSummary(entries);
  console.log(`Summary written to ${path.relative(process.cwd(), summaryPath)}`);
  process.exit(0);
}

