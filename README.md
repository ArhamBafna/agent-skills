# Agent Skills Repository

A curated collection of modular, reusable skills for AI coding agents (Claude Code, Cursor, Antigravity, GitHub Copilot, Windsurf, etc.) compatible with [skills.sh](https://skills.sh) and the 
px skills package manager.

## Available Skills

| Skill | Description | Installation Command |
| :--- | :--- | :--- |
| **audit-config** | Audits persistent workspace configuration (instructions, skills, MCPs, and memory) with a KEEP/REMOVE approval workflow. | 
px skills add ArhamBafna/agent-skills@audit-config |

---

## Installation Guide

You can install skills into any workspace or globally on your system using the skills CLI:

### 1. Install to Current Project Workspace
To install the udit-config skill into your active project (.agents/skills/):
`ash
npx skills add ArhamBafna/agent-skills@audit-config
`
Or to install all skills in this repository:
`ash
npx skills add ArhamBafna/agent-skills
`

### 2. Install Globally (Across All Projects)
To make the skill available across all workspaces on your machine:
`ash
npx skills add -g ArhamBafna/agent-skills@audit-config
`

---

## Adding New Skills

To add a new skill to this repository:
1. Create a subdirectory under skills/<new-skill-name>/
2. Add a SKILL.md with standard YAML frontmatter:
   `markdown
   ---
   name: <new-skill-name>
   description: <Clear trigger description>
   ---
   # Instructions
   ...
   `
3. Commit and push to main.
