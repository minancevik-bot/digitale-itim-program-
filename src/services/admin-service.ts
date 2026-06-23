import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminRow = Record<string, string | number | boolean | null>;

export async function listAdminRows(table: string, columns: string[]): Promise<AdminRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [Object.fromEntries(columns.map((column, index) => [column, index === 0 ? "Demo kayıt" : "-"]))];
  }

  const { data, error } = await supabase.from(table).select(columns.join(", ")).limit(20);

  if (error || !data) return [];

  return data as unknown as AdminRow[];
}
