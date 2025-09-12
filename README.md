# Claude Code Setup Wizard

**Recent Updates:** Enhanced security protocols, development workflow automation, and compatibility with Codex CLI 🎉

## 🚀 Quick Start: Session Management Only

If you **only** want session management protocols to help start and end Claude Code and Codex sessions (to enable easy handoffs when context windows get full for instance), grab this lightweight file:

**[Download MD-SESSION-PROTOCOLS-ONLY.md](https://raw.githubusercontent.com/marchoag/Claude-Code-Setup-Wizard-MD/main/MD-SESSION-PROTOCOLS-ONLY.md)**

This standalone file provides:
- Clean session start/end commands for use with both Claude and Codex
- Security protocols for handling environment variables
- Basic development workflows
- No folder creation or setup wizard

Perfect for teams that just want better session handoffs without the full setup system.

---

## 📚 Full Setup Wizard (Complete System)

## As used to build [Scribefully!](https://scribefully.com)
Scribefully is a place for experts to create a beautiful portfolio of their best work -- articles, videos, code, podcasts, etc -- and share it in a Reddit-inspired community of other experts, thought leaders, academics, professionals, and creators.

---

**⚠️ DISCLAIMER**

  **💡 While the PROTOCOL file works great with Codex, I haven't test the SETUP file with Codex**

  **USE AT YOUR OWN RISK** - This project is provided "AS IS" without warranty of
   any kind, express or implied. The authors and contributors disclaim all
  warranties, including but not limited to:

  - **No Warranties**: No warranties of merchantability, fitness for a particular
   purpose, or non-infringement
  - **No Liability**: We are not liable for any damages, data loss, system
  failures, or other issues arising from use of this software
  - **User Responsibility**: You assume full responsibility for testing,
  validation, and ensuring compatibility with your systems
  - **No Support Guarantee**: No guarantee of maintenance, updates, or technical
  support
  - **Configuration Risk**: Modifying system configurations may affect your
  development environment - backup your settings first

  By using this software, you acknowledge that you understand these risks and
  agree to use it entirely at your own discretion and risk.

## Features

  - **3-file active system** (17KB total) - never exceeds context limits
  - **Bulletproof security** - `.env*` file protection with honeypot testing
  - **Session automation** - automated start/end protocols with perfect handoffs
  - **Searchable archive** - unlimited knowledge preservation without context impact
  - **Interactive setup** - 21-question wizard customizes system for your project

## Security & Development Workflows

### Built-in Security Protocols
- **Environment Protection**: Automatic `.env*` file protection with refusal to read secret files
- **Honeypot Testing**: Creates `.env.honeypot` to test Claude's security behavior
- **Variable Safety**: Server-only variables (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) stay server-side
- **Client Restrictions**: Only `NEXT_PUBLIC_*` environment variables allowed in client code
- **Runtime Guards**: Prevents accidental secret exposure in diffs, logs, or shell commands

### Development Commands
- **`npm run dev`** - Start development server with hot reloads
- **`npm run test:watch`** - Optional fast feedback with test re-runs on file changes
- **`npm run ci`** - Run full CI checks locally before push/PR
- **`npm run dev:all`** - Run both dev server and tests simultaneously

### Automation & Git Hooks
- **Pre-push automation**: `bash scripts/setup-git-hooks.sh` auto-runs `npm run ci` before push
- **Intelligent commits**: Session-end commits with structured messages
- **Branch safety**: Respects your repository's branch and deployment rules

## Quick Start

  1. Install Claude code using `npm install -g @anthropic-ai/claude-code`
  2. Intialize as always with `/init`
  3. Download [MD-CLAUDE-CODE-SETUP-WIZARD.md](https://raw.githubusercontent.com/marchoag/Claude-Code-Setup-Wizard-MD/main/MD-CLAUDE-CODE-SETUP-WIZARD.md)
  4. Tell Claude: `"Run @md-claude-code-setup-wizard.md"`
  5. Answer 21 setup questions
  6. Start working: `"read @MD-ACTIVE/"` then `"session start"`

## Usage & Best Practices after installation is complete

  **Session start**: `"read @MD-ACTIVE/ then initiate session start protocols per @MD-SESSION-PROTOCOL.md`
  ⚠️ Confirm:
  - Did it explicitly echo back the security instructions re: .envs and other secrets? If not, ask it to do so.
  - You may need to manually fetch/pull the latest version to update your local reop.
  
  **Session end**: `initiate session end protocols per @MD-SESSION-PROTOCOL.md`

## What happens

  **Session Start Process:**
  1. Claude acknowledges security: "I will not open or read any `.env*` files. I will reference env by NAME only."
  2. Claude reads MD-SESSION-PROTOCOL.md, latest session bookmark, and CHANGELOG-CURRENT.md in parallel
  3. Claude echoes back: working relationship (CEO/CTO dynamics), current platform status, and today's priorities
  4. Claude creates TodoWrite list from bookmark priorities
  5. Claude auto-activates Technical Mastery Reference (ready for automatic searches)
  6. Claude begins work on first task immediately

  **Session End Process:**
  1. Claude updates CHANGELOG-CURRENT.md if new version exists
  2. Claude syncs changes to CHANGELOG-FULL.md in archive
  3. Claude creates new session bookmark with big-picture summary (✅ COMPLETED, 🔄 IN PROGRESS, 🚫 BLOCKED)
  4. Claude archives previous bookmark to MD-ARCHIVE/bookmarks/
  5. Claude updates Technical Mastery Reference with new debugging patterns learned
  6. Claude asks: "Ready to commit and deploy? (y/n)"
  7. If yes: Claude commits with intelligent message format and pushes to main
  8. Claude confirms: "Session complete: [commit message] → deployed. Ready for next."

## Security

  - Automatic `.env*` file protection
  - Creates `.env.honeypot` for testing Claude's refusal behavior
  - Environment variable safety protocols (server vs client)
  - Runtime guards prevent accidental secret exposure
  - Keeps a running "CHANGELOG.md" in MD-ARCHIVE updated at every session end
  - Keeps a truncated "CHANGELOG-CURRENT.md" in MD-ACTIVE ~300 lines long
  - If created, will update a "technical mastery" MD file in MD-ARCHIVE to learn as you go
  - Prompts whether to push/commit/deploy all changes at session end

## Problem Solved

  Claude Code sessions fail when documentation exceeds context limits. This system:
  - Maintains 17KB active context (67% reduction from typical setups)
  - Preserves complete project history in searchable archive
  - Prevents session auto-compacting that loses critical information
  - Enables perfect handoffs between sessions

## Use at Your Own Risk

  This software is provided "AS IS" without warranty. Users assume full responsibility for testing and ensuring compatibility
  with their systems. Backup your settings before use.
