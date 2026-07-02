import type { Metadata } from "next";
import type { ReactNode } from "react";
import { YandexMetrika } from "../components/YandexMetrika";
import "./globals.css";

const siteUrl = "https://galaxyopt.ru";
const siteTitle = "ГАЛАКТИКА — оптовые поставки vape-продукции";
const siteDescription =
  "Оптовые поставки vape-продукции для магазинов, сетей и B2B-клиентов. Vaporesso, Geekvape, Voopoo, Smoant, Rincoe. Склад в Москве, отправка по России.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — ГАЛАКТИКА",
  },
  description: siteDescription,
  keywords: [
    "вейпы оптом",
    "pod системы оптом",
    "vaporesso оптом",
    "geekvape оптом",
    "voopoo оптом",
    "smoant оптом",
    "rincoe оптом",
    "вейп расходники оптом",
    "картриджи оптом",
    "испарители оптом",
    "вейп шоп поставщик",
    "вейпы опт россия",
    "xros оптом",
    "wenax оптом",
    "pasito оптом",
    "vape wholesale",
    "pod системы",
  ],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: siteTitle,
    description:
      "Оригинальная продукция от топовых брендов. Оптовый прайс, наличие и быстрая отгрузка по России.",
    url: siteUrl,
    siteName: "ГАЛАКТИКА",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "ГАЛАКТИКА — оптовые поставки vape-продукции",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Оптовый B2B-каталог vape-продукции. Склад Москва, отправка по России.",
    images: ["/preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
