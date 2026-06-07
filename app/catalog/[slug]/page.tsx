'use client';

import type { Product } from '../../../data/products';
import { products } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';

const sectionSpecs: Record<string, Array<{ label: string; value: string }>> = {
  'Aegis Nano 3': [
    { label: 'Мощность', value: '5–100 Вт' },
    { label: 'Аккумулятор', value: '2×18650 / 21700' },
    { label: 'Емкость бака', value: '5.5 мл' },
    { label: 'Защита', value: 'IP68, ударопрочный корпус' },
  ],
  'Hero 5': [
    { label: 'Мощность', value: '5–95 Вт' },
    { label: 'Аккумулятор', value: '2×18650' },
    { label: 'Емкость бака', value: '4.5 мл' },
    { label: 'Дисплей', value: '1.08"' },
  ],
  'Sonder Q2': [
    { label: 'Мощность', value: '5–45 Вт' },
    { label: 'Аккумулятор', value: '1350 мА·ч' },
    { label: 'Емкость картриджа', value: '4.5 мл' },
    { label: 'Зарядка', value: 'USB-C 1.5A' },
  ],
  'Wenax Q2': [
    { label: 'Мощность', value: '5–40 Вт' },
    { label: 'Аккумулятор', value: '1250 мА·ч' },
    { label: 'Ёмкость', value: '3.0 мл' },
    { label: 'Форма', value: 'Компактный pod' },
  ],
};

const sectionHighlights: Record<string, string[]> = {
  'Aegis Nano 3': [
    'Защита IP68 и ударопрочный корпус для активной эксплуатации.',
    'Готов к большому опту с доступом к расширенной линейке расцветок.',
    'Высокая мощность и исключительная стабильность работы.',
  ],
  'Hero 5': [
    'Премиальная серия с фирменными цветами и расширенной комплектацией.',
    'Быстрый выход на мощность и полный контроль через экран.',
    'Идеально для розничных и оптовых предложений.',
  ],
  'Sonder Q2': [
    'Удобный pod-формат с длительным временем автономной работы.',
    'Яркий дизайн и качественная сборка для массовых продаж.',
    'Оптимальная цена для крупных закупок.',
  ],
  'Wenax Q2': [
    'Компактный премиум для минималистичных коллекций.',
    'Стабильная подача пара и простота в обслуживании.',
    'Лучшее решение для подарочных наборов и промо.',
  ],
};

const fallbackSpecs = [
  { label: 'Мощность', value: '5–95 Вт' },
  { label: 'Аккумулятор', value: 'до 21700' },
  { label: 'Емкость', value: '4–6 мл' },
  { label: 'Особенность', value: 'Премиум-сборка' },
];

const telegramLink = (text: string) =>
  `https://t.me/Galaxy_Stan?text=${encodeURIComponent(text)}`;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white">
        <section className="px-5 py-20">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl">
            <h1 className="text-4xl font-black">Товар не найден</h1>
            <p className="mt-4 text-zinc-400">Попробуйте вернуться в каталог и выбрать другой товар.</p>
          </div>
        </section>
      </main>
    );
  }

  const specs = sectionSpecs[product.section] ?? fallbackSpecs;
  const highlights = sectionHighlights[product.section] ?? [
    'Высокая надёжность и премиальный стиль для B2B-предложений.',
    'Готов к большим закупкам и презентациям.',
    'Оригинальная продукция с гарантией качества.',
  ];

  const related = products.filter(
    (item) => item.section === product.section && item.slug !== product.slug
  );
  const extraRelated = related.length
    ? related.slice(0, 4)
    : products.filter((item) => item.brand === product.brand && item.slug !== product.slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-5 py-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_30%)]" />

        <div className="relative mx-auto max-w-[1500px]">
          <a href="/catalog" className="text-sm text-cyan-300 hover:text-cyan-200">
            ← Назад в каталог
          </a>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(15,23,42,0.35)] backdrop-blur-3xl">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.95fr]">
              <div className="space-y-8">
                <div className="flex flex-wrap gap-3">
                  {product.isHit && (
                    <span className="rounded-full bg-fuchsia-500/15 px-4 py-2 text-sm font-semibold text-fuchsia-300">
                      🔥 Хит
                    </span>
                  )}
                  {product.isNew && (
                    <span className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-300">
                      ⭐ Новинка
                    </span>
                  )}
                  {product.inStock && (
                    <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
                      🟢 В наличии
                    </span>
                  )}
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  {product.name}
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
                  Премиальная страница продукта для профессиональных закупок: стильный дизайн, ключевые спецификации и быстрый контакт менеджера.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href={telegramLink(`Здравствуйте! Интересует товар: ${product.name}. Прошу отправить оптовые условия.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[56px] items-center justify-center rounded-3xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-4 text-base font-black text-white transition hover:scale-[1.02]"
                  >
                    🚀 Получить оптовую цену
                  </a>
                  <a
                    href={telegramLink(`Здравствуйте! Хочу заказать образец ${product.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[56px] items-center justify-center rounded-3xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:border-cyan-400/30"
                  >
                    ✨ Заказать образец
                  </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
                    <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">Секция</div>
                    <div className="mt-2 text-xl font-black text-white">{product.section}</div>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
                    <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">Бренд</div>
                    <div className="mt-2 text-xl font-black text-white">{product.brand}</div>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-5">
                    <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">Поставка</div>
                    <div className="mt-2 text-xl font-black text-white">Склад Москва</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-[0_0_45px_rgba(217,70,239,0.18)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_60%)]" />
                  <div className="relative flex min-h-[420px] items-end justify-center overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/95 p-6">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_75%)]" />
                    <div className="relative z-10 flex h-full w-full flex-col justify-between gap-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase text-cyan-200">
                          Premium
                        </span>
                        <span className="text-sm text-zinc-400">{product.brand}</span>
                      </div>
                      <div className="grid gap-3">
                        <div className="rounded-[28px] bg-gradient-to-br from-fuchsia-600/15 via-cyan-500/10 to-transparent p-6 text-white shadow-[0_20px_70px_rgba(79,70,229,0.18)]">
                          <div className="text-sm uppercase text-zinc-400">Визуализация</div>
                          <div className="mt-4 text-3xl font-black">{product.section}</div>
                        </div>
                        <div className="rounded-[28px] bg-zinc-900/90 p-5 text-sm text-zinc-300">
                          <div className="text-zinc-200">Детали</div>
                          <p className="mt-2">Премиум-продукт для профессиональных закупок и ключевых клиентов в B2B-сегменте.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                  <div className="text-sm uppercase tracking-[0.24em] text-cyan-300">Почему стоит выбрать</div>
                  <ul className="mt-5 space-y-3 text-sm text-zinc-200">
                    {highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Технические спецификации</p>
                    <h2 className="mt-3 text-3xl font-black">Подробный профиль</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-zinc-200">Готово к опту</div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {specs.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                      <div className="text-sm text-zinc-400">{item.label}</div>
                      <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="text-sm uppercase tracking-[0.24em] text-cyan-300">Специальное предложение</div>
                <div className="mt-6 space-y-5 text-zinc-300">
                  <div className="rounded-3xl bg-zinc-950/90 p-5">
                    <div className="text-sm text-zinc-400">Бонусы оптовикам</div>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                      <li>• Персональный менеджер</li>
                      <li>• Быстрая отгрузка со склада</li>
                      <li>• Доступ к эксклюзивному прайсу</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-cyan-500/10 bg-cyan-500/5 p-5">
                    <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">Гарантия</div>
                    <p className="mt-2 text-sm text-cyan-100">Оригинальная продукция с подтверждённой партией и актуальными поставками.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Рекомендуем</p>
                  <h2 className="mt-3 text-3xl font-black">Похожие товары</h2>
                </div>
                <p className="text-sm text-zinc-400">Смотрите похожие предложения в премиум-сегменте.</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {extraRelated.map((item) => (
                  <ProductCard key={item.slug} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
