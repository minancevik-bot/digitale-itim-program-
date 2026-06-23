import { RegisterForm } from "@/components/auth-form";
import type { UserRole } from "@/lib/types";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const selectedRole: UserRole = params.role === "parent" ? "parent" : "teacher";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-16">
      <div className="w-full max-w-lg">
        <RegisterForm initialRole={selectedRole} />
      </div>
    </div>
  );
}
