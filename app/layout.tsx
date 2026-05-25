import "./globals.css";

export const metadata = {
  title: "ГАЛАКТИКА — оптовые поставки POD-систем",

  description:
    "Vaporesso, Geekvape, Voopoo, Smoant, Rincoe. Оптовые поставки POD-систем, картриджей и расходников по РФ.",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "ГАЛАКТИКА",
    description:
      "Оптовые поставки POD-систем и расходников по всей РФ.",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
