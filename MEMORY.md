# MEMORY.md

# Project: Vishal Logistics Solutions

## Overview
Modern landing page and web platform for Vishal Logistics Solutions, an end-to-end logistics partner. Built using Astro v5+ and Tailwind CSS v4. The project is currently deployed on Cloudflare Pages (SSR) and Hostinger (Static).

## Structure
src/
├── components/          # Reusable UI components
│   ├── animations/      # Animation utilities/components
│   ├── icons/           # SVG icons
│   ├── CTA.astro        # Call to Action block
│   ├── Footer.astro     # Global footer
│   ├── Header.astro     # Global header & navigation
│   ├── Hero.astro       # Landing hero section
│   ├── Marquee.astro    # Infinite scrolling marquee
│   ├── NetworkWave3D.astro # 3D background effect
│   ├── ServicesOverview.astro # Service summary
│   ├── Stats.astro      # Company statistics
│   ├── Testimonials.astro # Client reviews
│   ├── TrustedBy.astro  # Client logos
│   ├── WhatsAppFloat.astro # Floating WhatsApp button
│   └── WhyUs.astro      # Value proposition section
├── layouts/             
│   └── Layout.astro     # Base HTML wrapper & head tags
├── pages/               # Astro file-based routing
│   ├── api/             # API endpoints
│   ├── 404.astro        # Error page
│   ├── contact.astro    # Contact form & info
│   ├── index.astro      # Main landing page
│   ├── privacy.astro    # Privacy policy
│   └── services.astro   # Detailed services page
├── styles/              
│   └── global.css       # Utilities & Tailwind directives
└── env.d.ts             # TypeScript definitions
public/                  # Static un-processed assets
├── images/              
│   └── services/        # Service-related imagery
├── favicon.svg          # Site favicon
└── robots.txt           # SEO rules

## Conventions
- Uses Tailwind CSS v4 for styling.
- Client-side routing via Astro's `ClientRouter`.
- Micro-interactions via Tailwind classes (`group-hover`, `delay-*`).
- Scroll animations using native `IntersectionObserver` with `[data-reveal]`.

## Dependencies & Setup
- `bun install` for package management.
- `bun run dev` for development server.
- Uses `@astrojs/cloudflare` adapter for Cloudflare Pages deployment.
- Contact form submissions are handled via Web3Forms (no backend API required).

## Critical Information
- Since the Astro site uses a Cloudflare adapter for SSR, only static/prerendered pages will work on Hostinger. The contact form works via Web3Forms (client-side AJAX), so it operates smoothly on both.
- Email routing is planned to migrate to Cloudflare when Hostinger expires.

## Insights
- Ensure new features degrading gracefully to static functionality if intended for Hostinger deployment.

## Blunders
- None recorded yet.
