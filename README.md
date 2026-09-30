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
| Телефон, адреса, години, Instagram, посилання на запис, рейтинг | `src/data/contacts.ts` |
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
| `src/assets/hero.jpg` | головне фото | 4:5 |
| `src/assets/about.jpg` | блок «Про нас» | 4:5 |
| `src/assets/barbers/{photo}.jpg` | майстри, імена файлів з поля `photo` у `barbers.ts` | 7:8 |
| `src/assets/gallery/1..5.jpg` | галерея, перше фото велике | 1-ше квадратне |
| `public/og-image.jpg` | прев'ю для соцмереж | 1200×630 |

Якщо файлу немає, на його місці показується сіра заглушка з підписом шляху, і збірка не падає. Новому майстру досить додати запис у `barbers.ts` і фото `src/assets/barbers/<photo>.jpg`.

## Деплой на Vercel

1. Завантажити проєкт у репозиторій на GitHub (папки `node_modules` і `dist` уже в `.gitignore`).
2. На [vercel.com](https://vercel.com) натиснути **Add New → Project** і імпортувати репозиторій.
3. Vercel сам розпізнає Astro. Параметри за замовчуванням: **Build Command** `npm run build`, **Output Directory** `dist`. Нічого міняти не треба.
4. Натиснути **Deploy**. Після першого деплою додати свій домен у **Settings → Domains**.
5. Якщо домен не `blesscuts-barbershop.com.ua`, змінити `site` в `astro.config.mjs`, інакше canonical, OG-картинка й sitemap вказуватимуть на старий домен.

Кожен push у гілку `main` автоматично оновлює сайт.

**Netlify** як альтернатива: **Add new site → Import an existing project**, Build command `npm run build`, Publish directory `dist`.

## Перед запуском перевірити

- Рейтинг: у ТЗ і на сайті стоїть 4,9. Якщо в Google Maps інше значення, поправити `rating` у `contacts.ts`.
- Structured data: до `aggregateRating` бажано додати кількість відгуків (`ratingCount`). Без неї Google не покаже зірки в пошуку.
- Прайс: дублі «Камуфлювання бороди» зі старого прайсу (див. коментар у `services.ts`).
- Фото майстрів узяті зі старого сайту. Варто переконатися, що кожне стоїть біля свого імені.
