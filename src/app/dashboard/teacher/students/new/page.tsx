import { DashboardShell } from "@/components/dashboard-shell";
import { StudentForm } from "@/components/student-form";
import { requireRole } from "@/lib/auth";

export default async function NewStudentPage() {
  const current = await requireRole("teacher");

  return (
    <DashboardShell title="Yeni Öğrenci" subtitle="Hassas öğrenci verileri için KVKK bilgilendirmesi ve ileride açık rıza alanı eklenebilecek yapı." crumb="Öğrencilerim > Yeni Öğrenci" profileName={current?.profile?.full_name}>
      <StudentForm />
    </DashboardShell>
  );
}
