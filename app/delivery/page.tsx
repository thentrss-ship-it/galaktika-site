import type { Metadata } from "next";

const TELEGRAM_URL = "https://t.me/Galaxy_Stan";
const SITE_URL = "https://www.galaxyopt.ru";

export const metadata: Metadata = {
  title: "Доставка и условия оптового заказа | ГАЛАКТИКА",
  description:
    "Доставка оптовых заказов ГАЛАКТИКА: склад в Москве, отправка по России, минимальный заказ от 20 000 ₽, связь с менеджером в Telegram.",
  alternates: {
    canonical: `${SITE_URL}/delivery`,
  },
  openGraph: {
    title: "Доставка и условия оптового заказа | ГАЛАКТИКА",
    description:
      "Склад в Москве, отправка по России, минимальный оптовый заказ от 20 000 ₽. Условия доставки и связи с менеджером.",
    url: `${SITE_URL}/delivery`,
    siteName: "ГАЛАКТИКА",
    images: [
      {
        url: `${SITE_URL}/preview.jpg`,
        width: 1200,
        height: 630,
        alt: "ГАЛАКТИКА — оптовые поставки",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

const deliverySteps = [
  {
    title: "Заявка или запрос товаров",
    text: "Оставьте заявку на сайте, соберите позиции в каталоге или напишите менеджеру в Telegram.",
  },
  {
    title: "Подтверждение наличия",
    text: "Менеджер проверит актуальный остаток, кратность, цену и условия по выбранным позициям.",
  },
  {
    title: "Согласование заказа",
    text: "Фиксируем состав заказа, город доставки и удобный способ отправки.",
  },
  {
    title: "Сборка на складе в Москве",
    text: "После согласования заказ передаётся на сборку и подготовку к отгрузке.",
  },
  {
    title: "Отправка по России",
    text: "Передаём заказ в выбранную службу доставки или транспортную компанию по согласованию.",
  },
];

const terms = [
  "Минимальный оптовый заказ — от 20 000 ₽",
  "Основной склад — Москва",
  "Работаем с магазинами, сетями, табачными и оптовыми клиентами",
  "Актуальные цены и наличие подтверждает менеджер",
  "Способ доставки подбирается индивидуально под город и объём заказа",
  "Точные сроки отправки зависят от состава заказа и загрузки склада",
];

const faq = [
  {
    question: "Можно ли заказать из региона?",
    answer:
      "Да. Мы работаем с клиентами по России. Доставку и способ отправки согласовываем с менеджером после подтверждения заказа.",
  },
  {
    question: "Можно ли получить прайс до заказа?",
    answer:
      "Да. Оставьте заявку или напишите в Telegram — менеджер отправит актуальный прайс и наличие.",
  },
  {
    question: "Есть ли самовывоз в Москве?",
    answer:
      "Возможность самовывоза и условия передачи заказа согласовываются с менеджером индивидуально.",
  },
  {
    question: "Как быстро собирается заказ?",
    answer:
      "Скорость сборки зависит от объёма и состава заказа. После согласования менеджер сориентирует по ближайшему времени отгрузки.",
  },
];

export default function DeliveryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative px-5 pb-20 pt-10 lg:px-6 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(139,92,246,0.16),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.08),transparent_38%)]" />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-gradient-to-b from-cyan-950/18 via-black to-black" />
        <div className="absolute left-1/2 top-24 h-80 w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <header className="mb-10 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
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

            <nav className="hidden items-center gap-6 text-sm font-bold text-white/75 md:flex">
              <a href="/catalog" className="transition hover:text-cyan-300">Каталог</a>
              <a href="/wholesale" className="transition hover:text-cyan-300">Оптовый заказ</a>
              <a href="/delivery" className="text-cyan-300">Доставка</a>
              <a href="/contacts" className="transition hover:text-cyan-300">Контакты</a>
            </nav>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-4 py-3 text-sm font-black shadow-[0_0_35px_rgba(34,211,238,0.25)] transition hover:scale-105 sm:px-6"
            >
              Telegram
            </a>
          </header>

          <a href="/" className="mb-8 inline-flex text-sm font-bold text-zinc-500 transition hover:text-cyan-300">
            ← На главную
          </a>

          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Delivery & terms
              </div>

              <h1 className="max-w-4xl text-[42px] font-black uppercase leading-[0.94] tracking-tight sm:text-6xl md:text-7xl xl:text-[82px]">
                <span className="block text-white">Доставка</span>
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  и условия
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300 md:text-xl">
                Отгружаем оптовые заказы со склада в Москве и отправляем по России. Условия, наличие и способ доставки согласовываются с менеджером.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/catalog"
                  className="rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-4 text-center font-black shadow-[0_0_40px_rgba(34,211,238,0.24)] transition hover:scale-[1.02]"
                >
                  Перейти в каталог
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-7 py-4 text-center font-black text-cyan-100 transition hover:border-cyan-300/45 hover:bg-cyan-400/15"
                >
                  Написать менеджеру
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-cyan-400/18 bg-black/50 p-5 shadow-[0_0_80px_rgba(34,211,238,0.12)] backdrop-blur-2xl">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/18 blur-3xl" />
              <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-cyan-500/14 blur-3xl" />

              <div className="relative grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-cyan-200">Москва</div>
                  <div className="mt-1 text-sm text-zinc-400">основной склад</div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-white">РФ</div>
                  <div className="mt-1 text-sm text-zinc-400">отправка по России</div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-violet-200">20к</div>
                  <div className="mt-1 text-sm text-zinc-400">минимальный заказ</div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-emerald-200">B2B</div>
                  <div className="mt-1 text-sm text-zinc-400">для магазинов и сетей</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
                Order flow
              </div>
              <h2 className="text-3xl font-black md:text-5xl">Как проходит отгрузка</h2>
            </div>
            <p className="max-w-xl text-zinc-400">
              Процесс простой: вы оставляете запрос, менеджер подтверждает наличие, после согласования заказ уходит на сборку и отправку.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {deliverySteps.map((step, index) => (
              <div
                key={step.title}
                className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_55px_rgba(34,211,238,0.06)]"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-lg font-black text-cyan-100">
                  {index + 1}
                </div>
                <h3 className="relative text-lg font-black leading-tight">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 lg:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[34px] border border-cyan-400/18 bg-gradient-to-br from-cyan-950/35 via-black to-violet-950/25 p-6 shadow-[0_0_85px_rgba(34,211,238,0.10)] md:p-8">
            <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
              Main terms
            </div>
            <h2 className="text-3xl font-black md:text-5xl">Основные условия</h2>
            <p className="mt-5 leading-relaxed text-zinc-400">
              На странице указаны базовые условия. Актуальные детали по конкретному заказу менеджер подтверждает перед отгрузкой.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/wholesale"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center font-black text-zinc-200 transition hover:border-cyan-400/35 hover:text-white"
              >
                Как сделать заказ
              </a>
              <a
                href="/contacts"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center font-black text-zinc-200 transition hover:border-cyan-400/35 hover:text-white"
              >
                Контакты
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {terms.map((term) => (
              <div key={term} className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                  ✓
                </div>
                <div className="font-bold leading-relaxed text-zinc-200">{term}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-24 lg:px-6">
        <div className="mx-auto max-w-7xl rounded-[38px] border border-white/10 bg-black/55 p-6 shadow-[0_0_90px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:p-8 lg:p-10">
          <div className="mb-8 max-w-3xl">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-violet-300/75">
              FAQ
            </div>
            <h2 className="text-3xl font-black md:text-5xl">Частые вопросы</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.question} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-6">
                <h3 className="text-lg font-black text-white">{item.question}</h3>
                <p className="mt-3 leading-relaxed text-zinc-400">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 rounded-[28px] border border-cyan-400/18 bg-cyan-400/10 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div>
              <div className="text-xl font-black">Нужны условия под ваш город?</div>
              <div className="mt-2 text-sm text-zinc-400">Напишите менеджеру — подскажем по наличию, доставке и ближайшей отгрузке.</div>
            </div>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-4 text-center font-black shadow-[0_0_40px_rgba(34,211,238,0.24)] transition hover:scale-[1.02]"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
