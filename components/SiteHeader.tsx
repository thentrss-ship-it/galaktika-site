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

  const ctaClassName =
    "group relative overflow-hidden rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-black text-white shadow-[0_0_35px_rgba(34,211,238,0.28)] transition hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(34,211,238,0.42)]";

  return (
    <>
      <header className="galaxy-site-header fixed left-0 right-0 top-0 z-[999] border-b border-white/10 bg-black/82 text-white shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 lg:px-6">
          <a
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-3"
          >
            <div className="relative h-12 w-12 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-75 blur-lg" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-black shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                <img
                  src="/logo-galaktika.png"
                  alt="ГАЛАКТИКА"
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="text-lg font-black uppercase leading-none tracking-[0.11em] text-white">
                ГАЛАКТИКА
              </div>
              <div className="mt-1 text-[11px] uppercase leading-none tracking-[0.2em] text-zinc-400">
                оптовые поставки
              </div>
            </div>
          </a>

          <nav className="galaxy-desktop-nav flex-1 items-center justify-center text-[15px] font-bold text-white/82">
            {navItems.map((item) => {
              const isActive = item.key === active;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={
                    isActive
                      ? "whitespace-nowrap text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                      : "whitespace-nowrap transition hover:text-cyan-300 hover:drop-shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {onLead ? (
              <button type="button" onClick={handleLeadClick} className={ctaClassName}>
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                <span className="relative galaxy-cta-desktop-text">{ctaText}</span>
                <span className="relative galaxy-cta-mobile-text">Прайс</span>
              </button>
            ) : (
              <a
                href={ctaHref}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className={ctaClassName}
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                <span className="relative galaxy-cta-desktop-text">{ctaText}</span>
                <span className="relative galaxy-cta-mobile-text">Telegram</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="galaxy-mobile-menu-button h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-400/45 hover:bg-white/[0.08]"
              aria-label="Открыть меню"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="galaxy-mobile-menu border-t border-white/10 bg-black/95 px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
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

      <style>{`
        .galaxy-desktop-nav {
          display: flex;
          gap: 26px;
        }

        .galaxy-mobile-menu-button {
          display: none;
        }

        .galaxy-mobile-menu {
          display: none;
        }

        .galaxy-cta-desktop-text {
          display: inline;
        }

        .galaxy-cta-mobile-text {
          display: none;
        }

        @media (max-width: 1180px) {
          .galaxy-desktop-nav {
            gap: 18px;
            font-size: 13px;
          }
        }

        @media (max-width: 1023px) {
          .galaxy-desktop-nav {
            display: none;
          }

          .galaxy-mobile-menu-button {
            display: flex;
          }

          .galaxy-mobile-menu {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .galaxy-site-header > div {
            height: 64px;
          }

          .galaxy-cta-desktop-text {
            display: none;
          }

          .galaxy-cta-mobile-text {
            display: inline;
          }
        }
      `}</style>
    </>
  );
}
