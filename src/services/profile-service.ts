import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/types";

export type BaseProfile = {
  fullName: string;
  email: string;
  role: UserRole;
  phone: string;
};

export type TeacherProfileDetails = {
  branch: string;
  schoolName: string;
  city: string;
  district: string;
};

export type ParentProfileDetails = {
  city: string;
  district: string;
  childCount: number;
};

export type ProfileSettings = {
  userId: string | null;
  base: BaseProfile;
  teacher: TeacherProfileDetails | null;
  parent: ParentProfileDetails | null;
};

export async function getProfileSettings(): Promise<ProfileSettings> {
  const fallback: ProfileSettings = {
    userId: null,
    base: {
      fullName: "Demo Kullanıcı",
      email: "demo@egitimplatformu.test",
      role: "teacher",
      phone: ""
    },
    teacher: {
      branch: "Özel Eğitim",
      schoolName: "Demo Okul",
      city: "",
      district: ""
    },
    parent: null
  };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallback;

  const { data: userResult } = await supabase.auth.getUser();
  const user = userResult.user;
  if (!user) return fallback;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role, phone")
    .eq("user_id", user.id)
    .maybeSingle();

  const role = (profile?.role as UserRole | undefined) ?? "teacher";

  const settings: ProfileSettings = {
    userId: user.id,
    base: {
      fullName: profile?.full_name ?? user.user_metadata?.full_name ?? "",
      email: profile?.email ?? user.email ?? "",
      role,
      phone: profile?.phone ?? ""
    },
    teacher: null,
    parent: null
  };

  if (role === "teacher") {
    const { data: teacher } = await supabase
      .from("teacher_profiles")
      .select("branch, school_name, city, district")
      .eq("user_id", user.id)
      .maybeSingle();

    settings.teacher = {
      branch: teacher?.branch ?? "",
      schoolName: teacher?.school_name ?? "",
      city: teacher?.city ?? "",
      district: teacher?.district ?? ""
    };
  }

  if (role === "parent") {
    const { data: parent } = await supabase
      .from("parent_profiles")
      .select("city, district, child_count")
      .eq("user_id", user.id)
      .maybeSingle();

    settings.parent = {
      city: parent?.city ?? "",
      district: parent?.district ?? "",
      childCount: parent?.child_count ?? 0
    };
  }

  return settings;
}
