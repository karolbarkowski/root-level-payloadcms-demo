# Root Level Design System

A design system for **Root Level** — a high-end, editorial furniture, lighting, and home decor brand. Twenty years of hand craftsmanship; quiet luxury; the product is the hero, not the interface.

## Sources

This system was built from a single design-guidelines document found in a linked repository — no component code, screenshots, or Figma file was available:

- **GitHub — [karolbarkowski/root-level-payloadcms-demo](https://github.com/karolbarkowski/root-level-payloadcms-demo)**, specifically `design-system/design-system.md`. The repo itself is a PayloadCMS demo project; at the time this system was built, only the design-guidelines markdown file was populated (no application code, styles, or components existed to read). If you have access to this repo, revisit it — a build-out of the actual site frontend would let a future pass replace the invented components/UI kit below with pixel-accurate recreations of real screens.

Because no component inventory, Figma library, or codebase existed to enumerate, this system authors a **standard component set** sized to the brand's stated needs (see "Components" below), and a **from-scratch UI kit** for the one product implied by the source — a furniture/decor marketing website — built strictly to the visual rules the guidelines document specifies (colors, type, spacing, motion, component anatomy).

No logo file was provided anywhere in the source. Wherever a mark would go, the wordmark "Root Level" is set in plain type (Fraunces). Do not draw or infer a logo — see the "Brand" cards for the current wordmark treatment, and replace it the moment a real logo is available.

## Components

Standard set, grouped by concern:

- **core/**: `Button`, `IconButton`, `Badge`, `Tag`, `Card`, `ProductCard`
- **forms/**: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **navigation/**: `Tabs`
- **feedback/**: `Toast`, `Tooltip`
- **overlay/**: `Dialog`

### Intentional additions
- **`ProductCard`** — not named in the source doc's component list, but the doc explicitly describes this exact anatomy (image on white ground / serif name / grey dimensions caption / lighter SKU line) under its "Product Cards" section. Built as its own primitive since it's the single most-repeated unit on the site.
- **`Tag`** vs **`Badge`** — split into two: `Badge` is a static status pill (NEW, Limited), `Tag` is an interactive filter/category toggle (used above product grids). The source doc only describes the static case; `Tag` was added because collection filtering is a near-universal need for this kind of site.

## UI Kit

`ui_kits/website/` — a click-through recreation of the marketing site: **Home → Collection (filterable grid) → Product Detail**. This is the one product implied by the source (a furniture/decor e-commerce marketing site); there is no separate app, dashboard, or docs surface to cover. Product photography is represented with warm gradient placeholders (no real imagery was provided) — swap these for real photography before shipping anything built from this kit.

## Index

- `styles.css` — root stylesheet; imports everything below.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/effects.css`, `tokens/fonts.css` — design tokens.
- `components/core/`, `components/forms/`, `components/navigation/`, `components/feedback/`, `components/overlay/` — the component library above, each with `.jsx` + `.d.ts` + `.prompt.md` + one `@dsCard` HTML per directory.
- `guidelines/` — 12 foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- `ui_kits/website/` — the marketing-website click-through.
- `SKILL.md` — portable skill file for use in Claude Code or other agent environments.

## Content Fundamentals

**Tone:** Confident, understated, editorial — gallery-like. The copy never oversells; it describes. Declarative sentences over hype ("A Heritage of Distinction," "Design, Delivered," "Inspiration Lives Here").

**Casing:** Sentence case for body copy. Title Case or UPPERCASE with wide letter-tracking (0.08–0.14em) for labels, eyebrows, nav items, and buttons — e.g. "SHIPS FREE", "SHOP BY CATEGORY".

**Person:** Mostly impersonal/third-person for product copy (spec-driven: name, dimensions, SKU). Occasional second-person ("Design, Delivered" implies a relationship with "you") but never chatty or first-person-plural marketing voice ("we think you'll love...").

**Product copy is factual and spare** — name, dimensions, SKU. No hard-sell language, no exclamation points, no urgency copy ("Only 2 left!").

**Emoji:** Never. This is a quiet-luxury brand; emoji would undercut the editorial tone entirely.

**Vibe:** Refined, timeless, curated, heritage, handcrafted, elevated. Every sentence should read like it belongs in a gallery placard, not a pop-up ad.

## Visual Foundations

**Colors:** Near-monochrome — 90% neutral (warm off-white `#F7F5F1`, ivory `#EFEBE3`, near-black ink `#191714`, pure white product grounds), 10% muted brass `#9C7A45` as the *only* color accent (hover states, dividers, NEW tags). Espresso `#3A2E26` is reserved for the footer and rare dark sections. Never pure black. No saturated hues anywhere.

**Type:** Serif/sans pairing. **Fraunces** (display serif, moderate contrast, soft/optionally "wonky" details) for H1–H3, collection titles, and hero headlines — set large (48–64px), title case, generous line-height. **Inter** (clean grotesk) for everything else — nav, buttons, body, captions. Micro-labels (SKU, price, tags) are Inter, uppercase, tracked 0.08em+, small (11–12px).

**Spacing:** Very generous. Section padding 80–120px vertical. Product-grid gaps are tight by contrast (8–16px) — the tension between tight grids and huge section breathing room is a deliberate rhythm.

**Backgrounds:** No patterns, no textures, no gradients as decoration (gradients used here only as photography *placeholders*, never as a real design element). Full-bleed photography for hero and category banners, warm and editorial — not stock-bright. Product-only shots sit on pure white or warm-grey seamless grounds. Occasional black-and-white/desaturated imagery for "heritage" storytelling moments.

**Animation:** Subtle, slow, deliberate. 300ms ease-in-out fades and opacity/color transitions only. No bounce, no spring, no scale-pop. Scroll-reveal fades are acceptable; nothing playful.

**Hover states:** Ink buttons darken to espresso. Secondary (outline) buttons fill to ink with inverted text. Ghost/text links shift to brass. Icons go ink→brass. All via slow color/opacity transitions, never instant snaps.

**Press states:** No shrink/scale-down feedback observed or specified in the source — treat press as identical to hover (this system does not add a bespoke press animation since none was described; flag if the brand wants one).

**Borders:** Hairline only (`1px solid #DCD7CD`). Never heavy or decorative. Dividers, input underlines, and product-grid separators all use the same hairline weight.

**Shadows:** Essentially none on cards or content surfaces — separation is via whitespace, not elevation. The one exception is modal/overlay surfaces, which get a soft, warm-toned shadow to lift them off the page.

**Corner radii:** Sharp — 0–2px everywhere (buttons, inputs, cards). The only rounded shapes are pills (tag filters, the switch track) and radio buttons/dots, which stay circular by UI convention.

**Transparency & blur:** Used only for the modal scrim (a warmed semi-transparent espresso overlay, `rgba(25,23,20,0.45)`) — no other blur/glass effects anywhere in the system.

**Imagery color vibe:** Warm, matte, softly lit — think warm wood, brass, stone, natural light. Never punchy/saturated stock-photo brightness. Occasional deliberate black-and-white for heritage sections.

**Layout rules:** Wide, generous gutters; content capped at ~1440px; product grids run 3–5 columns desktop, 2 mobile. Utility bar (shipping/phone) sits above the main nav, in dark or brass-on-ivory. Footer is always dark (espresso), multi-column, uppercase link headers.

## Iconography

The source doc specifies **thin-line, minimal, 1px-stroke icons — no fill, monochrome (ink, brass on hover)** for search/cart/account/phone. No icon font, SVG sprite, or icon library ships with the source repo (it contains only the markdown guidelines file, no application code).

**No icon assets were available to copy.** This system does not substitute a generic icon library, in keeping with the "never draw/generate icons" rule — utility nav in the UI kit currently uses text labels ("Search" / "Account" / "Cart") as a stand-in. **Recommendation:** if/when the real codebase becomes readable, pull its icon set directly; until then, a close CDN match would be a thin-line, no-fill set like Lucide or Feather (same 1px stroke weight as specified) — flagged here rather than added speculatively.

Emoji: never used (see Content Fundamentals). Unicode glyphs: not used in the source spec.

## Fonts — substitution note

The source doc itself recommends open-source stand-ins rather than naming a licensed proprietary typeface, so **Fraunces** (display) and **Inter** (body/UI) are not a fallback substitution — they're what the brand guidelines call for. Both are loaded from Google Fonts CDN (`tokens/fonts.css`) since no local font binaries exist in the source repo. If the real brand uses a licensed serif (Canela, Domaine, etc.) in production, swap `--font-serif-display` accordingly.
