import { CardGrid } from "@/components/card-grid";
import { DashboardShell } from "@/components/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { parentModules } from "@/lib/data";

export default async function ParentDashboardPage() {
  const current = await requireRole("parent");

  return (
    <DashboardShell title="Veli Paneli" subtitle="Haklar, süreçler ve rehber içerikler sade bir kart yapısıyla sunulur." profileName={current?.profile?.full_name}>
      <CardGrid cards={parentModules} />
    </DashboardShell>
  );
}
