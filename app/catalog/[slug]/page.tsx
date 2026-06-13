import { products } from '../../../data/products';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-black px-5 py-32 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-black">Товар не найден</h1>

          <a
            href="/catalog"
            className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-4 font-black"
          >
            Вернуться в каталог
          </a>
        </div>
      </main>
    );
  }

  const imageSrc = `/products/${product.brand.toLowerCase()}/${product.slug}.webp`;

  const telegramText = encodeURIComponent(
    `Здравствуйте!

Интересует товар:
${product.name}

Хочу получить:
• оптовую цену
• наличие
• условия заказа`
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-5 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(217,70,239,0.18),transparent_35%),radial-gradient(circle_at_80%_55%,rgba(34,211,238,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href="/catalog"
            className="text-sm font-bold text-zinc-500 transition hover:text-cyan-300"
          >
            ← Назад в каталог
          </a>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-8 md:p-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_55%)]" />
              <div className="absolute bottom-16 left-1/2 h-16 w-56 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

              <img
                src={imageSrc}
                alt={product.name}
                className="relative z-10 mx-auto max-h-[520px] w-full object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,0.75)]"
              />
            </div>

            <div>
              <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.26em] text-cyan-300">
                {product.brand}
              </div>

              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.isHit && (
                  <span className="rounded-full bg-fuchsia-500/15 px-4 py-2 text-sm font-bold text-fuchsia-300">
                    🔥 Хит
                  </span>
                )}

                {product.isNew && (
                  <span className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-bold text-cyan-300">
                    ⭐ Новинка
                  </span>
                )}

                {product.inStock && (
                  <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                    ● В наличии
                  </span>
                )}

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-zinc-300">
                  {product.category}
                </span>
              </div>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Оригинальная продукция для B2B-клиентов. Отгрузка со склада в
                Москве, оптовые условия и наличие отправим по запросу.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-2xl">✅</div>
                  <div className="mt-2 text-sm font-bold">Оригинал</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-2xl">🚚</div>
                  <div className="mt-2 text-sm font-bold">Отгрузка РФ</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-2xl">💰</div>
                  <div className="mt-2 text-sm font-bold">Цена по запросу</div>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_0.8fr]">
                <a
                  href={`https://t.me/Galaxy_Stan?text=${telegramText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-7 py-5 text-center text-base font-black shadow-[0_0_35px_rgba(34,211,238,0.3)] transition hover:scale-[1.02]"
                >
                  💰 Получить оптовую цену
                </a>

                <a
                  href="/catalog"
                  className="flex justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-5 text-center text-base font-black transition hover:border-cyan-400/40"
                >
                  Смотреть ещё
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}