import { ButtonLink } from "@/components/button-link";
import { CardGrid } from "@/components/card-grid";
import { SiteHeader } from "@/components/site-header";
import { parentModules } from "@/lib/data";

export default function ParentsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Veliler için anlaşılır rehberlik alanı</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          RAM, BEP, kaynaştırma, destek eğitim ve haklar konusunda sade, güvenli ve bilgilendirici içerikler.
        </p>
        <div className="mt-6">
          <ButtonLink href="/register?role=parent">Veli hesabı oluştur</ButtonLink>
        </div>
        <div className="mt-10">
          <CardGrid cards={parentModules} />
        </div>
      </main>
    </div>
  );
}
