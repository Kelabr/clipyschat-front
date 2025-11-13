import "./globals.css";

export const metadata = {
  title: "Clipyschat",
  description: "Só um chat de estudos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
