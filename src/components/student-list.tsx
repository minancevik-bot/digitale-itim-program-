"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sampleStudents } from "@/lib/data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Student } from "@/lib/types";

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
    gradeLevel: row.grade_level ?? "Sınıf düzeyi girilmedi",
    schoolName: row.school_name ?? "Okul girilmedi",
    studentStatus: row.student_status ?? "Durum girilmedi",
    diagnosisInfo: row.diagnosis_info ?? undefined,
    educationNeed: row.education_need ?? "Eğitim ihtiyacı girilmedi",
    parentName: row.parent_name ?? undefined,
    parentPhone: row.parent_phone ?? undefined,
    notes: row.notes ?? undefined
  };
}

export function StudentList() {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Örnek veriler gösteriliyor.");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    async function loadStudents() {
      const { data, error } = await supabase!
        .from("students")
        .select("id, full_name, birth_date, grade_level, school_name, student_status, diagnosis_info, education_need, parent_name, parent_phone, notes")
        .order("created_at", { ascending: false });

      if (error) {
        setStatus(`Öğrenciler alınamadı: ${error.message}`);
        return;
      }

      setStudents(((data ?? []) as StudentRow[]).map((row) => normalizeStudent(row)));
      setStatus(data?.length ? "Supabase öğrenci kayıtları gösteriliyor." : "Henüz öğrenci kaydı yok.");
    }

    void loadStudents();
  }, []);

  const filtered = students.filter((student) => student.fullName.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr")));

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Öğrenci ara" className="rounded-md border border-slate-300 px-3 py-2 sm:w-80" />
        <Link href="/dashboard/teacher/students/new" className="rounded-md bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white">
          Yeni öğrenci ekle
        </Link>
      </div>
      <p className="mb-4 text-sm text-slate-500">{status}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((student) => (
          <Link key={student.id} href={`/dashboard/teacher/students/${student.id}`} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold">{student.fullName}</h2>
            <p className="mt-2 text-sm text-slate-600">{student.gradeLevel} • {student.schoolName}</p>
            <p className="mt-3 text-sm text-slate-700">{student.educationNeed}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
