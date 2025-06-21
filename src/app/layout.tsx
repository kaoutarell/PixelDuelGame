import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Pixel Duel",
  description: "A simple pixel card game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
