'use client';

import { useMemo, useState } from 'react';
import { products } from '../../data/products';

const brands = ['Все', ...Array.from(new Set(products.map((p) => p.brand)))];
const categories = ['Все', ...Array.from(new Set(products.map((p) => p.category)))];

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('Все');
  const [category, setCategory] = useState('Все');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.section.toLowerCase().includes(q);

      return (
        matchesSearch &&
        (brand === 'Все' || product.brand === brand) &&
        (category === 'Все' || product.category === category)
      );
    });
  }, [query, brand, category]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-5 py-10 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.22),transparent_42%)]" />

        <div className="relative mx-auto max-w-[1500px]">
          <a href="/" className="text-sm text-cyan-300 hover:text-cyan-200">
            ← На главную
          </a>

          <div className="mt-8">
            <div className="mb-5 inline-flex rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-300">
              B2B Catalog
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Каталог
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                {' '}ГАЛАКТИКА
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">
              {products.length} позиций из актуального прайса. Цены не публикуем — оставьте заявку, и менеджер отправит оптовые условия.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              🔥 <span className="font-bold">{products.length}</span> товаров
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              🚚 Отгрузка из Москвы
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              ✅ Только оригинал
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              💰 Цена по запросу
            </div>
          </div>

          <div className="sticky top-0 z-20 mt-8 grid gap-4 rounded-[28px] border border-white/10 bg-black/80 p-4 backdrop-blur-2xl md:grid-cols-[1.5fr_0.8fr_0.8fr]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Что ищете? Например: XROS 0.6, Hero 5, GTX"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
            />

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
            >
              {brands.map((item) => (
                <option key={item} value={item} className="bg-zinc-950">
                  {item}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
            >
              {categories.map((item) => (
                <option key={item} value={item} className="bg-zinc-950">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Найдено: {filtered.length}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Без публичных цен
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Заявка в Telegram
            </span>
          </div>
<div className="mt-5 flex flex-wrap gap-3">
  {['Все', 'Geekvape', 'Vaporesso', 'Voopoo', 'Smoant'].map((item) => (
    <button
      key={item}
      onClick={() => setBrand(item)}
      className={`rounded-full px-5 py-2 text-sm font-bold transition ${
        brand === item
          ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white'
          : 'border border-white/10 bg-white/5 text-zinc-300 hover:border-fuchsia-500/40'
      }`}
    >
      {item}
    </button>
  ))}
</div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group flex min-h-[265px] flex-col rounded-[24px] border border-white/10 bg-zinc-950/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/40 hover:shadow-[0_0_35px_rgba(217,70,239,0.18)]"
              >
                <div className="flex h-20 items-center justify-center rounded-[20px] border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-3 text-center">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                      {product.brand}
                    </div>
                    <div className="mt-1 text-sm font-black text-white line-clamp-1">
                      {product.section}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.isHit && (
                    <span className="rounded-full bg-fuchsia-500/15 px-2.5 py-1 text-[11px] text-fuchsia-300">
                      🔥 Хит
                    </span>
                  )}
                  {product.isNew && (
                    <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-[11px] text-cyan-300">
                      ⭐ Новинка
                    </span>
                  )}
                  {product.inStock && (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-300">
                      🟢 В наличии
                    </span>
                  )}
                </div>

                <div className="mt-3 text-xs text-zinc-500">
                  {product.category}
                </div>

                <h2 className="mt-1 line-clamp-3 text-base font-black leading-tight">
                  {product.name}
                </h2>

                <div className="mt-auto pt-4">
                  <a
                    href={`https://t.me/Galaxy_Stan?text=${encodeURIComponent(
                      `Здравствуйте! Интересует товар:\n\n${product.name}\n\nПрошу отправить оптовые условия.`
                    )}`}
                    target="_blank"
                    className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-3 text-center text-sm font-black transition hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
                  >
                    🚀 Получить цену
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <a
  href="https://t.me/Galaxy_Stan?text=Здравствуйте! Хочу получить актуальный оптовый прайс ГАЛАКТИКА."
  target="_blank"
  className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-4 font-black shadow-[0_0_35px_rgba(217,70,239,0.45)] transition hover:scale-105"
>
  💬 Получить прайс
</a>
    </main>
  );
}