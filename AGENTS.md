When editing the `anti-ai-audit` skill, if an agent adds a new reference file, it must update:
- `skills/anti-ai-audit/SKILL.md` (Local reference bundle)
- `skills/anti-ai-audit/references/provenance.md` (Included sources)

If there are any questions regarding the updates, the agent should ask the user for clarification.

When using the `audit-config` skill, note that it is designed to be general and applicable to any agent setup, not exclusively to "Claude Code." It avoids hardcoded paths and assumes a flexible agent environment. Any agent installing this skill should be able to run it regardless of its specific underlying framework.