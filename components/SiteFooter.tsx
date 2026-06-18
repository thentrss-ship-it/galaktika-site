const TELEGRAM_URL = "https://t.me/Galaxy_Stan";

const navLinks = [
  { label: "Каталог", href: "/catalog" },
  { label: "Оптовый заказ", href: "/wholesale" },
  { label: "Доставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

const terms = ["Минимальный заказ от 20 000 ₽", "Склад: Москва", "Отгрузка по России", "Связь через Telegram"];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black px-5 py-12 text-white lg:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.10),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.8fr_0.9fr_auto] md:items-start">
        <div>
          <a href="/" className="inline-flex items-center gap-3">
            <div className="relative h-11 w-11">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-70 blur-lg" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-black">
                <img src="/logo-galaktika.png" alt="ГАЛАКТИКА" className="h-9 w-9 object-contain" />
              </div>
            </div>

            <div>
              <div className="text-lg font-black uppercase tracking-[0.12em]">ГАЛАКТИКА</div>
              <div className="-mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">оптовые поставки</div>
            </div>
          </a>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400">
            Оптовые поставки оригинальной vape-продукции для магазинов, сетей и оптовых клиентов. Склад в Москве, отправка по России.
          </p>
        </div>

        <div>
          <div className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-cyan-300/75">Навигация</div>
          <div className="grid gap-3 text-sm font-bold text-zinc-400">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-cyan-300">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-cyan-300/75">Условия</div>
          <div className="grid gap-3 text-sm text-zinc-400">
            {terms.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:text-right">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-6 py-4 text-sm font-black shadow-[0_0_35px_rgba(34,211,238,0.25)] transition hover:scale-105"
          >
            Написать менеджеру
          </a>

          <div className="mt-5 text-xs leading-relaxed text-zinc-600">
            © 2026 ГАЛАКТИКА<br />B2B-поставки для магазинов
          </div>
        </div>
      </div>
    </footer>
  );
}
