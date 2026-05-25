import "./globals.css";

export const metadata = {
  title: "ГАЛАКТИКА",
  description: "Оптовые поставки POD-систем и расходников",
  icons: {
    icon: "/favicon.png",
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
