"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl border border-slate-200/60 bg-white p-2 text-slate-600 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
      aria-label="Çıkış yap"
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
}
