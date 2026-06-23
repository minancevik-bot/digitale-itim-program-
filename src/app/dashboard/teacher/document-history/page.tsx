import { DashboardShell } from "@/components/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { listGeneratedDocuments } from "@/services/generated-document-service";

export default async function DocumentHistoryPage() {
  const current = await requireRole("teacher");
  const documents = await listGeneratedDocuments(current?.user.id);

  return (
    <DashboardShell title="Belge GeÃ§miÅŸim" subtitle="Kaydedilen belge ve tutanak taslaklarÄ±." crumb="Belge GeÃ§miÅŸim" profileName={current?.profile?.full_name}>
      <section className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="grid gap-3">
          {documents.map((document) => (
            <article key={document.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-bold">{document.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{document.documentType}</p>
                </div>
                <span className="text-sm text-slate-500">
                  {new Intl.DateTimeFormat("tr-TR").format(new Date(document.createdAt))}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
