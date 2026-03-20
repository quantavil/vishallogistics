# Vishal Logistics Solutions

Modern landing page and web platform for Vishal Logistics Solutions — an end-to-end logistics partner for Indian manufacturers and exporters. Provides customs clearance, freight forwarding, warehousing, and express delivery services.

Built with **Astro** & **Tailwind CSS v4**.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   bun install
   ```
2. **Start the development server**
   ```bash
   bun run dev
   ```
3. **Build for production**
   ```bash
   bun run build
   ```

## 🛠️ Tech Stack & Structure

- **Astro v5+**: Fast, content-focused web framework with minimal to zero client-side JS overhead.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid and precise styling.

```text
/
├── public/                 # Static assets (favicons, generic non-processed images)
├── src/
│   ├── components/         # Reusable UI components (Header, Hero, Services, Footer)
│   ├── layouts/            # Page layouts (`Layout.astro` standard base wrapper)
│   ├── pages/              # Astro routing (index, services, contact)
│   └── styles/             # Global CSS and Tailwind directives
├── astro.config.mjs        # Astro configuration & integrations
├── tailwind.config.mjs     # Tailwind Configuration
└── package.json            # Project Manifest
```

## 🎨 Features & Implementation Notes

- Seamless Page Transitions via Astro's `ClientRouter`.
- Micro-interactions via Tailwind classes (`group-hover`, `delay-*`, transformations).
- `[data-reveal]` scroll animations via native `IntersectionObserver` in Astro's global lifecycle hooks.
- Mobile-responsive navigation and drawers natively baked in.

## 📄 License & Deployment

This project's static assets can be deployed to any static site host out of the box (Vercel, Netlify, Cloudflare Pages, GitHub Pages) without additional SSR node adapters. Just set the build command to `bun run build` and publish the `dist/` directory.
