# Design-taste-frontend anti-slop cues

This file holds the design-aware anti-template checks that should trigger before code-level slop gates start enumerating visual tells.

## Read the room first

The brief decides the system. The page kind, audience, reference signals, and brand assets should set the starting language before any default aesthetic is chosen.

## The design read

Before production, write a one-line design read with the page kind, audience, and aesthetic direction. If the brief is genuinely ambiguous, ask one clarifying question instead of guessing.

## The anti-default rules

The default should not be a generic template. The model should reject defaulting to a repeated SaaS pattern, a purple-blue glow, a dark mesh hero, oversized motion, or a one-font layout when the brief asks for something more intentional.

## Dials and system choice

Use contextual dials rather than fixed defaults:
- DESIGN_VARIANCE
- MOTION_INTENSITY
- VISUAL_DENSITY

When the brief fits a real system category, reach for that official system instead of inventing a custom look. Do not mix systems in one project.

## Architecture guardrails

If no official system is already in place, the safe default is a restrained modern stack with a clear motion and state model, not a template for the next AI landing page.

## Summary

This file contributes the brief-aware, not-just-visual layer of the anti-AI audit: it asks whether the design is grounded in the actual problem, audience, and context, rather than a repeated generated default.
