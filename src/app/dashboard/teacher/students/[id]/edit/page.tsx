import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { StudentForm } from "@/components/student-form";
import { requireRole } from "@/lib/auth";
import { getStudentById } from "@/services/student-service";

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const current = await requireRole("teacher");
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) notFound();

  return (
    <DashboardShell title="Öğrenci Bilgilerini Düzenle" subtitle={student.fullName} crumb="Öğrencilerim > Düzenle" profileName={current?.profile?.full_name}>
      <StudentForm student={student} mode="edit" />
    </DashboardShell>
  );
}
