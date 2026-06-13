type Product = {
  id: string | number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  section?: string;
  isHit?: boolean;
  isNew?: boolean;
  inStock?: boolean;
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const telegramText = encodeURIComponent(
    `Здравствуйте!

Интересует товар:
${product.name}

Хочу получить:
• оптовую цену
• наличие
• условия заказа`
  );

  const imageSrc = `/products/${product.brand.toLowerCase()}/${product.slug}.webp`;

  return (
    <article className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-4 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_45px_rgba(34,211,238,0.22)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <a
        href={`/catalog/${product.slug}`}
        className="relative flex h-64 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-4 transition duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[inset_0_0_45px_rgba(34,211,238,0.12)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
<div className="absolute bottom-6 left-1/2 h-10 w-32 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-2xl" />
       <div className="absolute bottom-7 left-1/2 h-12 w-36 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-2xl" />
        <img
          src={imageSrc}
          alt={product.name}
          className="relative z-10 max-h-[215px] max-w-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] object-contain transition duration-500 group-hover:scale-[1.08] group-hover:drop-shadow-[0_25px_45px_rgba(34,211,238,0.25)]"
          onError={(e) => {
            e.currentTarget.src = "/products/placeholder.png";
          }}
        />
      </a>

      <div className="mt-3 flex min-h-[26px] flex-wrap gap-1.5">
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
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.18)]">
            ● В наличии
          </span>
        )}
      </div>

      <div className="mt-3 text-xs text-zinc-500">{product.category}</div>

      <a href={`/catalog/${product.slug}`}>
        <h2 className="mt-3 min-h-[58px] text-[18px] font-black leading-[1.15] transition group-hover:text-cyan-300">
          {product.name}
        </h2>
      </a>

      <div className="mt-3 inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-300">
        ✔ Оригинал
      </div>

      <div className="mt-auto grid gap-3 pt-5">
        <a
          href={`/catalog/${product.slug}`}
          className="flex w-full justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-zinc-200 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
        >
          Подробнее →
        </a>

        <a
          href={`https://t.me/Galaxy_Stan?text=${telegramText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-3 text-sm font-black transition hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
        >
          💰 Получить цену
        </a>
      </div>
    </article>
  );
}

export default ProductCard;