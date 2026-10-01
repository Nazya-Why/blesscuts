# Bless Cuts — сайт барбершопу

Односторінковий лендинг барбершопу Bless Cuts (Львів). Зроблений за ТЗ з `CLAUDE.md`.

**Стек:** Astro 7 (статичний білд), Tailwind CSS 4, TypeScript. Шрифт Onest завантажується з Google Fonts під час збірки й віддається з власного домену.

## Команди

```bash
npm install        # один раз
npm run dev        # локальна розробка: http://localhost:4321
npm run build      # продакшн-збірка в dist/
npm run preview    # перегляд зібраного сайту
npm run check      # перевірка типів
```

## Де що міняти

| Що | Файл |
|---|---|
| Телефон, адреса, години, соцмережі, посилання на запис, рейтинг | `src/data/contacts.ts` |
| Рівні майстрів і прайс | `src/data/services.ts` |
| Майстри: імена, описи, персональні посилання на запис | `src/data/barbers.ts` |
| Пункти меню | `src/data/nav.ts` |
| Бойовий домен (canonical, Open Graph, sitemap) | `astro.config.mjs` → `site` |
| Кольори, кнопки, типографіка | `src/styles/global.css` |

Секції сторінки лежать у `src/components/`, а збирає їх `src/pages/index.astro`.

### Фото

Щоб замінити фото, достатньо покласти файл з тим самим іменем. Сайт сам зробить AVIF і WebP потрібних розмірів.

| Файл | Що це | Пропорція |
|---|---|---|
| `src/assets/logo.png` | лого, біле на прозорому або чорному. Ставиться лише на чорне тло: футер і сертифікат | ≈ 840×500 |
| `src/assets/video/hero.mp4` | відео першого екрана на телефонах (фон на весь екран) | 9:16, H.264, без звуку, до ~2 МБ |
| `src/assets/video/hero-wide.mp4` | те саме відео для ноутбуків: центральна смуга, збільшена до 1920×1080 | 16:9, H.264, без звуку |
| `src/assets/hero-video-wide.jpg` | обкладинка широкого відео (перший кадр) | 1920×1080 |
| `src/assets/hero-video.jpg` | обкладинка відео (перший кадр), видно до запуску відео | 720×1280 |
| `src/assets/about.jpg` | блок «Про нас» | 4:5 |
| `src/assets/barbers/{photo}.jpg` | майстри, імена файлів з поля `photo` у `barbers.ts` | 7:8 |
| `src/assets/gallery/1..5.jpg` | галерея, перше фото велике | 1-ше квадратне |
| `public/og-image.jpg` | прев'ю для соцмереж | 1200×630 |

Якщо файлу немає, на його місці показується сіра заглушка з підписом шляху, і збірка не падає. Новому майстру досить додати запис у `barbers.ts` і фото `src/assets/barbers/<photo>.jpg`.

Щоб замінити відео першого екрана, нове відео (вертикальне 9:16) треба стиснути й зняти з нього обкладинку, наприклад через [ffmpeg](https://ffmpeg.org):

```bash
ffmpeg -i нове.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 27 -movflags +faststart src/assets/video/hero.mp4
```

Щоб повтор був без шва, відео треба підрізати в той момент, де кадр збігається з першим. У нинішнього відео це 225-й кадр (9,375 с):

```bash
ffmpeg -i нове.mp4 -vf "trim=end_frame=225,setpts=PTS-STARTPTS" -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 27 -movflags +faststart src/assets/video/hero.mp4
```

```bash
ffmpeg -i нове.mp4 -frames:v 1 -q:v 2 src/assets/hero-video.jpg
```

Широка версія для ноутбуків — центральна смуга 16:9 того самого відео, збільшена якісним алгоритмом:

```bash
ffmpeg -i нове.mp4 -vf "trim=end_frame=225,setpts=PTS-STARTPTS,crop=720:405:0:437,scale=1920:1080:flags=lanczos,unsharp=5:5:0.5:5:5:0" -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 23 -movflags +faststart src/assets/video/hero-wide.mp4
```

```bash
ffmpeg -i src/assets/video/hero-wide.mp4 -frames:v 1 -q:v 2 src/assets/hero-video-wide.jpg
```

## Попередній перегляд на GitHub Pages

Поточна версія: https://nazya-why.github.io/blesscuts-astro/

Опублікувати зміни: закомітити їх і виконати

```bash
npm run deploy:pages
```

Скрипт збирає сайт під адресу `https://<owner>.github.io/<repo>/` і відправляє результат у гілку `gh-pages`. GitHub оновлює сторінку приблизно за хвилину.

## Деплой на Vercel

1. Завантажити проєкт у репозиторій на GitHub (папки `node_modules` і `dist` уже в `.gitignore`).
2. На [vercel.com](https://vercel.com) натиснути **Add New → Project** і імпортувати репозиторій.
3. Vercel сам розпізнає Astro. Параметри за замовчуванням: **Build Command** `npm run build`, **Output Directory** `dist`. Нічого міняти не треба.
4. Натиснути **Deploy**. Після першого деплою додати свій домен у **Settings → Domains**.
5. Якщо домен не `blesscuts-barbershop.com.ua`, змінити `site` в `astro.config.mjs`, інакше canonical, OG-картинка й sitemap вказуватимуть на старий домен.

Кожен push у гілку `main` автоматично оновлює сайт.

**Netlify** як альтернатива: **Add new site → Import an existing project**, Build command `npm run build`, Publish directory `dist`.

## Перед запуском перевірити

- Рейтинг і кількість відгуків (`rating`, `reviewCount` у `contacts.ts`) — знято з Google Maps 01.10.2026 (5,0 і 1 086). Час від часу оновлювати; на сайті кількість показується округленою: «1 000+».
- Прайс: дублі «Камуфлювання бороди» зі старого прайсу (див. коментар у `services.ts`). Звірити ціни з Google, Instagram і каталогами (Barb.ua тощо), щоб скрізь були однакові.
- Фото майстрів узяті зі старого сайту. Варто переконатися, що кожне стоїть біля свого імені.
- Сильні сторони майстрів і підбір «Що тобі потрібно?» (`focus` і `needs` у `barbers.ts`) взято з їхніх описів — уточнити в самих майстрів.
- FAQ (`src/data/faq.ts`): додати «Чи можна прийти без запису?», «Скільки триває стрижка?» і «Чи треба мити голову перед стрижкою?», коли буде відповідь від власника.

## Чого бракує для наступного кроку

Фото результатів і «до / після» (з іменем майстра), коротке відео атмосфери та кілька справжніх відгуків, обраних власником. Із ними можна додати блоки «Наші роботи», «До / після», картки відгуків і підбір «Який майстер мені підходить?».
