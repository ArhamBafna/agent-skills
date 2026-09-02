---
name: anti-ai-audit
description: Unified audit skill for anti-AI slop, frontend design review, code review, architecture complexity checks, and AI-written prose cleanup. Use this whenever the user asks for an anti-AI audit, slop check, UI/design review, PR review, architecture or DSA audit, humanize text, or "run all audits." This skill reads only local files in `references/` and never calls sibling skills at runtime.
---

# Unified Audit (/anti-ai-audit)

This skill replaces the old anti-AI audit with one self-contained entry point. It keeps the audit logic local to this skill and does not depend on sibling skill resolution.

## Trigger paths

Use this skill when the request matches any of these:

- anti-AI / slop / generic AI design review
- UI audit / UX critique / design review
- code review / PR review / diff review
- architecture / DSA / complexity audit
- humanize text / rewrite AI-sounding prose
- "run all audits" / "do the audit bundle"

## Local reference bundle

Read the relevant files in `references/` before judging anything:

- `references/hallmark-slop-test.md`
- `references/hallmark-anti-patterns.md`
- `references/design-taste-frontend-anti-slop.md`
- `references/impeccable-audit.md`
- `references/humanise-text-overused-ai-patterns.md`

If a request is code or architecture oriented, load the matching local checklists in the same skill bundle and keep the criteria there, not in another skill.

## Routing

### Specific audit

If the user names one audit type, run only the matching checks.

Examples:
- anti-AI / slop / design audit -> UI + visual + text checks
- code review / review / diff review -> code-review standards and the spec axis
- DSA / architecture / complexity -> state, ownership, and simplification checks
- humanize / rewrite AI-like prose -> language-pattern checks

### All audits

If the user says "all" or "run all audits", run the bundle in this order:

1. Hallmark UI slop audit
2. Design-taste anti-slop checks
3. Impeccable critique and layout review
4. Humanize-text review
5. Code-review checks
6. DSA / architecture review

Then combine the results into one report.

## Workflow

1. Discover the target.
   - If the user gives a path, scan that target.
   - Otherwise scan likely roots: `src/`, `ui/`, `components/`, `pages/`, `styles/`, `docs/`, `README.md`, `AGENTS.md`.
   - If the scan is broad, list candidate files and ask for confirmation before auditing.
2. Choose the mode.
   - Specific audit type or full bundle.
3. Apply the relevant rules.
   - Use the matching files from `references/`.
   - Only report concrete, evidence-based findings.
4. Add the risk tag when the fix touches forms, modals, stream UIs, event bubbling, state logic, icons, or architecture boundaries.
5. Write the final audit report in one pass.

## Report format

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

## 4. Humanise / prose anti-AI review
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

## Output path

- If `docs/` exists, write to `docs/anti_ai_pattern_findings.md`.
- If there is no `docs/` folder, ask before creating a root-level output file.

## Self-contained requirement

This skill must not call another skill to perform an audit. It reads only the local references in `references/` and stays self-contained.


