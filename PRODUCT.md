# Product

## Register

brand

## Users

Local and passing customers in Sibalom, Antique looking for a specialty coffee stop that feels like an unhurried refuge, not a generic quick-service cafe. They're deciding whether to walk in — the site's job is to make that decision easy by showing the menu, the feeling of the space, and how to find it.

## Product Purpose

A single-page marketing site that converts the physical shop's "nipa-hut refuge" feeling into a digital one — menu, story, and visit info for people deciding whether to walk in. No backend, no ordering system — informational and atmospheric, not transactional.

## Brand Personality

Quiet, warm, unhurried — a shelter, not a hustle-culture coffee brand. Green-led (not the terracotta/cream default of most coffee-shop sites), asymmetric, restrained boldness spent only on the arch visual and cove-glow. Everything else stays quiet and disciplined.

## Anti-references

- Generic cream+terracotta+high-contrast-serif "AI coffee landing" template — the current cliché this brand deliberately avoids.
- Purple, coral, or Gen-Z blue in the site chrome — those colors exist only in the shop's seasonal promo posters, never in the digital brand.
- Centered, symmetric layouts — the design is intentionally asymmetric (hero split, story split, offset section heads).
- shadcn default radii/shadows overriding the token system.
- Hamburger mega-menus — it's a one-pager; anchor links plus a persistent CTA are enough.

## Design Principles

1. Green leads, terracotta (`--clay`) is a sparing price-only accent — never the whole identity.
2. Spend visual boldness only on the arch visual and cove-glow. Everything else stays quiet and disciplined.
3. Asymmetry is intentional, not accidental — don't default to centered layouts.
4. Numbered markers are earned (the Menu's 01/02/03 is a real grouping), not decorative scaffolding — don't add more elsewhere.
5. Motion enhances an already-visible default; it never gates content visibility, and always respects `prefers-reduced-motion`.

## Accessibility & Inclusion

WCAG AA target — body text contrast ≥4.5:1, visible focus rings on all interactive elements, `prefers-reduced-motion` respected everywhere (including any Framer Motion `useTransform`-driven values, which the global CSS reduced-motion block does not auto-cover), full keyboard reachability across nav and CTAs, `tel:` links on phone numbers, semantic landmarks throughout.
