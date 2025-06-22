import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
      {/* Just a BG animation shapes addition */}
      <div className="pixel-bg">
        <div className="pixel-shape moon"></div>
        <div className="pixel-shape diamond"></div>
        <div className="pixel-shape star"></div>
        <div className="pixel-shape diamond"></div>
        <div className="pixel-shape moon"></div>
        <div className="pixel-shape star"></div>
        <div className="pixel-shape diamond"></div>
        <div className="pixel-shape moon"></div>
        <div className="pixel-shape star"></div>
        <div className="pixel-shape moon"></div>
        <div className="pixel-shape diamond"></div>
        <div className="pixel-shape star"></div>
      </div>
    </html>
  );
}
