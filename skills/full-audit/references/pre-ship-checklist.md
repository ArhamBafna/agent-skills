# Pre-Ship 20-Point Vibe & Polish Checklist

This reference defines a pre-release audit checklist for web applications. It verifies 20 quality checkpoints across 5 lanes to ensure a site is cohesive, responsive, complete, functional, and ready for production.

---

## Agent Execution Strategy

This checklist is model- and tool-agnostic. It works with any AI coding agent (Claude Code, Gemini / Antigravity, Cursor, Codex, Windsurf, Aider, or CLI agent).

- **Multi-Agent / Subagent Mode**: If the host environment supports subagents or parallel background tasks, dispatch the 5 lanes simultaneously across 5 separate subagents. Collect all findings and merge them into the final report.
- **Single-Agent Sequential Mode**: If running in a single-agent environment, evaluate the 5 lanes sequentially in order (Lane 1 through Lane 5).

---

## The 5 Audit Lanes (20 Checkpoints)

### Lane 1: Consistent Design
1. **Design System & Token Adherence**: Check that colors, font sizes, spacing, and border radii follow a centralized system or `DESIGN.md`. Verify no rogue ad-hoc hex codes or arbitrary margin/padding values.
2. **Restrained Palette & Typography**: Verify the color palette is disciplined (1 primary accent, neutral greys, semantic alert colors) and type hierarchy is clear with distinct scale ratios.
3. **Component Uniformity**: Ensure every button, card, input, and modal of the same variant shares identical styling, height, padding, and corner radius.
4. **Visual Density & Emphasis Balance**: Detect pages that are either too flat (lacking visual weight and clear focal points) or too crowded (insufficient whitespace; cut unnecessary elements).
5. **Contrast & Theme Legibility**: Ensure text meets readable contrast ratios on both light and dark backgrounds. Verify no light text vanishes on light surfaces or vice versa.

### Lane 2: Mobile Experience
6. **No Sideways Scrolling / Overflow**: Inspect mobile viewports (375px–430px). Verify zero horizontal scrolling and ensure no fixed-width container, table, pre block, or image bleeds offscreen.
7. **Responsive Navigation**: Confirm mobile viewports have a functional mobile navigation menu (hamburger drawer or bottom sheet) rather than compressed desktop headers.
8. **Touch Target Sizing**: Ensure all clickable elements, links, and buttons meet accessible minimum tap dimensions (at least 44x44px).
9. **Zoom & Font Scaling Resilience**: Verify layout stays intact and elements do not overlap, clip, or become illegible when browser font size is enlarged or zoomed up to 200%.

### Lane 3: Complete State Coverage
10. **Dedicated Loading, Empty, and Error Screens**: Ensure every data-fetching view provides dedicated loading skeletons/spinners, actionable empty states with clear CTAs, and user-friendly error views.
11. **Button & Control State Feedback**: Confirm every interactive element has visible hover, pressed/active, focus-visible, and disabled styles.
12. **Form Validation & Submission Messaging**: Verify field errors render directly adjacent to inputs with explanatory text. Check for loading/submitting state, clear success notification, and explicit failure messages.
13. **Smooth UI Transitions**: Check that modals, dropdown menus, accordion panels, and tab switches include subtle, purposeful transitions rather than abrupt visual cuts.

### Lane 4: Real User Simulation
14. **End-to-End Core User Flows**: Trace primary user journeys (sign-up, onboarding, search, checkout/action flow) from beginning to end. Verify no broken loops, dead-end pages, or missing redirects.
15. **Dead-End Sweep**: Identify and flag any buttons or controls with empty `onClick` handlers, stub functions, `#` links, or dead routes.
16. **Keyboard Accessibility**: Confirm the entire application can be navigated with only a keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`) with visible focus outlines.

### Lane 5: Pre-Launch Readiness
17. **One-Line Value Proposition**: Ensure the homepage hero contains a single, unambiguous sentence explaining what the product does and for whom.
18. **Focused Page CTA**: Verify each page has exactly one prominent primary action you want the user to take, avoiding competing visual weights.
19. **Metadata & Assets**: Verify each route has a descriptive `<title>`, meta description, Open Graph tags, and a valid favicon linked.
20. **Placeholder Elimination**: Scan and eliminate any remaining "lorem ipsum", temporary filler copy, placeholder mock names, or stock placeholder image URLs.

---

## Output Format

Format findings in the unified audit report:

```markdown
## 7. Pre-ship 20-point vibe & polish audit
- [critical | major | minor] <Lane: Checkpoint> — <file>:<line>
  - Issue: <concise summary of violation>
  - Evidence: `<code snippet or selector>`
  - Fix: <actionable remedy>
```
