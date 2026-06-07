type Product = {
  id: number;
  brand: string;
  category: string;
  name: string;
  slug: string;
  hit: boolean;
  isNew: boolean;
  image: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-zinc-900 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-fuchsia-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.25)]">
      <div className="aspect-square rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm">
        Фото
      </div>

      <div className="mt-4 flex gap-2">
        {product.hit && (
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
            🔥 Хит
          </span>
        )}

        {product.isNew && (
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
            ⭐ Новинка
          </span>
        )}
      </div>

      <div className="mt-4 text-zinc-400 text-sm">
        {product.brand}
      </div>

      <h3 className="mt-1 text-xl font-bold text-white">
        {product.name}
      </h3>

      <div className="mt-5">
        <button className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 py-3 font-bold transition-all hover:scale-[1.02]">
          🚀 Получить оптовую цену
        </button>
      </div>
    </div>
  );
}
