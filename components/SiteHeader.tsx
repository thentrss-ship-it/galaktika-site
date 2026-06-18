"use client";

import { useState } from "react";

type ActivePage = "home" | "catalog" | "wholesale" | "delivery" | "contacts";

type SiteHeaderProps = {
  active?: ActivePage;
  onLead?: () => void;
  ctaText?: string;
  ctaHref?: string;
};

const TELEGRAM_URL = "https://t.me/Galaxy_Stan";

const navItems: Array<{
  label: string;
  href: string;
  key?: ActivePage;
}> = [
  { label: "Главная", href: "/", key: "home" },
  { label: "Каталог", href: "/catalog", key: "catalog" },
  { label: "Оптовый заказ", href: "/wholesale", key: "wholesale" },
  { label: "Доставка", href: "/delivery", key: "delivery" },
  { label: "Бренды", href: "/#brands" },
  { label: "Контакты", href: "/contacts", key: "contacts" },
];

export default function SiteHeader({
  active,
  onLead,
  ctaText = "Получить прайс",
  ctaHref = TELEGRAM_URL,
}: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCtaClick = () => {
    setIsMobileMenuOpen(false);
    onLead?.();
  };

  const ctaClassName =
    "rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-4 py-3 text-sm font-black shadow-[0_0_35px_rgba(34,211,238,0.25)] transition hover:scale-105 hover:shadow-[0_0_45px_rgba(34,211,238,0.4)] sm:px-5 md:px-7";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-6">
        <a href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
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

        <nav className="hidden items-center gap-5 text-sm font-medium text-white/80 lg:flex xl:gap-7">
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <a
                key={item.label}
                href={item.href}
                className={isActive ? "text-cyan-300" : "transition hover:text-cyan-300"}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {onLead ? (
            <button type="button" onClick={handleCtaClick} className={ctaClassName}>
              <span className="hidden sm:inline">{ctaText}</span>
              <span className="sm:hidden">Прайс</span>
            </button>
          ) : (
            <a href={ctaHref} target="_blank" rel="noreferrer" className={ctaClassName}>
              <span className="hidden sm:inline">{ctaText}</span>
              <span className="sm:hidden">Telegram</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-400/45 hover:bg-white/[0.08] lg:hidden"
            aria-label="Открыть меню"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 text-sm font-bold text-white/85">
            {navItems.map((item) => {
              const isActive = item.key === active;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={
                    isActive
                      ? "rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-200"
                      : "rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-cyan-400/30 hover:text-cyan-200"
                  }
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 rounded-2xl border border-cyan-400/25 bg-gradient-to-r from-cyan-950/50 to-violet-950/40 px-4 py-3 text-cyan-100"
            >
              ✈ Написать в Telegram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
