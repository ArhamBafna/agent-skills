# Agent Skills Repository

Skills for agents.
Compatible with [skills.sh](https://skills.sh) (`npx skills`).

## Skills

| Skill | Description | Installation Command |
| :--- | :--- | :--- |
| **audit-config** | Audits persistent workspace configuration (instructions, skills, MCPs, and memory) with a KEEP/REMOVE approval workflow. | `npx skills add ArhamBafna/agent-skills@audit-config` |
| **dsa-codebase-audit** | Run an application-wide, read-only DSA and organizing-model audit with bounded agent lanes. | `npx skills add ArhamBafna/agent-skills@dsa-codebase-audit` |

---

## Installation

### 1. Specific Skill
```bash
npx skills add ArhamBafna/agent-skills@<skill-name>
```

### 2. All Skills
```bash
npx skills add ArhamBafna/agent-skills
```
---

## Adding New Skills

To add a new skill to this repository:
1. Create  subdirectory under `skills/<new-skill-name>/`
2. Add a `SKILL.md` with standard YAML frontmatter:
   ```markdown
   ---
   name: <name>
   description: <description>
   ---
   <body>
   ```
3. Commit and push.