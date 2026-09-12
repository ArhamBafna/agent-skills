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

## Install

```powershell
npx skills add ArhamBafna/agent-skills@<skill-name>
npx skills add ArhamBafna/agent-skills
```

## Workflow

When adding or changing skill:

1. Read its `SKILL.md` and references.
2. Use `/skill-creator` to create all skills.
3. Keep skill self-contained; document any runtime dependency.
4. Update `README.md` when skill name, install path, or catalog changes.
5. Use repository-relative paths, PowerShell syntax, and Windows backslashes.
6. Keep personal data, credentials, API keys, and generated output out of Git.

Use concise Markdown, existing terminology, and plain ASCII unless Unicode is
needed.

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

### `anti-ai-audit`

When adding reference file, update:

- `skills/anti-ai-audit/SKILL.md`
- `skills/anti-ai-audit/references/provenance.md`

Ask user when update scope is unclear.

### `audit-config`

Keep guidance general for any agent setup, not only Claude Code. Avoid
hardcoded paths. Ensure installed agents can run it in their own environments.
