---
name: audit-config
description: Audit persistent workspace configurations (instructions, skills, rules, MCPs, memory) for redundant, outdated, conflicting items. Use when user asks to "audit config", "clean up settings", "review rules", "audit skills", "clean up instructions", etc.
---

# Audit Configuration

Audit persistent workspace configuration: instructions, rules, skills, MCPs, memory. Find redundant, outdated, conflicting, irrelevant items.

## Workflow

1. **Discovery:** Inspect active workspace configs, rules, skills, integrations.
2. **Analysis:** Check relevance, conflicts, duplicates, stale context.
3. **Report:** Present findings in format below. **No edit files.**
4. **Approval & Action:** Wait for user confirmation. Delete or change only approved `REMOVE` items. Keep safety rules, secret policies, required configs.

## Output Format

### Configuration Audit Report

#### Summary
- **Total items inspected:** `<count>`
- **Keep:** `<count>` | **Remove:** `<count>` | **Needs Review:** `<count>`

#### Recommendations

| Item | Type | Verdict (`KEEP` / `REMOVE` / `REVIEW`) | Reason |
|---|---|---|---|
| `<name/file>` | Instruction / Skill / MCP / Rule / Memory | `KEEP` / `REMOVE` / `REVIEW` | `<justification>` |

#### Other Notes
- Safety & Protected Items - List rules and configs preserved unconditionally.
- Other notes user should know.
