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
const TELEGRAM_GROUP_URL = "https://t.me/galaxy_distr";
const PRICE_BOT_URL = "https://t.me/galaxysai_bot?start=site";

const navItems: Array<{
  label: string;
  href: string;
  key?: ActivePage;
  description: string;
}> = [
  {
    label: "Главная",
    href: "/",
    key: "home",
    description: "Основная страница",
  },
  {
    label: "Каталог",
    href: "/catalog",
    key: "catalog",
    description: "Товары и запрос цен",
  },
  {
    label: "Оптовый заказ",
    href: "/wholesale",
    key: "wholesale",
    description: "Как начать закупку",
  },
  {
    label: "Доставка",
    href: "/delivery",
    key: "delivery",
    description: "Москва и регионы",
  },
  {
    label: "Бренды",
    href: "/#brands",
    description: "Популярные бренды",
  },
  {
    label: "Прайс-бот",
    href: PRICE_BOT_URL,
    description: "Получить актуальный прайс",
  },
  {
    label: "Менеджер",
    href: TELEGRAM_URL,
    description: "Личная связь в Telegram",
  },
  {
    label: "TG-группа",
    href: TELEGRAM_GROUP_URL,
    description: "Новости, новинки и наличие",
  },
];

export default function SiteHeader({
  active,
  onLead,
  ctaText = "Получить прайс",
  ctaHref = PRICE_BOT_URL,
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
            <div className="relative h-12 w-14 shrink-0">
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-55 blur-xl" />
              <img
                src="/logo-galaktika-v3.png"
                alt="ГАЛАКТИКА"
                className="relative h-12 w-14 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
              />
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
              className="galaxy-mobile-menu-button h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/25 bg-black/55 text-xl font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.18)] transition hover:border-cyan-400/45 hover:bg-white/[0.08]"
              aria-label="Открыть меню"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="galaxy-mobile-menu-panel">
          <div className="galaxy-mobile-menu-card">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/16 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-violet-500/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />

            <div className="relative mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300">
                  Menu
                </div>
                <div className="mt-1 text-xl font-black uppercase tracking-[0.08em] text-white">
                  ГАЛАКТИКА
                </div>
              </div>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-3 text-sm font-black text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.16)]"
              >
                Telegram
              </a>
            </div>

            <nav className="relative grid gap-2.5">
              {navItems.map((item) => {
                const isActive = item.key === active;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={
                      isActive
                        ? "group rounded-[22px] border border-cyan-400/30 bg-gradient-to-r from-cyan-400/16 to-violet-500/10 px-4 py-3.5 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                        : "group rounded-[22px] border border-white/10 bg-white/[0.045] px-4 py-3.5 text-white/88 transition hover:border-cyan-400/30 hover:bg-white/[0.07] hover:text-cyan-100"
                    }
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-base font-black leading-tight">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xs font-medium text-zinc-500 group-hover:text-zinc-400">
                          {item.description}
                        </div>
                      </div>

                      <span
                        className={
                          isActive
                            ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/15 text-cyan-100"
                            : "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-zinc-500 transition group-hover:border-cyan-400/25 group-hover:text-cyan-100"
                        }
                      >
                        →
                      </span>
                    </div>
                  </a>
                );
              })}
            </nav>

            <div className="relative mt-4 rounded-[24px] border border-white/10 bg-black/45 p-4">
              <div className="text-sm font-black text-white">
                Оптовый прайс и наличие
              </div>
              <div className="mt-1 text-xs leading-relaxed text-zinc-500">
                Напишите менеджеру — отправим актуальные условия и поможем собрать заказ.
              </div>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="mt-4 flex items-center justify-between rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-5 py-4 text-sm font-black text-white shadow-[0_0_35px_rgba(34,211,238,0.22)]"
              >
                Написать менеджеру
                <span>✈</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .galaxy-desktop-nav {
          display: flex;
          gap: 26px;
        }

        .galaxy-mobile-menu-button {
          display: none;
        }

        .galaxy-mobile-menu-panel {
          position: fixed;
          left: 0;
          right: 0;
          top: 76px;
          z-index: 998;
          padding: 14px 16px 18px;
          background:
            linear-gradient(to bottom, rgba(0, 0, 0, 0.92), rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0)),
            radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.12), transparent 45%);
          backdrop-filter: blur(18px);
        }

        .galaxy-mobile-menu-card {
          position: relative;
          overflow: hidden;
          max-width: 720px;
          margin: 0 auto;
          border: 1px solid rgba(34, 211, 238, 0.18);
          border-radius: 30px;
          background:
            linear-gradient(135deg, rgba(8, 12, 18, 0.98), rgba(3, 7, 18, 0.96)),
            radial-gradient(circle at 10% 0%, rgba(34, 211, 238, 0.16), transparent 34%),
            radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.16), transparent 36%);
          box-shadow:
            0 28px 90px rgba(0, 0, 0, 0.72),
            0 0 48px rgba(34, 211, 238, 0.12);
          padding: 18px;
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
        }

        @media (max-width: 640px) {
          .galaxy-site-header > div {
            height: 64px;
          }

          .galaxy-mobile-menu-panel {
            top: 64px;
            padding: 10px 10px 16px;
          }

          .galaxy-mobile-menu-card {
            border-radius: 26px;
            padding: 14px;
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
