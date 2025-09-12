## An MD file that functions as a Claude Code setup wizard to start new projects

### 🚀 Quick Start: Session Management Only

If you **only** want session management protocols to help start and end Claude Code sessions (when context windows get full), grab this lightweight file:

**[Download MD-SESSION-PROTOCOLS-ONLY.md](https://raw.githubusercontent.com/marchoag/Claude-Code-Setup-Wizard-MD/main/MD-SESSION-PROTOCOLS-ONLY.md)**

This standalone file provides:
- Clean session start/end commands
- Security protocols for handling environment variables
- Basic development workflows
- No folder creation or setup wizard

Perfect for teams that just want better session handoffs without the full setup system.

---

### 📚 Full Setup Wizard (Complete System)
**⚠️ DISCLAIMER**

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

This is an MD file that creates folders and MD files as explained below, and enables you to easily start and end sessions and avoid auto-compacting when sessions run out of context.

  ### What's Included: MD-Claude-Code-Setup-Wizard.md (creates folders and files as described below)

  Complete system for Claude Code optimization:
  - **Setup automation** - Claude creates folder structure and files
  - **Onboarding wizard** - Interactive 21 question setup guide that customizes files for your project/team
  - **Session management** - Automated start/end protocols for perfect handoffs
  - **Context optimization** - 4-file active system that never overflows
  - **Knowledge preservation** - Searchable archive of all solutions and patterns
  - **Project templates** - Ready-to-use files for any tech stack

## Setup (one time only at project start)

[Download MD-CLAUDE-CODE-SETUP-WIZARD.md](https://raw.githubusercontent.com/marchoag/Claude-Code-Setup-Wizard-MD/main/MD-CLAUDE-CODE-SETUP-WIZARD.md)

  ```bash
  # Tell Claude at the start of a new project:
  "Run @md-claude-code-setup-wizard.md"
  # Claude will then auto-archive this setup wizard into @MD-ARCHIVE
```

## Session start

  ```bash
  # Tell Claude to read the MD Active folder and start your new session
  "read @MD-ACTIVE/ and start session"
```

## Session end

  ```bash
  # Tell Claude to end the current session to avoid auto-compacting
  "session end"
```


  ## The Problem

  Claude Code sessions fail when documentation gets too large. Teams lose solutions between sessions. Projects restart debugging from scratch every time. Session context gets auto-compacted losing
  critical information.

  ## The Solution

  **MD-ACTIVE/** - 4 files, 60KB total (always fits in context)
  - Session protocol with your working relationship and workflows
  - Current session bookmark with priorities and status
  - Project changelog and version history
  - Complete build guide with architecture

  **MD-ARCHIVE/** - Unlimited searchable knowledge base
  - Technical mastery reference with all debugging patterns
  - Historical session bookmarks
  - Accumulated project knowledge

  ## The Onboarding Wizard

  Tell Claude to read the strategy document and it automatically:
  - Creates folder structure (`mkdir MD-ACTIVE MD-ARCHIVE`)
  - Runs interactive wizard asking about your role, project, tech stack, priorities
  - Generates customized files with your specific working relationship
  - Seeds technical knowledge base with your existing patterns
  - Sets up session protocols tailored to your workflow

  No manual file creation. No template copying. Fully automated personalization.

  ## Session Handoffs

  **Starting a session**: Say `"session start"` and Claude:
  - Reads session protocol to understand your working relationship
  - Reads latest session bookmark to see exactly where you left off
  - Creates TodoWrite list from your documented priorities
  - Activates technical mastery auto-search
  - Begins work immediately with full context

  **Ending a session**: Say `"session end"` and Claude:
  - Creates new session bookmark with big-picture summary of what was accomplished
  - Archives previous session materials to MD-ARCHIVE/
  - Updates technical mastery reference with any new debugging patterns discovered
  - Commits and deploys changes with intelligent commit messages
  - Confirms readiness for next session

  This prevents auto-compacting and ensures zero information loss between sessions.

  ## Auto-Search During Work

  Claude automatically searches the technical mastery archive when it recognizes:
  - Authentication issues → finds auth debugging patterns
  - Database errors → retrieves safety protocols
  - Modal conflicts → applies proven solutions
  - Infinite loops → uses established debugging strategies
  - Deployment failures → references production fixes

 ## Results

  - Zero context overflows across any project size
  - Perfect session continuity with explicit start/end commands
  - No repeated debugging of solved problems
  - Institutional knowledge that compounds over time
  - Prevents auto-compacting that loses critical information
