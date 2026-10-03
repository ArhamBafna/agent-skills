# Agent Skills

Skills for agents. Compatible with [skills.sh](https://skills.sh) (`npx skills`).

## Skills

| Skill | Description | Install |
| :--- | :--- | :--- |
| **audit-config** | Audit persistent workspace config (instructions, skills, MCPs, memory) with KEEP/REMOVE workflow. | `npx skills add ArhamBafna/agent-skills@audit-config` |
| **dsa-codebase-audit** | App-wide, read-only DSA and organizing-model audit with bounded agent lanes. | `npx skills add ArhamBafna/agent-skills@dsa-codebase-audit` |
| **full-audit** | Comprehensive audit covering UI slop, design system, prose, code standards, DSA, and 20-point pre-ship checks. | `npx skills add ArhamBafna/agent-skills@full-audit` |
| **link-agents-md** | Hardlink C:\Users\bafna_sb19qr0\Desktop\AGENTS.md to global rule files for AI coding agents and IDEs. | `npx skills add ArhamBafna/agent-skills@link-agents-md` |
| **linkedin-content-engine** | Weekly LinkedIn content engine producing ranked idea bank and 5 drafted posts. | `npx skills add ArhamBafna/agent-skills@linkedin-content-engine` |
| **mass-implement** | Implement multiple features, issues, or fixes in bulk without stopping. | `npx skills add ArhamBafna/agent-skills@mass-implement` |
| **motion-design** | Build deterministic code-rendered motion graphics, product launch reels, and UI loops. | `npx skills add ArhamBafna/agent-skills@motion-design` |
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