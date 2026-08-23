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
3. **Commit**: Git commit for this item (e.g., `feat: implement X`).
4. **Move to Next**: Proceed to next batch item.

### Progress Tracking

- **When to Track**: Decide how to track progress. Guidelines given are suggestions; you get final call. Suggestion: Execute sequentially for ≤ 5 items; create tracking file for 6+ items.
- **Formatting**: If creating tracking file, optimize layout for agent read/write speed. Human readability does not matter.
- **Handling Questions**: Note every question in temporary file. Log in tracking file if active, or create dedicated questions file.
- **Blockers**: If question blocks specific implementation or part of task, skip that blocked portion. Do as much as possible without the answer.

## End of Batch Procedures

ONLY after ALL items processed (or skipped due to blockers):
1. **Testing**: Run test suites globally if present (optional). Also solve problems arised from testing.
2. **Graphify**: Run `graphify update .`.
3. **Report**: Present consolidated summary: completed items, skipped items, collected questions, and other things.

## Anti-Patterns (NEVER Do These)

- **NEVER build massive upfront plan**: Do not plan all items before starting. Read first item, implement, commit, move to next.
- **NEVER block entire batch on one question**: If item hits blocker or ambiguity, skip item and dependents, record question for report, continue to next item.
- **NEVER ask user questions mid-batch**: User is away. Note question and proceed.
- **NEVER run `graphify update` inside loop**: Slow and expensive. Run once at end.
