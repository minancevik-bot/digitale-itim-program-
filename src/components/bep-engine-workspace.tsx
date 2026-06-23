"use client";

import { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from "docx";
import { useEffect, useMemo, useState } from "react";
import { sampleStudents } from "@/lib/data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Student } from "@/lib/types";

type EvaluationStatus = "acquired" | "developing" | "not_started";
type Priority = "high" | "medium" | "low";

type EvaluationItem = {
  id: string;
  area: string;
  gain: string;
  status: EvaluationStatus;
  priority: Priority;
  observation: string;
};

type PlanItem = {
  id: string;
  area: string;
  longTermGoal: string;
  shortTermGoal: string;
  criteria: string;
  methods: string;
  materials: string;
  startDate: string;
  endDate: string;
  evaluation: string;
};

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

const statusLabels: Record<EvaluationStatus, string> = {
  acquired: "Edinildi",
  developing: "Geliştirilmeli",
  not_started: "Başlanmadı"
};

const priorityLabels: Record<Priority, string> = {
  high: "Öncelikli",
  medium: "Orta",
  low: "İzleme"
};

const initialEvaluationItems: EvaluationItem[] = [
  {
    id: "reading-1",
    area: "Türkçe / Okuma Yazma",
    gain: "Verilen kısa metni heceleyerek okur.",
    status: "developing",
    priority: "high",
    observation: ""
  },
  {
    id: "math-1",
    area: "Matematik",
    gain: "10 içinde nesne sayısını doğru olarak belirtir.",
    status: "not_started",
    priority: "high",
    observation: ""
  },
  {
    id: "attention-1",
    area: "Dikkat ve Yönerge Takibi",
    gain: "İki aşamalı yönergeyi yetişkin desteğiyle yerine getirir.",
    status: "developing",
    priority: "medium",
    observation: ""
  },
  {
    id: "social-1",
    area: "Sosyal Beceri",
    gain: "Sıra alma gerektiren etkinliklere uygun şekilde katılır.",
    status: "acquired",
    priority: "low",
    observation: ""
  }
];

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

function planFromEvaluation(item: EvaluationItem): PlanItem {
  return {
    id: item.id,
    area: item.area,
    longTermGoal: `${item.area} alanında bağımsızlık ve işlevsel performansını artırır.`,
    shortTermGoal: item.gain,
    criteria: "5 denemenin 4'ünde doğru performans gösterir (%80).",
    methods: "Model olma, ipucu sunma, tekrar, pekiştirme ve yapılandırılmış öğretim.",
    materials: "Çalışma sayfası, somut materyal, görsel destek ve öğretmen gözlem formu.",
    startDate: "",
    endDate: "",
    evaluation: "Gözlem, performans görevi ve kısa değerlendirme kayıtları ile izlenir."
  };
}

function paragraph(text: string, heading = false) {
  return new Paragraph({
    heading: heading ? HeadingLevel.HEADING_2 : undefined,
    children: [new TextRun({ text: text || " ", bold: heading })],
    spacing: { after: heading ? 180 : 80 }
  });
}

export function BepEngineWorkspace() {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [selectedStudentId, setSelectedStudentId] = useState(sampleStudents[0]?.id ?? "");
  const [evaluationItems, setEvaluationItems] = useState<EvaluationItem[]>(initialEvaluationItems);
  const [selectedGainIds, setSelectedGainIds] = useState<string[]>(
    initialEvaluationItems.filter((item) => item.status !== "acquired").map((item) => item.id)
  );
  const [planItems, setPlanItems] = useState<PlanItem[]>(
    initialEvaluationItems.filter((item) => item.status !== "acquired").map(planFromEvaluation)
  );
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    async function loadStudents() {
      const { data } = await supabase!
        .from("students")
        .select("id, full_name, birth_date, grade_level, school_name, student_status, diagnosis_info, education_need, parent_name, parent_phone, notes")
        .order("created_at", { ascending: false });

      if (data?.length) {
        const rows = (data as StudentRow[]).map(normalizeStudent);
        setStudents(rows);
        setSelectedStudentId(rows[0]?.id ?? "");
      }
    }

    void loadStudents();
  }, []);

  const selectedStudent = students.find((student) => student.id === selectedStudentId);

  const statusGroups = useMemo(() => {
    return {
      notStarted: evaluationItems.filter((item) => item.status === "not_started"),
      developing: evaluationItems.filter((item) => item.status === "developing"),
      acquired: evaluationItems.filter((item) => item.status === "acquired")
    };
  }, [evaluationItems]);

  const preview = useMemo(() => {
    const studentBlock = selectedStudent
      ? `Öğrenci: ${selectedStudent.fullName}
Sınıf: ${selectedStudent.gradeLevel || "-"}
Okul: ${selectedStudent.schoolName || "-"}
Eğitim ihtiyacı: ${selectedStudent.educationNeed || "-"}`
      : "Öğrenci seçilmedi.";

    const evaluationBlock = evaluationItems
      .map((item) => `- ${item.area}: ${item.gain} | ${statusLabels[item.status]} | ${priorityLabels[item.priority]}${item.observation ? ` | Not: ${item.observation}` : ""}`)
      .join("\n");

    const planBlock = planItems
      .map((item, index) => `${index + 1}. ${item.area}
Uzun dönemli amaç: ${item.longTermGoal}
Kısa dönemli amaç: ${item.shortTermGoal}
Ölçüt: ${item.criteria}
Yöntem ve teknik: ${item.methods}
Materyaller: ${item.materials}
Tarih: ${item.startDate || "..."} - ${item.endDate || "..."}
Değerlendirme: ${item.evaluation}`)
      .join("\n\n");

    return `BEP ÜRETİM MOTORU ÇIKTISI

${studentBlock}

1. Kaba Değerlendirme
${evaluationBlock}

2. Kazanım Durumlandırma
Başlanmadı: ${statusGroups.notStarted.length}
Geliştirilmeli: ${statusGroups.developing.length}
Edinildi: ${statusGroups.acquired.length}

3. BEP'e Aktarılan Kazanımlar
${planItems.map((item) => `- ${item.shortTermGoal}`).join("\n") || "Aktarılan kazanım yok."}

4. BEP Planı
${planBlock || "Plan oluşturulmadı."}

Not: Bu çıktı kaba değerlendirme verilerinden BEP planı üretmek için hazırlanmıştır. Sistem tanı koymaz, tedavi önermez ve kesin hukuki karar üretmez.`;
  }, [evaluationItems, planItems, selectedStudent, statusGroups]);

  function updateEvaluation(id: string, patch: Partial<EvaluationItem>) {
    setEvaluationItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  function addEvaluationItem() {
    const id = `custom-${Date.now()}`;
    setEvaluationItems((current) => [
      ...current,
      {
        id,
        area: "Yeni Alan",
        gain: "Yeni kazanımı yazın.",
        status: "not_started",
        priority: "medium",
        observation: ""
      }
    ]);
    setSelectedGainIds((current) => [...current, id]);
  }

  function toggleGain(id: string) {
    setSelectedGainIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function transferToBepPlan() {
    const selectedItems = evaluationItems.filter((item) => selectedGainIds.includes(item.id));
    setPlanItems(selectedItems.map((item) => {
      const existing = planItems.find((plan) => plan.id === item.id);
      return existing ?? planFromEvaluation(item);
    }));
    setMessage("Seçili kazanımlar BEP planına aktarıldı.");
  }

  function updatePlanItem(id: string, patch: Partial<PlanItem>) {
    setPlanItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  async function saveBepPlan() {
    setIsSaving(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo modunda BEP planı kaydı simüle edildi.");
      setIsSaving(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;

    if (!user) {
      setMessage("BEP planını kaydetmek için giriş yapmalısınız.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("bep_documents").insert({
      teacher_id: user.id,
      student_id: selectedStudentId || null,
      title: selectedStudent ? `BEP Planı - ${selectedStudent.fullName}` : "BEP Planı",
      document_type: "bep_plan",
      status: "draft",
      content_json: {
        student: selectedStudent,
        evaluationItems,
        selectedGainIds,
        planItems,
        preview
      }
    });

    setIsSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("BEP planı kaydedildi.");
  }

  async function downloadWord() {
    const tableRows = [
      new TableRow({
        children: ["Gelişim Alanı", "Uzun Dönemli Amaç", "Kısa Dönemli Amaç", "Ölçüt", "Yöntem", "Materyal"].map((title) =>
          new TableCell({ children: [paragraph(title)] })
        )
      }),
      ...planItems.map((item) =>
        new TableRow({
          children: [item.area, item.longTermGoal, item.shortTermGoal, item.criteria, item.methods, item.materials].map((text) =>
            new TableCell({ children: [paragraph(text)] })
          )
        })
      )
    ];

    const doc = new Document({
      sections: [
        {
          children: [
            paragraph("BEP Planı", true),
            paragraph(selectedStudent ? `Öğrenci: ${selectedStudent.fullName}` : "Öğrenci seçilmedi."),
            paragraph("Kaba Değerlendirme Özeti", true),
            ...evaluationItems.map((item) => paragraph(`${item.area} - ${item.gain}: ${statusLabels[item.status]} (${priorityLabels[item.priority]})`)),
            paragraph("BEP'e Aktarılan Plan", true),
            new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tableRows }),
            paragraph("Güvenlik Notu", true),
            paragraph("Bu belge eğitimsel planlama amacıyla hazırlanmıştır. Tanı, tedavi veya kesin hukuki karar yerine geçmez.")
          ]
        }
      ]
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bep-plani.docx";
    link.click();
    URL.revokeObjectURL(url);
  }

  function printPdf() {
    window.print();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-bold">BEP Üretim Motoru</h2>
            <p className="mt-2 text-sm text-slate-600">Akış: Kaba Değerlendirme → Kazanım Durumlandırma → BEP'e Aktarım → BEP Planı → Word/PDF Çıktı.</p>
          </div>
          <label className="block min-w-72 text-sm font-medium text-slate-700">
            Öğrenci
            <select value={selectedStudentId} onChange={(event) => setSelectedStudentId(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
              <option value="">Öğrenci seç</option>
              {students.map((student) => <option key={student.id} value={student.id}>{student.fullName}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">1. Kaba Değerlendirme</h2>
            <p className="mt-1 text-sm text-slate-600">Kazanımları gözlem sonucuna göre işaretleyin, öncelik ve not ekleyin.</p>
          </div>
          <button type="button" onClick={addEvaluationItem} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Kazanım ekle</button>
        </div>
        <div className="mt-5 space-y-4">
          {evaluationItems.map((item) => (
            <div key={item.id} className="grid gap-3 rounded-md border border-slate-200 p-4 lg:grid-cols-[1fr_1.5fr_0.8fr_0.8fr]">
              <input value={item.area} onChange={(event) => updateEvaluation(item.id, { area: event.target.value })} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <input value={item.gain} onChange={(event) => updateEvaluation(item.id, { gain: event.target.value })} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <select value={item.status} onChange={(event) => updateEvaluation(item.id, { status: event.target.value as EvaluationStatus })} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                <option value="not_started">Başlanmadı</option>
                <option value="developing">Geliştirilmeli</option>
                <option value="acquired">Edinildi</option>
              </select>
              <select value={item.priority} onChange={(event) => updateEvaluation(item.id, { priority: event.target.value as Priority })} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                <option value="high">Öncelikli</option>
                <option value="medium">Orta</option>
                <option value="low">İzleme</option>
              </select>
              <textarea value={item.observation} onChange={(event) => updateEvaluation(item.id, { observation: event.target.value })} placeholder="Kısa gözlem notu" rows={2} className="rounded-md border border-slate-300 px-3 py-2 text-sm lg:col-span-4" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">2. Kazanım Durumlandırma</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <StatusColumn title="Başlanmadı" items={statusGroups.notStarted} selectedGainIds={selectedGainIds} onToggle={toggleGain} />
          <StatusColumn title="Geliştirilmeli" items={statusGroups.developing} selectedGainIds={selectedGainIds} onToggle={toggleGain} />
          <StatusColumn title="Edinildi" items={statusGroups.acquired} selectedGainIds={selectedGainIds} onToggle={toggleGain} />
        </div>
        <button type="button" onClick={transferToBepPlan} className="mt-5 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Seçili kazanımları BEP'e aktar</button>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">3. BEP Planı</h2>
        <div className="mt-5 space-y-4">
          {planItems.map((item) => (
            <div key={item.id} className="rounded-md border border-slate-200 p-4">
              <h3 className="font-bold">{item.area}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <TextArea label="Uzun dönemli amaç" value={item.longTermGoal} onChange={(value) => updatePlanItem(item.id, { longTermGoal: value })} />
                <TextArea label="Kısa dönemli amaç" value={item.shortTermGoal} onChange={(value) => updatePlanItem(item.id, { shortTermGoal: value })} />
                <Input label="Ölçüt" value={item.criteria} onChange={(value) => updatePlanItem(item.id, { criteria: value })} />
                <Input label="Yöntem ve teknik" value={item.methods} onChange={(value) => updatePlanItem(item.id, { methods: value })} />
                <Input label="Materyaller" value={item.materials} onChange={(value) => updatePlanItem(item.id, { materials: value })} />
                <Input label="Değerlendirme" value={item.evaluation} onChange={(value) => updatePlanItem(item.id, { evaluation: value })} />
                <Input label="Başlama tarihi" type="date" value={item.startDate} onChange={(value) => updatePlanItem(item.id, { startDate: value })} />
                <Input label="Bitiş tarihi" type="date" value={item.endDate} onChange={(value) => updatePlanItem(item.id, { endDate: value })} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold">4. Word/PDF Çıktı Motoru</h2>
          <p className="mt-2 text-sm text-slate-600">Planı kaydedin, Word olarak indirin veya PDF için yazdırma ekranını açın.</p>
          {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={saveBepPlan} disabled={isSaving} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{isSaving ? "Kaydediliyor..." : "BEP planını kaydet"}</button>
            <button type="button" onClick={downloadWord} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Word indir</button>
            <button type="button" onClick={printPdf} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">PDF yazdır</button>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold">Önizleme</h2>
          <pre className="mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">{preview}</pre>
        </div>
      </section>
    </div>
  );
}

function StatusColumn({ title, items, selectedGainIds, onToggle }: { title: string; items: EvaluationItem[]; selectedGainIds: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="rounded-md border border-slate-200 p-4">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <label key={item.id} className="flex gap-2 rounded-md bg-slate-50 p-3 text-sm">
            <input type="checkbox" checked={selectedGainIds.includes(item.id)} onChange={() => onToggle(item.id)} />
            <span>{item.gain}</span>
          </label>
        ))}
        {!items.length ? <p className="text-sm text-slate-500">Kayıt yok.</p> : null}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
    </label>
  );
}
