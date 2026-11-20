# Tian Shi · link-in-bio resource hub

A fast, static personal site that replaces Linktree. Built with [Astro](https://astro.build), plain CSS, and hosted for free on Cloudflare Pages.

| Page | What it is |
| --- | --- |
| `/` | Hero, featured freebie, filterable resource list, email signup, socials |
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

## How to add a new freebie

1. **Add a thumbnail** to `public/thumbs/` (a square SVG, PNG, or WebP, about 200×200).
2. **Add an entry** to `src/data/resources.json` (copy an existing one and change the fields; see below).
3. **Commit and push.** Cloudflare Pages rebuilds and the site is live in about a minute.

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
| `cfAnalyticsToken` | Cloudflare Web Analytics token (see below) |
| `socials` | Instagram, TikTok, YouTube links |

Also update `site` in `astro.config.mjs` to your real domain once it's connected, and replace `public/og-image.png` (1200×630) if you want a custom share image.

**Email providers:** for Kit, create a form, choose "HTML" embed, and copy the `action="…"` URL. Beehiiv's free plan mostly offers iframe embeds; if you choose Beehiiv, swap the form in `src/components/EmailSignup.astro` for their embed snippet. The hidden `interest` field (e.g. `ikigai`) can become a tag in Kit.

## Deploy: GitHub → Cloudflare Pages

### 1. Push to GitHub

1. Go to https://github.com/new, name the repo (e.g. `tian-link-hub`), keep it empty (no README or .gitignore), and click **Create repository**.
2. In this folder:

```bash
git add -A
git commit -m "v1"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tian-link-hub.git
git push -u origin main
```

### 2. Connect Cloudflare Pages

1. Sign in at https://dash.cloudflare.com (a free account is fine).
2. Go to **Workers & Pages → Create → Pages → Connect to Git** (Import an existing Git repository).
3. Authorize GitHub and pick the `tian-link-hub` repo.
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `24`
5. Click **Save and Deploy**. In about a minute you'll get a `your-project.pages.dev` URL.

From then on, every push to `main` redeploys automatically, and other branches get preview URLs.

### 3. Custom domain (optional)

In your Pages project: **Custom domains → Set up a domain**. If the domain is on Cloudflare, it configures itself. Then update `site` in `astro.config.mjs` and push.

### 4. Web Analytics

In the Cloudflare dashboard, go to **Analytics & Logs → Web Analytics → Add a site**, enter your domain, and copy the token from the snippet it shows (the value after `"token":`). Paste it into `cfAnalyticsToken` in `src/site.config.ts` and push. The script only loads in production builds. (Alternatively, Pages projects can enable Web Analytics with one click under the project's **Metrics** tab, in which case you can leave the token as a placeholder.)

### 5. Swap your bio link

Replace linktr.ee/tianmaxxing in your Instagram and TikTok bios with the new URL.

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
public/                   ← images, favicon, og-image, Cloudflare _headers
```

Design tokens live at the top of `src/styles/global.css`. All color pairs meet WCAG AA.
