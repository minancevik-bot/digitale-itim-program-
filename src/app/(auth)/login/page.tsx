import { Suspense } from "react";
import { LoginForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-16">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-slate-200/60 bg-white p-10 text-sm text-slate-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              Form yükleniyor...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
