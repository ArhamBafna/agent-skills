# Unified audit provenance

This bundle keeps the relevant audit guidance in one self-contained location so the replacement `anti-ai-audit` skill does not depend on sibling skills at runtime.

## Extraction rules used here

- If the upstream skill is a single-file audit artifact and a stable raw GitHub URL is known, preserve the source in the `SKILL.md` or a source note.
- If the upstream skill is a larger item with audit sections only, extract the relevant audit/checklist sections and paste them into `references/`.
- If the upstream skill is a full multi-file package, copy the relevant audit package or preserve the raw file references as local references.
- Trim repeated wording when two skills overlap.

## Included sources

- `design-taste-frontend` -> `references/design-taste-frontend-anti-slop.md`
- `hallmark` -> `references/hallmark-anti-patterns.md`, `references/hallmark-slop-test.md`
- `impeccable` -> `references/impeccable-audit.md`
- `humanizer` -> `references/humanise-text-overused-ai-patterns.md`
- `code-review` -> `references/code-review-criteria.md`
- `dsa-codebase-audit` -> `references/dsa-codebase-audit.md`

## Exclusions for this pass

- `diagnosing-bugs` — excluded by scope
- `code-simplification` — broader engineering skill, not a pure audit pass
- `codebase-design` — broader architectural/design skill, not a pure audit pass

This file is the provenance ledger for the unified replacement skill.
