---
name: anti-ai-audit
description: Unified self-contained audit skill for UI slop, code review, architecture inspection, and AI-style prose issues. Use when the user asks for an anti-AI audit, a code review, a design critique, a DSA audit, a humanizer pass, or a full audit across all included checks. This skill reads only its own local references in `references/` and does not call sibling skills at runtime.
---

# Unified Audit (/anti-ai-audit)

This is the canonical replacement for the older `anti-ai-audit` skill. It is fully self-contained: it reads local references only and does not depend on sibling skill resolution.

The bundle includes the audit/review parts of the relevant local skills, with repetition trimmed where the same guidance appears in multiple places.

## 1. Included upstream sources

These are the reference bundles this skill preserves locally:

- `references/design-taste-frontend-anti-slop.md` — extracted from `design-taste-frontend`
- `references/hallmark-anti-patterns.md` — extracted from `hallmark`
- `references/hallmark-slop-test.md` — extracted from `hallmark`
- `references/impeccable-audit.md` — extracted from `impeccable`
- `references/humanise-text-overused-ai-patterns.md` — extracted from `humanizer`
- `references/code-review-criteria.md` — extracted from `code-review`
- `references/dsa-codebase-audit.md` — extracted from `dsa-codebase-audit`
- `references/provenance.md` — local registry of upstream extraction and source policy

If a whole upstream skill is a single audit artifact and a stable raw GitHub URL is available in the runtime environment, add that URL to `references/provenance.md` and cite it there. Do not invent URLs. When raw URLs are unavailable, preserve the relevant excerpt locally as a reference copy.

## 2. Routing rules

### If the user names a specific audit type

Run only the matching checks:

- `anti-ai` / `slop` / `design audit` / `ui audit` -> `design-taste-frontend`, `hallmark`, `impeccable`, `humanise-text`
- `code review` / `review` / `diff review` / `PR review` -> `code-review`
- `architecture audit` / `dsa` / `complexity` / `refactor audit` -> `dsa-codebase-audit`
- `humanize` / `rewrite AI text` / `text review` -> `humanizer`

### If the user says "all" or "run all audits"

Run the full included bundle in this order:

1. Hallmark/UI anti-pattern audit
2. Design-taste frontend anti-slop checks
3. Impeccable critique and layout structure review
4. Humaniser / prose anti-AI review
5. Code review (standards + spec axes)
6. DSA codebase audit (state/structure complexity review)

Do not include `diagnosing-bugs`, `code-simplification`, or `codebase-design` in the default full bundle unless the user explicitly asks for those categories.

## 3. Target discovery

1. If the user gives a path, scan that target.
2. Otherwise scan likely roots such as `src/`, `ui/`, `components/`, `pages/`, `styles/`, `docs/`, `README.md`, `AGENTS.md`, and source directories relevant to the request.
3. If the scan is broad, list the candidate files and ask for confirmation before auditing.
4. For code reviews, compare the target branch or diff against the fixed point the user provides.
5. For architecture audits, inspect the repo read-only and summarize subsystem complexity, state representation, and refactor opportunities.

## 4. Audit rules

Read and apply the local reference files relevant to the selected mode:

- `references/hallmark-slop-test.md`
- `references/hallmark-anti-patterns.md`
- `references/design-taste-frontend-anti-slop.md`
- `references/impeccable-audit.md`
- `references/humanise-text-overused-ai-patterns.md`
- `references/code-review-criteria.md`
- `references/dsa-codebase-audit.md`

Negative findings should be concrete, file- and line-specific, and actionable. Prioritize evidence over generic taste comments.

## 5. Report format

Use this exact structure:

```markdown
# Unified Audit Findings

Files scanned: <list>
Scope: <specific audit mode / all>

## 1. Hallmark / UI slop audit
- [critical] <Pattern> — <file>:<line>
  - Why: <why it reads as AI-generated or template-driven>
  - Fix: <actionable fix>
  - Safety: <CSS-only / zero risk / etc.>
- [major] <Pattern> — <file>:<line>
  - Why: <why>
  - Fix: <actionable fix>

## 2. Design-Taste-Frontend audit
- **<Rule>**: <Finding, line ref>

## 3. Impeccable critique & layout structure
- **Heuristic Score**: <Score>
- **Action**: <short guidance>
  > ⚠️ **EXTRA CAREFUL (POTENTIAL FUNCTIONAL RISK):** <state/event/bubbling/navigation/streaming warning>

## 4. Humaniser / prose anti-AI review
- **AI Pattern**: <phrase> (<file>:<line>)
  - Fix: <clean replacement>

## 5. Code review (Standards + Spec)
### Standards
- <issue> — <file>:<line>
  - Standard: <documented rule or smell>
  - Why: <reason>
### Spec
- <gap> — <file>:<line>
  - Spec reference: <issue / requirement>
  - Why: <what's missing or wrong>

## 6. DSA / architecture audit
- **Subsystem:** <name>
- **Finding:** <simplification / invalid-state / complexity issue>
- **Evidence:** <file>:<line>
- **Proposed model:** <simpler state or structure>

## 7. Implementation agent prompt
<ready prompt for the fix-up agent>
```

## 6. Risk rule

If the fix touches forms, modals, stream UIs, icons, event bubbling, state logic, or architecture boundaries, add the ⚠️ risk tag and state the risk explicitly.

## 7. Self-contained requirement

This skill must not call another skill to perform the audit. It must read from the local references in `references/` only. That is the main replacement contract for the old anti-AI audit skill.


