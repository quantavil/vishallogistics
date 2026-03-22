# Vishal Logistics — Deployment & Email Plan

## Current Setup

| Item | Provider | Details |
|---|---|---|
| **Domain** | Hostinger | `vishallogistics.in` — 1yr plan, ~15 months until release |
| **Old Website** | Hostinger | Static site in `public_html` |
| **Email** | Hostinger | `info@vishallogistics.in` — via Hostinger MX records |
| **DNS** | Cloudflare | Nameservers already on Cloudflare |
| **New Website** | Cloudflare Pages | Astro site at `vishallogistics.iyzi.workers.dev` |
| **Primary Email** | Gmail | `vishallogistics22@gmail.com` |

---

## Phase 1 — Now (Deploy New Site + Fix Email)

### Contact Form (Web3Forms)
- [x] Replace Cloudflare Email Workers (`SEB`) with Web3Forms
- [x] Add Web3Forms access key to `contact.astro`
- [x] AJAX submission with loading spinner + inline status messages
- [x] Delete `src/pages/api/contact.ts`
- [x] Remove `SEB` binding + `DESTINATION_EMAIL` from `wrangler.jsonc`
- [x] Remove `SEB` binding from Cloudflare Pages dashboard (Settings → Bindings)
- [x] Deploy and test — submit form, verify email arrives at Gmail

### Email References
- [x] Update `contact.astro` — display `vishallogistics22@gmail.com`
- [x] Update `Footer.astro` — display `vishallogistics22@gmail.com`

### Upload New Website to Hostinger
- [x] Build the Astro site locally: `bun run build`
- [x] Go to Hostinger File Manager → `public_html`
- [x] **Backup**: Download or rename current `public_html` contents (keep as backup)
- [x] **Delete** current files inside `public_html` (old site)
- [x] Upload contents of `dist/client/` into `public_html`
  - This includes all static HTML, CSS, JS, images, etc.
- [x] Verify `vishallogistics.in` loads the new website

> **⚠️ Important:** Since the Astro site is SSR (Cloudflare adapter), only the **static/prerendered pages** will work on Hostinger. The contact form uses Web3Forms (client-side AJAX), so it works everywhere. If any pages use server-side rendering, they won't work on Hostinger — only on Cloudflare Pages.

### Keep Both Deployments Running
- [x] Cloudflare Pages: `vishallogistics.iyzi.workers.dev` (full SSR support)
- [x] Hostinger: `vishallogistics.in` (static pages only)

---

## Phase 2 — When Hostinger Expires (~15 Months)

### Transfer Domain
- [ ] Transfer or re-register `vishallogistics.in` on Cloudflare Registrar (~₹600-800/yr)

### Point Domain to Cloudflare Pages
- [ ] Add `vishallogistics.in` as custom domain in Cloudflare Pages settings
- [ ] Cloudflare auto-creates DNS records

### Enable Cloudflare Email Routing
- [ ] Cloudflare Dashboard → `vishallogistics.in` → Email → Email Routing
- [ ] Delete Hostinger MX + SPF records
- [ ] Add Cloudflare MX + SPF + DKIM records
- [ ] Create route: `info@vishallogistics.in` → `vishallogistics22@gmail.com`
- [ ] Add catch-all: `*@vishallogistics.in` → `vishallogistics22@gmail.com`
- [ ] Verify destination email in Gmail

### (Optional) Restore Domain Email on Website
- [ ] Update `contact.astro` + `Footer.astro` back to `info@vishallogistics.in`
- [ ] Optionally re-enable Cloudflare Email Workers for branded sending

---

## Timeline

```
NOW                              ~15 MONTHS               DONE
 │                                   │                      │
 ├─ Upload new site to Hostinger ────┤                      │
 ├─ Web3Forms for contact form ──────┼──────────────────────┤
 ├─ CF Pages at workers.dev ─────────┤                      │
 ├─ Hostinger email active ──────────┤                      │
 │                                   ├─ Transfer domain ────┤
 │                                   ├─ Enable Email Routing┤
 │                                   ├─ Point .in to CF ────┤
 │                                   └─ Old hosting retired ┘
```
