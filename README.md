# Tian Shi · portfolio, lab and link-in-bio

One fast, static site for design work, side projects and the link-in-bio. Built with [Astro](https://astro.build) and plain CSS, hosted on Vercel at tianproductdesign.com.

| Page | What it is |
| --- | --- |
| `/` | Portfolio: hero, case studies, Lab (side projects), About, contact |
| `/work/…` | One page per case study, generated from `src/data/work.ts` |
| `/links` | Link-in-bio: featured freebie, filterable resource list, email signup, socials |
| `/spend` | Landing page for the Spend dashboard |
| `/ikigai` | Coming soon + notify signup |
| `/odyssey` | Coming soon + notify signup |
| `/coaching` | Intro + Calendly embed. Not linked anywhere and hidden from search |

## Run it locally

You need Node.js 22.23 or newer (`node -v` to check).

```bash
npm install
npm run dev
```

Open http://localhost:4321. Edits reload instantly. To test on your phone over the same Wi‑Fi, run `npm run dev -- --host` and open the "Network" URL it prints.

`npm run build` creates the production site in `dist/`. `npm run preview` serves that build.

## How to add a case study

1. Put the original images in `raw-import/<slug>/` (PNG or JPG; long Figma exports are fine, they get sliced into panels).
2. Run `node scripts/process-images.mjs`. It writes WebP files to `public/work/` and their sizes to `src/data/images.json`.
3. Add an entry to `src/data/work.ts` (copy an existing one). Order in that file = order on the homepage.

## How to add a new freebie

1. **Add a thumbnail** to `public/thumbs/` (a square SVG, PNG, or WebP, about 200×200).
2. **Add an entry** to `src/data/resources.json` (copy an existing one and change the fields; see below).
3. **Commit and push.** Vercel rebuilds and the site is live in about a minute.

To make it the big card at the top (for your latest reel), set `"featured": true` on it and `false` on the old one.

If you need a new on-site page (like `/spend`), copy `src/pages/spend.astro` to `src/pages/your-slug.astro` and edit the text.

### Resource fields

```json
{
  "id": "spend",                       // unique, lowercase, no spaces
  "title": "Spend dashboard",
  "subtitle": "See where your money actually goes, in 5 minutes",  // the benefit, not the feature
  "tag": "Money",                      // "Money" | "Life Design" | "Travel"
  "status": "live",                    // "live" | "coming-soon" (shown but not clickable)
  "type": "page",                      // "page" (on this site) | "external" (another site)
  "slug": "spend",                     // for type "page": the URL path, e.g. /spend
  "url": "https://…",                  // for type "external": the full link
  "thumbnail": "/thumbs/spend.svg",
  "featured": true                     // only one item should be true
}
```

(JSON doesn't allow comments; they're only here to explain.) The build checks this file, so a typo or missing field stops the deploy with a clear message instead of shipping a broken card.

## Settings you'll swap later

All in `src/site.config.ts`:

| Setting | What to put there |
| --- | --- |
| `photo` | Add `public/tian.jpg` (square), set to `'/tian.jpg'` |
| `emailFormAction` | Your Kit or Beehiiv form URL. Until set, the signup shows "Signups open very soon" and sends nothing |
| `emailFieldName` | `email_address` for Kit, `email` for Beehiiv |
| `calendlyUrl` | Your Calendly event link for `/coaching` |
| `cfAnalyticsToken` | Optional Cloudflare Web Analytics token (works on any host; free at dash.cloudflare.com → Web Analytics) |
| `socials` | Instagram, TikTok, YouTube links |

Also update `site` in `astro.config.mjs` to your real domain once it's connected, and replace `public/og-image.png` (1200×630) if you want a custom share image.

**Email providers:** for Kit, create a form, choose "HTML" embed, and copy the `action="…"` URL. Beehiiv's free plan mostly offers iframe embeds; if you choose Beehiiv, swap the form in `src/components/EmailSignup.astro` for their embed snippet. The hidden `interest` field (e.g. `ikigai`) can become a tag in Kit.

## Deploy: GitHub → Vercel

The site is a Vercel project connected to `github.com/tshivision/Personal-Website`. **Every push to `main` redeploys automatically** (about a minute); other branches get preview URLs. Settings live in `vercel.json`, which also redirects the old UXfolio case study links (`/p/…`) to their new pages.

### Domain

`tianproductdesign.com` is registered at GoDaddy and points at Vercel through two DNS records (GoDaddy → My Products → Domain → DNS):

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `216.198.79.1` |
| A | `@` | `64.29.17.1` |
| CNAME | `www` | `ae59b0ea892b610a.vercel-dns-017.com` |

`www.tianproductdesign.com` redirects to `tianproductdesign.com`. HTTPS certificates are issued by Vercel automatically.

If Vercel ever shows different values under Project → Settings → Domains, use those.

### Swap your bio link

Point your Instagram and TikTok bios at `tianproductdesign.com/links`.

## Project structure

```
src/
  data/resources.json     ← the only file you edit to add freebies
  site.config.ts          ← name, links, email, Calendly, analytics
  lib/resources.ts        ← reads and validates resources.json
  layouts/Base.astro      ← <head>, meta/Open Graph, analytics, footer
  components/             ← Hero, FeaturedCard, ResourceGrid, ResourceCard, EmailSignup, ComingSoon, Footer
  pages/                  ← one file per URL
  styles/global.css       ← colors, type, buttons (Direction A: Field notes)
public/                   ← images, favicon, og-image, resume.pdf, work/ (case study images)
```

Design tokens live at the top of `src/styles/global.css`. All color pairs meet WCAG AA.
