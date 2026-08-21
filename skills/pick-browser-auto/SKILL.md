---
name: pick-browser-auto
description: Decide whether to use agent-browser or playwriter and proceed with task.
---

## Pre-reqs
- Get browser task. Missing task: ask what user wants automated.
- Verify task is interactive browser automation, not static research or scraping. If not interactive, STOP. Tell user so.

## Workflow
1. Compare task with routing guide.
2. Recommend one tool + short reason (use Recommendation format). Wait for user confirmation for tool. Don't start yet.
3. After confirmation, load selected tool's skill (https://raw.githubusercontent.com/vercel-labs/agent-browser/refs/heads/main/skills/agent-browser/SKILL.md or https://raw.githubusercontent.com/remorses/playwriter/refs/heads/main/skills/playwriter/SKILL.md) and continue task with confirmed tool.

## Routing guide

Recommend `agent-browser` for:

- Accessibility snapshots plus compact element refs.
- CLI workflow with screenshots, extraction, sessions, auth vault, or persisted state.
- Exploratory testing, dogfooding, QA, or cross-site interaction.
- Electron apps or agent-browser specialization.

Recommend `playwriter` for:

- JavaScript access to `page`, `context`, and `browser`.
- Playwright-style scripting, direct CDP, or extension-connected browser.
- Work best expressed as evaluated JavaScript snippets.
- Existing Playwright code or knowledge.

Need more help/info? Read both tools' skills (https://raw.githubusercontent.com/vercel-labs/agent-browser/refs/heads/main/skills/agent-browser/SKILL.md or https://raw.githubusercontent.com/remorses/playwriter/refs/heads/main/skills/playwriter/SKILL.md).

## Ambiguous task examples

- Need reliable clicking by visible labels: pick `agent-browser`; accessibility refs reduce selector guesswork.
- Need run custom JavaScript against `page`: pick `playwriter`; evaluated snippets fit task.
- Need Electron or Slack interaction: pick `agent-browser`; specialized workflows exist.
- Need direct CDP connection or existing Playwright flow: pick `playwriter`; browser context is already script-oriented.

## Anti-patterns

- Never pick `playwriter` when accessibility refs are central; JavaScript selectors can become less stable.
- Never pick `agent-browser` when task depends on custom `page` or `context` scripting; CLI refs add unnecessary translation.
- Never invoke tool before user confirmation.
- Never route static research or scraping.

## Recommendation format

> **Pick: `<tool>`**
>
> `<Short task-specific reason.>`
>
> Please confirm.