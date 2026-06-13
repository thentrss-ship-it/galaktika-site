type CatalogFiltersProps = {
  query: string;
  brand: string;
  category: string;
  brands: string[];
  categories: string[];
  onQueryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
};

const quickSearch = [
  'картридж xros',
  'xros 0.6',
  'hero 5',
  'gtx 0.8',
  'corex 3.0',
];

export function CatalogFilters({
  query,
  brand,
  category,
  brands,
  categories,
  onQueryChange,
  onBrandChange,
  onCategoryChange,
  onReset,
}: CatalogFiltersProps) {
  return (
    <>
      <div className="sticky top-0 z-20 mt-8 grid gap-4 rounded-[28px] border border-white/10 bg-black/80 p-4 backdrop-blur-2xl md:grid-cols-[1.5fr_0.8fr_0.8fr]">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Что ищете? Например: XROS 0.6, Hero 5, GTX"
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
        />

        <select
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
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
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
        >
          {categories.map((item) => (
            <option key={item} value={item} className="bg-zinc-950">
              {item}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2 text-xs text-zinc-400 md:col-span-3">
          {quickSearch.map((item) => (
            <button
              key={item}
              onClick={() => onQueryChange(item)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-cyan-500/40 hover:text-cyan-300"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-400">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
          Без публичных цен
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
          Заявка в Telegram
        </span>

        <button
          onClick={onReset}
          className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300 transition hover:bg-cyan-500/20"
        >
          Сбросить фильтры
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {['Все', 'Geekvape', 'Vaporesso', 'Voopoo', 'Smoant'].map((item) => (
          <button
            key={item}
            onClick={() => onBrandChange(item)}
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
    </>
  );
}

export default CatalogFilters;