import { notFound } from "next/navigation";
import { AdminLawContentForm } from "@/components/admin-law-content-form";
import { AdminMaterialModeration } from "@/components/admin-material-moderation";
import { AdminSupportTicketActions } from "@/components/admin-support-ticket-actions";
import { DashboardShell } from "@/components/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { adminSections } from "@/lib/data";
import { listAdminRows } from "@/services/admin-service";

export default async function AdminModulePage({ params }: { params: Promise<{ module: string }> }) {
  const current = await requireRole("admin");
  const { module } = await params;
  const section = adminSections[module];
  if (!section) notFound();

  const rows = await listAdminRows(section.table, section.columns);

  return (
    <DashboardShell title={section.title} subtitle={section.description} crumb={`Admin > ${section.title}`} profileName={current?.profile?.full_name}>
      {module === "law-contents" ? <AdminLawContentForm /> : null}
      {module === "materials" ? <AdminMaterialModeration /> : null}
      {module === "support-tickets" ? <AdminSupportTicketActions /> : null}
      <section className="overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                {section.columns.map((column) => (
                  <th key={column} className="px-5 py-4 font-semibold">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length ? rows.map((row, index) => (
                <tr key={index} className="border-b border-slate-100 last:border-b-0">
                  {section.columns.map((column) => (
                    <td key={column} className="px-5 py-4 text-slate-600">{String(row[column] ?? "-")}</td>
                  ))}
                </tr>
              )) : (
                <tr>
                  <td colSpan={section.columns.length} className="px-5 py-10 text-center text-slate-500">
                    Bu bölümde henüz kayıt yok veya RLS erişimi kayıtları göstermiyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}
