import { CardGrid } from "@/components/card-grid";
import { DashboardShell } from "@/components/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { teacherModules } from "@/lib/data";

export default async function TeacherDashboardPage() {
  const current = await requireRole("teacher");

  return (
    <DashboardShell title="Öğretmen Paneli" subtitle="Ana modüller kart sistemiyle düzenlendi. Uzun sol menü yok; modülden işleme, formdan önizlemeye ilerleyen akış var." profileName={current?.profile?.full_name}>
      <CardGrid cards={teacherModules} />
    </DashboardShell>
  );
}
