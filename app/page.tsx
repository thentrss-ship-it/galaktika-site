"use client";

import { FormEvent, useEffect, useState } from "react";
import { reachGoal } from "../components/YandexMetrika";

const TELEGRAM_URL = "https://t.me/Galaxy_Stan";

export default function GalaktikaVapeSite() {
  const [isAdult, setIsAdult] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    shop: "",
    telegram: "",
  });

  useEffect(() => {
    const accepted = localStorage.getItem("adult-confirmed");

    if (accepted === "true") {
      setIsAdult(true);
    }
  }, []);

  const confirmAdult = () => {
    localStorage.setItem("adult-confirmed", "true");
    setIsAdult(true);
  };

  const openLead = () => {
    setLeadSent(false);
    setLeadError("");
    setIsMobileMenuOpen(false);
    setIsLeadOpen(true);
  };

  const closeLead = () => {
    setIsLeadOpen(false);
    setLeadSent(false);
    setLeadError("");
  };

  const sendLead = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLeadError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      reachGoal("lead_sent", { source: "home" });
      setLeadSent(true);

      window.setTimeout(() => {
        window.location.href = "/thanks";
      }, 350);
    } catch {
      setLeadError(
        "Не удалось отправить заявку. Проверьте интернет или напишите менеджеру в Telegram."
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: "⚡",
      value: "25 000+",
      label: "товаров на складе",
    },
    {
      icon: "🛡",
      value: "50+",
      label: "брендов",
    },
    {
      icon: "📦",
      value: "1 000+",
      label: "постоянных клиентов",
    },
    {
      icon: "🏆",
      value: "5 лет",
      label: "на рынке",
    },
    {
      icon: "💎",
      value: "99%",
      label: "довольных клиентов",
    },
  ];

  const brandCards = [
    {
      name: "VAPORESSO",
      image: "/brands/brand-vaporesso.png",
      href: "/catalog?brand=Vaporesso",
      accent: "border-cyan-400/40 shadow-cyan-500/10",
      button: "border-cyan-400/50 text-cyan-100 shadow-cyan-500/20",
    },
    {
      name: "GEEKVAPE",
      image: "/brands/brand-geekvape.png",
      href: "/catalog?brand=Geekvape",
      accent: "border-orange-500/40 shadow-orange-500/10",
      button: "border-orange-500/50 text-orange-100 shadow-orange-500/20",
    },
    {
      name: "VOOPOO",
      image: "/brands/brand-voopoo.png",
      href: "/catalog?brand=Voopoo",
      accent: "border-yellow-400/40 shadow-yellow-500/10",
      button: "border-yellow-400/50 text-yellow-100 shadow-yellow-500/20",
    },
    {
      name: "SMOANT",
      image: "/brands/brand-smoant.png",
      href: "/catalog?brand=Smoant",
      accent: "border-yellow-400/40 shadow-yellow-500/10",
      button: "border-yellow-400/50 text-yellow-100 shadow-yellow-500/20",
    },
  ];

  const hitProducts = [
    {
      tag: "ХИТ",
      name: "Vaporesso XROS 5",
      image: "/hits/xros-5.png",
      href: "/catalog?brand=Vaporesso&section=XROS+5&status=Хиты",
    },
    {
      tag: "ХИТ",
      name: "Vaporesso XROS 5 Mini",
      image: "/hits/xros-5-mini.png",
      href: "/catalog?brand=Vaporesso&section=XROS+5+MINI&status=Хиты",
    },
    {
      tag: "ХИТ",
      name: "Geekvape Aegis Hero 5",
      image: "/hits/aegis-hero-5.png",
      href: "/catalog?brand=Geekvape&section=Hero+5&status=Хиты",
    },
    {
      tag: "ХИТ",
      name: "Voopoo VMATE PRO 2",
      image: "/hits/vmate-pro-2.png",
      href: "/catalog?brand=Voopoo&section=VMATE+PRO+2",
    },
    {
      tag: "ХИТ",
      name: "Smoant Pasito III",
      image: "/hits/pasito-3.png",
      href: "/catalog?brand=Smoant&section=Pasito+III&status=Хиты",
    },
  ];

  const categories = [
    {
      title: "Pod-системы",
      count: "2 340+ товаров",
      text: "Компактные устройства для ежедневных продаж",
      image: "/categories/pods.png",
      href: "/catalog?category=Устройства",
      accent: "border-cyan-400/35 shadow-cyan-500/10",
      button: "border-cyan-400/45 text-cyan-100",
    },
    {
      title: "Картриджи",
      count: "3 100+ товаров",
      text: "Расходники под популярные POD-системы",
      image: "/categories/cartridges.png",
      href: "/catalog?category=Картриджи",
      accent: "border-fuchsia-400/35 shadow-fuchsia-500/10",
      button: "border-fuchsia-400/45 text-fuchsia-100",
    },
    {
      title: "Испарители",
      count: "3 650+ товаров",
      text: "Оригинальные испарители в наличии",
      image: "/categories/coils.png",
      href: "/catalog?category=Испарители",
      accent: "border-orange-400/35 shadow-orange-500/10",
      button: "border-orange-400/45 text-orange-100",
    },
    {
      title: "Адаптеры",
      count: "в наличии",
      text: "Переходники и комплектующие для устройств",
      image: "/categories/adapters.png",
      href: "/catalog?q=адаптер",
      accent: "border-cyan-400/35 shadow-cyan-500/10",
      button: "border-cyan-400/45 text-cyan-100",
    },
    {
      title: "Аксессуары",
      count: "2 800+ товаров",
      text: "Дополнительные товары для витрины",
      image: "/categories/accessories.png",
      href: "/catalog?category=Аксессуары",
      accent: "border-pink-400/35 shadow-pink-500/10",
      button: "border-pink-400/45 text-pink-100",
    },
    {
      title: "Мерч",
      count: "новинки и промо",
      text: "Фирменные позиции для партнёров и акций",
      image: "/categories/merch.png",
      href: "/catalog?category=Мерч",
      accent: "border-yellow-400/35 shadow-yellow-500/10",
      button: "border-yellow-400/45 text-yellow-100",
    },
  ];

  const reasons = [
    {
      icon: "⚙️",
      title: "Подбор под формат магазина",
      text: "Помогаем собрать ассортимент под вейп-шоп, табачный магазин или сеть",
      image: "/why/flexible.png",
      accent: "border-cyan-400/35 shadow-cyan-500/10",
    },
    {
      icon: "💰",
      title: "Актуальный оптовый прайс",
      text: "Отправляем наличие, цены, хиты продаж и свежие поступления",
      image: "/why/prices.png",
      accent: "border-fuchsia-400/35 shadow-fuchsia-500/10",
    },
    {
      icon: "🚚",
      title: "Быстрая сборка и отгрузка",
      text: "Склад в Москве, отправка по России удобным для клиента способом",
      image: "/why/delivery.png",
      accent: "border-orange-400/35 shadow-orange-500/10",
    },
    {
      icon: "💬",
      title: "Живой менеджер в Telegram",
      text: "Быстро отвечаем по наличию, заказу, оплате и статусу отгрузки",
      image: "/why/support.png",
      accent: "border-emerald-400/35 shadow-emerald-500/10",
    },
    {
      icon: "📄",
      title: "Документы для бизнеса",
      text: "Готовим необходимый пакет документов для партнёров",
      image: "/why/documents.png",
      accent: "border-yellow-400/35 shadow-yellow-500/10",
    },
  ];

  const cooperationSteps = [
    {
      number: "01",
      icon: "✍️",
      title: "Оставляете заявку",
      text: "Указываете город, формат магазина и удобный способ связи.",
      accent:
        "border-cyan-400/35 bg-cyan-400/10 text-cyan-200 shadow-cyan-500/10",
    },
    {
      number: "02",
      icon: "📊",
      title: "Получаете прайс",
      text: "Менеджер отправляет актуальное наличие, цены и новинки.",
      accent:
        "border-violet-400/35 bg-violet-400/10 text-violet-200 shadow-violet-500/10",
    },
    {
      number: "03",
      icon: "🧩",
      title: "Собираем заказ",
      text: "Подбираем позиции под ваш формат: магазин, сеть или опт.",
      accent:
        "border-orange-400/35 bg-orange-400/10 text-orange-200 shadow-orange-500/10",
    },
    {
      number: "04",
      icon: "🚚",
      title: "Отгружаем товар",
      text: "Подтверждённые заказы быстро отправляем со склада в Москве.",
      accent:
        "border-emerald-400/35 bg-emerald-400/10 text-emerald-200 shadow-emerald-500/10",
    },
  ];


  return (
    <>
      {!isAdult && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 px-6 text-white backdrop-blur-xl">
          <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-cyan-400/25 bg-zinc-950 p-10 text-center shadow-[0_0_80px_rgba(34,211,238,0.22)]">
            <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative">
              <div className="mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-7xl font-black text-transparent">
                18+
              </div>

              <h2 className="mb-6 text-3xl font-black">Подтвердите возраст</h2>

              <p className="mb-10 leading-relaxed text-zinc-400">
                Сайт содержит информацию о никотиносодержащей продукции и
                предназначен только для совершеннолетних.
              </p>

              <button
                onClick={confirmAdult}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 py-5 text-lg font-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]"
              >
                Мне есть 18 лет
              </button>
            </div>
          </div>
        </div>
      )}

      {isLeadOpen && (
        <div className="fixed inset-0 z-[998] flex items-center justify-center bg-black/80 px-6 text-white backdrop-blur-xl">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[36px] border border-cyan-400/25 bg-zinc-950 p-8 shadow-[0_0_90px_rgba(34,211,238,0.25)]">
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

            <button
              onClick={closeLead}
              className="absolute right-5 top-5 z-10 text-3xl text-zinc-500 transition hover:text-white"
              aria-label="Закрыть форму"
            >
              ×
            </button>

            <div className="relative">
              {!leadSent ? (
                <>
                  <div className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-300">
                    B2B ACCESS
                  </div>

                  <h2 className="mb-4 text-4xl font-black leading-tight">
                    Получите доступ к оптовым ценам
                  </h2>

                  <p className="mb-8 leading-relaxed text-zinc-400">
                    Оставьте данные — менеджер отправит актуальное наличие,
                    цены, новинки и условия сотрудничества.
                  </p>

                  <form onSubmit={sendLead} className="space-y-4">
                    <input
                      required
                      placeholder="Имя *"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-cyan-400"
                    />

                    <input
                      required
                      placeholder="Телефон *"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-cyan-400"
                    />

                    <input
                      required
                      placeholder="Город *"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-cyan-400"
                    />

                    <input
                      placeholder="Название магазина"
                      value={form.shop}
                      onChange={(e) =>
                        setForm({ ...form, shop: e.target.value })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-cyan-400"
                    />

                    <input
                      placeholder="Telegram"
                      value={form.telegram}
                      onChange={(e) =>
                        setForm({ ...form, telegram: e.target.value })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-cyan-400"
                    />

                    {leadError && (
                      <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-4 text-sm font-bold leading-relaxed text-red-100">
                        {leadError}
                      </div>
                    )}

                    <button
                      disabled={loading}
                      className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 py-5 text-lg font-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {loading
                        ? "Отправляем..."
                        : "Получить доступ к оптовым ценам"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-10 text-center">
                  <div className="mb-6 text-6xl">✅</div>

                  <h2 className="mb-4 text-4xl font-black">
                    Заявка отправлена
                  </h2>

                  <p className="mb-8 text-zinc-400">
                    Менеджер получил заявку и скоро свяжется с вами.
                  </p>

                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-8 py-4 font-bold transition hover:scale-105"
                  >
                    Написать в Telegram
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen overflow-hidden bg-black text-white">
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-6">
            <a href="/" className="flex items-center gap-3">
              <div className="relative h-11 w-11">
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
                <div className="text-base font-black uppercase tracking-[0.1em] sm:text-lg">
                  ГАЛАКТИКА
                </div>
                <div className="-mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-400 sm:text-[11px] sm:tracking-[0.18em]">
                  оптовые поставки
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex">
              <a href="/catalog" className="transition hover:text-cyan-300">
                Каталог
              </a>
              <a href="/wholesale" className="transition hover:text-cyan-300">
                Оптовый заказ
              </a>
              <a href="/delivery" className="transition hover:text-cyan-300">
                Доставка
              </a>
              <a href="#brands" className="transition hover:text-cyan-300">
                Бренды
              </a>
              <a href="#about" className="transition hover:text-cyan-300">
                О нас
              </a>
              <a href="/contacts" className="transition hover:text-cyan-300">
                Контакты
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition hover:bg-white/5 md:flex"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-white shadow-[0_0_25px_rgba(34,211,238,0.45)]">
                  ✈
                </span>
                Написать в Telegram
              </a>

              <button
                onClick={openLead}
                className="rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-4 py-3 text-sm font-black shadow-[0_0_35px_rgba(34,211,238,0.25)] transition hover:scale-105 hover:shadow-[0_0_45px_rgba(34,211,238,0.4)] sm:px-5 md:px-7"
              >
                <span className="hidden sm:inline">Получить прайс</span>
                <span className="sm:hidden">Прайс</span>
              </button>

              <button
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
                <a
                  href="/catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-200"
                >
                  Каталог
                </a>
                <a
                  href="/wholesale"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  Оптовый заказ
                </a>
                <a
                  href="/delivery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  Доставка
                </a>
                <a
                  href="#brands"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  Бренды
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  О нас
                </a>
                <a
                  href="/contacts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  Контакты
                </a>
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

        <section className="relative min-h-[800px] overflow-hidden bg-black px-5 pb-12 pt-24 lg:px-6 lg:pt-24">
          <div
            className="absolute left-1/2 top-0 h-full w-full max-w-[1780px] -translate-x-1/2 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />

          <div className="absolute inset-y-0 left-0 w-[16vw] bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[16vw] bg-gradient-to-l from-black to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/58 to-black/12" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(37,217,255,0.18),transparent_32%),radial-gradient(circle_at_82%_54%,rgba(139,92,246,0.20),transparent_32%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="max-w-[620px] pt-10 lg:pt-14">
              <div className="mb-6 text-base font-black uppercase tracking-[0.14em] text-cyan-200 md:text-lg">
                B2B ДИСТРИБЬЮТОР №1
              </div>

              <h1 className="text-[46px] font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl xl:text-[76px]">
                <span className="block text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.18)]">
                  Галактика
                </span>
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  оптовые поставки
                </span>
                <span className="block text-white">vape продукции</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-zinc-200 md:text-xl">
                Оригинальная продукция от топовых брендов с гарантией и быстрой
                отгрузкой по всей России.
              </p>

              <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/35 bg-cyan-400/10 text-2xl text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                    ⚡
                  </div>
                  <div>
                    <div className="font-black">Отгрузка сегодня</div>
                    <div className="text-xs text-zinc-400">
                      При заказе до 15:00
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/35 bg-cyan-400/10 text-2xl text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                    🛡
                  </div>
                  <div>
                    <div className="font-black">Только оригинал</div>
                    <div className="text-xs text-zinc-400">100% гарантия</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/35 bg-violet-400/10 text-2xl text-violet-200 shadow-[0_0_30px_rgba(139,92,246,0.25)]">
                    📦
                  </div>
                  <div>
                    <div className="font-black">Склад в Москве</div>
                    <div className="text-xs text-zinc-400">
                      Более 25 000 товаров
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  onClick={openLead}
                  className="group relative overflow-hidden rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-8 py-5 text-lg font-black shadow-[0_0_45px_rgba(34,211,238,0.28)] transition hover:scale-[1.03] hover:shadow-[0_0_65px_rgba(34,211,238,0.4)]"
                >
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative">Получить оптовый прайс ✈</span>
                </button>

                <a
                  href="/catalog"
                  className="group rounded-[20px] border border-violet-400/45 bg-black/35 px-8 py-5 text-lg font-bold backdrop-blur-xl transition hover:border-cyan-400/60 hover:bg-white/5 hover:shadow-[0_0_35px_rgba(34,211,238,0.16)]"
                >
                  Перейти в каталог
                  <span className="ml-4 transition group-hover:ml-6">→</span>
                </a>
              </div>
            </div>

            <div className="relative z-20 mt-16 grid overflow-hidden rounded-[24px] border border-white/10 bg-black/35 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
              {stats.map((item, index) => (
                <div
                  key={item.value}
                  className={`relative flex items-center gap-4 p-6 ${
                    index !== stats.length - 1
                      ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                      : ""
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-black/45 text-2xl shadow-[0_0_28px_rgba(34,211,238,0.16)]">
                    {item.icon}
                  </div>

                  <div>
                    <div className="text-2xl font-black lg:text-3xl">
                      {item.value}
                    </div>
                    <div className="text-sm text-zinc-400">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="brands" className="relative z-10 px-5 pb-16 pt-10 lg:px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.10),transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(234,179,8,0.08),transparent_26%)]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                  Premium brands
                </div>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  Популярные бренды
                </h2>
              </div>

              <a
                href="/catalog"
                className="hidden items-center gap-3 text-sm font-bold text-cyan-300 transition hover:text-white md:flex"
              >
                Смотреть все бренды
                <span>→</span>
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {brandCards.map((brand) => (
                <a
                  href={brand.href}
                  key={brand.name}
                  className={`group relative overflow-hidden rounded-[28px] border bg-white/[0.035] shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.055] hover:shadow-[0_0_75px_rgba(34,211,238,0.18)] ${brand.accent}`}
                >
                  <div className="relative aspect-[3.8/5] overflow-hidden">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90" />
                    <div className="absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <div
                        className={`flex items-center justify-center rounded-full border bg-black/55 px-5 py-3 text-sm font-black backdrop-blur-xl transition group-hover:bg-black/70 group-hover:shadow-[0_0_35px_rgba(255,255,255,0.12)] ${brand.button}`}
                      >
                        Смотреть ассортимент
                        <span className="ml-4 transition group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-5 py-10 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-violet-300">
                  Best sellers
                </div>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  Хиты продаж
                </h2>
              </div>

              <a
                href="/catalog?status=Хиты"
                className="hidden items-center gap-3 text-sm font-bold text-cyan-300 transition hover:text-white md:flex"
              >
                Смотреть все хиты
                <span>→</span>
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {hitProducts.map((product) => (
                <div
                  key={product.name}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-black shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-400/35 hover:shadow-[0_0_60px_rgba(34,211,238,0.18)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                    <div className="absolute right-3 top-3 z-20 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-400 px-3 py-1 text-xs font-black shadow-[0_0_24px_rgba(34,211,238,0.24)]">
                      {product.tag}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-20 p-1.5">
                      <div className="rounded-[16px] border border-white/10 bg-black/45 p-2 shadow-[0_0_22px_rgba(0,0,0,0.42)] backdrop-blur-md">
                        <div className="mb-0.5 text-[10px] font-bold leading-none text-emerald-400">
                          ⊕ в наличии
                        </div>

                        <h3 className="mb-1.5 truncate text-[11px] font-black leading-tight">
                          {product.name}
                        </h3>

                        <a
                          href={product.href}
                          className="block w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[11px] font-black transition hover:border-cyan-400/45 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.14)]"
                        >
                          В каталог <span className="ml-2">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-5 py-10 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                  Product catalog
                </div>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  Каталог продукции
                </h2>
              </div>

              <a
                href="/catalog"
                className="hidden items-center gap-3 text-sm font-bold text-cyan-300 transition hover:text-white md:flex"
              >
                Перейти в каталог
                <span>→</span>
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {categories.map((category) => (
                <a
                  key={category.title}
                  href={category.href}
                  className={`group relative overflow-hidden rounded-[28px] border bg-black shadow-2xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.03] hover:shadow-[0_0_75px_rgba(34,211,238,0.17)] ${category.accent}`}
                >
                  <div className="relative aspect-[4/5.35] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-[1.045] group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/18 to-transparent" />
                    <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />

                    <div className="absolute bottom-0 left-0 right-0 z-20 p-2">
                      <div className="rounded-[16px] border border-white/10 bg-black/46 p-2 shadow-[0_0_24px_rgba(0,0,0,0.48)] backdrop-blur-md">
                        <div className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-200/70">
                          {category.count}
                        </div>

                        <h3 className="mb-1.5 text-[16px] font-black leading-tight">
                          {category.title}
                        </h3>

                        <div
                          className={`flex items-center justify-between rounded-full border bg-black/35 px-3 py-1.5 text-[10px] font-black transition group-hover:bg-black/60 ${category.button}`}
                        >
                          Смотреть
                          <span className="transition group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative z-10 px-5 py-16 lg:px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.13),transparent_30%),radial-gradient(circle_at_88%_30%,rgba(139,92,246,0.12),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0),rgba(8,47,73,0.12),rgba(0,0,0,0))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                Why galaxy
              </div>
              <h2 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Почему магазины выбирают ГАЛАКТИКУ
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                Мы не перегружаем партнёра лишними действиями: даём актуальный
                прайс, помогаем собрать ходовой ассортимент и быстро ведём заказ
                до отгрузки.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
              <div className="group relative min-h-[520px] overflow-hidden rounded-[46px] border border-white/10 bg-black shadow-[0_0_110px_rgba(34,211,238,0.10)]">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-50"
                  style={{ backgroundImage: "url('/hero-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/18 blur-[120px]" />
                <div className="absolute bottom-[-160px] right-[-120px] h-[480px] w-[480px] rounded-full bg-violet-500/18 blur-[130px]" />
                <div className="absolute right-8 top-8 hidden text-[130px] font-black leading-none text-white/[0.035] lg:block">
                  B2B
                </div>

                <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-between p-7 md:p-10">
                  <div>
                    <div className="mb-6 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
                      Supply system
                    </div>
                    <h3 className="max-w-2xl text-4xl font-black leading-[1.02] md:text-6xl">
                      Оптовая закупка без хаоса и долгих переписок
                    </h3>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
                      Прайс, наличие, хиты продаж, документы, сборка заказа и
                      связь с менеджером — в одном понятном процессе.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[24px] border border-cyan-400/18 bg-cyan-400/10 p-5 backdrop-blur-xl">
                      <div className="text-3xl font-black text-cyan-100">
                        25 000+
                      </div>
                      <div className="mt-1 text-sm leading-snug text-zinc-300">
                        позиций на складе
                      </div>
                    </div>
                    <div className="rounded-[24px] border border-violet-400/18 bg-violet-400/10 p-5 backdrop-blur-xl">
                      <div className="text-3xl font-black text-violet-100">
                        15:00
                      </div>
                      <div className="mt-1 text-sm leading-snug text-zinc-300">
                        ориентир быстрой отгрузки
                      </div>
                    </div>
                    <div className="rounded-[24px] border border-emerald-400/18 bg-emerald-400/10 p-5 backdrop-blur-xl">
                      <div className="text-3xl font-black text-emerald-100">
                        20к
                      </div>
                      <div className="mt-1 text-sm leading-snug text-zinc-300">
                        старт оптового заказа
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                {reasons.slice(0, 4).map((reason, index) => (
                  <div
                    key={reason.title}
                    className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.055] hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-400/15" />
                    <div className="relative flex gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-black/55 text-2xl shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                        {reason.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <h3 className="text-xl font-black leading-tight">
                            {reason.title}
                          </h3>
                          <span className="text-xs font-black text-cyan-200/45">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="leading-relaxed text-zinc-400">
                          {reason.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="terms" className="relative z-10 px-5 pb-8 pt-4 lg:px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_82%_75%,rgba(139,92,246,0.12),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-black/70 p-6 shadow-[0_0_100px_rgba(34,211,238,0.10)] backdrop-blur-xl md:p-8 lg:p-10">
              <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/12 blur-[110px]" />
              <div className="absolute -right-32 bottom-[-120px] h-96 w-96 rounded-full bg-violet-500/14 blur-[120px]" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

              <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-violet-300">
                    Fast start
                  </div>

                  <h2 className="max-w-xl text-3xl font-black leading-tight md:text-5xl">
                    От заявки до первой отгрузки — без сложного онбординга
                  </h2>

                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
                    Новый партнёр быстро получает прайс, наличие, помощь с
                    подбором ассортимента и понятный маршрут до первой закупки.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={openLead}
                      className="group relative overflow-hidden rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-8 py-5 text-lg font-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition hover:scale-[1.03] hover:shadow-[0_0_70px_rgba(34,211,238,0.38)]"
                    >
                      <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                      <span className="relative">Получить оптовый прайс ✈</span>
                    </button>

                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[20px] border border-cyan-400/30 bg-white/[0.03] px-8 py-5 text-lg font-black transition hover:border-cyan-300/60 hover:bg-white/[0.06] hover:shadow-[0_0_35px_rgba(34,211,238,0.14)]"
                    >
                      Написать менеджеру
                    </a>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-xl md:p-6">
                  <div className="absolute left-10 top-12 bottom-12 hidden w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/30 to-cyan-300/0 md:block" />

                  <div className="relative space-y-4">
                    {cooperationSteps.map((step) => (
                      <div
                        key={step.number}
                        className="group relative flex gap-4 rounded-[26px] border border-white/10 bg-black/45 p-4 transition duration-500 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.055]"
                      >
                        <div
                          className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-2xl shadow-2xl ${step.accent}`}
                        >
                          {step.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center justify-between gap-3">
                            <h3 className="text-xl font-black leading-tight">
                              {step.title}
                            </h3>
                            <span className="text-xs font-black text-cyan-200/45">
                              {step.number}
                            </span>
                          </div>

                          <p className="leading-relaxed text-zinc-400">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[26px] border border-cyan-400/18 bg-cyan-400/10 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200/60">
                    Условия
                  </div>
                  <div className="mt-2 text-2xl font-black">от 20 000 ₽</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    комфортный старт для первой закупки
                  </div>
                </div>

                <div
                  id="delivery"
                  className="rounded-[26px] border border-orange-400/18 bg-orange-400/10 p-5"
                >
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-orange-200/60">
                    Доставка
                  </div>
                  <div className="mt-2 text-2xl font-black">Москва → РФ</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    отправка удобным способом
                  </div>
                </div>

                <div
                  id="contacts"
                  className="rounded-[26px] border border-violet-400/18 bg-violet-400/10 p-5"
                >
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-violet-200/60">
                    Связь
                  </div>
                  <div className="mt-2 text-2xl font-black">Telegram</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    прайс, наличие и сбор заказа
                  </div>
                </div>

                <div className="rounded-[26px] border border-emerald-400/18 bg-emerald-400/10 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200/60">
                    Документы
                  </div>
                  <div className="mt-2 text-2xl font-black">для бизнеса</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    нужный пакет для партнёров
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-5 pb-24 pt-2 lg:px-6">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-cyan-400/20 bg-gradient-to-r from-violet-950/40 via-black to-cyan-950/35 p-7 shadow-[0_0_90px_rgba(34,211,238,0.14)] backdrop-blur-xl md:p-8">
            <div className="absolute left-1/2 top-0 h-72 w-[75%] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[90px]" />
            <div className="absolute -bottom-24 right-[-80px] h-72 w-72 rounded-full bg-violet-500/18 blur-[90px]" />
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/80">
                  Start partnership
                </div>
                <h2 className="text-3xl font-black leading-tight md:text-4xl">
                  Готовы к сотрудничеству?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
                  Оставьте заявку — отправим актуальный прайс, наличие и поможем
                  собрать первый оптовый заказ под формат вашего магазина.
                </p>
              </div>

              <div className="w-full shrink-0 lg:w-auto">
                <button
                  onClick={openLead}
                  className="group relative w-full overflow-hidden rounded-[22px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-10 py-5 text-lg font-black shadow-[0_0_50px_rgba(34,211,238,0.28)] transition hover:scale-[1.03] hover:shadow-[0_0_75px_rgba(34,211,238,0.42)] lg:w-auto"
                >
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative">Получить оптовый прайс ✈</span>
                </button>

                <div className="mt-3 text-center text-xs text-zinc-400">
                  ⊙ Ответим в течение 5 минут
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-10 border-t border-white/10 bg-black px-5 pb-10 pt-12 lg:px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.10),transparent_28%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-8 rounded-[34px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-xl md:p-8 lg:grid-cols-[1.25fr_0.9fr_0.9fr_1fr]">
              <div>
                <a href="/" className="inline-flex items-center gap-3">
                  <div className="relative h-12 w-12">
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
                    <div className="text-xl font-black uppercase tracking-[0.1em]">
                      ГАЛАКТИКА
                    </div>
                    <div className="-mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-400 sm:text-[11px] sm:tracking-[0.18em]">
                      оптовые поставки
                    </div>
                  </div>
                </a>

                <p className="mt-5 max-w-sm leading-relaxed text-zinc-400">
                  Оптовые поставки vape-продукции для вейп-шопов, табачных
                  магазинов, сетей и оптовых клиентов.
                </p>

                <div className="mt-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                  B2B only · 18+
                </div>
              </div>

              <div>
                <div className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-cyan-300/80">
                  Навигация
                </div>

                <div className="space-y-3 text-sm font-bold text-zinc-300">
                  <a href="/catalog" className="block transition hover:text-cyan-300">
                    Каталог
                  </a>
                  <a href="/wholesale" className="block transition hover:text-cyan-300">
                    Оптовый заказ
                  </a>
                  <a href="/delivery" className="block transition hover:text-cyan-300">
                    Доставка
                  </a>
                  <a href="#brands" className="block transition hover:text-cyan-300">
                    Бренды
                  </a>
                  <a href="/contacts" className="block transition hover:text-cyan-300">
                    Контакты
                  </a>
                </div>
              </div>

              <div>
                <div className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-violet-300/80">
                  Работаем
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-zinc-500">Склад</div>
                    <div className="font-black">Москва</div>
                  </div>

                  <div>
                    <div className="text-sm text-zinc-500">Минимальный заказ</div>
                    <div className="font-black">от 20 000 ₽</div>
                  </div>

                  <div>
                    <div className="text-sm text-zinc-500">Отправка</div>
                    <div className="font-black">по всей России</div>
                  </div>
                </div>
              </div>

              <div id="contacts">
                <div className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-cyan-300/80">
                  Связь
                </div>

                <p className="mb-5 leading-relaxed text-zinc-400">
                  Напишите менеджеру, чтобы получить актуальный прайс, наличие,
                  новинки и условия сотрудничества.
                </p>

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-[20px] border border-cyan-400/25 bg-cyan-400/10 px-5 py-4 font-black text-cyan-100 shadow-[0_0_35px_rgba(34,211,238,0.12)] transition hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:shadow-[0_0_50px_rgba(34,211,238,0.22)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-400">
                    ✈
                  </span>
                  Написать в Telegram
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs leading-relaxed text-zinc-500 md:flex-row md:items-center">
              <div>
                © 2026 ГАЛАКТИКА. Информация предназначена для совершеннолетних
                B2B-клиентов.
              </div>

              <div className="max-w-xl md:text-right">
                Материалы сайта носят информационный характер и не являются
                публичной офертой. Продажа несовершеннолетним запрещена.
              </div>
            </div>
          </div>
        </footer>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-50 hidden rounded-full border border-cyan-400/25 bg-black/75 p-3 shadow-[0_0_28px_rgba(34,211,238,0.25)] backdrop-blur-xl transition hover:scale-105 md:block"
          aria-label="Написать в Telegram"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 text-lg">
              ✈
            </div>

            <div className="pr-2">
              <div className="text-[10px] text-zinc-400">Telegram</div>
              <div className="text-sm font-bold">Написать менеджеру</div>
            </div>
          </div>
        </a>
      </main>
    </>
  );
}
