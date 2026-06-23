import type { Student } from "@/lib/types";
import { sampleStudents } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function listStudents(): Promise<Student[]> {
  return sampleStudents;
}

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

export async function getStudentById(id: string): Promise<Student | null> {
  const demoStudent = sampleStudents.find((student) => student.id === id) ?? null;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return demoStudent;

  const { data, error } = await supabase
    .from("students")
    .select("id, full_name, birth_date, grade_level, school_name, student_status, diagnosis_info, education_need, parent_name, parent_phone, notes")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return demoStudent;

  return normalizeStudent(data as StudentRow);
}
