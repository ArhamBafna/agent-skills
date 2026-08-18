# Agent Skills

Skills for agents. Compatible with [skills.sh](https://skills.sh) (`npx skills`).

## Skills

| Skill | Description | Install |
| :--- | :--- | :--- |
| **audit-config** | Audit persistent workspace config (instructions, skills, MCPs, memory) with KEEP/REMOVE workflow. | `npx skills add ArhamBafna/agent-skills@audit-config` |
| **dsa-codebase-audit** | App-wide, read-only DSA and organizing-model audit with bounded agent lanes. | `npx skills add ArhamBafna/agent-skills@dsa-codebase-audit` |

---

## Install

### 1. Specific Skill
```bash
npx skills add ArhamBafna/agent-skills@<skill-name>
```

### 2. All Skills
```bash
npx skills add ArhamBafna/agent-skills
```

---

## Add New Skill

1. Create folder `skills/<skill-name>/`
2. Add `SKILL.md` with YAML frontmatter:
   ```markdown
   ---
   name: <name>
   description: <description>
   ---
   <body>
   ```
3. Commit and push.