# Prerequisites

Stage these before the session so you build instead of watch.

## Install (10 minutes)

1. Install Claude Code. Follow the official setup at docs.claude.com and sign in.
2. Confirm it runs. Open a terminal, run `claude`, and check that it starts.
3. Open this folder in Claude Code so it can read and write files here.

## Fill in your source of truth (15 minutes)

1. Open `source-of-truth-template.md`. Replace every `[BRACKET]` with your own positioning, ICP, buyer personas, beliefs, and proof.
2. Save your finished version as `source-of-truth.md` in this folder. The skill reads it every run.

If you already have a positioning doc, brand guide, or belief list, paste it into Claude and ask it to structure it into this format instead of starting from scratch.

## Pick your signal sources

- **Your own posts.** The skill learns your voice and de-dupes against what you've already covered.
- **1–2 creators you learn from.** One for storytelling structure, one for fresh topics and angles. Borrow structure and angles, never their exact words or topics.
- A way to pull public LinkedIn posts. A scraping connector (for example Apify) works. Only pull public content. Never connect your own account to automate actions like posting or commenting.

## Ground rules the engine runs on

- It grounds every idea and draft in `source-of-truth.md`. It never invents stats, clients, or claims.
- Inspiration is not copying. Borrow structure and angles, keep the words and point of view yours.
- Nothing publishes on its own. A human reviews before anything ships.

You are ready when Claude Code opens this folder and `source-of-truth.md` is filled in.
