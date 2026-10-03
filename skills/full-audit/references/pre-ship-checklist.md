# Pre-ship checklist (20 points / 5 lanes)

## Execution
- **Multi-agent**: Dispatch 5 lanes parallel to 5 subagents. Merge findings into report.
- **Single-agent**: Run Lane 1 to 5 sequential.

---

## Lanes

### Lane 1: Consistent design
1. **Design tokens**: Follow `DESIGN.md` or centralized system for colors, font size, spacing, radius. Flag ad-hoc hex values, arbitrary margins/padding.
2. **Palette & type**: Restrained colors (1 accent, neutrals, semantic alerts). Clear typographic scale.
3. **Component uniformity**: Same variant buttons, cards, inputs share identical styling, height, padding, corner radius.
4. **Visual density**: Balance contrast and whitespace. Flag flat pages (no hierarchy/focal point) and crowded pages (cut clutter).
5. **Contrast**: WCAG readable on dark and light backgrounds. No vanishing text on matching surface.

### Lane 2: Mobile
6. **No horizontal overflow**: Test 375px–430px. Zero horizontal scroll. No fixed-width boxes, tables, code blocks, or images bleeding off-screen.
7. **Mobile menu**: Small screens use dedicated drawer/sheet, not squished desktop header.
8. **Touch targets**: All interactive elements minimum 44x44px tap area.
9. **Zoom & scale**: Layout survive 200% zoom or enlarged font. No text clip, collision, or layout break.

### Lane 3: Every state
10. **Async views**: Dedicated screens for loading (skeletons/spinners), empty state (with CTA), and errors.
11. **Button feedback**: Every control need distinct hover, pressed/active, focus-visible, and disabled states.
12. **Form validation**: Inline errors adjacent to fields. Show submitting state, success confirmation, explicit failure banner.
13. **Transitions**: Modals, dropdowns, tabs, accordions need smooth state transitions. No jarring instant cuts.

### Lane 4: Real user flow
14. **Core flows**: Click-test end-to-end golden paths (sign-up, onboarding, checkout/action). No dead loops or dead ends.
15. **Dead controls**: Flag empty `onClick`, stub functions, unhandled `#` links, dead routes.
16. **Keyboard navigation**: Full site operable via `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`. Visible focus outlines required.

### Lane 5: Pre-launch
17. **One-line pitch**: Homepage hero state product value in one clear line.
18. **One primary CTA**: Each page has one dominant call to action. Avoid competing button weights.
19. **Metadata & assets**: Distinct `<title>`, meta description, and favicon on every route.
20. **Zero placeholders**: Strip "lorem ipsum", draft text, fake names, mock image URLs.

---

## Output format

```markdown
## 7. Pre-ship 20-point vibe & polish audit
- [critical | major | minor] <Lane: Checkpoint> — <file>:<line>
  - Issue: <concise summary of violation>
  - Evidence: `<code snippet or selector>`
  - Fix: <actionable remedy>
```
