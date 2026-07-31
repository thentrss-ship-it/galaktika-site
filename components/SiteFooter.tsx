const TELEGRAM_URL = "https://t.me/Galaxy_Stan";
const TELEGRAM_GROUP_URL = "https://t.me/galaxy_distr";
const PRICE_BOT_URL = "https://t.me/galaxysai_bot?start=site";

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

const bottomMeta = ["Москва", "Отгрузка по России", "Минимальный заказ от 20 000 ₽"];

export default function SiteFooter() {
  return (
    <footer className="galaxy-footer relative overflow-hidden border-t border-white/10 bg-black px-5 pb-8 pt-12 text-white lg:px-6 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(139,92,246,0.10),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 overflow-hidden rounded-[30px] border border-cyan-400/16 bg-white/[0.028] p-5 shadow-[0_0_54px_rgba(34,211,238,0.07)] backdrop-blur-2xl md:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-56 w-56 rounded-full bg-violet-500/12 blur-3xl" />

          <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
                B2B contact
              </div>
              <h2 className="max-w-3xl text-2xl font-black uppercase leading-tight md:text-3xl">
                Получите оптовый прайс и актуальное наличие
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">
                Напишите менеджеру в Telegram — отправим условия, наличие и поможем собрать заказ под формат вашего магазина или сети.
              </p>
            </div>

            <div className="grid gap-3 sm:flex lg:justify-end">
              <a
                href={PRICE_BOT_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-6 py-4 text-center text-sm font-black shadow-[0_0_38px_rgba(34,211,238,0.22)] transition hover:scale-[1.02] hover:shadow-[0_0_55px_rgba(34,211,238,0.34)]"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                <span className="relative">Получить прайс в боте →</span>
              </a>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-[20px] border border-white/10 bg-black/35 px-6 py-4 text-center text-sm font-black text-zinc-200 transition hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-white"
              >
                Написать менеджеру
              </a>

              <a
                href={TELEGRAM_GROUP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-[20px] border border-cyan-400/25 bg-cyan-400/10 px-6 py-4 text-center text-sm font-black text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/15"
              >
                Telegram-группа
              </a>
            </div>
          </div>
        </div>

        <div className="galaxy-footer-grid">
          <div className="galaxy-footer-brand">
            <a href="/" className="inline-flex items-center gap-3">
              <div className="relative h-12 w-14 shrink-0">
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-55 blur-xl" />
                <img
                  src="/logo-galaktika-v3.png"
                  alt="ГАЛАКТИКА"
                  className="relative h-12 w-14 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
                />
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

              <a
                href={TELEGRAM_GROUP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-between rounded-[20px] border border-cyan-400/25 bg-cyan-400/10 px-5 py-4 text-sm font-black text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/15"
              >
                Вступить в группу
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="galaxy-footer-bottom">
          <div>© 2026 ГАЛАКТИКА. B2B-поставки для магазинов.</div>

          <div className="galaxy-footer-meta">
            {bottomMeta.map((item) => (
              <span key={item}>{item}</span>
            ))}
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

        .galaxy-footer-bottom {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 48px;
          border-top: 1px solid rgba(255, 255, 255, 0.10);
          padding-top: 24px;
          color: rgb(82, 82, 91);
          font-size: 12px;
          font-weight: 600;
        }

        .galaxy-footer-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 10px 22px;
          text-align: right;
        }

        .galaxy-footer-meta span {
          white-space: nowrap;
        }

        @media (max-width: 1023px) {
          .galaxy-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 34px;
          }

          .galaxy-footer-brand {
            grid-column: 1 / -1;
          }

          .galaxy-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .galaxy-footer-meta {
            justify-content: flex-start;
            text-align: left;
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

          .galaxy-footer-bottom {
            margin-top: 36px;
          }

          .galaxy-footer-meta {
            display: grid;
            gap: 8px;
          }
        }
      `}</style>
    </footer>
  );
}
