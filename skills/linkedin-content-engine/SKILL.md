---
name: weekly-linkedin-content
description: >-
  Weekly LinkedIn content engine. Pulls fresh signal from your own profile plus
  a couple of creators you learn from, then produces a ranked idea bank and 5
  fully drafted LinkedIn posts in your voice — every idea and draft framed to one
  of your buyer personas and their job-to-be-done. Always grounds positioning,
  proof, and ICP/JTBD in your source-of-truth.md. Trigger on "run the weekly
  content", "pull content ideas", "draft this week's posts", or on a Monday schedule.
---

# Weekly LinkedIn Content Engine

Produce a week of LinkedIn content: a ranked **idea bank** and **5 ready-to-review drafts**, all framed to your ICP and grounded in your source of truth.

This skill is self-contained. It can run unattended (for example as a Monday scheduled task) or be invoked manually.

---

## Inputs & references (read these first)

1. **Source of truth (REQUIRED, read every run):** `source-of-truth.md` in this folder.
   Pull from it: positioning, the problem and villain, beliefs/POV, proof points, the ICP, the buyer personas, and each persona's JTBD. If this file is missing, stop and say so. Do not invent positioning.

2. **Signal sources (live-pull each run):**
   - **[Your LinkedIn profile]** → your existing perspective and voice baseline. Use to (a) learn current voice, (b) see what you've already covered so you don't repeat, (c) find threads worth continuing.
   - **[A creator whose storytelling you admire]** → writing structure and pacing inspiration. Borrow narrative structure, openers, and story arcs, never topics.
   - **[A creator whose topics you admire]** → fresh angles and narratives. Mine for frameworks and contrarian takes to adapt to your category, never their exact wording.

   Replace the bracketed profiles above with real URLs before your first run.

---

## Step 1 — Pull the signal

Use a public-post scraping connector (for example Apify's `harvestapi/linkedin-profile-posts` actor). Pull the last ~10 posts from the last week for each profile. If a profile posted little, widen the window to a month.

- Only pull public content. Never connect your own account to automate actions.
- If the connector is unavailable for a profile, note it under "Sourcing notes," fall back to that profile's known themes, and continue. Never silently skip.

## Step 2 — Analyze

- **From your profile:** list topics covered in the last ~2 weeks (de-dupe against them). Note your 2–3 highest-engagement posts and why they landed (hook type, format, proof used).
- **From the storytelling creator:** extract 2–3 structures or openers worth reusing (confession → reframe, specific-moment open, contrarian one-liner).
- **From the topics creator:** extract 3–5 fresh angles or data points to adapt, reframed for your category.

## Step 3 — Idea bank (rank 8–10)

For each idea provide:
- **Hook** (1 line, in your voice)
- **Angle / thesis** (1–2 lines)
- **Persona** it targets (from your source of truth)
- **JTBD it speaks to** (the specific job from your source of truth)
- **Pillar / proof point** it can pull on (a belief, program, or named result)
- **Inspiration source** (which profile/post sparked it, with link)

Rank by relevance to ICP × freshness × likelihood to drive real conversations, not vanity engagement. Every idea must map to a real persona and JTBD. Cut anything that's just "interesting."

## Step 4 — Draft 5 posts (Mon–Fri)

Pick the top 5 ideas. Spread them across your personas (don't write 5 for the same one). Draft each fully in your voice.

For each draft, output a small header then the post body:
```
### Monday — [persona] — [JTBD]
Hook: <one-liner>   |   Proof used: <result/stat>   |   Inspiration: <link>

<full post text, ready to paste>
```

### Voice rules (build these from your own posts)
Derive these from your real writing. Study your best posts for sentence length, openings, punctuation, and the words you use and never use, then write the rules here so any draft sounds like you. Example of what a filled-in rule set looks like:
- Lowercase by default. Short, declarative lines. One idea per line, liberal whitespace.
- Open with a contrarian or counter-intuitive hook.
- Back claims with a specific number and a named source. Never fabricate a stat.
- CTA on its own line. No corporate filler, no hashtag stuffing, no emojis.
- Lead with insight, not a pitch. The pitch is implicit.

Replace the above with your own rules once you've studied your posts.

### Framing requirement (non-negotiable)
Every draft must serve one persona and move them along their JTBD. The reader should feel your worldview is obviously true by the end.

## Step 5 — Save output

Save a dated markdown file to this folder: `weekly-content-YYYY-MM-DD.md`. Structure: header (week-of date, profiles pulled, counts) → sourcing notes → ranked idea bank → 5 drafts → sources. Then present the file and keep the chat summary short.

---

## Guardrails
- Ground everything in `source-of-truth.md`. Never invent stats, clients, or claims.
- Inspiration is not copying. Borrow structure and angles; the words and POV are yours.
- If sourcing is thin on a draft, flag it rather than padding.
- Client-ready bar: drafts should be postable with light edits, not a rewrite.
- Nothing publishes on its own. A human reviews first.
