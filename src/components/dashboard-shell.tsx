"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Boxes,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Scale,
  Settings,
  UserCircle,
  Users,
  X
} from "lucide-react";
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

const navGroups = {
  teacher: [
    { href: "/dashboard/teacher", label: "Genel Bakış", icon: LayoutDashboard },
    { href: "/dashboard/teacher/bep", label: "BEP ve Değerlendirme", icon: ClipboardList },
    { href: "/dashboard/teacher/students", label: "Öğrencilerim", icon: GraduationCap },
    { href: "/dashboard/teacher/documents", label: "Evrak Merkezi", icon: FileText },
    { href: "/dashboard/teacher/materials", label: "Materyal Havuzu", icon: Boxes },
    { href: "/dashboard/teacher/law", label: "Mevzuat Rehberi", icon: Scale },
    { href: "/dashboard/teacher/support", label: "Destek", icon: LifeBuoy }
  ],
  parent: [
    { href: "/dashboard/parent", label: "Genel Bakış", icon: LayoutDashboard },
    { href: "/dashboard/parent/rights", label: "Haklarım", icon: Scale },
    { href: "/dashboard/parent/ram", label: "RAM Süreci", icon: BookOpen },
    { href: "/dashboard/parent/community", label: "Veli Topluluğu", icon: Users },
    { href: "/dashboard/parent/experts", label: "Uzman Bul", icon: UserCircle }
  ],
  admin: [
    { href: "/dashboard/admin", label: "Genel Bakış", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Kullanıcılar", icon: Users },
    { href: "/dashboard/admin/students", label: "Öğrenciler", icon: GraduationCap },
    { href: "/dashboard/admin/materials", label: "Materyaller", icon: Boxes },
    { href: "/dashboard/admin/settings", label: "Ayarlar", icon: Settings }
  ]
};

function getRole(pathname: string) {
  if (pathname.startsWith("/dashboard/admin")) return "admin";
  if (pathname.startsWith("/dashboard/parent")) return "parent";
  return "teacher";
}

export function DashboardShell({ children, title, subtitle, crumb, profileName }: Props) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = getRole(pathname);
  const navItems = navGroups[role];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Menüyü kapat"
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/60 bg-white transition-all duration-300 ease-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200/60 px-5">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:text-slate-700 active:scale-[0.98]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              EP
            </span>
            {brand.name}
          </Link>
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 transition-all duration-300 ease-out hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out active:scale-[0.98] ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Menüyü aç"
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-lg border border-slate-200/60 bg-white p-2 text-slate-600 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-500">
                  Ana Panel{crumb ? ` / ${crumb}` : ""}
                </p>
              </div>
            </div>

            <div className="hidden min-w-0 flex-1 justify-center md:flex">
              <div className="w-full max-w-xl">
                <GlobalSearch />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/profile"
                aria-label="Profil"
                className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
              >
                <UserCircle className="h-5 w-5" />
                {profileName ? <span className="hidden max-w-32 truncate lg:inline">{profileName}</span> : null}
              </Link>
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="bg-[#FAFAFA] p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold leading-tight tracking-[0] text-slate-900 md:text-4xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500 md:text-base">
                  {subtitle}
                </p>
              ) : null}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
