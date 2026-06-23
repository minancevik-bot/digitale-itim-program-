import { SiteHeader } from "@/components/site-header";

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">KVKK Bilgilendirmesi</h1>
        <p className="mt-4 leading-7 text-slate-600">Bu sayfa MVP için yer tutucudur. Hassas öğrenci verileri, açık rıza ve saklama politikaları sonraki aşamada ayrıntılandırılacaktır.</p>
      </main>
    </div>
  );
}
