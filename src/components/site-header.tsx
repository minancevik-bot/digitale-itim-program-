import Link from "next/link";
import { brand } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-brand-900">
          {brand.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/teachers">Öğretmenler</Link>
          <Link href="/parents">Veliler</Link>
          <Link href="/pricing">Paketler</Link>
        </nav>
        <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold" href="/login">
          Giriş
        </Link>
      </div>
    </header>
  );
}
