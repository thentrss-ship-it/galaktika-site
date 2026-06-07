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

      const matchesBrand = brand === 'Все' || product.brand === brand;
      const matchesCategory = category === 'Все' || product.category === category;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [query, brand, category]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.22),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <a href="/" className="text-sm text-cyan-300 hover:text-cyan-200">← На главную</a>

          <div className="mt-10 max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-300">
              B2B Catalog
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Каталог
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">{' '}ГАЛАКТИКА</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              {products.length} позиций из актуального прайса. Цены не публикуем — оставьте заявку, и менеджер отправит оптовые условия, наличие и акции.
            </p>
          </div>

          <div className="mt-10 grid gap-4 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Что ищете? Например: XROS 0.6, Hero 5, GTX"
              className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
            />

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
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
              className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
            >
              {categories.map((item) => (
                <option key={item} value={item} className="bg-zinc-950">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Найдено: {filtered.length}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Без публичных цен</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Заявка в Telegram</span>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group flex min-h-[330px] flex-col rounded-[30px] border border-white/10 bg-zinc-950/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/40 hover:shadow-[0_0_45px_rgba(217,70,239,0.18)]"
              >
                <div className="flex h-28 items-center justify-center rounded-[24px] border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-4 text-center">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">{product.brand}</div>
                    <div className="mt-2 text-lg font-black text-white">{product.section}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.isHit && <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs text-fuchsia-300">🔥 Хит</span>}
                  {product.isNew && <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-300">⭐ Новинка</span>}
                  {product.inStock && <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">🟢 В наличии</span>}
                </div>

                <div className="mt-4 text-sm text-zinc-500">{product.category}</div>
                <h2 className="mt-2 line-clamp-3 text-xl font-black leading-tight">{product.name}</h2>

                <div className="mt-auto pt-6">
                  <a
                    href={`https://t.me/Galaxy_Stan?text=${encodeURIComponent(`Здравствуйте! Интересует оптовая цена: ${product.name}`)}`}
                    target="_blank"
                    className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-3 text-center font-bold transition hover:scale-[1.02]"
                  >
                    🚀 Получить цену
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
