import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { StudentDeleteButton } from "@/components/student-delete-button";
import { requireRole } from "@/lib/auth";
import { listGeneratedDocuments } from "@/services/generated-document-service";
import { getStudentById } from "@/services/student-service";

const tabs = ["Genel Bilgiler", "BEP Geçmişi", "Evrak Arşivi", "Gelişim Takibi", "Materyal Atamaları", "Notlar"];

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const current = await requireRole("teacher");
  const { id } = await params;
  const student = await getStudentById(id);
  const documents = await listGeneratedDocuments(current?.user.id, id);

  if (!student) {
    return (
      <DashboardShell title="Öğrenci bulunamadı" subtitle="Bu öğrenci kaydı yok veya erişim yetkiniz dışında." crumb="Öğrencilerim > Profil" profileName={current?.profile?.full_name}>
        <section className="rounded-lg border border-slate-200 bg-white p-5 text-slate-600">
          Öğrenci listesine dönüp mevcut kayıtları kontrol edebilirsiniz.
        </section>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title={student.fullName} subtitle={`${student.gradeLevel} • ${student.schoolName}`} crumb="Öğrencilerim > Profil" profileName={current?.profile?.full_name}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => <button key={tab} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold">{tab}</button>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/dashboard/teacher/students/${student.id}/edit`} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            Bilgileri düzenle
          </Link>
          <StudentDeleteButton studentId={student.id} />
        </div>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Genel Bilgiler</h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-slate-500">Öğrenci durumu</dt>
            <dd className="mt-1 text-slate-800">{student.studentStatus}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Eğitim ihtiyacı</dt>
            <dd className="mt-1 text-slate-800">{student.educationNeed}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Veli</dt>
            <dd className="mt-1 text-slate-800">{student.parentName ?? "Girilmedi"}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Veli telefonu</dt>
            <dd className="mt-1 text-slate-800">{student.parentPhone ?? "Girilmedi"}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Doğum tarihi</dt>
            <dd className="mt-1 text-slate-800">{student.birthDate ?? "Girilmedi"}</dd>
          </div>
        </dl>
        {student.diagnosisInfo ? (
          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Tanı/engel bilgisi hassas veridir: {student.diagnosisInfo}
          </div>
        ) : null}
        {student.notes ? <p className="mt-5 text-sm text-slate-600">{student.notes}</p> : null}
      </section>

      <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">BEP Geçmişi ve Evrak Arşivi</h2>
        <div className="mt-4 grid gap-3">
          {documents.length ? documents.map((document) => (
            <article key={document.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold">{document.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{document.documentType}</p>
                </div>
                <span className="text-sm text-slate-500">{new Intl.DateTimeFormat("tr-TR").format(new Date(document.createdAt))}</span>
              </div>
            </article>
          )) : (
            <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-600">
              Bu öğrenciye bağlı kayıtlı belge yok. BEP veya evrak oluştururken “Kayıtlı öğrenci seç” alanından bu öğrenciyi seçebilirsiniz.
            </p>
          )}
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        {["Gelişim Takibi", "Materyal Atamaları"].map((title) => (
          <div key={title} className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Bu alan kazanım, materyal ve dönemsel ilerleme kayıtları için hazırlandı.</p>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
