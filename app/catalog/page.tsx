'use client';

import { useMemo, useState } from 'react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/catalog/ProductCard';

const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/,/g, '.')
    .replace(/ом/g, 'ohm')
    .replace(/[^a-zа-я0-9.\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const brands = ['Все', ...Array.from(new Set(products.map((p) => p.brand)))];
const categories = ['Все', ...Array.from(new Set(products.map((p) => p.category)))];

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('Все');
  const [category, setCategory] = useState('Все');

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    const searchWords = q.split(/\s+/).filter(Boolean);

    return products.filter((product) => {
      const searchableText = normalizeSearch(
        [product.name, product.brand, product.category, product.section].join(' ')
      );

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
      <section className="relative overflow-hidden px-5 pb-16 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.22),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.14),transparent_32%)]" />

        <div className="relative mx-auto max-w-[1500px]">
          <div className="text-center">
            <a
              href="/"
              className="mb-8 inline-flex text-sm font-bold text-zinc-500 transition hover:text-cyan-300"
            >
              ← На главную
            </a>

            <h1 className="bg-gradient-to-r from-fuchsia-400 via-blue-300 to-cyan-300 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl">
              КАТАЛОГ
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-zinc-300">
              Оригинальные устройства, картриджи и испарители для B2B-клиентов.
              Москва. Отгрузка по России.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm font-bold">
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
                🔥 {products.length} товаров
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
                🚚 Отгрузка из Москвы
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
                ✅ Только оригинал
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
                💰 Цена по запросу
              </span>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[32px] border border-white/10 bg-black/70 p-4 shadow-[0_0_60px_rgba(217,70,239,0.12)] backdrop-blur-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Что ищете? Например: XROS 5, Hero 5, GTX 0.8..."
              className="h-16 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 text-base font-bold text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50"
            />

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="h-13 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-bold text-white outline-none transition focus:border-cyan-400/50"
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
                className="h-13 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-bold text-white outline-none transition focus:border-cyan-400/50"
              >
                {categories.map((item) => (
                  <option key={item} value={item} className="bg-zinc-950">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5">
            <div className="flex flex-wrap gap-3">
              {['Все', 'Vaporesso', 'Geekvape', 'Voopoo', 'Smoant'].map((item) => (
                <button
                  key={item}
                  onClick={() => setBrand(item)}
                  className={`rounded-full px-5 py-2 text-sm font-black transition ${
                    brand === item
                      ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white'
                      : 'border border-white/10 bg-white/[0.05] text-zinc-300 hover:border-cyan-400/40 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span>
                Найдено: <span className="font-black text-white">{filtered.length}</span>
              </span>

              <button
                onClick={() => {
                  setQuery('');
                  setBrand('Все');
                  setCategory('Все');
                }}
                className="font-bold text-cyan-300 transition hover:text-cyan-200"
              >
                Сбросить
              </button>
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-[28px] border border-fuchsia-500/20 bg-fuchsia-500/10 p-8 text-center">
              <div className="mb-4 text-5xl">🔍</div>
              <h3 className="mb-3 text-2xl font-black">Ничего не найдено</h3>
              <p className="mb-6 text-zinc-400">
                Попробуйте изменить запрос или напишите нам — поможем найти нужную позицию.
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <a
        href="https://t.me/Galaxy_Stan?text=Здравствуйте! Хочу получить актуальный оптовый прайс ГАЛАКТИКА."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-4 font-black shadow-[0_0_35px_rgba(217,70,239,0.45)] transition hover:scale-105"
      >
        💬 Получить прайс
      </a>
    </main>
  );
}