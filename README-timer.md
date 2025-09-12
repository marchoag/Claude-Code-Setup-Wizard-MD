Claude Session Toolkit (Public Share Bundle)

This bundle contains a minimal, shareable setup to run the session rituals (start/end), security practices, lightweight local CI, and optional session timing.

Contents
- MD-CLAUDE-CODE-SETUP-WIZARD.md — overview and playbook
- MD-SESSION-PROTOCOLS-ONLY.md — session start/end protocol (public-safe)
- scripts/
  - session-timer.js — no-deps timer (start/end/status/summary)
  - setup-git-hooks.sh — installs a pre-push hook that runs `npm run ci`
- MD-ACTIVE/ (empty) — timer writes `.session-meta.json` here
- MD-ARCHIVE/reference/ (empty) — timer writes `SESSION-TIMES.json/.md` here

Quick Start
- Optional timer:
  - Start: `node TEMP/scripts/session-timer.js start`
  - End: `node TEMP/scripts/session-timer.js end`
  - Status: `node TEMP/scripts/session-timer.js status`
  - Summary: `node TEMP/scripts/session-timer.js summary`
- Pre-push hook: `bash TEMP/scripts/setup-git-hooks.sh`
  - Runs `npm run ci` automatically before every push

Notes
- The timer writes to root-level `MD-ACTIVE/` and `MD-ARCHIVE/reference/`. This bundle includes empty folders so it works immediately when placed at the repo root.
- If you run scripts directly from `TEMP/`, the commands above already point to the TEMP paths.
- Never add or publish any `.env*` files. Only reference environment variable NAMES (e.g., `NEXT_PUBLIC_*`).

What `.gitkeep` is for
- Git doesn’t track empty directories. A `.gitkeep` file is a harmless placeholder that forces Git to include the directory so your bundle has the expected structure.
