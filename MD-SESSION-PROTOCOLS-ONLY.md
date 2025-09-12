# 🧭 Public Session Protocol (Shareable)

This public-friendly protocol explains how sessions are started, ended, and kept safe. It is designed to be generic and reusable in any open-source project.

## Quick Commands (Human)
- Say “Session start” to begin.
- Say “Session end” to wrap up and record outcomes.

## Assistant: Session Start
1. Read this protocol and the latest session bookmark in `MD-ACTIVE/`.
2. Echo back:
   - Roles and collaboration style (product lead + technical lead)
   - Current platform status (from bookmark)
   - Today’s priorities (from bookmark)
3. Create a short Todo list and start the first task.
4. Keep the Technical Reference ready; search it on relevant triggers.

## Security Policy (Public Safe)
- Never open or read any `.env*` files (e.g., `.env`, `.env.local`, `.env.*`).
- Never reveal, echo, or diff secret values; reference variable names only.
- Client-side code may use `NEXT_PUBLIC_*` environment variables only.
- Server-only variables (examples): `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` — use only in server code paths (e.g. `app/api/*`, server actions, or `lib/server/*`). Never import into client modules.

### Absolute Refusal
If asked to access or print secrets, reply exactly:
“For safety, I won’t open or print `.env*` files or secret values. I can reference variable NAMES only.”

### Preflight Guard (Before Shell/FS Ops)
1. Restate the Security Policy.
2. Abort if any step would read `.env*` or print secret values.
3. Exclude `.env*` in searches; when showing environment usage, show names only.
4. If secrets are needed, suggest alternatives (e.g. `.env.example`, redacted screenshots, or variable names).

### Runtime Guards
- Don’t read `.env*`.
- Server-only env usage stays server-only and isn’t imported by client code.
- Don’t include secret values in diffs or logs.
- Don’t put literal secret values in shell commands (use `$VAR`).

## Local Dev & CI Routine
- Start dev server: `npm run dev` (hot reloads on save).
- Optional fast feedback: `npm run test:watch` (re-runs tests on file save).
- Before push/PR: run `npm run ci` locally.

### Optional Automation
- One terminal for both: `npm run dev:all`.
- Pre-push hook: `bash scripts/setup-git-hooks.sh` to auto-run `npm run ci` before push.

## Session Timing (Optional, Share-Safe)
- Start timer at session start: `node scripts/session-timer.js start`
- End timer at session end: `node scripts/session-timer.js end`
- See status anytime: `node scripts/session-timer.js status`
- Rebuild summary: `node scripts/session-timer.js summary`

Outputs
- Per-session meta: `MD-ACTIVE/.session-meta.json`
- Cumulative log: `MD-ARCHIVE/reference/SESSION-TIMES.json`
- Human summary: `MD-ARCHIVE/reference/SESSION-TIMES.md` (totals + recent sessions)

## Session Start — ACK (must be stated)
“I will not open or read any `.env*` files. I will reference env by NAME only. Client uses `NEXT_PUBLIC_*` only. Server-only: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.”

## Assistant: Session End
On “Session end”:
1. Update `MD-ACTIVE/CHANGELOG-CURRENT.md` if applicable.
2. Sync new entry into the full changelog under `MD-ARCHIVE/reference/`.
3. Create a new bookmark `MD-YYYYMMDD-SESSION-FOCUS.md` including:
   - Last Work (Completed / In Progress / Blocked)
   - Current Platform Status (version, branch, deployment)
   - Next Priorities (3–5 actionable tasks)
   - Critical Context (gotchas, decisions, blockers)
4. Archive the previous bookmark to `MD-ARCHIVE/bookmarks/`.
5. Update the Technical Reference with any new patterns.
6. Run Local CI: `npm run ci`. Fix issues before proceeding.
7. (If using timer) capture session end and duration: `node scripts/session-timer.js end`
8. Ask: “Ready to commit and push these changes? (y/n)”
9. If yes:
   - Commit message style: `✅ [Feature]: short user-facing description`
   - Push according to your repo’s branch/deploy rules.
10. Confirm: “Session complete: [commit message] → pushed. Ready for next session.”

## Technical Reference (When to Consult)
- Search on triggers like: authentication issues, DB errors, modal conflicts, infinite loops, build/deploy failures, unexpected API responses.
- When asked (“Search Technical Mastery for [topic]”), search and apply relevant patterns.
- Announce searches briefly and prefer known, documented solutions.

## Roles & Collaboration
- Product lead: sets goals and priorities.
- Technical lead: owns technical decisions; challenges assumptions; aims for fast + practical solutions.

## Status & Organization
- Keep `MD-ACTIVE/` small: protocol, current bookmark, current changelog.
- Archive older bookmarks under `MD-ARCHIVE/bookmarks/` and references in `MD-ARCHIVE/reference/`.

---

This document is generic and safe to share publicly. It emphasizes security hygiene, clear session rituals, and pragmatic local CI routines without exposing secrets or project-internal credentials.
