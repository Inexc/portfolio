// Реальные данные из Telegram-канала Inexc (https://t.me/inexcdemo).
// Описания сокращены по оригинальным постам; ссылки ведут на публикации и репозитории.
window.PROJECTS = [
  {
    slug: 'moviebook',
    title: 'MovieBook',
    kind: 'Десктоп',
    summary: 'Система рекомендаций фильмов и книг: подбирает, что посмотреть или почитать, в одном приложении.',
    lead: 'Десктопное приложение с тёмной темой «тёплый нуар». Фильмы и книги живут в одном каталоге, а рекомендации строятся по тому, что уже добавлено в избранное.',
    image: 'assets/projects/moviebook-1.jpg',
    gallery: [
      'assets/projects/moviebook-1.jpg',
      'assets/projects/moviebook-2.jpg',
      'assets/projects/moviebook-3.jpg',
      'assets/projects/moviebook-4.jpg',
      'assets/projects/moviebook-5.jpg'
    ],
    stack: ['C#', '.NET 6', 'WPF', 'JSON'],
    highlights: [
      'Рекомендации на главной: чем больше в избранном, тем точнее подборка',
      '«Похожие произведения» на странице фильма или книги',
      'Поиск, фильтр по жанрам, сортировка',
      'Избранное с персональной лентой',
      'Кнопки «Смотреть» (Кинопоиск) и «Читать» (ЛитРес)',
      'Постеры из TMDb и Open Library, офлайн — нарисованные обложки-заглушки'
    ],
    detail: 'По избранному строится профиль вкусов: жанры с весом по рейтингу, авторы и баланс «фильмы/книги». Кандидаты ранжируются по совпадению, в выдаче чередуются фильмы и книги, а авторы не повторяются.',
    links: [
      { label: 'Код на GitHub', href: 'https://github.com/Inexc/reccomend' },
      { label: 'Пост в канале', href: 'https://t.me/inexcdemo/3' }
    ]
  },
  {
    slug: 'instrument',
    title: 'Инструмент.',
    kind: 'Сайт',
    summary: 'Лендинг и 46-секундный фильм о том, как ИИ забирает рутину: почта, встречи, данные.',
    lead: 'Одностраничный сайт со встроенным фильмом. Минимализм в духе Apple-keynote, один акцентный цвет и шрифт Inter.',
    image: 'assets/projects/instrument-1.jpg',
    gallery: [
      'assets/projects/instrument-1.jpg',
      'assets/projects/instrument-2.jpg',
      'assets/projects/instrument-3.jpg',
      'assets/projects/instrument-4.jpg'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas 2D', 'Playwright', 'ffmpeg'],
    highlights: [
      'Фильм 1920×1080, 60 fps: три сцены, пролог и финал',
      'Каждый кадр нарисован кодом на Canvas 2D, без стоковых материалов',
      'Встроенный плеер с главами, паузой и полноэкранным режимом',
      'Калькулятор «Соберите свою экономию»: отмечаешь задачи и видишь сэкономленные часы',
      'Адаптивная вёрстка и анимации появления блоков'
    ],
    detail: 'Вся анимация фильма — одна функция render(t) от времени. Playwright отрисовывает 2760 кадров, ffmpeg склеивает их в MP4.',
    links: [
      { label: 'Код на GitHub', href: 'https://github.com/Inexc/instrument-ai-landing' },
      { label: 'Пост в канале', href: 'https://t.me/inexcdemo/12' }
    ]
  },
  {
    slug: 'kot-barista',
    title: 'Кот-Бариста',
    kind: 'Игра',
    summary: 'Казуальный кликер для Яндекс Игр: тапай по коту-баристе, вари кофе и развивай кофейню.',
    lead: 'HTML5-игра без фреймворков с интеграцией Yandex Games SDK: облачные сохранения, реклама за награду, лидерборд.',
    image: 'assets/projects/kot-barista-1.jpg',
    gallery: [
      'assets/projects/kot-barista-1.jpg',
      'assets/projects/kot-barista-2.jpg',
      'assets/projects/kot-barista-3.jpg',
      'assets/projects/kot-barista-4.jpg',
      'assets/projects/kot-barista-5.jpg',
      'assets/projects/kot-barista-6.jpg'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Yandex Games SDK'],
    highlights: [
      'Клики и комбо: чем быстрее тапаешь, тем выше множитель',
      'Магазин с апгрейдами клика и авто-дохода в два уровня',
      'Случайные события: золотая чашка и «наплыв клиентов»',
      'Перерождение и дерево перков из пяти веток',
      'Гардероб, пять интерьеров кофейни и шесть питомцев трёх редкостей',
      'Офлайн-доход, пока игрока нет в игре'
    ],
    detail: 'Помимо основного цикла в игре есть цели с наградами, ежедневный бонус и кофейный фестиваль, а прогресс синхронизируется через Yandex Games SDK.',
    links: [
      { label: 'Пост в канале', href: 'https://t.me/inexcdemo/16' }
    ]
  },
  {
    slug: 'labelspy',
    title: 'LabelSpy',
    kind: 'Бот',
    summary: 'Telegram-бот, который читает состав продукта по фото этикетки и объясняет, что в нём не так.',
    lead: 'Присылаешь фото этикетки — AI разбирает состав и отдаёт красные флаги, плюсы, оценку от 1 до 10 и карточку-отчёт. Проект открыт как шаблон.',
    image: 'assets/projects/labelspy-1.jpg',
    gallery: [
      'assets/projects/labelspy-1.jpg',
      'assets/projects/labelspy-2.jpg'
    ],
    stack: ['Python', 'python-telegram-bot', 'Google Gemini', 'Pillow'],
    highlights: [
      'Gemini Vision: состав на русском и английском',
      'Бесплатный лимит сканов и подписка за Telegram Stars',
      'Профиль пользователя, защита от спама, PostgreSQL/SQLite',
      'Автотесты и готовый деплой'
    ],
    detail: 'Бот выложен как шаблон: форкни репозиторий, вставь свои ключи и запусти своего бота.',
    links: [
      { label: 'Код на GitHub', href: 'https://github.com/Inexc/LabelSpy' },
      { label: 'Пост в канале', href: 'https://t.me/inexcdemo/22' }
    ]
  },
  {
    slug: 'alibi',
    title: 'АЛИБИ',
    kind: 'Mini App',
    summary: 'Детектив в Telegram, где каждое дело генерируется заново, а подозреваемых играет нейросеть.',
    lead: 'Вымышленное убийство, четыре подозреваемых и двенадцать вопросов. Один из них убийца, остальные тоже что-то скрывают.',
    image: 'assets/projects/alibi-1.jpg',
    gallery: [
      'assets/projects/alibi-1.jpg',
      'assets/projects/alibi-2.jpg'
    ],
    stack: ['Python', 'FastAPI', 'SQLite', 'Gemini 3.5 Flash', 'Telegram Mini App', 'JS/CSS'],
    highlights: [
      'Осмотр места, сбор улик и допрос подозреваемых своими словами',
      'Предъявление улик и шкала напряжения',
      'Обвинение с мотивом и орудием — переиграть дело нельзя',
      'Финал: штамп «дело закрыто» или «убийца ушёл», разбор ошибок и ранг детектива'
    ],
    detail: 'Дело создаёт Gemini как строгий JSON, сервер проверяет его: ровно один убийца, минимум две улики против него и две ложных. Правда хранится только на сервере, вход проверяется по подписи Telegram (initData).',
    links: [
      { label: 'Пост в канале', href: 'https://t.me/inexcdemo/23' }
    ]
  },
  {
    slug: 'prozharka',
    title: 'ПРОЖАРКА',
    kind: 'Mini App',
    summary: 'Честный AI-разбор резюме: оценивает глазами придирчивого HR и даёт правки, поднимающие балл.',
    lead: 'Telegram Mini App принимает текст или файл (PDF, DOCX, TXT) и раскладывает резюме на шесть блоков с оценкой от 0 до 100.',
    image: 'assets/projects/prozharka-1.jpg',
    gallery: [
      'assets/projects/prozharka-1.jpg'
    ],
    stack: ['Python', 'FastAPI', 'Gemini', 'Telegram Mini App', 'JS/CSS'],
    highlights: [
      'Три тональности: «Мягко», «Строго», «Без жалости»',
      'Оценка по блокам: опыт, навыки, учёба, о себе, контакты, оформление',
      'Чекбоксы правок и примеры «было → стало» в один клик',
      'История версий и рост балла по итерациям'
    ],
    detail: 'Zero-Retention: текст резюме и ответы AI не сохраняются и не логируются. Резюме считается недоверенными данными, поэтому промпт защищён от инъекций, а балл и лимит потенциала считает сервер, а не нейросеть.',
    links: [
      { label: 'Пост в канале', href: 'https://t.me/inexcdemo/24' }
    ]
  }
];
