export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-6 pt-36 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_90%_60%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_10%_20%,rgba(217,70,239,0.12),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
        <h1 className="bg-gradient-to-r from-fuchsia-400 via-blue-300 to-cyan-300 bg-clip-text text-7xl font-black tracking-tight text-transparent md:text-8xl lg:text-9xl">
          ГАЛАКТИКА
        </h1>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-bold">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
            🔥 183+ товаров
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
            🚚 Отгрузка сегодня
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
            ✅ Только оригинал
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3">
            📍 Москва
          </span>
        </div>

        <p className="mt-10 max-w-3xl text-xl font-medium leading-relaxed text-zinc-300 md:text-2xl">
          Оптовые поставки оригинальных POD-систем, испарителей и картриджей
          для вейп-шопов, сетей и дистрибьюторов.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://t.me/Galaxy_Stan"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-10 py-5 text-lg font-black text-white shadow-[0_0_50px_rgba(34,211,238,0.35)] transition hover:scale-105"
          >
            🚀 Получить актуальный прайс за 1 минуту
          </a>

          <a
            href="/catalog"
            className="rounded-2xl border border-white/15 bg-white/10 px-10 py-5 text-lg font-black text-white transition hover:border-cyan-400/50 hover:bg-white/15"
          >
            📦 Смотреть каталог
          </a>
        </div>

        <div className="relative mt-24 w-full max-w-5xl">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

          <div className="mx-auto h-[360px] max-w-4xl rounded-t-[4rem] bg-gradient-to-t from-fuchsia-500/25 via-cyan-500/10 to-transparent blur-3xl" />

          <img
            src="/products/hero-device.png"
            alt="ГАЛАКТИКА — оптовые поставки vape-продукции"
            className="absolute bottom-0 left-1/2 max-h-[430px] w-auto -translate-x-1/2 object-contain"
          />
        </div>
      </div>
    </section>
  );
}