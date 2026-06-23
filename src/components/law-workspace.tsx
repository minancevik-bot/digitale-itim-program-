import { listLawContents } from "@/services/law-service";

export async function LawWorkspace({ items }: { items: string[] }) {
  const contents = await listLawContents("teacher");

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Mevzuat içerikleri bilgilendirme amaçlıdır. Sistem kesin hukuki karar vermez; güncel resmi mevzuat, kurum kararları ve uzman görüşü esas alınmalıdır.
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a key={item} href="#law-contents" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-soft">
            <h3 className="font-bold">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Bu başlık için rehber içerikleri ve kısa notları inceleyin.</p>
          </a>
        ))}
      </div>
      <section id="law-contents" className="grid gap-4 md:grid-cols-2">
        {contents.map((content) => (
          <article key={content.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{content.category}</p>
            <h2 className="mt-2 text-lg font-bold">{content.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{content.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
