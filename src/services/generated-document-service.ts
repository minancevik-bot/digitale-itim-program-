import { createSupabaseServerClient } from "@/lib/supabase/server";

export type GeneratedDocument = {
  id: string;
  title: string;
  documentType: string;
  createdAt: string;
};

type GeneratedDocumentRow = {
  id: string;
  title: string;
  document_type: string;
  created_at: string;
};

export async function listGeneratedDocuments(userId?: string, studentId?: string): Promise<GeneratedDocument[]> {
  const fallback = [
    {
      id: "demo-document",
      title: "Demo BEP taslağı",
      documentType: "BEP Hazırla",
      createdAt: new Date().toISOString()
    }
  ];

  if (!userId) return fallback;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallback;

  let query = supabase
    .from("generated_documents")
    .select("id, title, document_type, created_at")
    .eq("teacher_id", userId)
    .order("created_at", { ascending: false });

  if (studentId) {
    query = query.eq("student_id", studentId);
  }

  const { data, error } = await query.limit(20);

  if (error) return fallback;

  return ((data ?? []) as GeneratedDocumentRow[]).map((document) => ({
    id: document.id,
    title: document.title,
    documentType: document.document_type,
    createdAt: document.created_at
  }));
}
