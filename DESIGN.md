# Design

## Theme

"Nipa-hut refuge" — derived from the shop's real interior (wood slats, cane webbing, terracotta floor, golden cove lighting) and the logo (rolling-hills green, roasted-brown script). Light background, warm and quiet, not bright/cheerful. Green is the lead accent, not terracotta — the deliberate choice that keeps this off the generic cream+clay+serif AI default.

## Color

Defined as CSS variables in `app/globals.css` (`:root`), mirrored into Tailwind utilities via `@theme inline`. No `tailwind.config.ts` — Tailwind v4 CSS-first, everything lives in `globals.css`.

| Token | Value | Usage |
|---|---|---|
| `--bark` | `#3E2A1E` | Headings, logo text, primary buttons |
| `--ink` | `#2A2018` | Body text |
| `--green` | `#556B2F` | Lead accent — eyebrows, ring, numbered markers |
| `--green-deep` | `#3B4A22` | Dark-section backgrounds (Visit), emphasis headings |
| `--cream` | `#F5EFE4` | Page background |
| `--cream-hi` | `#FBF7EF` | Raised surfaces (Menu band, cards) |
| `--amber` | `#E8A54B` | Cove-glow, CTA on dark bg |
| `--amber-soft` | `#F0C179` | Amber text on dark green bg (verified 5.76:1 contrast on `--green-deep`) |
| `--clay` | `#B5643C` | Prices only — used sparingly, never as a base color |
| `--line` | `rgba(62,42,30,.14)` | Hairlines, borders |
| `--slat` | `rgba(62,42,30,.06)` | Wood-slat texture, muted surfaces |

Banned: purple, coral, Gen-Z blue in core chrome (promo-poster-only colors).

## Typography

| Role | Font | Usage |
|---|---|---|
| Display | Fraunces (variable, opsz axis, italic) | All headings, prices, marquee. Italic reserved for emotional words ("shelter," "stay awhile"). |
| Body / UI | Bricolage Grotesque (400/500/600) | Body copy, nav, labels, eyebrows, buttons |

Loaded via `next/font/google` in `app/layout.tsx` as `--font-display` / `--font-body` CSS variables. Headings: `letter-spacing: -0.01em; line-height: 1.02` (set globally in `globals.css` `@layer base`). Eyebrows: `.eyebrow` utility class — `.72rem`, `letter-spacing: .28em`, uppercase, `--green`. Banned as primary: Inter, Roboto, Arial, system-ui.

## Signature elements

- **Wood-slat vertical rhythm** — `body::before/::after`, fixed to page edges, `repeating-linear-gradient` using `--slat`, 34px desktop / 14px mobile. Frames the page; never used decoratively elsewhere.
- **Cove-glow** — `.cove-glow` utility, radial amber gradient at `-20%` inset, `z-index:-1`. Used behind the Hero and arched visuals only.
- **Arched hero visual** — `border-radius: 280px 280px 26px 26px`, quoting the interior's lit arch niche. This and the cove-glow are the two places the design "spends boldness"; everything else stays quiet.

## Layout

Asymmetric throughout — Hero is a `1.05fr/0.95fr` split, Shelter is a 2-col story split, section heads are offset rather than centered. `max-w-7xl` content container, `px-5 md:px-10` gutters. Radius scale derived from `--radius: 0.625rem` via `--radius-sm/md/lg/xl/2xl` multipliers in `@theme inline`.

## Components

- `components/ui/button.tsx` — the only shadcn primitive in use (Base UI `@base-ui/react/button`, `base-nova` style, CVA variants). Used sparingly (Nav's "Order Now"); most CTAs are hand-styled raw `<a>` elements to avoid shadcn defaults flattening the aesthetic.
- `components/sections/*` — one bespoke component per page section (Nav, Hero, Marquee, Menu, Shelter, Visit, Footer), each a client component using Framer Motion for reveals.
- `components/motion-provider.tsx` — wraps the app in `MotionConfig reducedMotion="user"`, auto-suppressing `animate`/`whileInView`/`initial` variant transforms under OS reduced-motion. Does **not** cover manually-computed `useMotionValue`/`useTransform` values — those need an explicit `useReducedMotion()` guard in the component.

## Motion

- Scroll reveals: `whileInView` up-fade, `y: 24 → 0`, opacity, `duration: 0.7`, `ease: "easeOut"`, `viewport: { once: true, margin: "-80px" }`.
- Hero: staggered children on load (`staggerChildren: 0.12`).
- Marquee: pure CSS `@keyframes`, 28s linear infinite, paused under reduced-motion.
- Card hovers: `translateY(-5px)` (via `hover:-translate-y-1.5` etc.) + shadow + border color shift, `duration-300`.
- Global `@media (prefers-reduced-motion: reduce)` block in `globals.css` collapses all CSS animation/transition durations to near-zero and pauses the marquee.

## Accessibility floor

Visible `focus-visible` outline rings (`outline-2 outline-offset-4`) on every interactive element, `tel:` link on phone numbers, semantic landmarks (`<nav> <header> <main> <section aria-labelledby> <footer>`), alt text on all meaningful images, decorative images/overlays marked `aria-hidden`.
