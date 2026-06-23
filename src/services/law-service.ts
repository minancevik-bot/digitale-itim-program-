import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LawContent = {
  id: string;
  title: string;
  category: string;
  audience: "teacher" | "parent" | "both";
  content: string;
  status: string;
};

type LawRow = LawContent;

export const fallbackLawContents: LawContent[] = [
  {
    id: "rights",
    title: "Özel eğitim hakları",
    category: "Veli Hakları",
    audience: "both",
    status: "published",
    content: "Özel eğitim hizmetleri eğitimsel değerlendirme, yerleştirme, destek eğitim ve okul içi uyarlama süreçlerini kapsar. Bu içerik bilgilendirme amaçlıdır."
  },
  {
    id: "ram",
    title: "RAM süreci",
    category: "RAM Süreçleri",
    audience: "both",
    status: "published",
    content: "RAM başvuru, değerlendirme, raporlama ve yönlendirme adımlarından oluşur. Kesin işlem için ilgili kurum duyuruları ve resmi mevzuat esas alınmalıdır."
  },
  {
    id: "bep",
    title: "BEP süreci",
    category: "BEP Mevzuatı",
    audience: "both",
    status: "published",
    content: "BEP, öğrencinin bireysel gereksinimlerine göre amaç, yöntem, materyal ve değerlendirme adımlarının planlandığı eğitim programıdır."
  }
];

export async function listLawContents(audience: "teacher" | "parent" | "both", category?: string): Promise<LawContent[]> {
  const supabase = await createSupabaseServerClient();
  const fallback = fallbackLawContents.filter((item) => {
    const audienceMatches = item.audience === audience || item.audience === "both" || audience === "both";
    return audienceMatches && (!category || item.category === category);
  });

  if (!supabase) return fallback;

  let query = supabase
    .from("law_contents")
    .select("id, title, category, audience, content, status")
    .in("audience", audience === "both" ? ["teacher", "parent", "both"] : [audience, "both"])
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query.limit(20);
  if (error) return fallback;

  return ((data ?? []) as LawRow[]).length ? ((data ?? []) as LawRow[]) : fallback;
}

export function parentGuideForModule(module: string) {
  const guides: Record<string, { title: string; bullets: string[]; note: string }> = {
    rights: {
      title: "Haklarımı Öğrenmek İstiyorum",
      bullets: ["Eğitsel değerlendirme için RAM başvurusu yapılabilir.", "BEP toplantılarına veli katılımı önemlidir.", "Destek eğitim ve uyarlama talepleri okul ile görüşülmelidir."],
      note: "Bu içerik hukuki danışmanlık değildir; güncel resmi mevzuat ve kurum kararları esas alınmalıdır."
    },
    ram: {
      title: "RAM Süreci",
      bullets: ["Başvuru belgeleri hazırlanır.", "Eğitsel değerlendirme randevusu takip edilir.", "Rapor sonucu okul ve aile ile birlikte eğitim planına yansıtılır."],
      note: "RAM süreci il/ilçe uygulamalarına göre takvimsel farklılık gösterebilir."
    },
    bep: {
      title: "BEP Süreci",
      bullets: ["Öğrencinin performans düzeyi belirlenir.", "Uzun ve kısa dönemli amaçlar yazılır.", "Materyal, yöntem ve ölçme-değerlendirme kararları planlanır."],
      note: "BEP öğrencinin ihtiyacına göre yıl içinde güncellenebilir."
    }
  };

  return guides[module] ?? {
    title: "Veli Rehberi",
    bullets: ["Başvuru, takip ve okul iş birliği adımlarını not edin.", "Çocuğun güçlü yanlarını ve destek ihtiyacını düzenli gözlemleyin.", "Resmi kararlar için okul, RAM ve ilgili kurumlarla görüşün."],
    note: "Sistem tanı koymaz, tedavi önermez ve kesin hukuki karar üretmez."
  };
}
