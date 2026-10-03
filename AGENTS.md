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
3. Read `/caveman` skill and write in that style:
  - Behavior and output must stay identical with or without compression
  - Drop: fluff, ceremony, repetition
  - Keep all substance (commands, flags, parameters, paths, logic, schemas, etc)
4. Run the two skills referenced at the bottom of `/skill-creator`.
5. Keep skill self-contained; document runtime dependencies.
6. Update `README.md` when adding the new skill.
7. Use repository-relative paths, PowerShell syntax, and Windows backslashes.

### Editing an Existing Skill

1. Read target skill's `SKILL.md` and references first.
2. Direct edits by default for bugfixes, tweaks, and updates. Use `/skill-creator` only for major overhauls or structural redesigns.
3. Apply `/caveman` style compression (same rules as creating a skill).
4. Update `README.md` if skill name, install path, or catalog changes.
5. Use repository-relative paths, PowerShell syntax, and Windows backslashes.

## Validation

For skill changes, verify:

- `skills/<skill-name>/SKILL.md` exists.
- YAML frontmatter exists; `name` matches directory.
- Referenced local files exist.
- Commands and paths match repository.
- Links are intentional and expose no private data.
- Skill compatible with ANY agent / setup. Installed agents can run it in their own environments.

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
