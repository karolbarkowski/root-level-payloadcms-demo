# Payload CMS — Demo Website Design System

_Reference for Claude Design_

## 1. Brand Essence

- **Positioning:** High-end, editorial luxury lighting/furniture/decor brand ("20 years," "meticulous craftsmanship")
- **Tone:** Confident, understated, gallery-like. Product is the hero — the UI recedes.
- **Feel:** Quiet luxury. Generous whitespace, large full-bleed photography, minimal chrome, restrained copy.
- **Keywords:** refined, timeless, curated, heritage, editorial, handcrafted, elevated

## 2. Color Palette

Website relies on a near-monochrome neutral base so photography (warm woods, brass, stone, matte black metals) carries the color.

| Role                  | Color              | Hex (approx) | Usage                                       |
| --------------------- | ------------------ | ------------ | ------------------------------------------- |
| Primary background    | Warm off-white     | `#F7F5F1`    | Page background, cards                      |
| Secondary background  | Ivory / bone       | `#EFEBE3`    | Section alternation, banners                |
| Ink / primary text    | Near-black         | `#191714`    | Headlines, nav, body copy                   |
| Secondary text        | Warm charcoal grey | `#5C5750`    | Captions, meta info (SKU, dimensions)       |
| Accent — brass/bronze | Muted brass        | `#9C7A45`    | Hover states, dividers, "NEW" tags, icons   |
| Accent — deep neutral | Espresso brown     | `#3A2E26`    | Footer background, dark sections            |
| Line / border         | Hairline grey      | `#DCD7CD`    | Dividers, input borders, product grid lines |
| Surface white         | Pure white         | `#FFFFFF`    | Product image backgrounds                   |

**Rule of thumb:** 90% neutral (ivory/black/white), 10% brass as the only "color" accent. No saturated hues. Avoid pure black (`#000`) — always warm it slightly.

## 3. Typography

Website pairs an elegant high-contrast serif for display/headlines with a clean geometric/grotesk sans for UI and body — a common premium-furniture pattern. Below are open-source type faces for use in Claude Design.

| Role                            | Style                                                  | Suggested Google Font                                             | Notes                                                                                   |
| ------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Display / H1–H2                 | Elegant serif, moderate contrast, slightly condensed   | **"Fraunces"** (or "Canela"-style: "Domine", "Cormorant")         | Used for hero headlines, collection titles — set in title case, generous letter-spacing |
| Section headings / H3–H4        | Same serif, smaller, sometimes uppercase with tracking | **Fraunces** or **Cormorant Garamond**                            | e.g. "Shop by Category", "Explore the Collection"                                       |
| Body / UI text                  | Clean, neutral sans-serif                              | **"Inter"** or **"Neue Montreal"-style: "Söhne"→ "General Sans"** | Product names, navigation, buttons                                                      |
| Micro/labels (SKU, price, tags) | Sans, uppercase, wide tracking, small size             | **Inter** (uppercase, letter-spacing 0.08em)                      | "NEW", "Ships Free\*", dimensions                                                       |

**Type scale (px, desktop):**

- H1: 48–64 / serif / line-height 1.1
- H2: 32–40 / serif
- H3: 22–26 / serif or sans-medium
- Body: 15–16 / sans / line-height 1.6
- Caption/meta: 11–12 / sans / uppercase / tracked

## 4. Layout & Spacing

- **Grid:** Wide, generous gutters; product grids typically 3–5 columns desktop, 2 mobile.
- **Whitespace:** Large — sections separated by big vertical padding (80–120px desktop).
- **Imagery ratio:** Product shots on white/neutral ground, mostly square (1:1) or portrait (4:5).
- **Full-bleed banners:** Hero and category banners run edge-to-edge, minimal text overlay, bottom-left or center-left aligned caption block.
- **Grid gaps:** Tight (8–16px) between product tiles; wide (60px+) between major sections.

## 5. Components

**Buttons**

- Primary: black/ink background, off-white text, no radius (sharp corners) or 2px max, uppercase small text, wide tracking, generous horizontal padding (32px+)
- Secondary: outline (1px hairline), transparent bg, ink text, fills on hover
- Hover state: subtle brass underline or fill shift, no bouncy animation — slow, ~300ms ease transitions

**Navigation**

- Thin top utility bar (phone, shipping promo) in dark or brass-on-ivory
- Main nav: minimal, uppercase, wide letter-spacing, generous spacing between items, centered or left logo / right icons (search, account, cart)

**Product Cards**

- Image on neutral/white background, generous padding
- Below image: small "NEW" tag (brass or black pill/text), product name (serif or medium sans), dimensions in small grey caption, SKU in smaller/lighter text
- No heavy borders or shadows — separation via whitespace only

**Section Headers**

- Small serif or tracked-uppercase eyebrow ("A Heritage of Distinction") over a larger serif headline
- Centered, short line-length body copy beneath (1–3 sentences max)

**Forms/Inputs**

- Underline-style or hairline-bordered inputs, no rounded pill shapes
- Labels uppercase, small, tracked

**Footer**

- Dark (espresso/near-black) background, ivory text, multi-column link lists, uppercase column headers with brass or grey subdued styling

## 6. Imagery Style

- Editorial, softly lit interior photography — warm neutral rooms, natural light, styled vignettes
- Product-only shots on pure white or warm-grey seamless background
- Occasional black-and-white or desaturated lifestyle imagery for "heritage" storytelling sections
- No stock-photo brightness/saturation — everything warm, matte, slightly muted

## 7. Iconography

- Thin-line, minimal icons (search, cart, account, phone) — 1px stroke weight, no fill, monochrome (ink or brass on hover)

## 8. Motion

- Subtle, slow fades/opacity transitions on hover and scroll-reveal
- No playful bounce/spring easing — everything calm and deliberate

## 9. Voice & Microcopy

- Understated, declarative, editorial: "A Heritage of Distinction," "Design, Delivered," "Inspiration Lives Here"
- Sentence case for body, Title Case or UPPERCASE tracked for labels/eyebrows
- Product copy is factual and spare: name, dimensions, SKU — no hard-sell language

---

### Quick-reference token block (for Claude Design)

```
colors:
  background: "#F7F5F1"
  backgroundAlt: "#EFEBE3"
  surface: "#FFFFFF"
  ink: "#191714"
  textSecondary: "#5C5750"
  accentBrass: "#9C7A45"
  dark: "#3A2E26"
  border: "#DCD7CD"

fonts:
  display: "Fraunces, serif"
  body: "Inter, sans-serif"

radius: "0px–2px (sharp, minimal)"
buttonStyle: "uppercase, tracked, no radius, slow hover transitions"
spacing: "generous (80–120px section padding)"
imageStyle: "warm, editorial, neutral-background product shots"
```
