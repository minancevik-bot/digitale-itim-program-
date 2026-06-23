import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { StudentDeleteButton } from "@/components/student-delete-button";
import { requireRole } from "@/lib/auth";
import { listGeneratedDocuments } from "@/services/generated-document-service";
import { getStudentById } from "@/services/student-service";

const tabs = ["Genel Bilgiler", "BEP Geçmişi", "Evrak Arşivi", "Gelişim Takibi", "Materyal Atamaları", "Notlar"];

const cardClass = "rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]";

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const current = await requireRole("teacher");
  const { id } = await params;
  const student = await getStudentById(id);
  const documents = await listGeneratedDocuments(current?.user.id, id);

  if (!student) {
    return (
      <DashboardShell title="Öğrenci bulunamadı" subtitle="Bu öğrenci kaydı yok veya erişim yetkiniz dışında." crumb="Öğrencilerim / Profil" profileName={current?.profile?.full_name}>
        <section className={`${cardClass} text-slate-500`}>
          Öğrenci listesine dönüp mevcut kayıtları kontrol edebilirsiniz.
        </section>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title={student.fullName} subtitle={`${student.gradeLevel} • ${student.schoolName}`} crumb="Öğrencilerim / Profil" profileName={current?.profile?.full_name}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className="rounded-lg border border-slate-200/60 bg-white px-3 py-2 text-sm font-medium text-slate-500 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/dashboard/teacher/students/${student.id}/edit`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98]"
          >
            Bilgileri düzenle
          </Link>
          <StudentDeleteButton studentId={student.id} />
        </div>
      </div>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold tracking-[0] text-slate-900">Genel Bilgiler</h2>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            ["Öğrenci durumu", student.studentStatus],
            ["Eğitim ihtiyacı", student.educationNeed],
            ["Veli", student.parentName ?? "Girilmedi"],
            ["Veli telefonu", student.parentPhone ?? "Girilmedi"],
            ["Doğum tarihi", student.birthDate ?? "Girilmedi"]
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm font-semibold text-slate-500">{label}</dt>
              <dd className="mt-1 text-slate-600">{value}</dd>
            </div>
          ))}
        </dl>
        {student.diagnosisInfo ? (
          <div className="mt-5 rounded-xl border border-slate-200/60 bg-slate-50 p-4 text-sm leading-relaxed text-slate-500">
            Tanı bilgisi hassas veridir: {student.diagnosisInfo}
          </div>
        ) : null}
        {student.notes ? <p className="mt-5 text-sm leading-relaxed text-slate-500">{student.notes}</p> : null}
      </section>

      <section className={`${cardClass} mt-5`}>
        <h2 className="text-lg font-semibold tracking-[0] text-slate-900">BEP Geçmişi ve Evrak Arşivi</h2>
        <div className="mt-5 grid gap-3">
          {documents.length ? documents.map((document) => (
            <article key={document.id} className="rounded-xl border border-slate-200/60 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{document.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{document.documentType}</p>
                </div>
                <span className="text-sm text-slate-500">{new Intl.DateTimeFormat("tr-TR").format(new Date(document.createdAt))}</span>
              </div>
            </article>
          )) : (
            <p className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-500">
              Bu öğrenciye bağlı kayıtlı belge yok. BEP veya evrak oluştururken kayıtlı öğrenci alanından bu öğrenciyi seçebilirsiniz.
            </p>
          )}
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        {["Gelişim Takibi", "Materyal Atamaları"].map((title) => (
          <div key={title} className={cardClass}>
            <h3 className="font-semibold tracking-[0] text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Bu alan kazanım, materyal ve dönemsel ilerleme kayıtları için hazırlandı.
            </p>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
