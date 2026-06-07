'use client'

import { useState, useEffect } from 'react'
export default function GalaktikaVapeSite() {
const [isAdult, setIsAdult] = useState(false)
const [isLeadOpen, setIsLeadOpen] = useState(false)
const [leadSent, setLeadSent] = useState(false)
const [loading, setLoading] = useState(false)

const [form, setForm] = useState({
  name: '',
  phone: '',
  city: '',
  shop: '',
  telegram: '',
})

const sendLead = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  setLoading(false)
  setLeadSent(true)
}

useEffect(() => {
  const accepted = localStorage.getItem('adult-confirmed')

  if (accepted === 'true') {
    setIsAdult(true)
  }
}, [])

const confirmAdult = () => {
  localStorage.setItem('adult-confirmed', 'true')
  setIsAdult(true)
}
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
<>
  {!isAdult && (
    <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-[36px] border border-fuchsia-500/20 bg-zinc-950 p-10 text-center shadow-[0_0_60px_rgba(217,70,239,0.25)]">

        <div className="text-7xl font-black mb-6 bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          18+
        </div>

        <h2 className="text-3xl font-black mb-6">
          Подтвердите возраст
        </h2>

        <p className="text-zinc-400 leading-relaxed mb-10">
          Сайт содержит информацию о никотиносодержащей продукции
          и предназначен только для совершеннолетних.
        </p>

        <button
          onClick={confirmAdult}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-black text-lg hover:scale-[1.02] transition-all duration-300"
        >
          Мне есть 18 лет
        </button>
      </div>
    </div>
  )}

  {isLeadOpen && (
    <div className="fixed inset-0 z-[998] bg-black/80 backdrop-blur-xl flex items-center justify-center px-6">
      <div className="relative max-w-xl w-full rounded-[36px] border border-fuchsia-500/20 bg-zinc-950 p-8 shadow-[0_0_80px_rgba(217,70,239,0.3)]">

        <button
          onClick={() => {
            setIsLeadOpen(false)
            setLeadSent(false)
          }}
          className="absolute top-5 right-5 text-zinc-500 hover:text-white text-2xl"
          aria-label="Закрыть форму"
        >
          ×
        </button>

        {!leadSent ? (
          <>
            <div className="text-sm tracking-[0.2em] uppercase text-fuchsia-300 mb-4">
              B2B ACCESS
            </div>

            <h2 className="text-4xl font-black mb-4">
              Получите доступ к оптовым ценам
            </h2>

            <p className="text-zinc-400 mb-8 leading-relaxed">
              Оставьте данные — менеджер отправит актуальное наличие, цены, новинки и условия сотрудничества.
            </p>

            <form onSubmit={sendLead} className="space-y-4">
              <input
                required
                placeholder="Имя *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition-colors"
              />

              <input
                required
                placeholder="Телефон *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition-colors"
              />

              <input
                required
                placeholder="Город *"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition-colors"
              />

              <input
                placeholder="Название магазина"
                value={form.shop}
                onChange={(e) => setForm({ ...form, shop: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition-colors"
              />

              <input
                placeholder="Telegram"
                value={form.telegram}
                onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-fuchsia-500 transition-colors"
              />

              <button
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-black text-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? 'Отправляем...' : '🚀 Получить доступ к оптовым ценам'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="text-6xl mb-6">✅</div>

            <h2 className="text-4xl font-black mb-4">
              Заявка отправлена
            </h2>

            <p className="text-zinc-400 mb-8">
              Менеджер уже получил заявку и скоро свяжется с вами.
            </p>

            <a
              href="https://t.me/Galaxy_Stan"
              target="_blank"
              className="inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold"
            >
              Написать в Telegram
            </a>
          </div>
        )}
      </div>
    </div>
  )}


    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* SMOKE */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-[-120px] top-[38%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      </div>

     {/* HEADER */}
<header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 via-cyan-500/5 to-fuchsia-500/5" />

  <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LOGO */}
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-fuchsia-500 blur-xl opacity-60 rounded-full" />

        <img
          src="/logo-galaktika.png"
          alt="ГАЛАКТИКА"
          className="relative h-11 w-11 object-contain"
        />
      </div>

      <div>
        <div className="text-lg font-black tracking-[0.25em] bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          ГАЛАКТИКА
        </div>

        <div className="text-xs text-white/40 tracking-[0.2em]">
          PREMIUM SUPPLIER
        </div>
      </div>
    </div>

    {/* BUTTONS */}
    <div className="flex gap-2 md:gap-3">

      <a
        href="https://t.me/Galaxy_Stan"
        target="_blank"
        className="hidden sm:flex group px-6 py-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
      >
        <span className="flex items-center gap-2">
          Telegram
        </span>
      </a>

      <button
        onClick={() => setIsLeadOpen(true)}
        className="group relative overflow-hidden px-4 md:px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(217,70,239,0.5)]"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        <span className="relative">
          Получить доступ
        </span>
      </button>

    </div>
  </div>
</header>
      <section className="relative px-6 pt-44 pb-28 text-center overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.16),transparent_45%)]" />

  <div className="relative max-w-6xl mx-auto">
    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-none">
  <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
    ГАЛАКТИКА
  </span>
</h1>

    <p className="text-zinc-300 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12">
      Оптовые поставки оригинальных POD-систем, испарителей и картриджей
      для вейп-шопов, сетей и дистрибьюторов.
    </p>

    <div className="flex gap-4 justify-center flex-wrap mb-16">
      <button
        onClick={() => setIsLeadOpen(true)}
        className="group relative overflow-hidden px-10 py-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(217,70,239,0.6)]"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative">🚀 Получить оптовые условия</span>
      </button>

      <a
        href="#catalog"
        className="px-10 py-5 rounded-2xl border border-fuchsia-500/20 bg-white/5 backdrop-blur-xl text-lg hover:border-fuchsia-500/40 transition-all duration-300"
      >
        Каталог
      </a>
    </div>

    <div className="relative max-w-6xl mx-auto">
      <div className="absolute inset-0 bg-fuchsia-500/20 blur-[120px] rounded-full" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative flex justify-center">
        <img
          src="/hero-device.png"
          alt="Vape Device"
          className="w-full max-w-5xl object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.45)]"
        />
      </div>
    </div>
  </div>
</section>

      {/* BRANDS */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-center mb-10">
          Бренды в наличии
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-500/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5" />

<div
  className={`relative h-1 w-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${brand.accent}`}
/>

              <div className="text-sm md:text-lg font-black tracking-[0.16em] whitespace-nowrap">
                {brand.logo}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
<section
  id="catalog"
  className="relative px-6 py-24 bg-gradient-to-b from-zinc-950 to-black overflow-hidden"
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.12),transparent_40%)]" />

  <div className="relative max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300 text-sm tracking-[0.2em] uppercase mb-6">
        TOP DEVICES
      </div>

      <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
        Популярные
        <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          {' '}устройства
        </span>
      </h2>

      <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
        Актуальные устройства, пользующиеся высоким спросом у vape-магазинов и сетей.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.name}
          className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 transition-all duration-500 hover:-translate-y-3 hover:border-fuchsia-500/40 hover:shadow-[0_0_60px_rgba(217,70,239,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="relative h-[320px] rounded-[28px] overflow-hidden mb-8 bg-black/40">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full border border-fuchsia-500/20 bg-black/40 backdrop-blur-xl text-xs tracking-[0.2em] uppercase text-fuchsia-300">
                Premium Device
              </div>
            </div>

            <h3 className="text-3xl font-black mb-4 leading-tight">
              {product.name}
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              {product.desc}
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setIsLeadOpen(true)}
                className="group/button relative overflow-hidden px-6 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(217,70,239,0.45)]"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/button:opacity-100 transition-opacity" />

                <span className="relative">
                  Уточнить наличие
                </span>
              </button>

              <button
                onClick={() => setIsLeadOpen(true)}
                className="px-6 py-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 font-semibold hover:bg-cyan-500/20 transition-all duration-300"
              >
                Оптовые цены
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* PROMO */}
<section className="px-6 py-24 max-w-7xl mx-auto">
  <div className="grid lg:grid-cols-2 gap-8">

    {/* АКЦИИ */}
    <div className="relative overflow-hidden rounded-[36px] border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-950/40 to-black p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.18),transparent_45%)]" />

      <div className="relative">
        <div className="inline-flex px-4 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300 text-xs tracking-[0.2em] uppercase mb-6">
          АКТУАЛЬНЫЕ АКЦИИ
        </div>

        <h3 className="text-4xl font-black mb-8 leading-tight">
          Специальные условия
          для оптовых клиентов
        </h3>

        <div className="space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-cyan-300 text-sm tracking-[0.2em] uppercase mb-3">
              Geekvape
            </div>

            <div className="text-2xl font-black mb-3">
              Wenax Q2
            </div>

            <p className="text-zinc-400 leading-relaxed">
              При заказе 8 устройств каждого цвета →
              2 устройства в подарок.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-fuchsia-300 text-sm tracking-[0.2em] uppercase mb-3">
              Smoant
            </div>

            <div className="text-2xl font-black mb-3">
              Фирменный мерч
            </div>

            <p className="text-zinc-400 leading-relaxed">
              К каждому заказу устройств или расходников
              добавляем брендированный мерч.
            </p>
          </div>

        </div>
      </div>
    </div>

    {/* НОВОЕ ПОСТУПЛЕНИЕ */}
    <div className="relative overflow-hidden rounded-[36px] border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-black p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_45%)]" />

      <div className="relative">
        <div className="inline-flex px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs tracking-[0.2em] uppercase mb-6">
          NEW ARRIVALS
        </div>

        <h3 className="text-4xl font-black mb-8 leading-tight">
          Новое поступление
        </h3>

        <div className="space-y-5">

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <div>
              <div className="text-xl font-bold">
                Geekvape Aegis Nano 3
              </div>

              <div className="text-zinc-500 text-sm mt-1">
                Новинка в наличии
              </div>
            </div>

            <div className="text-cyan-300 text-sm tracking-[0.2em] uppercase">
              New
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <div>
              <div className="text-xl font-bold">
                Geekvape Hero 5 Red & White
              </div>

              <div className="text-zinc-500 text-sm mt-1">
                Лимитированные цвета
              </div>
            </div>

            <div className="text-fuchsia-300 text-sm tracking-[0.2em] uppercase">
              Hot
            </div>
          </div>

        </div>

        <button
          onClick={() => setIsLeadOpen(true)}
          className="inline-flex mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 font-bold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]"
        >
          Получить оптовые условия
        </button>
      </div>
    </div>

  </div>
</section>

{/* HOW WE WORK */}
<section className="px-6 py-24 max-w-7xl mx-auto">
  <div className="text-center mb-16">
    <div className="inline-flex px-5 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300 text-sm tracking-[0.2em] uppercase mb-6">
      HOW WE WORK
    </div>

    <h2 className="text-5xl md:text-6xl font-black mb-6">
      Как мы работаем
    </h2>

    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
      Без сложных схем и долгих ожиданий —
      быстро даем наличие, фиксируем заказ и отправляем по РФ.
    </p>
  </div>

  <div className="grid md:grid-cols-4 gap-6">

    {[
      {
        number: '01',
        title: 'Пишите нам',
        text: 'Связываетесь через Telegram и получаете актуальный прайс.'
      },

      {
        number: '02',
        title: 'Получаете наличие',
        text: 'Отправляем остатки, новинки и актуальные позиции.'
      },

      {
        number: '03',
        title: 'Подтверждаем заказ',
        text: 'Резервируем товар и согласовываем удобную оплату.'
      },

      {
        number: '04',
        title: 'Отгружаем',
        text: 'Быстро отправляем заказ со склада в Москве.'
      },

    ].map((step) => (

      <div
        key={step.number}
        className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 hover:border-fuchsia-500/30 transition-all duration-500"
      >

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10" />

        <div className="relative">

          <div className="text-6xl font-black mb-8 bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            {step.number}
          </div>

          <h3 className="text-2xl font-black mb-4">
            {step.title}
          </h3>

          <p className="text-zinc-400 leading-relaxed">
            {step.text}
          </p>

        </div>
      </div>

    ))}
  </div>
</section>
      
      {/* TRUST */}
<section className="px-6 py-24 max-w-7xl mx-auto">
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300 text-sm tracking-[0.2em] uppercase mb-6">
      WHY US
    </div>

    <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
      Почему нам
      <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
        {' '}доверяют
      </span>
    </h2>

    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
      Работаем с вейп-шопами, сетями и оптовыми клиентами по всей России.
    </p>
  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    <div className="group relative overflow-hidden rounded-[32px] border border-fuchsia-500/15 bg-white/5 backdrop-blur-2xl p-8 hover:border-fuchsia-500/40 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="text-5xl font-black mb-4 bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          5+
        </div>

        <div className="text-xl font-bold mb-3">
          Лет на рынке
        </div>

        <p className="text-zinc-400 leading-relaxed">
          Работаем в vape-индустрии и знаем рынок изнутри.
        </p>
      </div>
    </div>

    <div className="group relative overflow-hidden rounded-[32px] border border-cyan-500/15 bg-white/5 backdrop-blur-2xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
          1000+
        </div>

        <div className="text-xl font-bold mb-3">
          Клиентов
        </div>

        <p className="text-zinc-400 leading-relaxed">
          Работаем с вейп-шопами, сетями и оптовыми закупщиками.
        </p>
      </div>
    </div>

    <div className="group relative overflow-hidden rounded-[32px] border border-fuchsia-500/15 bg-white/5 backdrop-blur-2xl p-8 hover:border-fuchsia-500/40 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="text-5xl font-black mb-4 bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          РФ
        </div>

        <div className="text-xl font-bold mb-3">
          Отгрузки по России
        </div>

        <p className="text-zinc-400 leading-relaxed">
          Быстрая логистика и отправки в разные регионы.
        </p>
      </div>
    </div>

    <div className="group relative overflow-hidden rounded-[32px] border border-cyan-500/15 bg-white/5 backdrop-blur-2xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
          100%
        </div>

        <div className="text-xl font-bold mb-3">
          Оригинальная продукция
        </div>

        <p className="text-zinc-400 leading-relaxed">
          Только оригинальные устройства и расходники.
        </p>
      </div>
    </div>

  </div>
</section>

      {/* STOCK */}
<section className="px-6 py-24 max-w-7xl mx-auto">
  <div className="text-center mb-14">
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm tracking-[0.2em] uppercase mb-6">
      REAL STOCK
    </div>

    <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
      Склад и реальные
      <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
        {' '}поставки
      </span>
    </h2>

    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
      Поддерживаем наличие популярных позиций и быстро отгружаем заказы со склада в Москве.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="group relative overflow-hidden rounded-[32px] border border-fuchsia-500/20 bg-white/5 shadow-[0_0_40px_rgba(217,70,239,0.12)]">
      <img
        src="/warehouse-1.jpg"
        alt="Склад Галактика"
        className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-sm text-fuchsia-300 tracking-[0.2em] uppercase mb-2">
          Москва
        </div>

        <div className="text-2xl font-black">
          Склад в наличии
        </div>
      </div>
    </div>

    <div className="group relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-white/5 shadow-[0_0_40px_rgba(34,211,238,0.12)] md:translate-y-10">
      <img
        src="/warehouse-2.jpg"
        alt="Поставка устройств"
        className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-sm text-cyan-300 tracking-[0.2em] uppercase mb-2">
          Поставки
        </div>

        <div className="text-2xl font-black">
          Регулярное пополнение
        </div>
      </div>
    </div>

    <div className="group relative overflow-hidden rounded-[32px] border border-fuchsia-500/20 bg-white/5 shadow-[0_0_40px_rgba(217,70,239,0.12)]">
      <img
        src="/warehouse-3.jpg"
        alt="Оптовые поставки"
        className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-sm text-fuchsia-300 tracking-[0.2em] uppercase mb-2">
          Опт
        </div>

        <div className="text-2xl font-black">
          Отгрузки по РФ
        </div>
      </div>
    </div>
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

    {/* FINAL CTA */}
<section className="px-6 py-24">
  <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[40px] border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-950/30 via-black to-cyan-950/20 p-10 md:p-16">

    {/* GLOW */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-fuchsia-500/10 blur-[120px]" />

    <div className="relative text-center">

      <div className="inline-flex px-5 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300 text-sm tracking-[0.2em] uppercase mb-8">
        CONTACT
      </div>

      <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
        Получите
        <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          {' '}оптовые условия
        </span>
      </h2>

      <p className="text-zinc-400 text-xl leading-relaxed max-w-3xl mx-auto mb-12">
        Отправим актуальное наличие, оптовые цены
        и поможем подобрать позиции под ваш магазин.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-14">

        <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          Минимальный заказ — 20.000₽
        </div>

        <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          Склад в Москве
        </div>

        <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          Нал / безнал / USDT
        </div>

      </div>

      <button
        onClick={() => setIsLeadOpen(true)}
        className="group relative inline-flex overflow-hidden px-10 py-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-black text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(217,70,239,0.45)]"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        <span className="relative">
          Получить доступ к оптовым ценам
        </span>
      </button>

    </div>
  </div>
</section>

{/* FOOTER */}
<footer className="border-t border-white/5 px-6 py-10 text-center">
  <div className="text-zinc-500 text-sm tracking-[0.2em] uppercase mb-3">
    ГАЛАКТИКА VAPEBAR LLC
  </div>

  <div className="text-zinc-700 text-sm">
    © 2026 Premium Vape Distributor
  </div>
</footer>
    </div>
</>
);
}
