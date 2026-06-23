import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Material = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  targetAge: string | null;
  targetSkill: string | null;
  fileUrl: string | null;
  status: string;
  isPremium: boolean;
};

type MaterialRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  target_age: string | null;
  target_skill: string | null;
  file_url: string | null;
  status: string;
  is_premium: boolean;
};

const fallbackMaterials: Material[] = [
  {
    id: "demo-reading",
    title: "Okuma akıcılığı kartları",
    description: "Hece, kelime ve kısa cümle çalışmaları için örnek materyal.",
    category: "Okuma Yazma Materyalleri",
    targetAge: "7-10",
    targetSkill: "Okuma akıcılığı",
    fileUrl: null,
    status: "approved",
    isPremium: false
  },
  {
    id: "demo-attention",
    title: "Dikkat ve eşleme çalışma sayfası",
    description: "Görsel dikkat, yönerge takibi ve sınıflama becerileri için başlangıç materyali.",
    category: "Dikkat Çalışmaları",
    targetAge: "6-9",
    targetSkill: "Dikkat",
    fileUrl: null,
    status: "approved",
    isPremium: false
  }
];

function normalizeMaterial(row: MaterialRow): Material {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    targetAge: row.target_age,
    targetSkill: row.target_skill,
    fileUrl: row.file_url,
    status: row.status,
    isPremium: row.is_premium
  };
}

export async function listMaterials(category?: string): Promise<Material[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return category ? fallbackMaterials.filter((material) => material.category === category) : fallbackMaterials;
  }

  let query = supabase
    .from("materials")
    .select("id, title, description, category, target_age, target_skill, file_url, status, is_premium")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query.limit(30);
  if (error) return fallbackMaterials;

  return ((data ?? []) as MaterialRow[]).map(normalizeMaterial);
}
