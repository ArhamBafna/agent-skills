---
name: anti-ai-audit
description: Audit frontend UI and docs for anti-AI patterns and slop. Scans code with hallmark, design-taste-frontend, impeccable, and humanise-text. Writes combined report. Use when asked to audit AI patterns, check AI slop, find anti-AI tells, or run /anti-ai-audit.
---

# Anti-AI Audit (/anti-ai-audit)

Find, tag, report AI slop in UI and docs.

## 1. Required Skills Under Hood

Agent MUST read and run rules from 4 skills:

1. **hallmark**:
   - 58-gate slop test and named anti-patterns.
   - Catch: gradient-text heads, purple/blue gradients, .glass-panel frosted glass, Lucide-only default, sparkle icons (✨ / <Sparkles>) as AI shortcut, 100vh centered hero, card-in-card, pure black/white.
2. **design-taste-frontend**:
   - Catch: Lila (purple/blue) trap, default generic SaaS grid, Inter-everywhere font.
3. **impeccable**:
   - Critique visual hierarchy, distinctiveness, 3-column card monotony.
4. **humanise-text**:
   - Catch AI fluff in docs/UI copy (scales seamlessly, streamlined, supercharge).

## 2. Target Discovery

1. Find UI files (ui/src/, src/, components/, pages/, styles/, *.css) and docs (docs/*.md, README.md).
2. If user give target path, scan target.
3. If no target given, detect whole UI, show list, ask user confirm before scan.

## 3. Output Path

- docs/ folder exists: Write to docs/anti_ai_pattern_findings.md.
- No docs/ folder: Ask user if root folder write OK before create file.

## 4. Report Format

Output MUST follow template:

`markdown
# Anti-AI Pattern Findings (Whole UI Scan)

Files scanned: <list>

## 1. Hallmark Audit

[critical] <Pattern> — <file>:<line>
  <Why it AI tell>
  fix: <Actionable fix>
  *Safety: <CSS only / Zero risk / etc.>*

[major] <Pattern> — <file>:<line>
  ...

Summary — N critical · M major · K minor
Verdict — [ships as slop | reads as AI-generated | close, fix minors]

---

## 2. Design-Taste-Frontend Audit

- **<Rule>**: <Finding, line ref>

---

## 3. Impeccable Critique & Layout Structure

- **Heuristic Score**: <Score>
- **Action**: <Distill pass guidance>
  > ⚠️ **EXTRA CAREFUL (POTENTIAL FUNCTIONAL RISK):** <Warn state, event bubbling, stopPropagation, navigation, streaming widgets>

---

## 4. Humanise-Text Review (<docs>)

- **AI Pattern**: <Fluff word> (<file>:<line>).
  fix: <Clean replacement>

---

## 5. Implementation Agent Prompt
<Ready prompt for agent to fix all findings safely.>
`

## 5. Risk Rules

- If change touches icons, event bubbling, state, or DOM nesting around forms/modals/streams: add ⚠️ EXTRA CAREFUL (POTENTIAL FUNCTIONAL RISK) tag.
- Give exact file, line number, direct fix.


