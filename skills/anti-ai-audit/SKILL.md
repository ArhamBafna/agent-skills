---
name: anti-ai-audit
description: Unified audit skill for anti-AI slop covering UI, code, and structure. Use this whenever the user asks for an anti-AI audit, slop check, UI/design review, architecture or DSA audit, or "run all audits." 
---

# anti-ai-audit
This skill reads only local files in `references/` and never calls sibling skills at runtime.

## Local reference bundle

Read ALL files in `references/` (EXCEPT FOR `references\provenance.md`) before anything:

- `references/hallmark-slop-test.md`
- `references/hallmark-anti-patterns.md`
- `references/design-taste-frontend-anti-slop.md`
- `references/impeccable-audit.md`
- `references/humanise-text-overused-ai-patterns.md`
- `references/first-principles-review.md`
- `references/code-review.md`
- `references/dsa-codebase-audit.md`

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

If the user says "all" or "run all audits", run all checks under references/. Then combine the results into one report.

## Workflow

1. Discover the target.
   - If the user gives a path, scan that target.
   - Otherwise scan likely roots: `src/`, `ui/`, `components/`, `pages/`, `styles/`, `docs/`, `README.md`, `AGENTS.md`. THEN ASK USER CONFIRMATION.
   - If the scan is broad, list candidate files and ask for confirmation before auditing.
2. Choose the mode.
   - Specific audit type or full bundle.
3. Apply the relevant rules.
   - Use the matching files from `references/`.
   - Only report concrete, evidence-based findings.
4. Add the risk tag when the fix touches trivial logic or code (like security, structure, image handling, etc).
5. Write the final audit report.

## Report format

For all templates given below, repeat for all items that fall in that category. If output format is given in that reference file, use that format(overriding what's given in this template below).

Structure:

```markdown
# anti-ai-audit findings

Files scanned: <list>
Scope: <specific audit mode / all>

## 1. Hallmark / UI slop audit
- [critical] <Pattern> — <file>:<line>
  - Why: <why it reads as AI-generated or template-driven>
  - Fix: <actionable fix>
  - Safety (optional - if any): <CSS-only / zero risk / etc.>

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
<format given in that reference file>

## 7. Implementation agent prompt
<ready prompt for all items caught in the audit for the fix-up agent>
```

## Output path

- If `docs/` exists, write to `docs/anti_ai_audit_findings.md`.
- If there is no `docs/` folder, write to a root-level output file, THEN let user know that the output is written there.

## Self-contained requirement

This skill must not call another skill to perform an audit. It reads only the local references in `references/` and stays self-contained.
