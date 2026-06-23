import { ButtonLink } from "@/components/button-link";
import { CardGrid } from "@/components/card-grid";
import { SiteHeader } from "@/components/site-header";
import { teacherModules } from "@/lib/data";

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Öğretmenler için işlem odaklı dijital çalışma alanı</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          BEP, değerlendirme, evrak, tutanak, materyal ve mevzuat süreçleri kart tabanlı sade bir akışta toplanır.
        </p>
        <div className="mt-6">
          <ButtonLink href="/register?role=teacher">Öğretmen hesabı oluştur</ButtonLink>
        </div>
        <div className="mt-10">
          <CardGrid cards={teacherModules} />
        </div>
      </main>
    </div>
  );
}
