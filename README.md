## As used to build [Scribefully!](https://scribefully.com)
Scribefully is a place for experts to create a beautiful portfolio of their best work -- articles, videos, code, podcasts, etc -- and share it in a Reddit-inspired community of other experts, thought leaders, academics, professionals, and creators.

## Features

  - **3-file active system** (17KB total) - never exceeds context limits
  - **Bulletproof security** - `.env*` file protection with honeypot testing
  - **Session automation** - automated start/end protocols with perfect handoffs
  - **Searchable archive** - unlimited knowledge preservation without context impact
  - **Interactive setup** - 21-question wizard customizes system for your project

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
