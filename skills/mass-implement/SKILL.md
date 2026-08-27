---
name: mass-implement
description: Implement multiple features, issues, or fixes in bulk without stopping. Use when asked to "mass implement", process batch issues/PRs, or churn through task lists unattended.
---

# Mass Implement

Execute batch of independent tasks (e.g., GitHub issues, PRs, feature lists) sequentially and autonomously.

## Mindset & Procedure

- **Operation Mode**: Operate in unattended batch mode. Maximize completion without blocking on user input. User is away: make reasonable decisions, defer questions to end.

- **Resource Efficiency**: Time and tokens are not hard caps, but do not waste them. Work efficiently without rushing or sloppy code.

- **Subagents**: You can and should use subagents where helpful. You decide based on which is more efficient. Completely okay to use none; completely okay to use for all. Operate very independently.


### The Loop

For each item in batch:
1. **Read & Understand**: Briefly review specific issue or feature.
2. **Implement**: CRITICAL: Use `/implement` skill for required changes.
3. **Closing**: Git commit for this item. If GitHub issue, close it. If progress doc exists, update
4. **Move to Next**: Proceed to next batch item.

### Progress Tracking

- **When to Track**: Decide how to track progress. Suggestion (it is a suggestions; you get final call): Execute sequentially for ≤ 5 items; create tracking file for 6+ items.
- **Formatting**: If creating tracking file, optimize layout for agent read/write speed. Human readability does not matter.
- **Handling Questions**: Note every question in temporary file. Log in tracking file if active, or create dedicated questions file.
- **Blockers**: If question blocks specific implementation or part of task, skip that blocked portion. Do as much as possible without the answer.

## End of Batch Procedures

ONLY after ALL items processed (or skipped due to blockers):
1. **Testing**: Run test suites globally if present (optional).
2. **Cleaning**: Clean one-time scripts, scrap files, other items not be needed henceforth.
3. **Graphify**: Run `graphify update .`.
4. **Report**: Present consolidated summary: completed items, skipped items, collected questions, and other things. Do this in mad simple words. I don't code.

## Anti-Patterns

- Do NOT create an implantation plan asking me for permission to proceed.
- Do not plan all items before starting.
- NEVER block entire batch on one question
- **NEVER ask user questions mid-batch**: Note question and proceed.
- **NEVER run `graphify update` inside loop**: Run once at end.
