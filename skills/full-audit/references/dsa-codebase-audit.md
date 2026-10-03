# DSA Codebase Audit

Execute an application-wide, read-only audit for simplifications in data structures, state representation, control flow, and ownership boundaries.

## 1. Rules and Constraints
- Read-only inspection only. Do not edit files, run tests, or modify git state.
- Focus on real complexity hotspots: invalid states, redundant branches, or split ownership.
- Reject style-only changes, speculative future requirements, and cosmetic line-count cuts.
- Do not force abstractions when plain local code is clear.

## 2. Coverage Contract
1. Inventory all subsystems before reviewing code:
   - Assign each subsystem a stable ID, name, explicit boundaries, key implementation files, and call sites.
   - Track status: `queued`, `in review`, `recommend`, or `skip`.
2. Small codebase shortcut: If the repository has fewer than 10 source files, treat the entire project as a single subsystem.
3. Catch-all groupings are prohibited; every file belongs to a concrete subsystem.

## 3. Execution Strategy
- **Multi-Agent Mode (Preferred):** Dispatch one read-only sub-agent per subsystem with non-overlapping file scopes. Enforce bounded concurrency and harvest results on completion.
- **Single-Agent Fallback:** Review inventoried subsystems sequentially in the main coordinator session.

## 4. Subsystem Review Criteria
Each subsystem review must propose at most two high-leverage simplifications, or return `skip`.

Audit targets:
- Scattered booleans or nullable fields allowing illegal states -> state machine or discriminated union.
- Repeated shape assumptions across modules -> canonical shared type.
- Duplicated branching logic -> map, lookup table, registry, or command pattern.
- Unclear ownership across files -> explicit module boundary.
- Repeated scans or lookups on raw collections -> indexed map or set.
- Concurrency or async workflows prone to stale or race conditions.

Required finding schema:
1. **Verdict:** `recommend` or `skip`
2. **Evidence:** Exact file paths and line ranges
3. **Current Problem:** Concrete state or control-flow complexity
4. **Proposed Model:** Exact data structure or pattern replacement
5. **Implementation Scope:** Specific files and interfaces to update
6. **Risks and Validation:** Regression risks and test verification strategy
7. **Confidence:** `high`, `medium`, or `low`

## 5. Coordinator Synthesis and Audit Validation
The coordinator verifies all findings before finalizing the report:
1. Check every finding against actual source lines; reject speculative or vague entries.
2. Deduplicate cross-cutting patterns and eliminate complexity shifts.
3. Verify coverage: Ensure every subsystem has an explicit recommendation or documented skip.
4. Rank accepted recommendations by impact, confidence, blast radius, and dependency order.

## 6. Output Format

```markdown
### DSA Codebase Audit Report

#### Summary
- **Subsystems Audited:** <count>
- **Total Recommendations:** <count> | **Skips:** <count>
- **Primary Complexity Themes:** <bullet points>

#### Ranked Recommendations
| Priority | Subsystem | Recommendation | Affected Files | Complexity / Risk | Confidence |
|---|---|---|---|---|---|
| P1 | <id> | <title> | <file:lines> | <invalid state / risk> | High / Med / Low |

#### Detailed Findings & Proposed Simplifications
For each accepted recommendation:
- **Subsystem & Location:** [file.ext:L1-L20](file:///path/to/file.ext#L1-L20)
- **Current Problem:** <concrete complexity description>
- **Proposed Model:** <simplified data structure or pattern>
- **Implementation Scope:** <files and interfaces touched>
- **Risks & Verification:** <regression risks and test plan>

#### Coverage & Skips
- <subsystem id>: <1-sentence rationale for skip>
```
