import type { Metadata } from 'next';

const TELEGRAM_URL = 'https://t.me/Galaxy_Stan';

export const metadata: Metadata = {
  title: 'Контакты ГАЛАКТИКА — оптовые поставки для магазинов',
  description:
    'Контакты ГАЛАКТИКА: оптовые поставки оригинальной продукции для вейп-шопов, табачных магазинов, сетей и оптовиков. Склад в Москве, отгрузка по России.',
  alternates: {
    canonical: 'https://www.galaxyopt.ru/contacts',
  },
  openGraph: {
    title: 'Контакты ГАЛАКТИКА',
    description:
      'Оптовые поставки для магазинов. Склад в Москве, отгрузка по России, связь через Telegram.',
    url: 'https://www.galaxyopt.ru/contacts',
    siteName: 'ГАЛАКТИКА',
    images: [
      {
        url: 'https://www.galaxyopt.ru/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'ГАЛАКТИКА — оптовые поставки',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

const contactCards = [
  {
    title: 'Связь с менеджером',
    value: 'Telegram',
    text: 'Напишите менеджеру, чтобы получить актуальный прайс, наличие и условия отгрузки.',
  },
  {
    title: 'Склад',
    value: 'Москва',
    text: 'Основная отгрузка заказов идёт со склада в Москве. Точный адрес предоставляется клиентам после согласования заказа.',
  },
  {
    title: 'География',
    value: 'Вся Россия',
    text: 'Отправляем заказы по Москве и в регионы удобными транспортными компаниями.',
  },
  {
    title: 'Формат работы',
    value: 'B2B',
    text: 'Работаем с вейп-шопами, табачными магазинами, сетями и оптовыми клиентами.',
  },
];

const steps = [
  'Напишите менеджеру в Telegram.',
  'Получите актуальный прайс и наличие.',
  'Соберите заказ от 20 000 ₽.',
  'Согласуйте условия оплаты и доставки.',
  'Получите отгрузку по Москве или в регион.',
];

export default function ContactsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-6">
          <a href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-70 blur-lg" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-black">
                <img src="/logo-galaktika.png" alt="ГАЛАКТИКА" className="h-9 w-9 object-contain" />
              </div>
            </div>

            <div>
              <div className="text-base font-black uppercase tracking-[0.1em] sm:text-lg">ГАЛАКТИКА</div>
              <div className="-mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-400 sm:text-[11px] sm:tracking-[0.18em]">
                оптовые поставки
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-9 text-sm font-medium text-white/80 lg:flex">
            <a href="/" className="transition hover:text-cyan-300">Главная</a>
            <a href="/catalog" className="transition hover:text-cyan-300">Каталог</a>
            <a href="/#brands" className="transition hover:text-cyan-300">Бренды</a>
            <a href="/#terms" className="transition hover:text-cyan-300">Условия</a>
            <a href="/#delivery" className="transition hover:text-cyan-300">Доставка</a>
            <a href="/contacts" className="text-cyan-300">Контакты</a>
          </nav>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-4 py-3 text-sm font-black shadow-[0_0_35px_rgba(34,211,238,0.25)] transition hover:scale-105 hover:shadow-[0_0_45px_rgba(34,211,238,0.4)] sm:px-5 md:px-7"
          >
            <span className="hidden sm:inline">Написать в Telegram</span>
            <span className="sm:hidden">Telegram</span>
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-16 pt-28 lg:px-6 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.18),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.08),transparent_38%)]" />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-gradient-to-b from-cyan-950/15 via-black to-black" />
        <div className="absolute left-1/2 top-24 h-80 w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <a href="/" className="mb-8 inline-flex text-sm font-bold text-zinc-500 transition hover:text-cyan-300">
            ← На главную
          </a>

          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Contacts</div>

              <h1 className="max-w-4xl text-[46px] font-black uppercase leading-[0.94] tracking-tight sm:text-6xl md:text-7xl xl:text-[82px]">
                <span className="block text-white">Контакты</span>
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">ГАЛАКТИКА</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300 md:text-xl">
                Свяжитесь с менеджером, чтобы получить оптовый прайс, наличие и условия отгрузки для вашего магазина или сети.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-[22px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-5 text-center text-base font-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition hover:scale-[1.02] hover:shadow-[0_0_65px_rgba(34,211,238,0.38)]"
                >
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative">Написать в Telegram →</span>
                </a>

                <a
                  href="/catalog"
                  className="rounded-[22px] border border-white/10 bg-white/[0.04] px-7 py-5 text-center text-base font-black text-zinc-200 transition hover:border-cyan-400/40 hover:bg-white/[0.07] hover:text-white"
                >
                  Перейти в каталог
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-cyan-400/18 bg-black/45 p-5 shadow-[0_0_80px_rgba(34,211,238,0.10)] backdrop-blur-2xl">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/18 blur-3xl" />
              <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-cyan-500/14 blur-3xl" />

              <div className="relative rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
                  Основная информация
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-sm font-bold text-zinc-500">Регион</div>
                    <div className="mt-1 text-3xl font-black text-white">Москва</div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <div className="text-sm font-bold text-zinc-500">Связь</div>
                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex text-3xl font-black text-cyan-200 transition hover:text-cyan-100"
                    >
                      Telegram
                    </a>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <div className="text-sm font-bold text-zinc-500">Минимальный заказ</div>
                    <div className="mt-1 text-3xl font-black text-white">от 20 000 ₽</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 lg:px-6 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
                B2B details
              </div>
              <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                Как с нами связаться
              </h2>
            </div>

            <p className="max-w-xl leading-relaxed text-zinc-400">
              Мы не публикуем точный адрес склада на сайте. Менеджер отправит детали отгрузки после согласования заказа.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_55px_rgba(34,211,238,0.06)] transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.055] hover:shadow-[0_0_70px_rgba(34,211,238,0.12)]"
              >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-400/16" />
                <div className="relative">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{card.title}</div>
                  <div className="mt-3 text-3xl font-black text-white">{card.value}</div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 lg:px-6 lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-violet-300/75">
              Order flow
            </div>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
              Как оформить оптовый заказ
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">
              Самый быстрый путь — написать менеджеру в Telegram. Он уточнит формат вашего магазина, отправит актуальное наличие и поможет собрать заказ.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-cyan-400/18 bg-black/45 p-4 shadow-[0_0_80px_rgba(34,211,238,0.10)] backdrop-blur-2xl md:p-6">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/14 blur-[90px]" />
            <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-violet-500/14 blur-[90px]" />

            <div className="relative space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-[24px] border border-white/10 bg-white/[0.035] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-sm font-black text-cyan-100">
                    {index + 1}
                  </div>
                  <div className="pt-2 text-base font-bold leading-relaxed text-zinc-200">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-cyan-400/20 bg-gradient-to-br from-cyan-950/35 via-black to-violet-950/30 p-7 shadow-[0_0_110px_rgba(34,211,238,0.16)] md:p-10 lg:p-12">
          <div className="absolute left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[100px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
                Manager contact
              </div>
              <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight md:text-5xl">
                Получите прайс и наличие для вашего магазина
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-zinc-300">
                Напишите в Telegram: менеджер ответит по условиям сотрудничества, наличию и отправке заказа.
              </p>
            </div>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[24px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-8 py-5 text-center text-lg font-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition hover:scale-[1.02] hover:shadow-[0_0_65px_rgba(34,211,238,0.38)]"
            >
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
              <span className="relative">Связаться в Telegram →</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
