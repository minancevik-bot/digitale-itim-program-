import { RegisterForm } from "@/components/auth-form";
import { SiteHeader } from "@/components/site-header";
import type { UserRole } from "@/lib/types";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const selectedRole: UserRole = params.role === "parent" ? "parent" : "teacher";

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 py-12">
        <RegisterForm initialRole={selectedRole} />
      </main>
    </div>
  );
}
