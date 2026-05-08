import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Needle Hue Art | Luxury Handcrafted Fashion",
  description: "Exquisite hand-painted and embroidered Punjabi suits by Sukhchain Kaur. Needle Hue Art – The Living Lookbook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans cursor-none">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
