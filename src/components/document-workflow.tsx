"use client";

import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { useEffect, useMemo, useState } from "react";
import { sampleStudents } from "@/lib/data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Student } from "@/lib/types";
import { generateDocumentPreview, getDocumentFields, isBepDocument } from "@/services/document-service";

type StudentRow = {
  id: string;
  full_name: string;
  birth_date: string | null;
  grade_level: string | null;
  school_name: string | null;
  student_status: string | null;
  diagnosis_info: string | null;
  education_need: string | null;
  parent_name: string | null;
  parent_phone: string | null;
  notes: string | null;
};

function normalizeStudent(row: StudentRow): Student {
  return {
    id: row.id,
    fullName: row.full_name,
    birthDate: row.birth_date ?? undefined,
    gradeLevel: row.grade_level ?? "",
    schoolName: row.school_name ?? "",
    studentStatus: row.student_status ?? "",
    diagnosisInfo: row.diagnosis_info ?? undefined,
    educationNeed: row.education_need ?? "",
    parentName: row.parent_name ?? undefined,
    parentPhone: row.parent_phone ?? undefined,
    notes: row.notes ?? undefined
  };
}

export function DocumentWorkflow({ documentType }: { documentType: string }) {
  const fields = useMemo(() => getDocumentFields(documentType), [documentType]);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.name, ""]))
  );

  useEffect(() => {
    setValues(Object.fromEntries(fields.map((field) => [field.name, ""])));
    setMessage("");
  }, [documentType, fields]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    async function loadStudents() {
      const { data } = await supabase!
        .from("students")
        .select("id, full_name, birth_date, grade_level, school_name, student_status, diagnosis_info, education_need, parent_name, parent_phone, notes")
        .order("created_at", { ascending: false });

      if (data?.length) {
        setStudents((data as StudentRow[]).map(normalizeStudent));
      }
    }

    void loadStudents();
  }, []);

  function handleStudentSelect(studentId: string) {
    setSelectedStudentId(studentId);
    const student = students.find((item) => item.id === studentId);
    if (!student) return;

    setValues((current) => ({
      ...current,
      studentName: student.fullName,
      gradeLevel: student.gradeLevel,
      schoolName: student.schoolName,
      birthDate: student.birthDate ?? current.birthDate ?? "",
      diagnosisInfo: student.diagnosisInfo ?? current.diagnosisInfo ?? "",
      educationNeed: student.educationNeed,
      guardianName: student.parentName ?? current.guardianName ?? "",
      parentName: student.parentName ?? current.parentName ?? "",
      guardianPhone: student.parentPhone ?? current.guardianPhone ?? "",
      parentPhone: student.parentPhone ?? current.parentPhone ?? "",
      notes: student.notes ?? current.notes ?? ""
    }));
  }

  const preview = useMemo(() => {
    return generateDocumentPreview({
      documentType,
      ...values
    }).content;
  }, [documentType, values]);

  const groupedFields = useMemo(() => {
    return fields.reduce<Record<string, typeof fields>>((groups, field) => {
      const section = field.section ?? "Belge Bilgileri";
      groups[section] = [...(groups[section] ?? []), field];
      return groups;
    }, {});
  }, [fields]);

  async function saveDraft() {
    setIsSaving(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo modunda belge kaydı simüle edildi. Supabase env değerleri girildiğinde generated_documents tablosuna yazılır.");
      setIsSaving(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;

    if (!user) {
      setMessage("Belge kaydetmek için giriş yapmalısınız.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("generated_documents").insert({
      teacher_id: user.id,
      student_id: selectedStudentId || null,
      document_type: documentType,
      title: values.studentName ? `${documentType} - ${values.studentName}` : documentType,
      content_json: {
        ...values,
        preview
      }
    });

    if (error) {
      setMessage(error.message);
      setIsSaving(false);
      return;
    }

    setMessage("Belge taslağı kaydedildi.");
    setIsSaving(false);
  }

  async function downloadWordDraft() {
    const doc = new Document({
      sections: [
        {
          children: preview.split("\n").map((line, index) => {
            const isHeading = index === 0 || /^\d+\./.test(line);
            return new Paragraph({
              heading: isHeading ? HeadingLevel.HEADING_2 : undefined,
              children: [new TextRun({ text: line || " ", bold: isHeading })],
              spacing: { after: isHeading ? 180 : 80 }
            });
          })
        }
      ]
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${documentType.toLocaleLowerCase("tr").replaceAll(" ", "-")}.docx`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function printPdfDraft() {
    window.print();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <form className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-bold">{isBepDocument(documentType) ? "BEP belge bilgileri" : "Belge bilgileri"}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {isBepDocument(documentType)
                ? "Form, örnek Word BEP dosyasındaki bölüm sırasına göre düzenlendi."
                : "Form, önizleme, kaydetme ve Word/PDF indirme akışı için hazırlandı."}
            </p>
          </div>
          {isBepDocument(documentType) ? (
            <a href="/templates/ornek-bep.docx" className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">
              Örnek BEP Word
            </a>
          ) : null}
        </div>

        {isBepDocument(documentType) ? (
          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Tanı/engel ve sağlık bilgileri hassas veridir. Açık rıza ve KVKK süreçleri tamamlanmadan gerçek kişi verileriyle kullanılmamalıdır.
          </div>
        ) : null}

        <div className="mt-5 space-y-6">
          <section>
            <h3 className="mb-3 rounded-md bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800">Öğrenci Eşleştirme</h3>
            <label className="block text-sm font-medium text-slate-700">
              Kayıtlı öğrenci seç
              <select
                value={selectedStudentId}
                onChange={(event) => handleStudentSelect(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600"
              >
                <option value="">Öğrenci seçmeden devam et</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>{student.fullName}</option>
                ))}
              </select>
            </label>
          </section>
          {Object.entries(groupedFields).map(([section, sectionFields]) => (
            <section key={section}>
              <h3 className="mb-3 rounded-md bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800">{section}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {sectionFields.map((field) => (
                  <label key={field.name} className={field.type === "textarea" ? "block text-sm font-medium text-slate-700 md:col-span-2" : "block text-sm font-medium text-slate-700"}>
                    {field.label}
                    {field.type === "textarea" ? (
                      <textarea
                        required={field.required}
                        rows={3}
                        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600"
                        value={values[field.name] ?? ""}
                        onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                      />
                    ) : (
                      <input
                        required={field.required}
                        type={field.type ?? "text"}
                        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600"
                        value={values[field.name] ?? ""}
                        onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                      />
                    )}
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
        {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={saveDraft} disabled={isSaving} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
          <button type="button" onClick={downloadWordDraft} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">
            Word indir
          </button>
          <button type="button" onClick={printPdfDraft} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">
            PDF indir
          </button>
        </div>
      </form>
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Önizleme</h2>
        <pre className="mt-4 min-h-80 whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {preview}
        </pre>
      </section>
    </div>
  );
}
