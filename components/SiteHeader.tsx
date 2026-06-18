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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLeadClick = () => {
    closeMobileMenu();

    if (onLead) {
      onLead();
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[999] border-b border-white/10 bg-black/85 text-white shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-5 lg:px-6">
        <a href="/" onClick={closeMobileMenu} className="flex shrink-0 items-center gap-3">
          <div className="relative h-11 w-11 shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-70 blur-lg" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-black">
              <img
                src="/logo-galaktika.png"
                alt="ГАЛАКТИКА"
                className="h-9 w-9 object-contain"
              />
            </div>
          </div>

          <div>
            <div className="text-lg font-black uppercase leading-none tracking-[0.1em]">
              ГАЛАКТИКА
            </div>
            <div className="mt-1 text-[11px] uppercase leading-none tracking-[0.18em] text-zinc-400">
              оптовые поставки
            </div>
          </div>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-7 text-[15px] font-bold text-white/80 lg:flex">
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <a
                key={item.label}
                href={item.href}
                className={
                  isActive
                    ? "whitespace-nowrap text-cyan-300"
                    : "whitespace-nowrap transition hover:text-cyan-300"
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {onLead ? (
            <button
              type="button"
              onClick={handleLeadClick}
              className="rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-[0_0_35px_rgba(34,211,238,0.28)] transition hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(34,211,238,0.42)] sm:px-7"
            >
              <span className="hidden sm:inline">{ctaText}</span>
              <span className="sm:hidden">Прайс</span>
            </button>
          ) : (
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
              className="rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-[0_0_35px_rgba(34,211,238,0.28)] transition hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(34,211,238,0.42)] sm:px-7"
            >
              <span className="hidden sm:inline">{ctaText}</span>
              <span className="sm:hidden">Telegram</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
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
                  onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
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
