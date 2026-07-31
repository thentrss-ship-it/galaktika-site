import { NextResponse } from 'next/server';

import { products as fallbackProducts } from '../../../data/products';

const CATALOG_FEED_URL =
  process.env.CATALOG_FEED_URL ?? 'https://salary.galaxyopt.ru/catalog.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(CATALOG_FEED_URL, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Catalog feed returned ${response.status}`);
    }

    const products = await response.json();
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('Catalog feed is empty');
    }

    return NextResponse.json(products, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    console.error('Catalog feed fallback:', error);
    return NextResponse.json(fallbackProducts, {
      headers: { 'Cache-Control': 'public, s-maxage=30' },
    });
  }
}
