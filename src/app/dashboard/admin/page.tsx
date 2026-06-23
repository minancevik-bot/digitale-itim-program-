import { CardGrid } from "@/components/card-grid";
import { DashboardShell } from "@/components/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { adminModules } from "@/lib/data";

export default async function AdminDashboardPage() {
  const current = await requireRole("admin");

  return (
    <DashboardShell title="Admin Paneli" subtitle="İlk MVP için temel yönetim kartları. CRUD ekranları sonraki aşamada genişletilir." profileName={current?.profile?.full_name}>
      <CardGrid cards={adminModules} />
    </DashboardShell>
  );
}
