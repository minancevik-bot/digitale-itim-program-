import { DashboardShell } from "@/components/dashboard-shell";
import { SupportForm } from "@/components/support-form";
import { requireRole } from "@/lib/auth";
import { listSupportTickets } from "@/services/support-service";

export default async function SupportPage() {
  const current = await requireRole("teacher");
  const tickets = await listSupportTickets(current?.user.id);

  return (
    <DashboardShell title="Destek" crumb="Destek" profileName={current?.profile?.full_name}>
      <div className="grid gap-5 lg:grid-cols-2">
        <SupportForm />
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-bold">Önceki destek talepleri</h2>
          <div className="mt-4 space-y-3">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="rounded-md border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{ticket.subject}</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{ticket.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{ticket.message}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-600">
            Sık sorulan sorular alanı sonraki içerik yönetimi aşamasında genişletilecek.
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
