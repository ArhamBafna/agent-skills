# Agent Skills

Skills for agents. Compatible with [skills.sh](https://skills.sh) (`npx skills`).

## Skills

| Skill | Description | Install |
| :--- | :--- | :--- |
| **anti-ai-audit** | Audit frontend UI and docs for anti-AI patterns and slop with multi-skill scanner. | `npx skills add ArhamBafna/agent-skills@anti-ai-audit` |
| **audit-config** | Audit persistent workspace config (instructions, skills, MCPs, memory) with KEEP/REMOVE workflow. | `npx skills add ArhamBafna/agent-skills@audit-config` |
| **dsa-codebase-audit** | App-wide, read-only DSA and organizing-model audit with bounded agent lanes. | `npx skills add ArhamBafna/agent-skills@dsa-codebase-audit` |
| **link-agents-md** | Hardlink C:\Users\bafna_sb19qr0\Desktop\AGENTS.md to global rule files for AI coding agents and IDEs. | `npx skills add ArhamBafna/agent-skills@link-agents-md` |
| **linkedin-content-engine** | Weekly LinkedIn content engine producing ranked idea bank and 5 drafted posts. | `npx skills add ArhamBafna/agent-skills@linkedin-content-engine` |
| **pick-browser-auto** | Decide whether to use agent-browser or playwriter and proceed with task. | `npx skills add ArhamBafna/agent-skills@pick-browser-auto` |

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