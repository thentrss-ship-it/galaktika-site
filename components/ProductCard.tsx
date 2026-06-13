type CatalogProduct = {
  id?: string | number;
  slug?: string;
  name?: string;
  title?: string;
  brand?: string;
  category?: string;
  image?: string;
  imageUrl?: string;
  inStock?: boolean;
};

type ProductCardProps = {
  product?: CatalogProduct;
} & CatalogProduct;

export function ProductCard(props: ProductCardProps) {
  const product = props.product ?? props;

  const title = product.name ?? product.title ?? "Товар";
  const brand = product.brand ?? "GALAXY OPT";
  const category = product.category ?? "В наличии";
  const image = product.image ?? product.imageUrl;
  const href = product.slug ? `/catalog/${product.slug}` : "/catalog";

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black p-4 shadow-[0_0_40px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_60px_rgba(34,211,238,0.18)]">
      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-cyan-950/30 p-6">
        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm">
          ✦
        </div>

        <div className="flex h-44 items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              className="max-h-40 object-contain transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="text-5xl">📦</div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-3 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-black text-emerald-300">
          ● В наличии
        </div>

        <p className="text-xs font-bold text-zinc-500">{category}</p>

        <h3 className="mt-2 min-h-[48px] text-lg font-black leading-tight text-white">
          {title}
        </h3>

        <p className="mt-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
          {brand}
        </p>

        <a
          href={href}
          className="mt-5 flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-black text-white transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
        >
          Подробнее
        </a>
      </div>
    </article>
  );
}

export default ProductCard;