import { createSupabaseServerClient } from "@/lib/supabase/server";

export type TeacherLicense = {
  licensePackage: string;
  bepQuota: number;
  documentQuota: number;
  licenseExpiresAt: string | null;
};

export async function getTeacherLicense(userId?: string): Promise<TeacherLicense> {
  const fallback = {
    licensePackage: "Ücretsiz Deneme",
    bepQuota: 5,
    documentQuota: 10,
    licenseExpiresAt: null
  };

  if (!userId) return fallback;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("teacher_profiles")
    .select("license_package, bep_quota, document_quota, license_expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return fallback;

  return {
    licensePackage: data.license_package ?? fallback.licensePackage,
    bepQuota: data.bep_quota ?? fallback.bepQuota,
    documentQuota: data.document_quota ?? fallback.documentQuota,
    licenseExpiresAt: data.license_expires_at ?? null
  };
}
