---
name: audit-config
description: Audit persistent workspace configurations (instructions, skills, rules, MCPs, memory) for redundant, outdated, conflicting items. Use when user asks to "audit config", "clean up settings", "review rules", "audit skills", "clean up instructions", etc.
---

# Audit Configuration

Audit persistent workspace configuration: instructions, rules, skills, MCPs, memory. Find redundant, outdated, conflicting, irrelevant items.

# Full Audit — Your Agent Setup: Every Instruction File, Every Skill

You are auditing my entire agent setup. The goal is a smaller, sharper system: fewer rules that all pull weight, skills that trigger correctly and don't rot, zero contradictions, zero dead pointers. Be ruthless — politeness toward my existing files is not a virtue here. But verify before you accuse: check the actual filesystem, don't trust what a file says about itself.

Explain every finding in plain English — say what it means before what to do about it.

Work in phases. **Phases 1–2 are strictly read-only. Do not edit, delete, or push anything until I approve the report.** Delegate the bulk reading to subagents and keep your main context for judgment and synthesis — there may be a lot to read.

## Phase 1 — Discover and Read Everything

First, map the agent's setup — don't assume, look. Check all standard agent configuration locations:

**Instruction Files (FIND YOUR OWN FOR ITEM LISTED BELOW IF APPLICABLE):**
- Global instruction files (eg AGENTS.md)
- The current project's instruction files (eg AGENTS.md)
- Any nested instruction files in subfolders of this project — find them all; they layer on top of the root
- **Follow every `@import` reference** inside any of these files and read the imported files too — imported files load into every session just like the main instruction file
- Global and project-level configuration files (e.g., `~/.agent/settings.json`, `project_root/.agent/settings.json`, `settings.local.json`) — hooks, permissions, environment variables
- Custom commands directories: global (e.g., `~/.agent/commands/`) and project-local (e.g., `project_root/.agent/commands/`)
- Custom agent definitions directories: global (e.g., `~/.agent/agents/`) and project-local (e.g., `project_root/.agent/agents/`)
- Persistent memory, if it exists: look under global or project-level paths for this project's memory folder (e.g., `~/.agent/projects/<project>/memory/` or `project_root/.agent/memory/`, including an `MEMORY.md` index plus individual memory files)

**Skills — All Locations (a skill missing from your session's list is NOT proof it doesn't exist):**
- Global skills directories (e.g., `~/.agent/skills/`)
- Project-local skills directories (e.g., `project_root/.agent/skills/`)
- You own plugins/ integrations/ extensions

**Also, measure the context cost:** roughly how many tokens the always-loaded files (global instruction files + project instruction files + everything they import + the memory index) consume at the start of every single session. That number frames the whole audit — every line in those files is paid for on every session, forever.

## Phase 2a — Instructions Audit

Go through **every** rule, instruction, preference, and standing claim across all the instruction files identified above — including nested instruction files, imported files, and memory files. For each one, answer:

1.  **Default Behavior?** Is this something you already do by default without being told? Rules written for older, weaker models are prime cut candidates.
2.  **Conflict?** Does it contradict or fight with another rule anywhere else in the setup? Name both sides and say which currently wins and why.
3.  **Duplicate?** Is the same instruction stated in more than one place? Multiple copies drift apart — pick ONE home.
4.  **Scar Tissue?** Does it read like it was added to patch one specific bad output rather than improve outputs overall? (One-incident rules that over-generalize.)
5.  **Vague?** Would you interpret it differently on different days? ("be more natural", "use a good tone" — anything without a checkable standard.)
6.  **Stale?** Does it reference a file, path, tool, ID, URL, account, or workflow that no longer exists or has changed? **Actually verify the pointers** — check the paths exist, the scripts exist, the tools are still available. Don't guess.
7.  **Wrong Layer?** Would it work better somewhere else — inside a specific skill, a project-level instruction file instead of global (or vice versa), a configuration file hook (for anything that must happen *every time*, since hooks are enforced and prose isn't), or a memory file — instead of costing context in every session?

Give every item a verdict: **KEEP / TIGHTEN (rewrite it sharper) / MOVE (to a named better home) / MERGE (with a named other rule) / CUT** — with a one-line reason.

## Phase 2b — Skills Audit

For **every skill owned** (personal and project-local — NOT the plugin cache), read the full `SKILL.md` plus any `references/` and `scripts/` folders, and assess:

1.  **Trigger Quality.** Read the frontmatter `description` — is it specific enough to fire when it should and stay quiet when it shouldn't? Does the description match what the skill body actually does?
2.  **Trigger Collisions.** Map skills whose trigger surfaces overlap — owned skills AND any installed plugin skills they compete with (e.g., several writing or research skills that could all claim the same request). For each collision cluster: which should win, and should any merge or defer to another?
3.  **Redundancy.** Does the skill duplicate another skill, or duplicate what the agent now does well by default with no instructions at all?
4.  **Freshness.** Verify every hard pointer inside it — file paths, database/page IDs, URLs, tool and MCP names, account names, model names. Flag everything dead or renamed. This is where skills rot fastest.
5.  **Reliability.** Are the steps concrete enough that two different runs behave the same? Does it have a success check ("you know it worked when…") and a failure path ("if X fails, do Y")? Flag vague steps.
6.  **Bloat / Structure.** Is `SKILL.md` lean, with heavy reference material split into `references/` files that load only when needed? Valid frontmatter? Scripts present and runnable?
7.  **Security.** No API keys, tokens, or secrets inside any skill file. If any skills live in a repo shared with other people, confirm nothing private or sensitive sits in it. Flag third-party skills that were installed without ever being reviewed — a skill runs with full agent permissions, so recommend reviewing or scanning them before continued use.
8.  **Sync Health.** If any skills folder is a git repo: run `git status` and compare against the remote — flag anything uncommitted, unpushed, or diverged. If none are git-backed, note that as a finding too (no backup, no history).
9.  **Dead Weight.** Skills that look superseded, abandoned, or tied to workflows that no longer exist — retire candidates, with an archive-vs-delete recommendation.

Give every skill a verdict: **KEEP / FIX (list the fixes) / MERGE (into which) / RETIRE** — one line of reasoning each.

## Phase 2c — The Report (Then STOP)

Present one report, in plain English, structured as:

1.  **The Map** — what loads when (always-on files vs. per-project vs. plugins), and the token cost of the always-on set.
2.  **Cut List** — everything to remove, one-line reason each.
3.  **Conflicts** — each contradiction: the two sides, which wins today, proposed resolution.
4.  **Duplication Map** — each instruction living in 2+ places, and the ONE home you propose.
5.  **Stale/Broken Pointers** — everything that references something that no longer exists (verified, not guessed).
6.  **Skills Table** — every owned skill with its verdict and reasons; the collision clusters called out separately.
7.  **Proposed Rewrites** — a cleaned-up draft of each major instruction file with the dead weight removed and the keepers tightened. Show these as proposals; do not overwrite the real files.
8.  **Anything Surprising** — things you found that I didn't ask about but should know.

**Then stop and wait for my approval.** I may approve all of it, parts of it, or push back — apply only what I approve.

## Phase 3 — Apply Approved Changes

- Batch all changes to a file into ONE write — never sequential edits to the same file.
- Instruction changes land in their approved single home; delete the duplicates from everywhere else.
- Skill fixes/merges/retirements per the approved verdicts. Retired skills with reference value → an archive folder; worthless → delete (ask me first before deleting anything).

## Phase 4 — Sync and Verify

- If any edited files live in git repos, commit and push them; verify with `git status` that everything is clean and pushed — say so explicitly, don't assume.
- Close with a short before/after: rules count, always-on token cost, skills count, and the three changes that matter most.
