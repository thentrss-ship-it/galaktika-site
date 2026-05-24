export default function GalaktikaVapeSite() {
  const brands = [
    {
      name: 'Vaporesso',
      logo: 'VAPORESSO',
      accent: 'from-cyan-300 to-blue-500',
    },
    {
      name: 'Smoant',
      logo: 'SMOANT',
      accent: 'from-fuchsia-300 to-violet-500',
    },
    { name: 'Voopoo', logo: 'VOOPOO', accent: 'from-amber-200 to-orange-500' },
    { name: 'Geekvape', logo: 'GEEKVAPE', accent: 'from-lime-200 to-cyan-400' },
    { name: 'Rincoe', logo: 'RINCOE', accent: 'from-rose-300 to-fuchsia-500' },
  ];

  const products = [
    {
      name: 'Vaporesso XROS 5',
      desc: 'Новая компактная POD-система с отличной вкусопередачей.',
      image: '/xros5-banner.jpg',
    },
    {
      name: 'Smoant Pasito 3',
      desc: 'Мощное устройство с удобной настройкой.',
      image: '/pasito3-banner.webp',
    },
    {
      name: 'Geekvape Aegis Hero 5',
      desc: 'Защищенная POD-система для ежедневной работы.',
      image: '/hero5-banner.jpg',
    },
  ];

  const advantages = [
    '5+ лет на рынке',
    'Более 1000 клиентов',
    'Отгрузки по всей РФ',
    'Только оригинальная продукция',
    'Быстрая логистика',
    'Склад в Москве',
    'Минимальный заказ от 20.000₽',
    'Оплата: наличный / безналичный расчет / USDT',
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* SMOKE */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-[-120px] top-[38%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img
            src="/logo-galaktika.png"
            alt="GALAKTIKA"
            className="h-10 object-contain"
          />

          <div className="flex gap-3">
            <a
              href="https://t.me/Galaxy_Stan"
              target="_blank"
              className="px-5 py-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
            >
              Telegram
            </a>

            <a
              href="https://t.me/Galaxy_Stan"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold"
            >
              Запросить прайс
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 pt-44 pb-28 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-fuchsia-400 to-cyan-300 text-transparent bg-clip-text">
            ГАЛАКТИКА
          </h1>

          <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-10">
            Оптовые поставки POD-систем, расходников и оригинальных устройств
            для вейп-шопов, сетей и оптовиков.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://t.me/Galaxy_Stan"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 font-bold shadow-[0_0_35px_rgba(168,85,247,0.5)]"
            >
              Telegram
            </a>

            <a
              href="#catalog"
              className="px-8 py-4 rounded-2xl border border-fuchsia-500/30 bg-white/5"
            >
              Каталог
            </a>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          Бренды в наличии
        </h2>

        <div className="grid md:grid-cols-5 gap-5">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center"
            >
              <div
                className={`h-1 w-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${brand.accent}`}
              />

              <div className="text-2xl font-black tracking-[0.2em]">
                {brand.logo}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="catalog" className="px-6 py-16 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Популярные устройства
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="group rounded-[28px] border border-fuchsia-500/20 bg-black/60 p-8 hover:-translate-y-2 transition duration-500 hover:shadow-[0_0_55px_rgba(217,70,239,0.25)]"
              >
                <div className="h-56 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>

                <p className="text-zinc-400 mb-5">{product.desc}</p>

                <a
                  href="https://t.me/Galaxy_Stan"
                  target="_blank"
                  className="inline-flex rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-cyan-300 font-semibold"
                >
                  Уточнить наличие
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Почему нам доверяют
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl"
            >
              ✦ {item}
            </div>
          ))}
        </div>
      </section>

      {/* STOCK */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-fuchsia-400 to-cyan-300 text-transparent bg-clip-text">
          Склад и реальные поставки
        </h2>

        <p className="text-zinc-400 text-center mb-12">
          Работаем напрямую с поставками и поддерживаем постоянное наличие.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="/warehouse-1.jpg"
            className="rounded-[28px] h-[280px] object-cover"
          />

          <img
            src="/warehouse-2.jpg"
            className="rounded-[28px] h-[280px] object-cover"
          />

          <img
            src="/warehouse-3.jpg"
            className="rounded-[28px] h-[280px] object-cover"
          />
        </div>
      </section>

      {/* FLOATING BUTTON */}
      <a
        href="https://t.me/Galaxy_Stan"
        target="_blank"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="flex items-center gap-3 rounded-full bg-black/80 border border-fuchsia-500/30 backdrop-blur-xl px-6 py-4 shadow-[0_0_35px_rgba(168,85,247,0.35)]">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 flex items-center justify-center">
            ✈
          </div>

          <div className="hidden md:block">
            <div className="text-sm text-zinc-400">Telegram</div>
            <div className="font-bold">Написать менеджеру</div>
          </div>
        </div>
      </a>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 px-6 py-8 text-center text-zinc-500 text-sm">
        © 2026 ГАЛАКТИКА — POD SYSTEM STORE
      </footer>
    </div>
  );
}
