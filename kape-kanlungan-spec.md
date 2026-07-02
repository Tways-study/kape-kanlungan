# Kapé Kanlungan — Landing Page Build Spec

> Build brief for Claude Code. Single-page marketing site for a specialty coffee shop in Sibalom, Antique.
> **Concept:** *Kanlungan* = shelter/refuge. The page is a warm, wood-and-greenery digital refuge — not a generic coffee template.

---

## 1. Stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** (v4 if available; v3.4 fine)
- **shadcn/ui** — use `Button` only where it earns its place; do NOT let shadcn defaults flatten the custom aesthetic. This is a marketing page, not a dashboard — most of it is bespoke sections.
- **Framer Motion** for scroll reveals + hero entrance
- `next/font/google` for fonts (Fraunces + Bricolage Grotesque)
- No backend, no DB. Static, single route (`app/page.tsx`), fully responsive 320px → 4K.

Install:
```bash
npx create-next-app@latest kape-kanlungan --typescript --tailwind --app --eslint
npx shadcn@latest init
npx shadcn@latest add button
npm i framer-motion
```

---

## 2. Design tokens (source of truth)

The look is **"nipa-hut refuge"** — derived from the real interior (wood slats, cane webbing, terracotta floor, golden cove lighting) and the logo (rolling-hills green, roasted-brown script). **Green is the lead accent, not terracotta** — this is the deliberate choice that keeps it off the generic cream+clay+serif AI default. Avoid the purple/coral of the seasonal posters entirely.

Put these in `globals.css` as CSS variables and mirror into `tailwind.config.ts`:

```css
:root {
  --bark:       #3E2A1E;  /* deep roasted brown — logo text, headings */
  --ink:        #2A2018;  /* body text */
  --green:      #556B2F;  /* lead accent — logo hills */
  --green-deep: #3B4A22;  /* dark green sections */
  --cream:      #F5EFE4;  /* page background — wall/paper */
  --cream-hi:   #FBF7EF;  /* raised surfaces */
  --amber:      #E8A54B;  /* cove lighting glow */
  --amber-soft: #F0C179;  /* amber on dark bg */
  --clay:       #B5643C;  /* terracotta — USE SPARINGLY, prices only */
  --line:       rgba(62,42,30,.14);
  --slat:       rgba(62,42,30,.06);
}
```

**Do not** introduce purple, coral, or Gen-Z blue into the core system — those live only in individual promo posters, not the brand.

---

## 3. Typography

| Role | Font | Usage |
|---|---|---|
| Display | **Fraunces** (opsz 9–144, wght 400–600, w/ italic) | All headings, prices, marquee. Use the *italic* for the emotional words ("shelter", "stay awhile"). |
| Body / UI | **Bricolage Grotesque** (opsz 10–48, wght 400–600) | Body, nav, labels, eyebrows, buttons |

```ts
import { Fraunces, Bricolage_Grotesque } from "next/font/google";
export const fraunces = Fraunces({ subsets:["latin"], variable:"--font-display", axes:["opsz"] });
export const bricolage = Bricolage_Grotesque({ subsets:["latin"], variable:"--font-body" });
```

- **Banned:** Inter, Roboto, Arial, system-ui as primary. (system-ui allowed only in the CSS fallback stack.)
- Headings: `letter-spacing:-.01em`, `line-height:1.02`.
- Eyebrows: Bricolage, `.72rem`, `letter-spacing:.28em`, uppercase, `--green`.

---

## 4. Signature element (the thing it's remembered by)

**Wood-slat vertical rhythm.** Thin repeating vertical lines echoing the counter cladding, fixed to the left/right page edges (`body::before/::after` with `repeating-linear-gradient`, ~34px wide desktop / 14px mobile). Plus the **cove-glow**: warm amber radial glows behind the hero and under the arched visuals, mimicking the interior's underlighting. Keep both subtle — they frame, they don't shout.

Spend boldness here and in the **arched hero visual** (the `border-radius: 280px 280px 26px 26px` shape that quotes the interior's lit arch niche). Everything else stays quiet and disciplined.

---

## 5. Page structure & content

Single route. Build each as a component in `components/sections/`.

### `<Nav />` (fixed)
- Left: logo mark (circle, amber→green radial) + "Kapé Kanlungan" in Fraunces.
- Right: Menu · Our Shelter · Visit · **Order Now** (pill button, `--bark` bg).
- On scroll >20px: add blur + bottom hairline (`--line`). Collapse text links on mobile, keep the CTA.

### `<Hero />`
- Eyebrow tag: `● Specialty Coffee · Sibalom, Antique`
- H1: **"Your daily *shelter* in every sip."** — italic on "shelter", 2nd line in `--green-deep`. Clamp `3.2rem → 6.6rem`.
- Lede (≤33ch): "A quiet refuge of wood, greenery, and slow afternoons — where every cup is brewed with care in the heart of Sibalom."
- Buttons: "Explore the menu →" (green-deep) + "Find us" (outline).
- Right: **arched niche card** — amber glow, a featured drink (₱115 Perfect Flat White), slat texture overlay. When you have real photography, drop the drink photo in here.
- Framer: stagger children up-fade on load (respect `prefers-reduced-motion`).

### Marquee strip
- `--bark` bg, Fraunces italic, infinite horizontal scroll. Items: V60 with Cinnamon · Native Breakfast · Matcha Blueberry Latte · Fruit Shakes · Signature Kanlungan Blends. Separate with an amber ✦. Pause animation under reduced-motion.

### `<Menu />`
- Band on `--cream-hi` with top/bottom hairlines.
- Head: eyebrow "The Menu" / h2 "Brewed slow, served warm." / sub about single-origin + native breakfasts.
- **3 category cards** (`01 Coffee` / `02 Frappe & Cold` / `03 Refresh & Eats`). Numbered markers are justified here — it's a real grouping. Each: number (green), title, sub (bean origins etc.), and a `<ul>` of items with dashed dividers and prices in Fraunces `--clay`.
- Hover: lift + green border + amber corner halo.
- Prices from the real menu board (verify against the shop's board — placeholder values below):

| Coffee | Frappe & Cold | Refresh & Eats |
|---|---|---|
| Perfect Flat White ₱115 | Strawberry Frappe ₱155 | Summer Blue Lemonade ₱120 |
| V60 with Cinnamon ₱130 | Matcha Blueberry Latte ₱175 | Strawberry Shake ₱150 |
| Kanlungan Signature ₱180 | Blueberry Latte ₱175 | Native Breakfast ₱170 |
| Espresso ₱90 | Oreo Frappe ₱145 | Coffee & Suman ₱140 |

> ⚠️ These prices are read/estimated from posters + the interior menu board. **Confirm every price and item with the owner before launch.**

### `<Shelter />` (story, asymmetric 2-col)
- Left: a **visual block** representing the window-bar interior — for the mockup it's a CSS composition (arched window, vine strip, amber light bar). Replace with a real interior photo (`next/image`) in production.
- Right: eyebrow "Kanlungan — a shelter" / h2 "More than coffee. A place to *stay awhile.*" / 2 short paragraphs on the refuge concept / pill row (Free-flowing greenery · Window bar seating · Warm cove lighting · Made with care).

### `<Visit />`
- Full-bleed `--green-deep` bg + faint slat overlay.
- Left: eyebrow / h2 "Find your *shelter* in Sibalom." / info list:
  - 📍 **District 1, Sibalom, Antique, 5713**
  - 📞 **0917 113 9844** (`tel:` link)
  - ☕ **@kapekanlungan**
  - "Get directions →" button (amber) → Google Maps query link.
- Right: **hours card** (glass panel) — "Open daily / **8:00 AM — 10:00 PM**" in Fraunces amber, with a friendly note.

### `<Footer />`
- `--bark` bg. Brand + tagline "Your daily shelter in every sip." | columns: Explore / Connect / Hours | bottom bar: © 2026 · Sibalom, Antique · 5713.

---

## 6. Motion

- Framer Motion `whileInView` up-fade (`y:24 → 0`, opacity, `0.7s`, `once:true`) on section blocks.
- Hero: staggered load.
- Marquee: pure CSS infinite; disable under `prefers-reduced-motion`.
- Card hovers: `translateY(-5px)` + shadow + border, `0.3s`.
- **Quality floor:** visible keyboard focus rings, `prefers-reduced-motion` respected everywhere, all interactive elements reachable by tab.

---

## 7. Real content TODO (before launch)

1. Swap CSS-composed visuals for real photos: hero drink, interior shot in `<Shelter />`. Use `next/image`, priority on hero.
2. Drop in the real logo asset (`/public/logo.jpg` → the nipa-hut mark). Replace the ☕ emoji marks.
3. Confirm the **full menu + exact prices** against the shop's menu board.
4. Real Facebook / Instagram / TikTok URLs (`@kapekanlungan`).
5. Exact Google Maps place link (replace the search query).
6. `metadata` in `layout.tsx`: title "Kapé Kanlungan — Specialty Coffee in Sibalom, Antique", description w/ the tagline, OG image, `lang="en"`.
7. Consider `hero` alt drinks rotation later.

---

## 8. Accessibility & correctness checklist

- [ ] All images have meaningful `alt`.
- [ ] Color contrast ≥ 4.5:1 for body text (cream/bark passes; verify amber-on-green for the hours card — darken amber or bump weight if needed).
- [ ] `tel:` link on phone number.
- [ ] Keyboard-navigable nav + visible focus.
- [ ] `prefers-reduced-motion` kills marquee + reveals.
- [ ] Semantic landmarks: `<nav> <header> <main> <section aria-labelledby> <footer>`.
- [ ] Lighthouse: aim 95+ across the board (it's static — no excuse not to).

---

## 9. What NOT to do

- Don't reach for the cream + terracotta + high-contrast-serif combo as the *whole* identity — that's the current AI-coffee-landing cliché. Green leads here.
- Don't pull the purple / coral / Gen-Z-blue from the promo posters into the site chrome.
- Don't center everything — the layout is intentionally asymmetric (hero split, story split, offset heads).
- Don't let shadcn's default radii/shadows override the token system.
- Don't add a hamburger mega-menu — it's a one-pager; anchor links + a persistent CTA are enough.
