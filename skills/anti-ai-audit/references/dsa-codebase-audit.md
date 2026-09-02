# DSA codebase audit (extracted from `dsa-codebase-audit`)

This section preserves the architecture review logic that belongs to the DSA audit skill without depending on that skill at runtime.

## Goal

Audit the codebase for simplifications in data structures, state representation, control flow, algorithms, and ownership.

## What to look for

- scattered booleans or nullable fields that allow invalid state
- repeated shape assumptions that deserve a shared type
- duplicated branching that should become a reducer, registry, command pattern, or map
- unclear ownership boundaries that should be split into a smaller module
- repeated scans or lookups that deserve an index or aggregate model
- async or lifecycle states that can become stale or conflicting

## Review boundary

Stay read-only. Do not implement changes during the audit.

Review each subsystem for at most two simplification opportunities. If nothing is a clear fit, record a skip.

## Evidence format

For each accepted finding, capture:
1. verdict: `recommend` or `skip`
2. exact file and line references
3. current problem description
4. proposed model
5. implementation scope
6. regression risks and validation plan
7. confidence: `high`, `medium`, or `low`

## Score and priority

Rank findings by impact, confidence, effort, blast radius, and dependency cost. The output should emphasise the best first implementation slices rather than a long list of vague abstractions.

## Final audit rule

The final report should call out coverage, skips, duplicates, and the strongest simplification candidates. It should not broaden the scope beyond the assigned subsystem unless the evidence justifies a cross-cutting issue.
