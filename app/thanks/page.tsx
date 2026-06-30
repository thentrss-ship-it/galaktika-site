import type { Metadata } from "next";

const TELEGRAM_URL = "https://t.me/Galaxy_Stan";

export const metadata: Metadata = {
  title: "Заявка отправлена — ГАЛАКТИКА оптом",
  description:
    "Спасибо за заявку. Менеджер ГАЛАКТИКИ свяжется с вами и отправит актуальные оптовые цены, наличие и условия отгрузки.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.galaxyopt.ru/thanks",
  },
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-5 py-20 lg:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.18),transparent_34%),radial-gradient(circle_at_50%_78%,rgba(14,165,233,0.08),transparent_40%)]" />
        <div className="absolute left-1/2 top-24 h-80 w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[110px]" />

        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[42px] border border-cyan-400/20 bg-zinc-950/88 p-6 shadow-[0_0_110px_rgba(34,211,238,0.18)] backdrop-blur-2xl md:p-10 lg:p-12">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/14 blur-[90px]" />
          <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-violet-500/14 blur-[100px]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />

          <div className="relative text-center">
            <a href="/" className="mb-8 inline-flex items-center gap-3">
              <div className="relative h-14 w-14">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-70 blur-lg" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-black">
                  <img src="/logo-galaktika-v2.png" alt="ГАЛАКТИКА" className="h-11 w-12 object-contain" />
                </div>
              </div>

              <div className="text-left">
                <div className="text-lg font-black uppercase tracking-[0.12em]">ГАЛАКТИКА</div>
                <div className="-mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                  оптовые поставки
                </div>
              </div>
            </a>

            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[30px] border border-cyan-400/25 bg-cyan-400/10 text-5xl shadow-[0_0_65px_rgba(34,211,238,0.22)]">
              ✅
            </div>

            <div className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-cyan-300/80">
              Заявка принята
            </div>

            <h1 className="mx-auto max-w-3xl text-4xl font-black uppercase leading-[0.96] tracking-tight md:text-6xl lg:text-7xl">
              Спасибо, мы получили ваш запрос
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300 md:text-xl">
              Менеджер ГАЛАКТИКИ проверит наличие, актуальные оптовые цены и условия отгрузки. Если нужно ускорить ответ — напишите напрямую в Telegram.
            </p>

            <div className="mx-auto mt-9 grid max-w-3xl gap-3 md:grid-cols-3">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 text-left">
                <div className="text-2xl font-black text-cyan-200">01</div>
                <div className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white">Заявка</div>
                <div className="mt-2 text-sm leading-relaxed text-zinc-500">Мы получили данные и выбранные позиции.</div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 text-left">
                <div className="text-2xl font-black text-violet-200">02</div>
                <div className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white">Прайс</div>
                <div className="mt-2 text-sm leading-relaxed text-zinc-500">Менеджер отправит актуальные цены и наличие.</div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 text-left">
                <div className="text-2xl font-black text-emerald-200">03</div>
                <div className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white">Отгрузка</div>
                <div className="mt-2 text-sm leading-relaxed text-zinc-500">Согласуем заказ и доставку из Москвы.</div>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-5 text-center font-black shadow-[0_0_45px_rgba(34,211,238,0.28)] transition hover:scale-[1.02] hover:shadow-[0_0_65px_rgba(34,211,238,0.38)]"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                <span className="relative">Написать в Telegram →</span>
              </a>

              <a
                href="/catalog"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-5 text-center font-black text-zinc-200 transition hover:border-cyan-400/35 hover:bg-white/[0.07] hover:text-white"
              >
                Вернуться в каталог
              </a>
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-[24px] border border-cyan-400/15 bg-cyan-400/8 p-5 text-sm leading-relaxed text-zinc-400">
              Минимальный оптовый заказ — от 20 000 ₽. Работаем с вейп-шопами, табачными магазинами, сетями и оптовыми клиентами. Склад — Москва, отгрузка по России.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
