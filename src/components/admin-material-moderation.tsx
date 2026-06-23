"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type MaterialRow = {
  id: string;
  title: string;
  category: string | null;
  status: "pending" | "approved" | "rejected";
  is_premium: boolean;
};

export function AdminMaterialModeration() {
  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [message, setMessage] = useState("Materyaller yÃ¼kleniyor.");

  async function loadMaterials() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMaterials([
        { id: "demo-material", title: "Demo onay bekleyen materyal", category: "Dikkat Ã‡alÄ±ÅŸmalarÄ±", status: "pending", is_premium: false }
      ]);
      setMessage("Demo materyaller gÃ¶steriliyor.");
      return;
    }

    const { data, error } = await supabase
      .from("materials")
      .select("id, title, category, status, is_premium")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMaterials((data ?? []) as MaterialRow[]);
    setMessage(data?.length ? "Materyaller listelendi." : "Onay bekleyen veya kayÄ±tlÄ± materyal yok.");
  }

  async function updateStatus(id: string, status: MaterialRow["status"]) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMaterials((current) => current.map((material) => material.id === id ? { ...material, status } : material));
      setMessage("Demo modunda durum gÃ¼ncellendi.");
      return;
    }

    const { error } = await supabase.from("materials").update({ status }).eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }

    await loadMaterials();
  }

  useEffect(() => {
    void loadMaterials();
  }, []);

  return (
    <section className="mb-6 rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <h2 className="text-lg font-bold">Materyal Onay YÃ¶netimi</h2>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      <div className="mt-4 grid gap-3">
        {materials.map((material) => (
          <article key={material.id} className="rounded-md border border-slate-200 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold">{material.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{material.category ?? "Kategori yok"} â€¢ {material.status}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => updateStatus(material.id, "approved")} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">Onayla</button>
                <button type="button" onClick={() => updateStatus(material.id, "rejected")} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white">Reddet</button>
                <button type="button" onClick={() => updateStatus(material.id, "pending")} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm font-semibold">Beklet</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
