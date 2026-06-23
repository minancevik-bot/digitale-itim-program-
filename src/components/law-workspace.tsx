import { listLawContents } from "@/services/law-service";

export async function LawWorkspace({ items }: { items: string[] }) {
  const contents = await listLawContents("teacher");

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Mevzuat iÃ§erikleri bilgilendirme amaÃ§lÄ±dÄ±r. Sistem kesin hukuki karar vermez; gÃ¼ncel resmi mevzuat, kurum kararlarÄ± ve uzman gÃ¶rÃ¼ÅŸÃ¼ esas alÄ±nmalÄ±dÄ±r.
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a key={item} href="#law-contents" className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-bold">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Bu baÅŸlÄ±k iÃ§in rehber iÃ§erikleri ve kÄ±sa notlarÄ± inceleyin.</p>
          </a>
        ))}
      </div>
      <section id="law-contents" className="grid gap-4 md:grid-cols-2">
        {contents.map((content) => (
          <article key={content.id} className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">{content.category}</p>
            <h2 className="mt-2 text-lg font-bold">{content.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{content.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
