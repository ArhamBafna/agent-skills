---
name: dsa-codebase-audit
description: Run application-wide, read-only DSA and organizing-model audit to identify state complexity, data structure, and control flow simplifications. Use when asked to "audit codebase", "DSA audit", "simplify architecture", "refactor data structures", "find complexity hotspots", or when running /dsa-codebase-audit.
---

# DSA Codebase Audit

Audit codebase for simplifications in data structures, state representation, control flow, algorithms, ownership.

Read-only audit. Do not edit files, run tests, implement changes, commit, or push. Read-only inspection commands allowed.

Coordinator run until complete codebase reviewed and final audit validated.

## 1. Coverage Contract

Inspect repository. Inventory every subsystem.

**Small Codebase Shortcut:** If repository has <10 source files, treat whole repo as single subsystem. Direct audit pass.

For standard/large repos, assign each subsystem:
- Stable ID and name
- Exact ownership boundary
- Key implementation files
- Public interfaces, major call sites, tests
- Status: `queued`, `in review`, `recommend`, `skip`

Include frontend, backend, shared infra, platform bridges, contracts, test/tooling where relevant.

Create canonical scratchpad or report:
- Subsystem inventory
- Confirmed opportunities
- Explicit skip decisions
- Cross-cutting patterns
- Duplicates and superseded findings
- Final priorities and dependencies
- Audit log

Inventory is coverage contract. Catch-all rows do not prove coverage.

## 2. Bounded Subsystem Reviews

### Execution Modes
- **Multi-Agent Mode (Preferred):** Fresh, read-only sub-agents. One worker per subsystem with non-overlapping boundary. Keep concurrency bounded. Close completed workers after harvesting results.
- **Single-Agent Fallback:** If sub-agents unavailable, review inventoried subsystems sequentially in coordinator session.

### Worker Brief
Review assigned subsystem for at most two simplifications in data structures, state representation, or organizing model.

Inspect implementation, interfaces, call sites, tests. Stay in assigned boundary. Note cross-subsystem issues, but do not expand scope.

Look for:
- Scattered booleans or nullable fields allowing invalid states -> state machine or discriminated union.
- Repeated shape assumptions -> shared typed model.
- Duplicated branching -> map, registry, reducer, or command pattern.
- Unclear ownership -> small module boundary.
- Repeated scans, transforms, lookups -> proper collection or index.
- Lifecycle, concurrency, async states allowing stale or conflicting state.

Do not force abstractions. Prefer simple local code when clear.

Do not recommend changes for style only, hypothetical future needs, trivial line-count cuts, or moving branching behind types.

Return at most two findings. If nothing meets bar, return `skip`.

For each recommendation provide:
1. Verdict: `recommend` or `skip`
2. Evidence: exact file and line references
3. Current problem: complexity or invalid states
4. Proposed model: simpler representation and why
5. Implementation scope: affected files and interfaces
6. Regression risks and migration concerns
7. Validation plan: existing and needed tests
8. Confidence: `high`, `medium`, or `low`

## 3. Validate and Synthesize

Coordinator verify every finding against code before accepting.

Reject, narrow, or demote findings that are vague, duplicate, misunderstand intent, or move complexity.

Record skips as completed coverage. Deduplicate findings. Assign accepted recommendations to one subsystem.

Process review batches until inventory complete.

## 4. Audit the Audit

Run fresh passes before finish:
- Coverage and missing subsystem boundaries
- Duplication and ownership overlap
- Materiality and over-abstraction
- Schema completeness
- Dependency-aware priority ranking

If coverage gap found, add explicit subsystem row and audit. Do not broaden existing boundary.

Rank recommendations by impact, confidence, effort, blast radius, dependencies. Pick best first implementation slices.

Complete when:
- Every subsystem reviewed
- Every subsystem has recommendation or explicit skip
- Every finding has complete evidence, scope, risk, validation
- Duplicates and weak abstractions removed
- Priorities and dependencies consistent
- Repository unchanged

## 5. Output Format

### DSA Codebase Audit Report

#### Summary
- **Subsystems Audited:** `<count>`
- **Total Recommendations:** `<count>` | **Skips:** `<count>`
- **Primary Complexity Themes:** `<bullet points>`

#### Ranked Recommendations

| Priority | Subsystem | Recommendation | Affected Files | Complexity / Risk | Confidence |
|---|---|---|---|---|---|
| P1 | `<id>` | `<title>` | `<file:lines>` | `<invalid state / risk>` | High / Med / Low |

#### Detailed Findings & Proposed Simplifications
For each accepted recommendation:
- **Subsystem & Location:** `[file.ext:L1-L20](file:///path/to/file.ext#L1-L20)`
- **Current Problem:** `<explanation of state/control-flow complexity>`
- **Proposed Model:** `<concrete data structure or pattern simplification>`
- **Implementation Scope:** `<files and interfaces to touch>`
- **Risks & Verification:** `<regression risks and test plan>`

#### Coverage & Skips
- List skipped subsystems with 1-sentence rationale.
