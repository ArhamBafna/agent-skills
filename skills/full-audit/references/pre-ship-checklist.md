# Pre-ship checklist (20 points / 5 lanes)

---

## Lanes:

### Lane 1. Consistent design
1. Ensure a DESIGN.md or existing design system tokens exist, and every color, font size, spacing and corner radius follows it
2. Keep the palette restrained and the type hierarchy clear
3. Make every button, card and input of the same kind look alike
4. Too flat? Add emphasis. Too crowded? Cut
5. Keep text readable on both dark and light backgrounds

### Lane 2. On mobile
6. No sideways scrolling, and nothing spilling off the screen
7. Add a mobile menu
8. Make buttons big enough to tap
9. Keep the layout intact when the text is enlarged

### Lane 3. Every state
10. Give loading, empty and error states a proper screen
11. Give every button feedback, with its own hover, pressed and disabled look
12. Show form errors right where they happen, plus submitting, success and failure messages
13. Add transitions to modals, dropdowns and tab switches

### Lane 4. Use it like a real user
14. Click through the core flows, like sign-up and checkout, from start to finish
15. Find buttons that do nothing and links that are broken
16. Make sure the whole thing works with just a keyboard (plus visible focus ring)

### Lane 5. Before launch
17. Say what you do in one line on the home page
18. Give each page one main button you want people to click
19. Give every page a title, a description and a favicon
20. Delete all placeholder text

---

## Output format

```markdown
## 7. Pre-ship 20-point vibe & polish audit
- [critical | major | minor] <Lane: Checkpoint> — <file>:<line>
  - Issue: <concise summary of violation>
  - Evidence: `<code snippet or selector>`
  - Fix: <actionable remedy>
```
