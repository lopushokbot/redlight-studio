# Red Light — Studio Landing Page

Landing page for Sema's red light pilates startup **Red Light** (Moscow). The first pilates studio in Russia using Red Light therapy (LED mats). Purpose: destination page for ad traffic.

## Facts

- **Brand**: Red Light, neon "RL" logo (red neon on black) — `img/logo.jpg` (source: Mac mini Desktop)
- **Instagram**: https://www.instagram.com/redlightmsk (185 followers)
- **Telegram**: https://t.me/redlightmsk ("Red light" channel; secondary booking path)
- **Location**: trainings at «Место быть», Мясницкая улица 24/7с1, Москва (Чистые пруды) — map: https://yandex.ru/maps/-/CPcUm65t (org id `119053995261`, coords `37.635179,55.762693`)
- **Format**: 55-min group pilates on red-LED mats, small groups
- **Language**: Russian (site content)

## Design (v5 — 2026-08-05, per Sema's new design doc)

- Editorial dark style: near-black `#0a0505` base, scarlet accent (`#e7263a` / bright `#ff3b4e`), dotted-LED divider motif (`.dot-rule`), beige `.theme-light` scope wraps method+team+FAQ sections
- Fonts: **Fraunces** (serif headings) + **Manrope** (body) + **IBM Plex Mono** (eyebrows/UI chrome), loaded via Google Fonts CDN (not self-hosted — differs from v3/v4's bundled Tenor Sans)
- Header: fixed blurred header, circular logo mark + wordmark, underline-hover nav, burger → `.nav-mobile` dropdown panel (mobile <900px)
- Photos are the ones from Sema's new design doc (extracted from embedded base64 → real files, NOT re-encoded as base64 in HTML): hero = `img/hero-v2.jpg`, how-section = `img/process-v2.jpg`, photo-break = `img/recovery-v2.jpg`. Logo stays `img/logo.jpg` (neon RL). OG image (`img/og.jpg`) re-cropped from `hero-v2.jpg`. Older `img/training.jpg`, `room.jpg`, `lounge.jpg` are unused leftovers from v4, kept on disk.
- Prices updated per new design doc: 2 800 ₽ single / 10 240 ₽ (4×2 560) / 18 560 ₽ (8×2 320) — replaces older estimates
- Contacts map: **real embedded Yandex Maps iframe** (`map-widget/v1`, centered on resolved org coordinates), not a decorative placeholder — replaces the old fake SVG map + link-out
- Animations: hover-lift on buttons/price cards, card icon scale on hover, nav underline sweep, slow image zoom on hero/process photos, scroll-triggered fade-in (`.reveal` + IntersectionObserver in `site.js`), breathing hero glow
- **Gotcha**: "Red Light" as plain two-word text with a normal space caused the word "Red" to vanish when it landed at a line-wrap boundary next to Cyrillic text (reproduced in headless Chrome, both v1 and v2 old headless modes, not a font-load race). Fix: always write it as `Red&nbsp;Light` in body copy/headings (matches old site's convention). Meta tags/JSON-LD don't need it (not visually wrapped, and `&nbsp;` isn't decoded inside `<script type="application/ld+json">`).

## Structure

Static, no build step:
- `index.html` — hero, method (theme-light), how it works, prices, photo break, team+FAQ (theme-light), booking form (#booking), contacts+map
- `schedule.html` — separate schedule page (per Sema) with schedule rows + same booking form
- `site.js` — shared: burger menu, reveal animations, form AJAX
- `styles.css`, `fonts/` (unused since v5, kept on disk), `img/`

## Booking form

Full on-site form (not Telegram) → **FormSubmit.co AJAX** → emails to simon.sivakov@icloud.com. Fields: имя, телефон, слот (select), комментарий; honeypot `_honey`. **First submission triggers a FormSubmit activation email — Sema must click "Activate" once**, otherwise заявки не доставляются (test submission sent 2026-08-04). Telegram remains as fallback link.

## Status

- **DEPLOYED** (Sema approved 2026-08-04): GitHub `lopushokbot/redlight-studio` → **https://lopushokbot.github.io/redlight-studio/** (Pages from `main` branch, root). Deploy = commit + `git push`.
- Local preview: `python3 -m http.server 8734` from this folder → http://localhost:8734/
- If a custom domain appears later: update canonical/OG URLs, sitemap.xml, robots.txt.

## Data that needs Sema's confirmation

- **Prices** (2 800 ₽ / 4×10 240 ₽ / 8×18 560 ₽) — from Sema's v5 design doc, still worth a final confirmation
- **Schedule** (Чт 15:30, Вс 17:00) — from IG posts of May 2026, may be stale
- **Team section** — collective description (no names/photos yet)
