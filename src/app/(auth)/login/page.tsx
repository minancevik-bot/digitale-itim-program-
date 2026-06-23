import { Suspense } from "react";
import { LoginForm } from "@/components/auth-form";
import { SiteHeader } from "@/components/site-header";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-12">
        <Suspense fallback={<div className="rounded-lg border border-slate-200 bg-white p-6">Form yükleniyor...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
