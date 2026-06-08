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
const searchWords = q.split(/\s+/).filter(Boolean);

return products.filter((product) => {
  const searchableText = [
    product.name,
    product.brand,
    product.category,
    product.section,
  ]
    .join(' ')
    .toLowerCase();

  const matchesSearch =
    searchWords.length === 0 ||
    searchWords.every((word) => searchableText.includes(word));

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
            <button
  onClick={() => {
    setQuery('');
    setBrand('Все');
    setCategory('Все');
  }}
  className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300 transition hover:bg-cyan-500/20"
>
  Сбросить фильтры
</button>
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
{filtered.length === 0 && (
  <div className="mt-10 rounded-[28px] border border-fuchsia-500/20 bg-fuchsia-500/10 p-8 text-center">
    <div className="text-5xl mb-4">🔍</div>

    <h3 className="text-2xl font-black mb-3">
      Ничего не найдено
    </h3>

    <p className="text-zinc-400 mb-6">
      Попробуйте изменить запрос или напишите нам — поможем найти нужную позицию по прайсу.
    </p>

    <button
      onClick={() => {
        setQuery('');
        setBrand('Все');
        setCategory('Все');
      }}
      className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-3 font-bold"
    >
      Сбросить фильтры
    </button>
  </div>
)}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
            {filtered.map((product) => (
              <article
              
                key={product.id}
                className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-4 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_45px_rgba(34,211,238,0.22)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%)]" />
                <a
  href={`/catalog/${product.slug}`}
  className="relative flex h-28 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-4 text-center transition group-hover:border-cyan-400/40"
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />

  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
  <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-2xl" />

  <div className="relative">
    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
      ✦
    </div>

    <div className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
      {product.brand}
    </div>

    <div className="mt-1 line-clamp-1 text-base font-black text-white">
      {product.section}
    </div>
  </div>
</a>

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

                <a href={`/catalog/${product.slug}`}>
  <h2 className="mt-1 line-clamp-3 text-base font-black leading-tight transition group-hover:text-cyan-300">
    {product.name}
  </h2>
</a>
<div className="mt-auto pt-4 grid gap-2">
  <a
    href={`/catalog/${product.slug}`}
    className="flex w-full justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-bold text-zinc-200 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
  >
    Подробнее
  </a>

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