import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://galaxyopt.ru";

export const metadata: Metadata = {
  title: "Каталог vape-продукции оптом",
  description:
    "Каталог ГАЛАКТИКА: устройства, картриджи, испарители и аксессуары для оптовых клиентов. Актуальное наличие, бренды Vaporesso, Geekvape, Voopoo, Smoant и другие.",
  alternates: {
    canonical: `${SITE_URL}/catalog`,
  },
  openGraph: {
    title: "Каталог ГАЛАКТИКА",
    description:
      "Оптовый каталог устройств, картриджей, испарителей и аксессуаров для магазинов и сетей.",
    url: `${SITE_URL}/catalog`,
    siteName: "ГАЛАКТИКА",
    images: [
      {
        url: `${SITE_URL}/preview-v2.jpg`,
        width: 1200,
        height: 630,
        alt: "Каталог ГАЛАКТИКА — оптовые поставки vape-продукции",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return children;
}
