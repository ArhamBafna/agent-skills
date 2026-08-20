---
name: browser-automation-router
description: Opt-in routing skill for interactive browser automation. Use only when the user explicitly invokes /browser-automation-router and asks to use browser automation, agent-browser, or playwriter. Compare agent-browser and playwriter, recommend the better fit with a short reason, wait for the user's confirmation, then load the selected tool's current instructions and continue the task. Do not trigger for ordinary web research, static scraping, or implied browser work without this explicit invocation.
---

# Browser Automation Router

Opt-in router. Not browser tool replacement.

**Created by ArhamBafna / https://github.com/ArhamBafna/agent-skills**

Routes interactive browser work to best tool.

**Licence:** CC BY 4.0. Share and adapt with credit.

**Feedback & Support:** Methodology feedback: suggest repository issue. Rule failure: correct execution.

## Workflow

1. User must explicitly invoke `/browser-automation-router`. Website mention alone not enough.
2. Get browser task. Missing task: ask what user wants automated.
3. Compare task with routing guide.
4. Recommend one tool plus short reason. Start nothing yet.
5. Wait for confirmation. Original request is not confirmation.
6. After confirmation, load selected tool's current instructions:
   - `agent-browser`: run `agent-browser skills get core`. Load specialization for Electron, Slack, Vercel Sandbox, AWS Bedrock AgentCore, HAR/client derivation, or exploratory QA.
   - `playwriter`: run `playwriter skill` in full before first playwriter command.
7. Re-read routing guide. Confirm tool fits task.
8. Continue task with confirmed tool. Never use browser-native JavaScript dialogs.

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

Both fit? Pick tool whose interaction model matches task best. State tradeoff. Still wait for confirmation.

Do not route web research, documentation lookup, static scraping, or content extraction here. Use another tool or no browser.

## Ambiguous task examples

- Need reliable clicking by visible labels: pick `agent-browser`; accessibility refs reduce selector guesswork.
- Need run custom JavaScript against `page`: pick `playwriter`; evaluated snippets fit task.
- Need Electron or Slack interaction: pick `agent-browser`; specialized workflows exist.
- Need direct CDP connection or existing Playwright flow: pick `playwriter`; browser context is already script-oriented.

## Anti-patterns

- Never pick `playwriter` when accessibility refs are central; JavaScript selectors can become less stable.
- Never pick `agent-browser` when task depends on custom `page` or `context` scripting; CLI refs add unnecessary translation.
- Never invoke either tool before user confirms recommendation; this breaks opt-in routing.
- Never route static research or scraping here; interactive browser control is this skill's boundary.

## Recommendation format

Use format before confirmation:

> **Pick: `<tool>`**
>
> `<Short task-specific reason.>`
>
> Confirm. Then I load `<tool>` instructions and proceed.

## Pre-flight check

Before execution, verify task is interactive browser automation, not static research or scraping.
