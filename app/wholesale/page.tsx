import type { Metadata } from 'next';
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

const TELEGRAM_URL = 'https://t.me/Galaxy_Stan';

export const metadata: Metadata = {
  title: 'Оптовый заказ — ГАЛАКТИКА',
  description:
    'Как сделать оптовый заказ в ГАЛАКТИКЕ: заявка, прайс, подбор товаров, минимальный заказ от 20 000 ₽, отгрузка из Москвы и доставка по России.',
  alternates: {
    canonical: 'https://www.galaxyopt.ru/wholesale',
  },
  openGraph: {
    title: 'Как сделать оптовый заказ — ГАЛАКТИКА',
    description:
      'Понятная схема оптового заказа для магазинов, сетей и оптовых клиентов. Склад в Москве, отгрузка по России.',
    url: 'https://www.galaxyopt.ru/wholesale',
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

const orderSteps = [
  {
    number: '01',
    title: 'Оставляете заявку',
    text: 'Напишите менеджеру в Telegram или отправьте запрос с сайта. Можно сразу приложить список интересующих товаров из каталога.',
  },
  {
    number: '02',
    title: 'Получаете прайс и наличие',
    text: 'Менеджер отправит актуальные оптовые цены, остатки, новинки и позиции, которые чаще всего берут магазины.',
  },
  {
    number: '03',
    title: 'Собираете заказ',
    text: 'Минимальный оптовый заказ — от 20 000 ₽. Можно собрать заказ по устройствам, картриджам, испарителям, аксессуарам и мерчу.',
  },
  {
    number: '04',
    title: 'Согласуете условия',
    text: 'Фиксируем состав заказа, способ оплаты, формат отгрузки и удобную доставку по Москве или в регион.',
  },
  {
    number: '05',
    title: 'Получаете отгрузку',
    text: 'Заказ готовится на складе в Москве и отправляется удобным способом по России.',
  },
];

const benefits = [
  {
    title: 'Для магазинов и сетей',
    text: 'Работаем с вейп-шопами, табачными магазинами, сетями и оптовыми клиентами.',
  },
  {
    title: 'Быстрый подбор',
    text: 'Помогаем собрать заказ под витрину: хиты, новинки, картриджи, расходники и ходовые линейки.',
  },
  {
    title: 'Склад в Москве',
    text: 'Основная отгрузка идёт из Москвы. Доставку в регионы согласовываем индивидуально.',
  },
  {
    title: 'Запрос из каталога',
    text: 'Можно выбрать несколько товаров на сайте и отправить их менеджеру одним списком.',
  },
];

const popularRequests = [
  'Vaporesso XROS',
  'XROS 5',
  'XROS 5 Mini',
  'Картриджи XROS',
  'Geekvape Hero 5',
  'Voopoo VMATE',
  'Smoant Pasito',
  'Испарители',
];

const faqItems = [
  {
    question: 'С какой суммы можно сделать оптовый заказ?',
    answer: 'Минимальный заказ — от 20 000 ₽. По крупным заказам условия согласуются индивидуально с менеджером.',
  },
  {
    question: 'Можно ли сначала получить прайс?',
    answer: 'Да. Напишите менеджеру в Telegram или оставьте заявку на сайте — вам отправят актуальный прайс и наличие.',
  },
  {
    question: 'Можно ли заказать товары из каталога списком?',
    answer: 'Да. В каталоге можно добавить несколько товаров в запрос и отправить менеджеру одним списком.',
  },
  {
    question: 'Куда отправляете заказы?',
    answer: 'Отгружаем по Москве и отправляем в регионы России удобными транспортными компаниями.',
  },
];

export default function WholesalePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
        <SiteHeader active="wholesale" />
<section className="relative overflow-hidden px-5 pb-16 pt-28 lg:px-6 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(139,92,246,0.20),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.08),transparent_38%)]" />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-gradient-to-b from-cyan-950/15 via-black to-black" />
        <div className="absolute left-1/2 top-24 h-80 w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <a href="/" className="mb-8 inline-flex text-sm font-bold text-zinc-500 transition hover:text-cyan-300">
            ← На главную
          </a>

          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Wholesale order</div>

              <h1 className="max-w-5xl text-[42px] font-black uppercase leading-[0.94] tracking-tight sm:text-6xl md:text-7xl xl:text-[82px]">
                <span className="block text-white">Как сделать</span>
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">оптовый заказ</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300 md:text-xl">
                Понятная схема работы для магазинов, сетей и оптовых клиентов: от заявки и прайса до отгрузки со склада в Москве.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/catalog"
                  className="group relative overflow-hidden rounded-[22px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-5 text-center text-base font-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition hover:scale-[1.02] hover:shadow-[0_0_65px_rgba(34,211,238,0.38)]"
                >
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative">Собрать запрос в каталоге →</span>
                </a>

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[22px] border border-white/10 bg-white/[0.04] px-7 py-5 text-center text-base font-black text-zinc-200 transition hover:border-cyan-400/40 hover:bg-white/[0.07] hover:text-white"
                >
                  Написать менеджеру
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-cyan-400/18 bg-black/45 p-5 shadow-[0_0_80px_rgba(34,211,238,0.10)] backdrop-blur-2xl">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/18 blur-3xl" />
              <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-cyan-500/14 blur-3xl" />

              <div className="relative grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-cyan-200">20к</div>
                  <div className="mt-1 text-sm text-zinc-400">минимальный заказ</div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-white">Москва</div>
                  <div className="mt-1 text-sm text-zinc-400">основная отгрузка</div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-violet-200">B2B</div>
                  <div className="mt-1 text-sm text-zinc-400">для магазинов</div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="text-3xl font-black text-emerald-200">РФ</div>
                  <div className="mt-1 text-sm text-zinc-400">доставка в регионы</div>
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
                Order process
              </div>
              <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                5 шагов до отгрузки
              </h2>
            </div>

            <p className="max-w-xl leading-relaxed text-zinc-400">
              Схема простая: оставляете заявку, получаете прайс, собираете заказ и согласуете доставку с менеджером.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {orderSteps.map((step) => (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_55px_rgba(34,211,238,0.06)] transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.055] hover:shadow-[0_0_70px_rgba(34,211,238,0.12)]"
              >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-400/16" />
                <div className="relative">
                  <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-black leading-tight text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 lg:px-6 lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[34px] border border-cyan-400/18 bg-black/55 p-7 shadow-[0_0_80px_rgba(34,211,238,0.10)] backdrop-blur-2xl md:p-9">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/14 blur-[90px]" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-violet-500/14 blur-[90px]" />

            <div className="relative">
              <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
                For buyers
              </div>
              <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                Что можно запросить
              </h2>
              <p className="mt-5 leading-relaxed text-zinc-400">
                Самый быстрый сценарий — открыть каталог, выбрать интересующие позиции и отправить список менеджеру. Если не знаете, что выбрать, менеджер поможет собрать ходовой ассортимент под ваш магазин.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href="/catalog"
                  className="rounded-[22px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-5 text-center font-black shadow-[0_0_42px_rgba(34,211,238,0.22)] transition hover:scale-[1.02]"
                >
                  Открыть каталог
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[22px] border border-white/10 bg-white/[0.04] px-7 py-5 text-center font-black text-zinc-200 transition hover:border-cyan-400/40 hover:bg-white/[0.07] hover:text-white"
                >
                  Запросить прайс
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-400/25 hover:bg-white/[0.055]"
              >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="relative">
                  <h3 className="text-2xl font-black leading-tight text-white">{benefit.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 lg:px-6 lg:py-18">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_70px_rgba(34,211,238,0.06)] md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-violet-300/75">
                Popular requests
              </div>
              <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
                Часто запрашивают
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Эти направления можно сразу найти в каталоге или написать менеджеру, чтобы получить подборку по наличию.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {popularRequests.map((request) => (
              <a
                key={request}
                href={`/catalog?q=${encodeURIComponent(request)}`}
                className="rounded-full border border-white/10 bg-black/35 px-5 py-3 text-sm font-black text-zinc-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-100"
              >
                {request}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 lg:px-6 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
              FAQ
            </div>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
              Вопросы по оптовому заказу
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                <h3 className="text-xl font-black leading-tight text-white">{item.question}</h3>
                <p className="mt-4 leading-relaxed text-zinc-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-cyan-400/20 bg-gradient-to-br from-cyan-950/28 via-zinc-950 to-violet-950/24 p-7 shadow-[0_0_100px_rgba(34,211,238,0.16)] md:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
                Ready to order
              </div>
              <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight md:text-5xl">
                Соберите запрос в каталоге или напишите менеджеру
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-zinc-300">
                Менеджер отправит актуальные цены, наличие, новинки и поможет подобрать ассортимент под ваш формат магазина.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="/catalog"
                className="rounded-[22px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-8 py-5 text-center font-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition hover:scale-[1.02]"
              >
                Перейти в каталог
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-[22px] border border-white/10 bg-black/35 px-8 py-5 text-center font-black text-zinc-200 transition hover:border-cyan-400/40 hover:bg-white/[0.07] hover:text-white"
              >
                Telegram менеджера
              </a>
            </div>
          </div>
        </div>
      </section>
            <SiteFooter />
      </main>
  );
}
