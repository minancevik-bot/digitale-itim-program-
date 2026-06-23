import Link from "next/link";
import { Bell, UserCircle } from "lucide-react";
import { GlobalSearch } from "@/components/global-search";
import { LogoutButton } from "@/components/logout-button";
import { brand } from "@/lib/brand";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  crumb?: string;
  profileName?: string;
};

export function DashboardShell({ children, title, subtitle, crumb, profileName }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="font-bold text-brand-900">
            {brand.name}
          </Link>
          <div className="flex flex-1 items-center gap-3 md:max-w-xl">
            <GlobalSearch />
            <button className="rounded-md border border-slate-200 p-2 text-slate-600" aria-label="Bildirimler">
              <Bell className="h-5 w-5" />
            </button>
            <div className="hidden rounded-md bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 md:block">
              Deneme paketi: 5 BEP
            </div>
            <Link href="/dashboard/profile" className="rounded-md border border-slate-200 p-2 text-slate-600" aria-label="Profil">
              <UserCircle className="h-5 w-5" />
            </Link>
            {profileName ? <span className="hidden text-sm font-semibold text-slate-700 lg:inline">{profileName}</span> : null}
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <p className="mb-3 text-sm text-slate-500">Ana Panel{crumb ? ` > ${crumb}` : ""}</p>
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">{title}</h1>
          {subtitle ? <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p> : null}
        </div>
        {children}
      </main>
    </div>
  );
}
