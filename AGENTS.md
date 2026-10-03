# AGENTS.md

## Project

Documentation-only collection of installable [skills.sh](https://skills.sh)
skills. Each skill lives in `skills/<skill-name>/`.

Read `README.md` for current skill list. No runtime, package manifest,
database, build output, test suite, or CI workflow exists.

```text
skills/<skill-name>/
  SKILL.md
  references/       # Optional supporting material
  README.md         # Optional
  PREREQUISITES.md  # Optional
README.md
apply-skill-creator-patch.ps1
```

## Workflows

### Creating a New Skill

1. Read related existing skills and references for context.
2. Use `/skill-creator` to design, draft, and test.
3. Apply `/caveman` style compression:
   - Follow the **Compression Rules** below.
   - Behavior and output must stay identical with or without compression.
4. Run `skill-judge` and apply `writing-for-agents` referenced at the bottom of `/skill-creator`.
5. Keep skill self-contained; document runtime dependencies.
6. Update `README.md` when adding the new skill.
7. Use repository-relative paths, PowerShell syntax, and Windows backslashes.
8. Keep personal data, credentials, API keys, and generated output out of Git.

### Editing an Existing Skill

1. Read target skill's `SKILL.md` and references first.
2. Direct edits by default for bugfixes, tweaks, and updates. Use `/skill-creator` only for major overhauls or structural redesigns.
3. Apply `/caveman` style compression: maintain or improve conciseness while keeping full logic and behavior intact.
4. Update `README.md` if skill name, install path, or catalog changes.
5. Use repository-relative paths, PowerShell syntax, and Windows backslashes.
6. Keep personal data, credentials, API keys, and generated output out of Git.

### Compression Rules

When writing or editing skill instructions:

- **Same output guaranteed**: Output quality and agent behavior must be identical with or without compression.
- **Drop fluff and ceremony**: Remove chatty intros, polite filler, obvious explanations, and meta-commentary that the agent does not need.
- **Remove repetition**: State each rule once clearly.
- **Keep all substance**: Keep all commands, flags, parameters, paths, logic, schemas, and edge cases exact.
- **Direct voice**: Imperative, direct, plain words. Use concise Markdown, existing terminology, and plain ASCII unless Unicode is needed.

## Validation

For skill changes, verify:

- `skills/<skill-name>/SKILL.md` exists.
- YAML frontmatter exists; `name` matches directory.
- Referenced local files exist.
- Commands and paths match repository.
- Links are intentional and expose no private data.

Run:

```powershell
git diff --check
git status --short
```

## Troubleshooting

- Missing reference: resolve path from skill directory. If still unclear, ask
  user.
- Missing agent capability: document limitation or use skill's stated fallback;
  never silently substitute.

## Skill-Specific Rules

### `full-audit`

When adding reference file, update:

- `skills/full-audit/SKILL.md`
- `skills/full-audit/references/provenance.md`

Ask user when update scope is unclear.

### `audit-config`

Keep guidance general for any agent setup, not only Claude Code. Avoid
hardcoded paths. Ensure installed agents can run it in their own environments.
