import { DashboardShell } from "@/components/dashboard-shell";
import { StudentList } from "@/components/student-list";
import { requireRole } from "@/lib/auth";

export default async function StudentsPage() {
  const current = await requireRole("teacher");

  return (
    <DashboardShell title="Öğrencilerim" subtitle="Öğrenci listesi, arama, kartlar ve profil geçişleri için başlangıç ekranı." crumb="Öğrencilerim" profileName={current?.profile?.full_name}>
      <StudentList />
    </DashboardShell>
  );
}
