# Red Light — Studio Landing Page

Landing page for Sema's red light pilates startup **Red Light** (Moscow). The first pilates studio in Russia using Red Light therapy (LED mats). Purpose: destination page for ad traffic.

## Facts

- **Brand**: Red Light, neon "RL" logo (red neon on black) — `img/logo.jpg` (source: Mac mini Desktop)
- **Instagram**: https://www.instagram.com/redlightmsk (185 followers)
- **Telegram**: https://t.me/redlightmsk ("Red light" channel; secondary booking path)
- **Location**: trainings at «Место be», Мясницкая улица 24/7с1, Москва (Чистые пруды) — map: https://yandex.ru/maps/-/CPcUm65t
- **Format**: 55-min group pilates on red-LED mats, small groups
- **Language**: Russian (site content)

## Design (v3 — 2026-08-04, per Sema's revisions)

- Layout: **reformathletica.com** minimalism — thin lines, uppercase headings, airy spacing
- Colors: **v1 gamma** (Sema asked to return it) — black `#0b0808` hero/header/contacts/footer, neon red `#ff2b2b` accent, crimson `#a4131f` + gradient section, cream/beige `#f7f1e6`/`#f2e9da`, gold `#d8a35c`
- Fonts (as on reformathletica): **Tenor Sans** (headings, uppercase, bundled cyr+lat woff2 in `fonts/`) + Helvetica Neue light body (Onest bundled as fallback). Cormorant/Onest files from v1 remain in `fonts/`.
- Header: sticky black blur, logo image (neon RL) + wordmark, uppercase letterspaced nav
- Real studio photos (from Sema, 2026-08-04): hero = `img/training.jpg`, how-section = `img/room.jpg`, contacts = `img/lounge.jpg`. OG image uses training photo.

## Structure

Static, no build step:
- `index.html` — hero, statement, benefits (colored cards), how (numbered rows), prices, team, FAQ, **booking form** (#booking), contacts
- `schedule.html` — separate schedule page (per Sema) + same booking form
- `site.js` — shared: burger menu, reveal animations, form AJAX
- `styles.css`, `fonts/`, `img/`

## Booking form

Full on-site form (not Telegram) → **FormSubmit.co AJAX** → emails to simon.sivakov@icloud.com. Fields: имя, телефон, слот (select), комментарий; honeypot `_honey`. **First submission triggers a FormSubmit activation email — Sema must click "Activate" once**, otherwise заявки не доставляются (test submission sent 2026-08-04). Telegram remains as fallback link.

## Status

- **NOT deployed** — Sema said keep local (2026-08-04). Do not push/deploy without his OK.
- Local preview: `python3 -m http.server 8734` from this folder → http://localhost:8734/
- Canonical/OG URLs point to `https://lopushokbot.github.io/redlight-studio/` — update if final domain differs.

## Data that needs Sema's confirmation

- **Prices** (3 500 ₽ / 4×12 800 ₽ / 8×23 200 ₽) — realistic estimates, NOT confirmed
- **Schedule** (Чт 15:30, Вс 17:00) — from IG posts of May 2026, may be stale
- **Team section** — collective description (no names/photos yet)
