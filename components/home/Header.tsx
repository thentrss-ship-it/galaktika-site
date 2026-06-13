export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="text-3xl font-black tracking-tight text-white"
        >
          ГАЛАКТИКА
        </a>

        <nav className="hidden gap-10 text-sm font-semibold text-zinc-300 lg:flex">
          <a href="/" className="hover:text-cyan-300 transition">
            Главная
          </a>

          <a href="/catalog" className="hover:text-cyan-300 transition">
            Каталог
          </a>

          <a href="#" className="hover:text-cyan-300 transition">
            Бренды
          </a>

          <a href="#" className="hover:text-cyan-300 transition">
            Компания
          </a>

          <a href="#" className="hover:text-cyan-300 transition">
            Контакты
          </a>
        </nav>

        <a
          href="https://t.me/Galaxy_Stan"
          target="_blank"
          className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-5 py-3 text-sm font-black transition hover:scale-105"
        >
          Получить прайс
        </a>
      </div>
    </header>
  );
}