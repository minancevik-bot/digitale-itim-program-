import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { UserRole } from "@/lib/types";

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data: userResult } = await supabase.auth.getUser();
  const user = userResult.user;
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    user,
    profile: profile as { full_name: string; email: string; role: UserRole } | null
  };
}

export function dashboardPathForRole(role: UserRole) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "parent") return "/dashboard/parent";
  return "/dashboard/teacher";
}

export async function redirectToDashboardForCurrentUser() {
  const current = await getCurrentProfile();
  if (!current?.user) redirect("/login");

  const role = current.profile?.role ?? (current.user.user_metadata?.role as UserRole | undefined) ?? "teacher";
  redirect(dashboardPathForRole(role));
}

export async function requireRole(allowedRoles: UserRole | UserRole[]) {
  if (!isSupabaseConfigured) return null;

  const current = await getCurrentProfile();
  if (!current?.user) redirect("/login");

  const role = current.profile?.role ?? (current.user.user_metadata?.role as UserRole | undefined) ?? "teacher";
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!allowed.includes(role)) {
    redirect(dashboardPathForRole(role));
  }

  return {
    user: current.user,
    profile: current.profile,
    role
  };
}
