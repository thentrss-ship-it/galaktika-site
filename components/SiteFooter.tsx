const TELEGRAM_URL = "https://t.me/Galaxy_Stan";

const navLinks = [
  { label: "Каталог", href: "/catalog" },
  { label: "Оптовый заказ", href: "/wholesale" },
  { label: "Доставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
  { label: "Бренды", href: "/#brands" },
];

const terms = [
  "Минимальный заказ от 20 000 ₽",
  "Склад: Москва",
  "Отгрузка по России",
  "Связь через Telegram",
];

export default function SiteFooter() {
  return (
    <footer className="galaxy-footer relative overflow-hidden border-t border-white/10 bg-black px-5 pb-8 pt-14 text-white lg:px-6 lg:pt-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(139,92,246,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 overflow-hidden rounded-[34px] border border-cyan-400/18 bg-white/[0.035] p-6 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/14 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-violet-500/14 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
                B2B contact
              </div>
              <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight md:text-4xl">
                Получите оптовый прайс и актуальное наличие
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                Напишите менеджеру в Telegram — отправим условия, наличие и поможем собрать заказ под формат вашего магазина или сети.
              </p>
            </div>

            <div className="grid gap-3 sm:flex lg:justify-end">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[22px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-5 text-center text-base font-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition hover:scale-[1.02] hover:shadow-[0_0_65px_rgba(34,211,238,0.38)]"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                <span className="relative">Написать менеджеру →</span>
              </a>

              <a
                href="/catalog"
                className="rounded-[22px] border border-white/10 bg-black/35 px-7 py-5 text-center text-base font-black text-zinc-200 transition hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-white"
              >
                Перейти в каталог
              </a>
            </div>
          </div>
        </div>

        <div className="galaxy-footer-grid">
          <div className="galaxy-footer-brand">
            <a href="/" className="inline-flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-70 blur-lg" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-black">
                  <img
                    src="/logo-galaktika.png"
                    alt="ГАЛАКТИКА"
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="text-xl font-black uppercase leading-none tracking-[0.1em]">
                  ГАЛАКТИКА
                </div>
                <div className="mt-1 text-[11px] uppercase leading-none tracking-[0.2em] text-zinc-400">
                  оптовые поставки
                </div>
              </div>
            </a>

            <p className="mt-6 max-w-sm leading-relaxed text-zinc-400">
              Оптовые поставки оригинальной vape-продукции для магазинов, сетей и оптовых клиентов. Склад в Москве, отправка по России.
            </p>
          </div>

          <div>
            <div className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
              Навигация
            </div>
            <nav className="grid gap-3">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-bold text-zinc-400 transition hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
              Условия
            </div>
            <div className="grid gap-3">
              {terms.map((item) => (
                <div key={item} className="text-sm font-medium text-zinc-400">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="galaxy-footer-contact">
            <div className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
              Связь
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5">
              <div className="text-2xl font-black text-white">Telegram</div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Менеджер ответит по прайсу, наличию, условиям заказа и отгрузке.
              </p>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-between rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-5 py-4 text-sm font-black text-white shadow-[0_0_35px_rgba(34,211,238,0.20)] transition hover:scale-[1.02]"
              >
                Написать
                <span>✈</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-medium text-zinc-600 md:flex-row md:items-center md:justify-between">
          <div>© 2026 ГАЛАКТИКА. B2B-поставки для магазинов.</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Москва</span>
            <span>Отгрузка по России</span>
            <span>Минимальный заказ от 20 000 ₽</span>
          </div>
        </div>
      </div>

      <style>{`
        .galaxy-footer-grid {
          display: grid;
          grid-template-columns: 1.45fr 0.75fr 0.9fr 1.05fr;
          gap: 42px;
          align-items: start;
        }

        @media (max-width: 1023px) {
          .galaxy-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 34px;
          }

          .galaxy-footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .galaxy-footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .galaxy-footer-brand {
            grid-column: auto;
          }
        }
      `}</style>
    </footer>
  );
}
