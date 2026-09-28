'use client';

// GALAXY CATALOG UX FIX 2026-06-17: toggle filters, active filter chips, stronger no-photo fallback.

import { useEffect, useMemo, useState } from 'react';
import { products as fallbackProducts, type Product } from '../../data/products';
import { productImagePathMap } from '../../data/productImageManifest';
import { productPreviewPathMap } from '../../data/productPreviewManifest';
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

const TELEGRAM_URL = 'https://t.me/Galaxy_Stan';
const PAGE_SIZE = 60;
const REQUEST_STORAGE_KEY = 'galaktika-catalog-request';

const buildTelegramLeadHref = (requestedProducts: Product[] = []) => {
  const productList = requestedProducts.length
    ? `\n\nИнтересующие товары:\n${requestedProducts
        .map((item, index) => `${index + 1}. ${item.name}`)
        .join('\n')}`
    : '';
  const message = `Здравствуйте! Хочу получить оптовый прайс и уточнить наличие.${productList}`;

  return `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`;
};

const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/,/g, '.')
    .replace(/[Ωω]/g, ' ohm ')
    .replace(/ohms?/g, 'ohm')
    .replace(/ом/g, 'ohm')
    .replace(/[^a-zа-я0-9.\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const canonicalSectionLabel = (section: string) => {
  const normalized = normalizeSearch(section);
  const isCartridgeSection = normalized.includes('картридж');

  if (isCartridgeSection) {
    return section;
  }

  if (normalized.includes('xros 5 mini')) {
    return 'XROS 5 MINI';
  }

  if (normalized.includes('xros 5 nano')) {
    return 'XROS 5 NANO 1600mAh';
  }

  if (normalized === 'xros 5' || normalized.startsWith('xros 5 kit')) {
    return 'XROS 5';
  }

  if (normalized.includes('hero 5')) {
    return 'Hero 5';
  }

  if (normalized.includes('sonder q2')) {
    return 'Sonder Q2';
  }

  if (normalized.includes('wenax q2')) {
    return 'Wenax Q2';
  }

  if (normalized.includes('vibe nano pro')) {
    return 'VIBE NANO PRO';
  }

  if (normalized.includes('vibe se 2')) {
    return 'VIBE SE 2';
  }

  return section;
};

const sectionMatchesProduct = (product: Product, selectedSection: string) => {
  if (selectedSection === 'Все') {
    return true;
  }

  const selectedCanonical = canonicalSectionLabel(selectedSection);
  const productCanonical = canonicalSectionLabel(product.section);

  if (productCanonical === selectedCanonical) {
    return true;
  }

  if (product.category !== 'Устройства') {
    return false;
  }

  const selectedText = normalizeSearch(selectedCanonical);
  const productText = normalizeSearch([product.name, product.section].join(' '));

  if (selectedCanonical === 'XROS 5') {
    return (
      productText.includes('xros 5') &&
      !productText.includes('xros 5 mini') &&
      !productText.includes('xros 5 nano') &&
      !productText.includes('xros pro')
    );
  }

  return productText.includes(selectedText);
};

const productImage = (product: Product) => {
  const brand = product.brand.toLowerCase();
  const key = `${brand}/${product.slug}`;

  return productPreviewPathMap[key] ?? productImagePathMap[key] ?? null;
};

const cleanProductName = (product: Product) => {
  const brandPattern = product.brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return product.name
    .replace(/^Набор\s+/i, '')
    .replace(new RegExp(`^${brandPattern}\\s+`, 'i'), '')
    .replace(/^Geek Vape\s+/i, '')
    .replace(/^GEEKVAPE\s+/i, '')
    .replace(/^Vaporesso\s+/i, '')
    .replace(/^VOOPOO\s+/i, '')
    .replace(/^Smoant\s+/i, '')
    .replace(/^Rincoe\s+/i, '')
    .trim();
};

const compareText = (a: string, b: string) =>
  a.localeCompare(b, 'ru', { sensitivity: 'base', numeric: true });

const compareByBrandSectionName = (a: Product, b: Product) =>
  compareText(a.brand, b.brand) ||
  compareText(a.section, b.section) ||
  compareText(cleanProductName(a), cleanProductName(b));

const sortProducts = (items: Product[], mode: string) => {
  const sorted = [...items];

  if (mode === 'Сначала хиты') {
    return sorted.sort(
      (a, b) =>
        Number(b.isHit) - Number(a.isHit) ||
        Number(b.isNew) - Number(a.isNew) ||
        compareByBrandSectionName(a, b)
    );
  }

  if (mode === 'Сначала новинки') {
    return sorted.sort(
      (a, b) =>
        Number(b.isNew) - Number(a.isNew) ||
        Number(b.isHit) - Number(a.isHit) ||
        compareByBrandSectionName(a, b)
    );
  }

  if (mode === 'Бренд и серия') {
    return sorted.sort(compareByBrandSectionName);
  }

  if (mode === 'По названию') {
    return sorted.sort((a, b) => compareText(cleanProductName(a), cleanProductName(b)));
  }

  return sorted.sort(
    (a, b) =>
      Number(b.isHit) - Number(a.isHit) ||
      Number(b.isNew) - Number(a.isNew) ||
      Number(b.inStock) - Number(a.inStock) ||
      compareByBrandSectionName(a, b)
  );
};

const statuses = ['Все', 'Хиты', 'Новинки', 'В наличии'];
const sortOptions = ['Умная сортировка', 'Сначала хиты', 'Сначала новинки', 'Бренд и серия', 'По названию'];

const PRIORITY_SECTIONS_BY_BRAND: Record<string, string[]> = {
  Vaporesso: [
    'XROS 5',
    'XROS 5 MINI',
    'XROS PRO 2',
    'XROS 4',
    'VIBE SE 2',
    'VIBE NANO PRO',
    'VIBE',
    'LUXE X3',
    'ARMOUR G',
    'COREX 3.0',
  ],
  Geekvape: [
    'Hero 5',
    'Wenax Q2',
    'Wenax Q',
    'Wenax Q Pro',
    'Sonder Q2',
    'Aegis Nano 3',
    'Aegis Force',
  ],
  Voopoo: [
    'VMATE PRO 2',
    'VMATE',
    'ARGUS',
    'VINCI',
    'DRAG',
    'PnP',
  ],
  Smoant: [
    'Pasito III',
    'Pasito',
    'Santi',
    'Knight',
    'Charon',
  ],
  Rincoe: [
    'Manto',
    'Jellybox',
    'Metis',
    'Ceto',
  ],
};

const GLOBAL_PRIORITY_SECTIONS = [
  'XROS 5',
  'XROS 5 MINI',
  'XROS PRO 2',
  'Hero 5',
  'Wenax Q2',
  'VMATE PRO 2',
  'Pasito III',
  'VIBE SE 2',
  'LUXE X3',
  'COREX 3.0',
];


function BrandFallbackVisual({
  brand,
  compact = false,
  large = false,
}: {
  brand: string;
  compact?: boolean;
  large?: boolean;
}) {
  const shortBrand = brand.slice(0, 2).toUpperCase();
  const brandKey = brand.toLowerCase();
  const gradientByBrand: Record<string, string> = {
    vaporesso: 'from-cyan-400/25 via-blue-500/10 to-violet-500/20 border-cyan-400/25 text-cyan-100',
    geekvape: 'from-orange-400/25 via-amber-500/10 to-red-500/20 border-orange-400/25 text-orange-100',
    voopoo: 'from-yellow-400/25 via-amber-500/10 to-orange-500/20 border-yellow-400/25 text-yellow-100',
    smoant: 'from-yellow-300/25 via-orange-500/10 to-amber-500/20 border-yellow-300/25 text-yellow-100',
    rincoe: 'from-emerald-400/25 via-cyan-500/10 to-blue-500/20 border-emerald-400/25 text-emerald-100',
  };
  const accent = gradientByBrand[brandKey] ?? 'from-cyan-400/25 via-violet-500/10 to-blue-500/20 border-cyan-400/25 text-cyan-100';

  if (compact) {
    return (
      <div className={`relative z-10 flex h-full items-center justify-center overflow-hidden bg-gradient-to-br ${accent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(34,211,238,0.24),transparent_40%)]" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/50 text-lg font-black backdrop-blur-xl">
          {shortBrand}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative z-10 flex h-full min-h-full items-center justify-center overflow-hidden p-7 text-center bg-gradient-to-br ${accent}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(139,92,246,0.20),transparent_28%)]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-8 left-1/2 h-px w-56 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/65 to-transparent" />
      <div className="relative">
        <div className={`${large ? 'h-36 w-36 rounded-[40px] text-5xl' : 'h-28 w-28 rounded-[32px] text-4xl'} relative mx-auto flex items-center justify-center border border-white/15 bg-black/55 font-black shadow-[0_0_70px_rgba(34,211,238,0.20)] backdrop-blur-xl`}>
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/12 to-transparent" />
          <span className="relative">{shortBrand}</span>
        </div>
        <div className={`${large ? 'mt-6 text-sm' : 'mt-5 text-xs'} font-black uppercase tracking-[0.24em] text-white/80`}>
          Фото скоро
        </div>
        <div className={`${large ? 'max-w-[260px] text-sm' : 'max-w-[190px] text-xs'} mx-auto mt-2 leading-relaxed text-white/45`}>
          Товар уже можно добавить в запрос и уточнить наличие у менеджера
        </div>
      </div>
    </div>
  );
}

function ProductTile({
  product,
  onLead,
  onToggleRequest,
  onPreview,
  isInRequest,
}: {
  product: Product;
  onLead: (product: Product) => void;
  onToggleRequest: (product: Product) => void;
  onPreview: (product: Product) => void;
  isInRequest: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const brandKey = product.brand.toLowerCase();
  const accentByBrand: Record<string, string> = {
    vaporesso: 'from-cyan-400/12 via-slate-950 to-blue-500/10 border-cyan-400/18 text-cyan-100',
    geekvape: 'from-sky-400/10 via-slate-950 to-cyan-500/10 border-cyan-400/18 text-cyan-100',
    voopoo: 'from-amber-300/10 via-slate-950 to-cyan-500/8 border-cyan-400/16 text-cyan-100',
    smoant: 'from-emerald-300/10 via-slate-950 to-cyan-500/8 border-cyan-400/16 text-cyan-100',
    rincoe: 'from-emerald-400/12 via-slate-950 to-blue-500/10 border-emerald-400/18 text-emerald-100',
  };

  const brandAccent = accentByBrand[brandKey] ?? 'from-cyan-400/10 via-slate-950 to-blue-500/10 border-cyan-400/16 text-cyan-100';
  const displayName = cleanProductName(product);
  const imageSrc = productImage(product);
  const leadHref = buildTelegramLeadHref([product]);

  return (
    <div className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-zinc-950/92 shadow-[0_14px_44px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 ${isInRequest ? 'border-cyan-400/45 shadow-[0_0_38px_rgba(34,211,238,0.18)]' : 'border-white/10'}`}>

      <button
        type="button"
        onClick={() => onPreview(product)}
        className={`relative block h-[212px] w-full overflow-hidden border-b bg-gradient-to-br text-left sm:h-[220px] xl:h-[226px] ${brandAccent}`}
        aria-label={`Открыть товар ${product.name}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-black/12" />
        <div className="absolute bottom-8 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />

        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          {product.isHit ? (
            <span className="rounded-full border border-cyan-400/25 bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-200 backdrop-blur-xl">
              Хит
            </span>
          ) : product.isNew ? (
            <span className="rounded-full border border-violet-400/25 bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-200 backdrop-blur-xl">
              New
            </span>
          ) : null}
        </div>

        {isInRequest && (
          <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-cyan-300/25 bg-cyan-400/15 px-4 py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.18)] backdrop-blur-xl">
            Добавлено в запрос
          </div>
        )}

        {!imageFailed && imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
              setImageFailed(true);
            }}
            className="relative z-10 mx-auto h-full w-full object-contain p-4 drop-shadow-[0_22px_42px_rgba(0,0,0,0.44)] transition duration-500 group-hover:scale-[1.015]"
          />
        ) : (
          <BrandFallbackVisual brand={product.brand} />
        )}
      </button>

      <div className="relative flex min-h-[248px] flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-black ${
              product.inStock
                ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                : 'border-orange-400/20 bg-orange-400/10 text-orange-200'
            }`}
          >
            {product.inStock ? '● в наличии' : 'по запросу'}
          </span>
          <span className="truncate text-[10px] font-black uppercase tracking-[0.14em] text-cyan-200/60">
            {product.brand}
          </span>
        </div>

        <div className="mb-3 flex min-h-[38px] content-start flex-wrap gap-2 overflow-hidden text-[11px] font-semibold text-zinc-500">
          <span className="h-7 max-w-full truncate rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1">
            {product.category}
          </span>
          <span className="h-7 max-w-full truncate rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1">
            {product.section}
          </span>
        </div>

        <div className="min-h-[54px]">
          <button
            type="button"
            onClick={() => onPreview(product)}
            className="line-clamp-3 text-left text-[14px] font-black leading-tight text-white transition hover:text-cyan-100"
            title={product.name}
          >
            {displayName}
          </button>
        </div>

        <div className="mt-auto pt-4">
          <div className="grid gap-2">
            <button
              onClick={() => onToggleRequest(product)}
              className={`w-full rounded-2xl px-4 py-3 text-sm font-black transition ${
                isInRequest
                  ? 'border border-cyan-300/40 bg-cyan-400/15 text-cyan-100 shadow-[0_0_26px_rgba(34,211,238,0.14)]'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_26px_rgba(34,211,238,0.16)] hover:shadow-[0_0_38px_rgba(34,211,238,0.24)]'
              }`}
            >
              {isInRequest ? '✓ В запросе' : '+ Добавить в запрос'}
            </button>

            <a
              href={leadHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => onLead(product)}
              className="w-full rounded-xl px-4 py-2 text-xs font-black text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              Получить цену →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
 }

function ProductPreviewModal({
  product,
  onClose,
  onLead,
  onToggleRequest,
  isInRequest,
}: {
  product: Product;
  onClose: () => void;
  onLead: (product: Product) => void;
  onToggleRequest: (product: Product) => void;
  isInRequest: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const displayName = cleanProductName(product);
  const imageSrc = productImage(product);
  const leadHref = buildTelegramLeadHref([product]);

  return (
    <div className="fixed inset-0 z-[997] flex items-center justify-center bg-black/82 px-4 py-6 text-white backdrop-blur-2xl">
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[38px] border border-cyan-400/20 bg-zinc-950 shadow-[0_0_110px_rgba(34,211,238,0.22)]">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-cyan-500/16 blur-[90px]" />
        <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-violet-500/18 blur-[100px]" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/50 text-2xl text-zinc-400 transition hover:border-cyan-400/40 hover:text-white"
          aria-label="Закрыть карточку товара"
        >
          ×
        </button>

        <div className="relative grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[430px] overflow-hidden bg-gradient-to-br from-cyan-400/12 via-blue-500/8 to-violet-500/14 p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(34,211,238,0.20),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(139,92,246,0.18),transparent_28%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />
            <div className="absolute bottom-16 left-1/2 h-4 w-64 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-md" />
            <div className="absolute bottom-20 left-1/2 h-px w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />

            {!imageFailed && imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  setImageFailed(true);
                }}
                className="relative z-10 mx-auto h-full min-h-[360px] w-full object-contain p-0 drop-shadow-[0_28px_60px_rgba(34,211,238,0.12)]"
              />
            ) : (
              <BrandFallbackVisual brand={product.brand} large />
            )}
          </div>

          <div className="relative p-6 md:p-8 lg:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {product.isHit && (
                <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
                  Хит продаж
                </span>
              )}
              {product.isNew && (
                <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-violet-200">
                  Новинка
                </span>
              )}
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                {product.inStock ? 'В наличии' : 'По запросу'}
              </span>
            </div>

            <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-cyan-300/75">
              {product.brand} · {product.section}
            </div>

            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              {displayName}
            </h2>

            <p className="mt-5 leading-relaxed text-zinc-400">
              Полное название позиции подставится в сообщение менеджеру в Telegram. Уточните оптовую цену, наличие и кратность заказа по этой позиции.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Категория</div>
                <div className="mt-2 text-lg font-black">{product.category}</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Серия</div>
                <div className="mt-2 text-lg font-black">{product.section}</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">ID</div>
                <div className="mt-2 text-lg font-black">#{product.id}</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Формат</div>
                <div className="mt-2 text-lg font-black">B2B цена</div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={leadHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => onLead(product)}
                className="group relative overflow-hidden rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-6 py-5 text-left font-black shadow-[0_0_45px_rgba(34,211,238,0.24)] transition hover:scale-[1.02] hover:shadow-[0_0_65px_rgba(34,211,238,0.36)]"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                <span className="relative flex items-center justify-between">
                  Получить цену
                  <span>→</span>
                </span>
              </a>

              <button
                onClick={() => onToggleRequest(product)}
                className={`rounded-[20px] border px-6 py-5 text-left font-black transition ${
                  isInRequest
                    ? 'border-cyan-300/45 bg-cyan-400/15 text-cyan-100 shadow-[0_0_35px_rgba(34,211,238,0.14)]'
                    : 'border-white/10 bg-white/[0.04] text-zinc-200 hover:border-cyan-400/40 hover:bg-white/[0.07]'
                }`}
              >
                {isInRequest ? '✓ Уже в запросе' : '+ Добавить в запрос'}
              </button>
            </div>

            <div className="mt-5 rounded-[22px] border border-cyan-400/15 bg-cyan-400/8 p-4 text-sm leading-relaxed text-zinc-400">
              Менеджер сможет быстро увидеть выбранную позицию и прислать актуальные условия по наличию, цене и отгрузке.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestItemRow({
  product,
  onPreview,
  onRemove,
}: {
  product: Product;
  onPreview: (product: Product) => void;
  onRemove: (productId: number) => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const displayName = cleanProductName(product);
  const imageSrc = productImage(product);

  return (
    <div className="group grid gap-3 rounded-[24px] border border-white/10 bg-black/42 p-3 transition hover:border-cyan-400/25 hover:bg-white/[0.045] sm:grid-cols-[86px_1fr_auto] sm:items-center">
      <button
        type="button"
        onClick={() => onPreview(product)}
        className="relative h-24 overflow-hidden rounded-[20px] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/12 via-blue-500/8 to-violet-500/12 sm:h-[86px]"
        aria-label={`Открыть товар ${product.name}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.20),transparent_38%)]" />
        {!imageFailed && imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
              setImageFailed(true);
            }}
            className="relative z-10 h-full w-full object-contain p-0 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <BrandFallbackVisual brand={product.brand} compact />
        )}
      </button>

      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-400">
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1">{product.brand}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1">{product.section}</span>
          {product.isHit && <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-cyan-200">Хит</span>}
          {product.isNew && <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 text-violet-200">New</span>}
        </div>

        <button
          type="button"
          onClick={() => onPreview(product)}
          className="line-clamp-2 text-left text-base font-black leading-tight transition hover:text-cyan-100"
          title={product.name}
        >
          {displayName}
        </button>

        <div className="mt-2 text-xs text-zinc-500">
          {product.category} · ID #{product.id}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(product.id)}
        className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-black text-zinc-400 transition hover:border-red-400/35 hover:bg-red-400/10 hover:text-red-100"
      >
        Убрать
      </button>
    </div>
  );
}

function RequestDrawerModal({
  productsInRequest,
  onClose,
  onSubmit,
  submitHref,
  onRemove,
  onPreview,
  onClear,
}: {
  productsInRequest: Product[];
  onClose: () => void;
  onSubmit: () => void;
  submitHref: string;
  onRemove: (productId: number) => void;
  onPreview: (product: Product) => void;
  onClear: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[996] flex items-end justify-center bg-black/70 px-3 pb-3 pt-16 text-white backdrop-blur-xl md:items-center md:p-6">
      <div className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[34px] border border-cyan-400/20 bg-zinc-950 shadow-[0_0_100px_rgba(34,211,238,0.22)]">
        <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-cyan-500/14 blur-[90px]" />
        <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-violet-500/16 blur-[100px]" />

        <div className="relative border-b border-white/10 p-5 md:p-7">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/45 text-2xl text-zinc-400 transition hover:border-cyan-400/35 hover:text-white"
            aria-label="Закрыть список запроса"
          >
            ×
          </button>

          <div className="pr-12">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-300/75">
              Request list
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              Товары в запросе
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">
              Проверьте выбранные позиции. Можно убрать лишнее, открыть карточку товара или отправить весь список менеджеру одним запросом.
            </p>
          </div>
        </div>

        <div className="relative max-h-[52vh] overflow-y-auto p-4 md:p-6">
          <div className="space-y-3">
            {productsInRequest.map((product) => (
              <RequestItemRow
                key={product.id}
                product={product}
                onPreview={onPreview}
                onRemove={onRemove}
              />
            ))}
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-black/45 p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-black">
                {productsInRequest.length} поз. в запросе
              </div>
              <div className="mt-1 text-sm text-zinc-500">
                Заявка уйдёт менеджеру вместе со списком выбранных товаров.
              </div>
            </div>

            <div className="grid gap-2 sm:flex">
              <a
                href={submitHref}
                target="_blank"
                rel="noreferrer"
                onClick={onSubmit}
                className="group relative overflow-hidden rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-7 py-4 font-black shadow-[0_0_40px_rgba(34,211,238,0.24)] transition hover:scale-[1.02]"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                <span className="relative">Запросить цены →</span>
              </a>
              <button
                onClick={onClear}
                className="rounded-[20px] border border-white/10 bg-white/[0.035] px-7 py-4 font-black text-zinc-300 transition hover:border-cyan-400/35 hover:bg-white/[0.06] hover:text-white"
              >
                Очистить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [isAdult, setIsAdult] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [isRequestPanelOpen, setIsRequestPanelOpen] = useState(false);
  const [requestRestored, setRequestRestored] = useState(false);
  const [urlReady, setUrlReady] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('Все');
  const [category, setCategory] = useState('Все');
  const [section, setSection] = useState('Все');
  const [status, setStatus] = useState('Все');
  const [sort, setSort] = useState('Умная сортировка');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const brands = useMemo(
    () => ['Все', ...Array.from(new Set(products.map((product) => product.brand)))],
    [products]
  );
  const categories = useMemo(
    () => ['Все', ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  useEffect(() => {
    let cancelled = false;

    fetch('/api/catalog', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Catalog request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((nextProducts) => {
        if (!cancelled && Array.isArray(nextProducts) && nextProducts.length > 0) {
          setProducts(nextProducts);
        }
      })
      .catch((error) => {
        console.error('Catalog update fallback:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const accepted = localStorage.getItem('adult-confirmed');

    if (accepted === 'true') {
      setIsAdult(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const allSections = Array.from(new Set(products.map((product) => canonicalSectionLabel(product.section))));

    const nextQuery = params.get('q') ?? '';
    const nextBrand = params.get('brand') ?? 'Все';
    const nextCategory = params.get('category') ?? 'Все';
    const nextSection = params.get('section') ?? 'Все';
    const nextStatus = params.get('status') ?? 'Все';
    const nextSort = params.get('sort') ?? 'Умная сортировка';

    if (nextQuery) {
      setQuery(nextQuery);
    }

    if (brands.includes(nextBrand)) {
      setBrand(nextBrand);
    }

    if (categories.includes(nextCategory)) {
      setCategory(nextCategory);
    }

    if (nextSection === 'Все' || allSections.includes(nextSection)) {
      setSection(nextSection);
    }

    if (statuses.includes(nextStatus)) {
      setStatus(nextStatus);
    }

    if (sortOptions.includes(nextSort)) {
      setSort(nextSort);
    }

    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (!urlReady) {
      return;
    }

    const params = new URLSearchParams();

    if (query.trim()) {
      params.set('q', query.trim());
    }

    if (brand !== 'Все') {
      params.set('brand', brand);
    }

    if (category !== 'Все') {
      params.set('category', category);
    }

    if (section !== 'Все') {
      params.set('section', section);
    }

    if (status !== 'Все') {
      params.set('status', status);
    }

    if (sort !== 'Умная сортировка') {
      params.set('sort', sort);
    }

    const nextUrl = params.toString() ? `/catalog?${params.toString()}` : '/catalog';
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [urlReady, query, brand, category, section, status, sort]);

  useEffect(() => {
    if (!linkCopied) {
      return;
    }

    const timer = window.setTimeout(() => setLinkCopied(false), 1800);

    return () => window.clearTimeout(timer);
  }, [linkCopied]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REQUEST_STORAGE_KEY);
      const savedIds = saved ? JSON.parse(saved) : [];

      if (Array.isArray(savedIds) && savedIds.length > 0) {
        const restoredProducts = products.filter((product) => savedIds.includes(product.id));
        setSelectedProducts(restoredProducts);
      }
    } finally {
      setRequestRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!requestRestored) {
      return;
    }

    localStorage.setItem(
      REQUEST_STORAGE_KEY,
      JSON.stringify(selectedProducts.map((product) => product.id))
    );
  }, [selectedProducts, requestRestored]);

  const confirmAdult = () => {
    localStorage.setItem('adult-confirmed', 'true');
    setIsAdult(true);
  };

  const closeLeadSurfaces = () => {
    setPreviewProduct(null);
    setIsRequestPanelOpen(false);
  };

  const openRequestLead = () => {
    closeLeadSurfaces();
  };

  const toggleRequestProduct = (product: Product) => {
    setSelectedProducts((items) => {
      const exists = items.some((item) => item.id === product.id);

      if (exists) {
        return items.filter((item) => item.id !== product.id);
      }

      return [...items, product];
    });
  };

  const clearRequestProducts = () => {
    setSelectedProducts([]);
    setIsRequestPanelOpen(false);
  };

  const removeRequestProduct = (productId: number) => {
    setSelectedProducts((items) => items.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    if (selectedProducts.length === 0) {
      setIsRequestPanelOpen(false);
    }
  }, [selectedProducts.length]);

  const requestLeadHref = useMemo(
    () => buildTelegramLeadHref(selectedProducts),
    [selectedProducts]
  );

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    const searchWords = q.split(/\s+/).filter(Boolean);
    const exactSearchRequired = searchWords.some(
      (word) =>
        /\d/.test(word) ||
        ['mini', 'nano', 'pro', 'max', 'kit', 'pod', 'corex', 'gtx'].includes(word)
    );

    const result = products.filter((product) => {
      const searchableText = normalizeSearch(
        [product.name, product.brand, product.category, product.section].join(' ')
      );

      const matchedWordCount = searchWords.filter((word) => searchableText.includes(word)).length;
      const minimumMatchedWords =
        exactSearchRequired || searchWords.length < 3 ? searchWords.length : searchWords.length - 1;

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((word) => searchableText.includes(word)) ||
        (!exactSearchRequired && matchedWordCount >= Math.max(1, minimumMatchedWords));

      const matchesStatus =
        status === 'Все' ||
        (status === 'Хиты' && product.isHit) ||
        (status === 'Новинки' && product.isNew) ||
        (status === 'В наличии' && product.inStock);

      return (
        matchesSearch &&
        (brand === 'Все' || product.brand === brand) &&
        (category === 'Все' || product.category === category) &&
        sectionMatchesProduct(product, section) &&
        matchesStatus
      );
    });

    return sortProducts(result, sort);
  }, [products, query, brand, category, section, status, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);

  const resetFilters = () => {
    setQuery('');
    setBrand('Все');
    setCategory('Все');
    setSection('Все');
    setStatus('Все');
    setSort('Умная сортировка');
    setVisibleCount(PAGE_SIZE);
  };

  const chooseBrand = (value: string) => {
    const nextBrand = brand === value && value !== 'Все' ? 'Все' : value;

    setBrand(nextBrand);
    setSection('Все');
    setVisibleCount(PAGE_SIZE);
  };

  const chooseCategory = (value: string) => {
    const nextCategory = category === value && value !== 'Все' ? 'Все' : value;

    setCategory(nextCategory);
    setSection('Все');
    setVisibleCount(PAGE_SIZE);
  };

  const chooseStatus = (value: string) => {
    const nextStatus = status === value && value !== 'Все' ? 'Все' : value;

    setStatus(nextStatus);
    setSection('Все');
    setVisibleCount(PAGE_SIZE);
  };

  const chooseSort = (value: string) => {
    setSort(value);
    setVisibleCount(PAGE_SIZE);
  };

  const chooseSection = (value: string) => {
    const nextSection = section === value && value !== 'Все' ? 'Все' : value;

    setSection(nextSection);
    setVisibleCount(PAGE_SIZE);
  };

  const setPopularQuery = (value: string) => {
    const nextQuery = normalizeSearch(query) === normalizeSearch(value) ? '' : value;

    setQuery(nextQuery);
    setVisibleCount(PAGE_SIZE);
  };

  const copyCatalogLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
    } catch {
      setLinkCopied(false);
    }
  };

  const quickCategories = ['Все', 'Устройства', 'Картриджи', 'Испарители', 'Аксессуары', 'Мерч'].filter(
    (item) => item === 'Все' || categories.includes(item)
  );

  const sectionOptions = useMemo(() => {
    const items = products
      .filter((product) => {
        const matchesStatus =
          status === 'Все' ||
          (status === 'Хиты' && product.isHit) ||
          (status === 'Новинки' && product.isNew) ||
          (status === 'В наличии' && product.inStock);

        return (
          (brand === 'Все' || product.brand === brand) &&
          (category === 'Все' || product.category === category) &&
          matchesStatus
        );
      })
      .map((product) => canonicalSectionLabel(product.section))
      .filter(Boolean);

    return ['Все', ...Array.from(new Set(items))];
  }, [products, brand, category, status]);

  const quickSections = useMemo(() => {
    const availableSections = sectionOptions.filter((item) => item !== 'Все');
    const priority = brand !== 'Все' ? PRIORITY_SECTIONS_BY_BRAND[brand] ?? [] : GLOBAL_PRIORITY_SECTIONS;
    const orderedPriority = priority.filter((item) => availableSections.includes(item));
    const otherSections = availableSections.filter((item) => !orderedPriority.includes(item));

    return [...orderedPriority, ...otherSections].slice(0, 8);
  }, [brand, sectionOptions]);

  const sectionBlockTitle = brand === 'Все' ? 'Серии и линейки' : `Серии ${brand}`;
  const sectionBlockHint =
    brand === 'Все'
      ? 'Выберите бренд — и здесь останутся только его модели и линейки.'
      : 'Подсказки обновлены под выбранный бренд.';


  const hasActiveFilters =
    Boolean(query.trim()) ||
    brand !== 'Все' ||
    category !== 'Все' ||
    section !== 'Все' ||
    status !== 'Все' ||
    sort !== 'Умная сортировка';

  const clearQuery = () => {
    setQuery('');
    setVisibleCount(PAGE_SIZE);
  };

  const clearBrand = () => {
    setBrand('Все');
    setSection('Все');
    setVisibleCount(PAGE_SIZE);
  };

  const clearCategory = () => {
    setCategory('Все');
    setSection('Все');
    setVisibleCount(PAGE_SIZE);
  };

  const clearSection = () => {
    setSection('Все');
    setVisibleCount(PAGE_SIZE);
  };

  const clearStatus = () => {
    setStatus('Все');
    setSection('Все');
    setVisibleCount(PAGE_SIZE);
  };

  const clearSort = () => {
    setSort('Умная сортировка');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      {!isAdult && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 px-6 text-white backdrop-blur-xl">
          <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-cyan-400/25 bg-zinc-950 p-10 text-center shadow-[0_0_80px_rgba(34,211,238,0.22)]">
            <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative">
              <div className="mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-7xl font-black text-transparent">
                18+
              </div>

              <h2 className="mb-6 text-3xl font-black">Подтвердите возраст</h2>

              <p className="mb-10 leading-relaxed text-zinc-400">
                Сайт содержит информацию о никотиносодержащей продукции и предназначен только для совершеннолетних.
              </p>

              <button
                onClick={confirmAdult}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 py-5 text-lg font-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]"
              >
                Мне есть 18 лет
              </button>
            </div>
          </div>
        </div>
      )}


      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onLead={closeLeadSurfaces}
          onToggleRequest={toggleRequestProduct}
          isInRequest={selectedProducts.some((item) => item.id === previewProduct.id)}
        />
      )}

      {isRequestPanelOpen && selectedProducts.length > 0 && (
        <RequestDrawerModal
          productsInRequest={selectedProducts}
          onClose={() => setIsRequestPanelOpen(false)}
          onSubmit={openRequestLead}
          submitHref={requestLeadHref}
          onRemove={removeRequestProduct}
          onPreview={(product) => {
            setIsRequestPanelOpen(false);
            setPreviewProduct(product);
          }}
          onClear={clearRequestProducts}
        />
      )}

      <main className="min-h-screen overflow-hidden bg-black text-white">
        <SiteHeader active="catalog" />
<section className="relative overflow-hidden px-4 pb-9 pt-[88px] sm:px-5 lg:px-6 lg:pt-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(139,92,246,0.10),transparent_30%)]" />
          <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-cyan-950/12 via-black to-black" />

          <div className="relative mx-auto max-w-7xl">
            <a href="/" className="mb-4 inline-flex text-sm font-bold text-zinc-500 transition hover:text-cyan-300">
              ← На главную
            </a>

            <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div>
                <div className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-300">Оптовый каталог</div>

                <h1 className="max-w-4xl text-3xl font-black uppercase leading-[1.02] tracking-tight sm:text-4xl md:text-5xl">
                  <span className="text-white">Каталог </span>
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">Галактика</span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-zinc-400 md:text-base">
                  Оригинальные устройства, картриджи, испарители и аксессуары для магазинов, сетей и оптовых клиентов.
                </p>
              </div>

              <div className="relative hidden overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.028] p-3 backdrop-blur-xl lg:block">
                <div className="relative grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/28 p-3">
                    <div className="text-xl font-black text-cyan-200">{products.length}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">товаров</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/28 p-3">
                    <div className="text-xl font-black text-white">{brands.length - 1}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">брендов</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/28 p-3">
                    <div className="text-xl font-black text-violet-200">{products.filter((item) => item.isHit).length}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">хитов</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/28 p-3">
                    <div className="text-xl font-black text-emerald-200">20к</div>
                    <div className="mt-0.5 text-xs text-zinc-500">старт заказа</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-white/10 bg-black/52 p-2 shadow-[0_0_36px_rgba(34,211,238,0.05)] backdrop-blur-2xl">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Что ищете? Например: XROS 5, Hero 5, GTX 0.8..."
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-sm font-bold text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 sm:text-base"
              />

              <div className="mt-2 flex flex-col gap-2 px-1 pb-1 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                <span className="hidden sm:inline">Быстрый поиск по названию, бренду, серии или сопротивлению.</span>
                <a
                  href={requestLeadHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeLeadSurfaces}
                  className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-2.5 text-xs font-black text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/15"
                >
                  Получить прайс →
                </a>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-[22px] border border-white/10 bg-white/[0.025] p-3 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen((value) => !value)}
                className="flex h-12 items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 text-sm font-black text-cyan-100"
              >
                <span>{isMobileFiltersOpen ? 'Скрыть фильтры' : 'Фильтры и подбор'}</span>
                <span>{isMobileFiltersOpen ? '↑' : '↓'}</span>
              </button>

              <div className="flex flex-wrap gap-2 text-xs font-black">
                {brand !== 'Все' && <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-white">{brand}</span>}
                {category !== 'Все' && <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-white">{category}</span>}
                {section !== 'Все' && <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-white">{section}</span>}
                {status !== 'Все' && <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-white">{status}</span>}
                {brand === 'Все' && category === 'Все' && section === 'Все' && status === 'Все' && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-zinc-400">Все товары</span>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className={`${isMobileFiltersOpen ? 'block max-h-[72vh] overflow-y-auto' : 'hidden'} rounded-[22px] border border-white/10 bg-black/48 p-4 shadow-[0_0_42px_rgba(34,211,238,0.05)] backdrop-blur-xl lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto`}>
              <div className="space-y-5">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-cyan-300/70">
                    Бренды
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {['Все', 'Vaporesso', 'Geekvape', 'Voopoo', 'Smoant', 'Rincoe'].map((item) => (
                      <button
                        key={item}
                        onClick={() => chooseBrand(item)}
                        className={`rounded-full px-4 py-2 text-xs font-black transition ${
                          brand === item
                            ? 'bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 text-white shadow-[0_0_28px_rgba(34,211,238,0.20)]'
                            : 'border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-cyan-400/40 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <select
                    value={brand}
                    onChange={(e) => chooseBrand(e.target.value)}
                    className="mt-3 h-11 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 text-sm font-bold text-white outline-none transition focus:border-cyan-400/50"
                  >
                    {brands.map((item) => (
                      <option key={item} value={item} className="bg-zinc-950">{item === 'Все' ? 'Все бренды' : item}</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-sm text-zinc-500">
                  <span>
                    Найдено: <span className="font-black text-white">{filtered.length}</span>
                  </span>
                  <span>
                    Показано: <span className="font-black text-white">{visibleProducts.length}</span>
                  </span>
                  <span>
                    Сортировка: <span className="font-black text-white">{sort}</span>
                  </span>
                  {selectedProducts.length > 0 && (
                    <>
                      <span>
                        В запросе: <span className="font-black text-cyan-200">{selectedProducts.length}</span>
                      </span>
                    </>
                  )}

                  <div className="mt-1 flex flex-wrap gap-3 border-t border-white/10 pt-3 text-xs">
                    <button
                      onClick={copyCatalogLink}
                      className="font-bold text-cyan-300 transition hover:text-cyan-200"
                    >
                      {linkCopied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
                    </button>

                    <button onClick={resetFilters} className="font-bold text-cyan-300 transition hover:text-cyan-200">
                      Сбросить
                    </button>
                  </div>
                </div>

                <label className="block rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                    Сортировка
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => chooseSort(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 text-sm font-bold text-white outline-none transition focus:border-cyan-400/50"
                  >
                    {sortOptions.map((item) => (
                      <option key={item} value={item} className="bg-zinc-950">{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-violet-300/70">
                    Быстрый выбор
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {['Все', 'Хиты', 'Новинки', 'В наличии'].map((item) => (
                      <button
                        key={item}
                        onClick={() => chooseStatus(item)}
                        className={`rounded-full px-4 py-2 text-xs font-black transition ${
                          status === item
                            ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.16)]'
                            : 'border border-white/10 bg-black/35 text-zinc-300 hover:border-violet-300/40 hover:text-white'
                        }`}
                      >
                        {item === 'Все' ? 'Все товары' : item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-cyan-300/70">
                    Категории
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quickCategories.map((item) => (
                      <button
                        key={item}
                        onClick={() => chooseCategory(item)}
                        className={`rounded-full px-4 py-2 text-xs font-black transition ${
                          category === item
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_25px_rgba(34,211,238,0.18)]'
                            : 'border border-white/10 bg-black/35 text-zinc-300 hover:border-cyan-300/40 hover:text-white'
                        }`}
                      >
                        {item === 'Все' ? 'Все категории' : item}
                      </button>
                    ))}
                  </div>
                </div>

                {quickSections.length > 0 && (
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
                    <div className="mb-3">
                      <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-300/70">
                        {sectionBlockTitle}
                      </div>
                      <div className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                        {sectionBlockHint}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => chooseSection('Все')}
                        className={`rounded-full px-4 py-2 text-xs font-black transition ${
                          section === 'Все'
                            ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.16)]'
                            : 'border border-white/10 bg-black/35 text-zinc-300 hover:border-violet-300/40 hover:text-white'
                        }`}
                      >
                        Все серии
                      </button>

                      {quickSections.map((item) => (
                        <button
                          key={item}
                          onClick={() => chooseSection(item)}
                          className={`rounded-full px-4 py-2 text-xs font-black transition ${
                            section === item
                              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.20)]'
                              : 'border border-white/10 bg-black/35 text-zinc-300 hover:border-violet-300/40 hover:text-white'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <select
                      value={section}
                      onChange={(e) => chooseSection(e.target.value)}
                      className="mt-3 h-11 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 text-sm font-bold text-white outline-none transition focus:border-cyan-400/50"
                    >
                      {sectionOptions.map((item) => (
                        <option key={item} value={item} className="bg-zinc-950">
                          {item === 'Все' ? 'Все серии' : item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
                <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
                  Популярные запросы
                </div>

                <div className="flex flex-wrap gap-2">
                  {['XROS 5', 'XROS 5 Mini', 'XROS 6', 'XROS 6 Mini', 'Hero 5', 'Wenax Q2', 'VMATE', 'Pasito', 'GTX 0.8', 'COREX 3.0'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setPopularQuery(item)}
                      className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                        normalizeSearch(query) === normalizeSearch(item)
                          ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-100'
                          : 'border-white/10 bg-black/35 text-zinc-400 hover:border-cyan-300/35 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
            <div className="min-w-0">
              <div className="flex flex-col gap-3 rounded-[22px] border border-white/10 bg-white/[0.025] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-black text-white">
                    {filtered.length} позиций найдено
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Сейчас показано {visibleProducts.length}. В запросе {selectedProducts.length}.
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyCatalogLink}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-zinc-300 transition hover:border-cyan-400/35 hover:text-white"
                  >
                    {linkCopied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
                  </button>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-zinc-300 transition hover:border-cyan-400/35 hover:text-white"
                  >
                    Сбросить
                  </button>
                </div>
              </div>

            {hasActiveFilters && (
              <div className="mt-5 rounded-[24px] border border-cyan-400/15 bg-cyan-400/[0.045] p-4 shadow-[0_0_45px_rgba(34,211,238,0.08)]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300/70">
                    Активные фильтры
                  </div>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-black text-cyan-200 transition hover:text-white"
                  >
                    Сбросить все
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-black">
                  {query.trim() && (
                    <button
                      type="button"
                      onClick={clearQuery}
                      className="rounded-full border border-cyan-400/25 bg-cyan-400/12 px-3 py-2 text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-400/18"
                    >
                      Поиск: {query} ×
                    </button>
                  )}
                  {brand !== 'Все' && (
                    <button
                      type="button"
                      onClick={clearBrand}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-white transition hover:border-cyan-300/50 hover:bg-white/[0.09]"
                    >
                      Бренд: {brand} ×
                    </button>
                  )}
                  {category !== 'Все' && (
                    <button
                      type="button"
                      onClick={clearCategory}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-white transition hover:border-cyan-300/50 hover:bg-white/[0.09]"
                    >
                      Категория: {category} ×
                    </button>
                  )}
                  {section !== 'Все' && (
                    <button
                      type="button"
                      onClick={clearSection}
                      className="rounded-full border border-violet-400/25 bg-violet-400/12 px-3 py-2 text-violet-100 transition hover:border-violet-300/60 hover:bg-violet-400/18"
                    >
                      Серия: {section} ×
                    </button>
                  )}
                  {status !== 'Все' && (
                    <button
                      type="button"
                      onClick={clearStatus}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-white transition hover:border-cyan-300/50 hover:bg-white/[0.09]"
                    >
                      {status} ×
                    </button>
                  )}
                  {sort !== 'Умная сортировка' && (
                    <button
                      type="button"
                      onClick={clearSort}
                      className="rounded-full border border-cyan-400/25 bg-cyan-400/12 px-3 py-2 text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-400/18"
                    >
                      Сортировка: {sort} ×
                    </button>
                  )}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="mt-10 rounded-[28px] border border-cyan-500/20 bg-cyan-500/10 p-8 text-center">
                <div className="mb-4 text-5xl">🔍</div>
                <h3 className="mb-3 text-2xl font-black">Ничего не найдено</h3>
                <p className="mb-6 text-zinc-400">Попробуйте изменить запрос или напишите нам — поможем найти нужную позицию.</p>
                <button onClick={resetFilters} className="rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-6 py-3 font-bold">Сбросить фильтры</button>
              </div>
            )}

            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductTile
                  key={product.id}
                  product={product}
                  onLead={closeLeadSurfaces}
                  onToggleRequest={toggleRequestProduct}
                  onPreview={setPreviewProduct}
                  isInRequest={selectedProducts.some((item) => item.id === product.id)}
                />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount((value) => value + PAGE_SIZE)}
                  className="rounded-[20px] border border-cyan-400/30 bg-cyan-400/10 px-8 py-4 font-black text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]"
                >
                  Показать ещё {Math.min(PAGE_SIZE, filtered.length - visibleCount)} →
                </button>
              </div>
            )}
            </div>
            </div>
          </div>
        </section>

        <section className="relative px-5 pb-10 pt-6 lg:px-6">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-cyan-400/20 bg-gradient-to-r from-violet-950/35 via-black to-cyan-950/30 p-7 shadow-[0_0_70px_rgba(34,211,238,0.12)]">
            <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-black md:text-4xl">Нужен актуальный оптовый прайс?</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-zinc-300">Напишите менеджеру в Telegram — он отправит наличие, цены и поможет собрать заказ под формат вашего магазина.</p>
              </div>
              <a href={requestLeadHref} target="_blank" rel="noreferrer" onClick={closeLeadSurfaces} className="w-full rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-10 py-5 text-center text-lg font-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition hover:scale-[1.03] lg:w-auto">Получить оптовый прайс →</a>
            </div>
          </div>
        </section>
{selectedProducts.length > 0 && (
          <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-18px)] max-w-3xl -translate-x-1/2 rounded-[18px] border border-cyan-400/25 bg-black/86 p-2 shadow-[0_0_45px_rgba(34,211,238,0.22)] backdrop-blur-2xl sm:bottom-5 sm:rounded-[22px] sm:p-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsRequestPanelOpen(true)}
                className="flex min-w-0 items-center gap-2 rounded-2xl text-left transition hover:bg-white/[0.035] sm:gap-3 sm:pr-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-400 text-base font-black sm:h-11 sm:w-11 sm:text-lg">
                  {selectedProducts.length}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-black sm:text-base">В запросе</div>
                  <div className="hidden truncate text-xs text-zinc-400 sm:block">
                    {selectedProducts.slice(0, 2).map((item) => cleanProductName(item)).join(' · ')}
                    {selectedProducts.length > 2 ? ` + ещё ${selectedProducts.length - 2}` : ''}
                  </div>
                </div>
              </button>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setIsRequestPanelOpen(true)}
                  className="rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-3 py-3 text-xs font-black text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/15 sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">Список</span>
                  <span className="hidden sm:inline">Посмотреть</span>
                </button>
                <a
                  href={requestLeadHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={openRequestLead}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-xs font-black shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:scale-[1.02] sm:px-5 sm:text-sm"
                >
                  Отправить →
                </a>
                <button
                  type="button"
                  onClick={clearRequestProducts}
                  className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-cyan-400/35 hover:text-white sm:block"
                >
                  Очистить
                </button>
              </div>
            </div>
          </div>
        )}

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className={`${selectedProducts.length > 0 ? 'hidden' : 'hidden md:block'} fixed bottom-5 right-5 z-40 rounded-full border border-cyan-400/25 bg-black/75 p-3 shadow-[0_0_28px_rgba(34,211,238,0.25)] backdrop-blur-xl transition hover:scale-105`}
          aria-label="Написать в Telegram"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 text-lg">✈</div>
            <div className="pr-2">
              <div className="text-[10px] text-zinc-400">Telegram</div>
              <div className="text-sm font-bold">Написать менеджеру</div>
            </div>
          </div>
        </a>
              <SiteFooter />
      </main>
    </>
  );
}
