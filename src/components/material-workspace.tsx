import { MaterialUploadForm } from "@/components/material-upload-form";
import { listMaterials } from "@/services/material-service";

export async function MaterialWorkspace({ items }: { items: string[] }) {
  const materials = await listMaterials();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <a key={item} href={item === "Materyal Yükle" ? "#material-upload" : "#material-list"} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-soft">
            <h3 className="text-base font-bold text-slate-950">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item === "Materyal Yükle" ? "Yeni materyali onay sürecine gönderin." : "Kategoriye göre materyal havuzunu inceleyin."}
            </p>
          </a>
        ))}
      </div>

      <section id="material-list" className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Materyal Havuzu</h2>
        <p className="mt-1 text-sm text-slate-600">Onaylı materyaller ve kendi yüklediğiniz onay bekleyen materyaller RLS kurallarına göre listelenir.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {materials.map((material) => (
            <article key={material.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{material.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{material.description}</p>
                </div>
                {material.isPremium ? <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700">Premium</span> : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                {material.category ? <span className="rounded-full bg-slate-100 px-2 py-1">{material.category}</span> : null}
                {material.targetSkill ? <span className="rounded-full bg-slate-100 px-2 py-1">{material.targetSkill}</span> : null}
                {material.targetAge ? <span className="rounded-full bg-slate-100 px-2 py-1">{material.targetAge}</span> : null}
              </div>
              {material.fileUrl ? <a className="mt-4 inline-flex text-sm font-semibold text-brand-700" href={material.fileUrl}>Materyali aç</a> : null}
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
