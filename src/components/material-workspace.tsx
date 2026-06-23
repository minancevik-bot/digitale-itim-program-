import { MaterialUploadForm } from "@/components/material-upload-form";
import { listMaterials } from "@/services/material-service";

export async function MaterialWorkspace({ items }: { items: string[] }) {
  const materials = await listMaterials();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <a key={item} href={item === "Materyal YÃ¼kle" ? "#material-upload" : "#material-list"} className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-base font-bold text-slate-950">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item === "Materyal YÃ¼kle" ? "Yeni materyali onay sÃ¼recine gÃ¶nderin." : "Kategoriye gÃ¶re materyal havuzunu inceleyin."}
            </p>
          </a>
        ))}
      </div>

      <section id="material-list" className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <h2 className="text-lg font-bold">Materyal Havuzu</h2>
        <p className="mt-1 text-sm text-slate-600">OnaylÄ± materyaller ve kendi yÃ¼klediÄŸiniz onay bekleyen materyaller RLS kurallarÄ±na gÃ¶re listelenir.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {materials.map((material) => (
            <article key={material.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{material.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{material.description}</p>
                </div>
                {material.isPremium ? <span className="rounded-full bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-900">Premium</span> : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                {material.category ? <span className="rounded-full bg-slate-100 px-2 py-1">{material.category}</span> : null}
                {material.targetSkill ? <span className="rounded-full bg-slate-100 px-2 py-1">{material.targetSkill}</span> : null}
                {material.targetAge ? <span className="rounded-full bg-slate-100 px-2 py-1">{material.targetAge}</span> : null}
              </div>
              {material.fileUrl ? <a className="mt-4 inline-flex text-sm font-semibold text-slate-900" href={material.fileUrl}>Materyali aÃ§</a> : null}
            </article>
          ))}
        </div>
      </section>

      <div id="material-upload">
        <MaterialUploadForm />
      </div>
    </div>
  );
}
