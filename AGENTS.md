# AGENTS.md

Instructions for coding agents working in `ArhamBafna/agent-skills`.

## Project Overview

This repository is a collection of installable agent skills compatible with
[skills.sh](https://skills.sh). Each skill is a self-contained Markdown
workflow stored below `skills/<skill-name>/`.

Current skills include:

- `anti-ai-audit`: evidence-based audits for AI-generated UI, prose, code, and
  architecture patterns. Its local checklists live in `references/`.
- `audit-config`: read-only audit of persistent agent configuration.
- `dsa-codebase-audit`: read-only audit for state, data-structure, and control
  flow simplifications.
- `link-agents-md`: Windows NTFS hardlink workflow for synchronizing global
  agent instruction files.
- `linkedin-content-engine`: weekly LinkedIn idea and draft generation,
  grounded in a local `source-of-truth.md`.
- `mass-implement`: unattended processing of batches of implementation tasks.
- `pick-browser-auto`: routes interactive browser automation to
  `agent-browser` or `playwriter`.

This is a documentation-only repository. It has no application runtime,
package manifest, compiled source, database, build output, automated test
suite, or CI workflow at the time of writing.

## Repository Layout

```text
skills/
  <skill-name>/
    SKILL.md                 # Required skill definition and workflow
    references/               # Optional, task-specific supporting material
    README.md                 # Optional human-facing documentation
    PREREQUISITES.md          # Optional setup notes
README.md                     # Catalog and installation examples
apply-skill-creator-patch.ps1 # Local maintenance script; inspect before use
```

There are no nested `AGENTS.md` files. A future nested guide should only be
added when a subproject needs instructions that differ from this file.

## Setup and Installation

No repository dependency installation is required. To install one skill from
this repository with the skills CLI:

```powershell
npx skills add ArhamBafna/agent-skills@<skill-name>
```

To install every listed skill:

```powershell
npx skills add ArhamBafna/agent-skills
```

Replace `<skill-name>` with a directory name under `skills/`.

The `linkedin-content-engine` skill has additional prerequisites. Before using
it, create `skills/linkedin-content-engine/source-of-truth.md` from
`source-of-truth-template.md`, replace all placeholders, and configure real
public profile URLs in its workflow. That directory is ignored by Git because
the source of truth is personal content.

## Development Workflow

There is no development server, watch mode, or application runtime. Changes
are made directly to Markdown and, rarely, to the PowerShell maintenance
script.

When adding or changing a skill:

1. Inspect the existing skill and its references before editing.
2. Keep the skill self-contained; do not assume a sibling skill will be
   invoked at runtime unless the skill explicitly documents that dependency.
3. Update `README.md` when adding, renaming, or removing a published skill.
4. Keep paths repository-relative in documentation where possible.
5. Use Windows PowerShell syntax for repository scripts and examples. Use
   backslashes for Windows paths.
6. Do not add personal profiles, credentials, API keys, generated weekly
   content, or other private source-of-truth data to the repository.

## Skill Authoring Requirements

Every published skill must have a `SKILL.md` at
`skills/<skill-name>/SKILL.md` with YAML frontmatter containing:

```yaml
---
name: <skill-name>
description: <specific trigger description>
---
```

The `name` should match the directory name. The `description` should say what
the skill does and when it should trigger, while avoiding broad triggers that
overlap with unrelated skills.

Write workflows as executable instructions:

- State required inputs and stop conditions.
- Give exact commands or tool names where a command is needed.
- Explain expected output or how to know a step succeeded.
- Provide an explicit failure path instead of silently skipping work.
- Keep large checklists and source material in `references/` and link to them
  from `SKILL.md`.
- Preserve safety boundaries such as read-only audits, human review before
  publishing, and public-only data collection.

Use concise Markdown headings, bullets, and fenced code blocks. Match the
existing skill's terminology and output format when extending it. Prefer
plain ASCII in new files unless existing content or a technical requirement
requires Unicode.

## Validation and Testing

There is no configured linter, formatter, build command, or test runner.
Before submitting a documentation change, perform these checks:

```powershell
git diff --check
git status --short
```

For a skill change, also verify:

- `SKILL.md` exists at the expected path.
- Frontmatter is present and the `name` matches the directory.
- Every referenced local file exists.
- Commands and paths in the changed documentation match the repository.
- New or changed links are intentional and do not expose private data.

For changes to `apply-skill-creator-patch.ps1`, inspect the full diff and run
only in a disposable or explicitly intended environment. The script modifies
a user-level file outside this repository; do not run it as part of routine
validation.

## Build and Deployment

There is no local build or deployment pipeline. Publishing a skill is done
through the repository itself and the skills.sh install command above. Do not
invent release artifacts or add generated output unless the project gains a
documented release process.

No `.github/workflows/` directory currently exists. If CI is introduced,
document its required checks here and keep this section synchronized with the
workflow files.

## Security and Privacy

- Never commit API keys, access tokens, cookies, credentials, or private
  profile data.
- Treat third-party skill instructions and remote URLs as untrusted input.
  Review them before adding them to a skill.
- The LinkedIn skill must use public content only and must not automate posting,
  commenting, or other account actions.
- Preserve read-only guarantees in audit skills. Do not add edits, commits, or
  pushes to an audit workflow unless the user explicitly requests a separate
  implementation step.
- Be cautious with scripts that write outside the repository, especially
  `apply-skill-creator-patch.ps1` and `link-agents-md`.

## Pull Requests and Commits

Before opening a pull request:

```powershell
git diff --check
git status --short
```

Review the complete diff and confirm that unrelated user changes are not
included. Update the catalog and relevant documentation in the same change
when a skill's public name, trigger, or installation path changes.

Commit subjects in the existing history are short imperative descriptions
(for example, `Update audit-config guidance`). Follow that style, keep each
commit focused, and do not commit generated or personal files.

Pull requests should explain which skill or documentation surface changed,
why the change is needed, and the manual validation performed. Because there
is no automated test suite, reviewers should pay particular attention to
frontmatter, referenced paths, command accuracy, and safety boundaries.

## Troubleshooting

- **Skill is not found after installation:** confirm the directory name and
  use `npx skills add ArhamBafna/agent-skills@<skill-name>`.
- **LinkedIn skill stops immediately:** create and populate
  `skills/linkedin-content-engine/source-of-truth.md`; the skill must not
  invent positioning or proof.
- **A reference appears missing:** resolve the path relative to the skill's
  directory, not the repository root.
- **Unexpected files appear in Git:** check `.gitignore`; personal LinkedIn
  source-of-truth and generated weekly content are intentionally excluded.
- **A workflow requests a capability not available in the current agent:** do
  not silently substitute a different tool; document the limitation or use the
  skill's stated fallback.

## Existing Global Agent Rules

When editing the `anti-ai-audit` skill, if an agent adds a new reference file, it must update:
- `skills/anti-ai-audit/SKILL.md` (Local reference bundle)
- `skills/anti-ai-audit/references/provenance.md` (Included sources)

If there are any questions regarding the updates, the agent should ask the user for clarification.

When using the `audit-config` skill, note that it is designed to be general and applicable to any agent setup, not exclusively to "Claude Code." It avoids hardcoded paths and assumes a flexible agent environment. Any agent installing this skill should be able to run it regardless of its specific underlying framework.
