import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}
      >
        <header className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:text-slate-700 active:scale-[0.98]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                EP
              </span>
              EğitimPlatformu
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 ease-out hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register?role=teacher"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98]"
              >
                Ücretsiz Başla
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
