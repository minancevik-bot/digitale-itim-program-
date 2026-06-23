"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Student } from "@/lib/types";

const fields = [
  { key: "full_name", label: "Ad soyad", required: true, type: "text" },
  { key: "birth_date", label: "Doğum tarihi", required: false, type: "date" },
  { key: "grade_level", label: "Sınıf düzeyi", required: false, type: "text" },
  { key: "school_name", label: "Okul adı", required: false, type: "text" },
  { key: "student_status", label: "Öğrenci durumu", required: false, type: "text" },
  { key: "diagnosis_info", label: "Tanı bilgisi", required: false, type: "text" },
  { key: "education_need", label: "Eğitim ihtiyacı", required: false, type: "text" },
  { key: "parent_name", label: "Veli adı", required: false, type: "text" },
  { key: "parent_phone", label: "Veli telefonu", required: false, type: "text" },
  { key: "notes", label: "Notlar", required: false, type: "text" }
] as const;

type FormValues = Record<(typeof fields)[number]["key"], string>;

const emptyValues = Object.fromEntries(fields.map((field) => [field.key, ""])) as FormValues;

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

function valuesFromStudent(student?: Student): FormValues {
  if (!student) return emptyValues;

  return {
    full_name: student.fullName,
    birth_date: student.birthDate ?? "",
    grade_level: student.gradeLevel,
    school_name: student.schoolName,
    student_status: student.studentStatus,
    diagnosis_info: student.diagnosisInfo ?? "",
    education_need: student.educationNeed,
    parent_name: student.parentName ?? "",
    parent_phone: student.parentPhone ?? "",
    notes: student.notes ?? ""
  };
}

type Props = {
  student?: Student;
  mode?: "create" | "edit";
};

export function StudentForm({ student, mode = "create" }: Props) {
  const router = useRouter();
  const initialValues = useMemo(() => valuesFromStudent(student), [student]);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = mode === "edit" && student;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage(`Demo modunda öğrenci ${isEdit ? "güncelleme" : "kayıt"} işlemi simüle edildi.`);
      setIsSubmitting(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;

    if (!user) {
      setMessage("Öğrenci işlemi için giriş yapmalısınız.");
      setIsSubmitting(false);
      return;
    }

    const { error } = isEdit
      ? await supabase.from("students").update(values).eq("id", student.id).eq("teacher_id", user.id)
      : await supabase.from("students").insert({ teacher_id: user.id, ...values });

    if (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push(isEdit ? `/dashboard/teacher/students/${student.id}` : "/dashboard/teacher/students");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
    >
      <div className="mb-6 rounded-xl border border-slate-200/60 bg-slate-50 p-4 text-sm leading-relaxed text-slate-500">
        Tanı bilgisi hassas veridir. Bu sistem tanı koymaz, tedavi önermez ve veriler yalnızca eğitimsel planlama amacıyla işlenmelidir.
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="block text-sm font-medium text-slate-700">
            {field.label}
            <input
              required={field.required}
              type={field.type}
              value={values[field.key]}
              onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
              className={inputClass}
            />
          </label>
        ))}
      </div>
      {message ? (
        <p className="mt-5 rounded-lg border border-slate-200/60 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
          {message}
        </p>
      ) : null}
      <button
        disabled={isSubmitting}
        className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Kaydet"}
      </button>
    </form>
  );
}
