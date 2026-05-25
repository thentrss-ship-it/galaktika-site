export const metadata = {
  title: 'ГАЛАКТИКА',
  description: 'Оптовые поставки POD-систем',
  icons: {
    icon: '/favicon.png',
  },
}
import "./globals.css";

export const metadata = {
  title: "ГАЛАКТИКА",
  description: "Оптовые поставки POD-систем и расходников",
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
