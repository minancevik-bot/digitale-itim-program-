import { DashboardShell } from "@/components/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { parentModules } from "@/lib/data";
import { listLawContents, parentGuideForModule } from "@/services/law-service";

export default async function ParentModulePage({ params }: { params: Promise<{ module: string }> }) {
  const user = await requireRole("parent");
  const { module } = await params;
  const current = parentModules.find((item) => item.href.endsWith(`/${module}`));
  const guide = parentGuideForModule(module);
  const contents = await listLawContents("parent");

  return (
    <DashboardShell title={current?.title ?? guide.title} subtitle={current?.description} crumb={current?.title} profileName={user?.profile?.full_name}>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <section className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <h2 className="text-lg font-bold">{guide.title}</h2>
          <div className="mt-4 grid gap-3">
            {guide.bullets.map((bullet) => (
              <div key={bullet} className="rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-700">{bullet}</div>
            ))}
          </div>
          <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{guide.note}</p>
        </section>
        <section className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <h2 className="text-lg font-bold">Rehber Ä°Ã§erikler</h2>
          <div className="mt-4 space-y-3">
            {contents.slice(0, 4).map((content) => (
              <article key={content.id} className="rounded-md border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-900">{content.category}</p>
                <h3 className="mt-1 font-bold">{content.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{content.content}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
