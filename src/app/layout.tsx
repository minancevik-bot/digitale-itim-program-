import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Eğitim Platformu",
  description: "Öğretmenler ve veliler için dijital eğitim platformu"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-[#fafafa] text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
