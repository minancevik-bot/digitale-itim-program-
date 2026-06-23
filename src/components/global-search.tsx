"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { adminModules, parentModules, sampleStudents, teacherModules, teacherSubModules } from "@/lib/data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type SearchResult = {
  label: string;
  description: string;
  href: string;
  type: "Modül" | "İşlem" | "Öğrenci";
};

type StudentRow = {
  id: string;
  full_name: string;
  grade_level: string | null;
  school_name: string | null;
};

export function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [studentResults, setStudentResults] = useState<SearchResult[]>(
    sampleStudents.map((student) => ({
      label: student.fullName,
      description: `${student.gradeLevel} • ${student.schoolName}`,
      href: `/dashboard/teacher/students/${student.id}`,
      type: "Öğrenci"
    }))
  );

  const staticResults = useMemo<SearchResult[]>(() => {
    const moduleResults = [...teacherModules, ...parentModules, ...adminModules].map((module) => ({
      label: module.title,
      description: module.description,
      href: module.href,
      type: "Modül" as const
    }));

    const actionResults = Object.entries(teacherSubModules).flatMap(([slug, module]) =>
      module.items.map((item) => ({
        label: item,
        description: module.title,
        href: `/dashboard/teacher/${slug}`,
        type: "İşlem" as const
      }))
    );

    return [...moduleResults, ...actionResults];
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    async function loadStudents() {
      const { data } = await supabase!
        .from("students")
        .select("id, full_name, grade_level, school_name")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!data?.length) return;

      setStudentResults((data as StudentRow[]).map((student) => ({
        label: student.full_name,
        description: `${student.grade_level ?? "Sınıf girilmedi"} • ${student.school_name ?? "Okul girilmedi"}`,
        href: `/dashboard/teacher/students/${student.id}`,
        type: "Öğrenci"
      })));
    }

    void loadStudents();
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr");
    if (!normalized) return [];

    return [...staticResults, ...studentResults]
      .filter((result) => `${result.label} ${result.description}`.toLocaleLowerCase("tr").includes(normalized))
      .slice(0, 8);
  }, [query, staticResults, studentResults]);

  function goToResult(href: string) {
    setQuery("");
    router.push(href);
  }

  return (
    <div className="relative flex-1">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
        <Search className="h-4 w-4" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Modül, öğrenci veya evrak ara"
          className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-500"
        />
      </div>
      {results.length ? (
        <div className="absolute left-0 right-0 top-12 z-20 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          {results.map((result) => (
            <button
              key={`${result.type}-${result.href}-${result.label}`}
              type="button"
              onClick={() => goToResult(result.href)}
              className="block w-full border-b border-slate-100 px-4 py-3 text-left last:border-b-0 hover:bg-slate-50"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-900">{result.label}</span>
                <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700">{result.type}</span>
              </div>
              <p className="mt-1 line-clamp-1 text-xs text-slate-500">{result.description}</p>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
