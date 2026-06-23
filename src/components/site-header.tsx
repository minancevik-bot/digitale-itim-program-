import Link from "next/link";
import { brand } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:text-slate-700 active:scale-[0.98]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            EP
          </span>
          {brand.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-500 md:flex">
          <Link className="transition-all duration-300 ease-out hover:text-slate-900 active:scale-[0.98]" href="/teachers">
            Öğretmenler
          </Link>
          <Link className="transition-all duration-300 ease-out hover:text-slate-900 active:scale-[0.98]" href="/parents">
            Veliler
          </Link>
          <Link className="transition-all duration-300 ease-out hover:text-slate-900 active:scale-[0.98]" href="/pricing">
            Paketler
          </Link>
        </nav>
        <Link
          className="rounded-xl border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]"
          href="/login"
        >
          Giriş
        </Link>
      </div>
    </header>
  );
}
