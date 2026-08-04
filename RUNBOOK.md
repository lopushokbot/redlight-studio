# RUNBOOK — Red Light Landing

## Preview locally

```bash
cd /Users/iibot/Documents/ppppp/workspace/redlight-studio
python3 -m http.server 8734
# open http://localhost:8734/
```

## Edit content

- All text lives in `index.html` (Russian). Sections have `id` anchors: `#about`, `#how`, `#schedule`, `#prices`, `#team`, `#faq`, `#contacts`.
- Colors/spacing in `styles.css` (`:root` variables at top).
- Schedule rows: `.sched__row` blocks in `#schedule`.
- Prices: `.price` cards in `#prices`.

## Deploy (when Sema approves)

```bash
cd /Users/iibot/Documents/ppppp/workspace/redlight-studio
git init && git add -A && git commit -m "Red Light landing"
gh repo create lopushokbot/redlight-studio --public --source=. --push
gh api repos/lopushokbot/redlight-studio/pages -X POST -f build_type=workflow 2>/dev/null || true
# or enable Pages from branch main / root in repo settings
```

After deploy verify: OG preview (t.me/share check), favicon, fonts load.
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
