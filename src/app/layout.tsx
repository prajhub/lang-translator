import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lang Lung",
  description: "Translate your favorite texts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
