# RUNBOOK — Red Light Landing

## Preview locally

```bash
cd /Users/iibot/Documents/ppppp/workspace/redlight-studio
python3 -m http.server 8734
# open http://localhost:8734/
```

## Edit content

- All text lives in `index.html` (Russian). Sections have `id` anchors: `#method`, `#process`, `#prices`, `#team`, `#faq`, `#booking`, `#contacts`.
- Colors/spacing in `styles.css` (`:root` variables at top; `.theme-light` overrides them for the beige-scoped sections).
- Schedule rows live in `schedule.html`: `.sched-row` blocks inside `#schedule`.
- Prices: `.price-card` blocks in `#prices`.
- Map: `.map-embed` iframe in `#contacts` — built from `https://yandex.ru/map-widget/v1/?ll=<lon>,<lat>&z=16&pt=<lon>,<lat>,pm2rdm`. If the studio ever moves, resolve the new Yandex short link (`curl -sIL <link>` for the org page redirect, then grep the org page HTML for `"coordinates":[lon,lat]`) and swap `ll`/`pt` here and in the JSON-LD `hasMap`/footer links.
- New animations/hover states live at the bottom of `styles.css` (`.reveal`, card/button hover rules) — driven by the IntersectionObserver in `site.js`.
- **Always write the brand name as `Red&nbsp;Light` in visible copy** — a plain space caused the word "Red" to disappear when it fell on a line-wrap boundary next to Cyrillic text (see CLAUDE.md gotcha).

## Deploy

Deployed 2026-08-04: repo `lopushokbot/redlight-studio`, GitHub Pages from `main` branch root (legacy build). Live: https://lopushokbot.github.io/redlight-studio/

To publish changes:

```bash
cd /Users/iibot/Documents/ppppp/workspace/redlight-studio
git add -A && git commit -m "…" && git push
# Pages rebuilds automatically in ~1 min
```

If a custom domain appears, update `canonical`, `og:url`, `og:image`, `sitemap.xml`, `robots.txt`.

## Booking form (FormSubmit)

- Endpoint in `site.js`: `https://formsubmit.co/ajax/simon.sivakov@icloud.com`
- **One-time activation**: first submission (sent 2026-08-04, тестовая заявка) triggers an activation email from FormSubmit to simon.sivakov@icloud.com — Sema must click "Activate". Until then заявки не доставляются.
- To change destination email: edit the URL in `site.js` (both pages share it).

## Log

- **2026-08-04** — Site built (hero, marquee, benefits, how, schedule, prices, team, FAQ, contacts). Fonts Onest + Cormorant bundled. OG image + favicon generated from neon logo. Sema said: don't deploy, local only. Prices/schedule are unconfirmed estimates — see CLAUDE.md.
- **2026-08-04 (v2)** — Redesign per Sema: minimalist reformathletica.com style, Tenor Sans headings (their font, bundled cyr+lat), logo image in header, расписание вынесено на отдельную страницу `schedule.html`, полноценная форма записи через FormSubmit (вместо только-Telegram), адрес обновлён на «Место be» Мясницкая 24/7с1 со ссылкой на Яндекс.Карты (https://yandex.ru/maps/-/CPcUm65t). Marquee и тёмные секции убраны. Форма протестирована — заявка уходит (нужна активация FormSubmit).
- **2026-08-04 (v3)** — Per Sema: вернул цветовую гамму v1 (чёрный hero/хэдер/контакты/футер, неоновый красный, бордовая секция «Как проходят тренировки», беж/золото) поверх минималистичной вёрстки v2; логотип на первом экране уменьшен до 220px (моб. 160px).
- **2026-08-04 (v4)** — Добавлены реальные фото студии от Sema (из ~/Downloads/Telegram Desktop): `img/training.jpg` (групповая тренировка) — hero вместо логотипа, `img/room.jpg` (зал с LED-ковриками) — секция «55 минут в красном свете», `img/lounge.jpg` (лаунж «Место be») — блок контактов. OG-картинка перегенерирована с фото тренировки. 4-й файл (IMG_2543.gif, 32MB) не использован — слишком тяжёлый для веба.
- **2026-08-05 (v5)** — Полный редизайн по макету Sema (`index-6.html` из Telegram Desktop, ~920KB с base64-фото): Fraunces/Manrope/IBM Plex Mono, scarlet-on-black + beige theme-light секции, точечный «LED» разделитель. Фото из макета извлечены из base64 в реальные файлы (`img/hero-v2.jpg`, `process-v2.jpg`, `recovery-v2.jpg`) вместо раздувания HTML на 900KB; лого осталось `img/logo.jpg`. OG-картинка перегенерирована из hero-v2 (`sips -c 630 1200`). Цены обновлены по макету (2 800 / 10 240 / 18 560 ₽). Расписание восстановлено на `schedule.html` в новом дизайне (те же Чт 15:30 / Вс 17:00, как в v2-v4). Карта — реальный `map-widget/v1` iframe (координаты резолвнуты из короткой ссылки через org-страницу) вместо декоративной SVG-заглушки. Добавлены hover-lift на кнопках/карточках, подчёркивание ссылок nav, плавный zoom на фото. Найден и исправлен баг: «Red Light» без `&nbsp;` — слово «Red» пропадало при переносе строки рядом с кириллицей (воспроизведено в headless Chrome с разным virtual-time-budget, не гонка загрузки шрифта). Задеплоено, запушено в `main`.
