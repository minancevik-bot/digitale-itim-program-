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
  developing: "GeliÅŸtirilmeli",
  not_started: "BaÅŸlanmadÄ±"
};

const priorityLabels: Record<Priority, string> = {
  high: "Ã–ncelikli",
  medium: "Orta",
  low: "Ä°zleme"
};

const initialEvaluationItems: EvaluationItem[] = [
  {
    id: "reading-1",
    area: "TÃ¼rkÃ§e / Okuma Yazma",
    gain: "Verilen kÄ±sa metni heceleyerek okur.",
    status: "developing",
    priority: "high",
    observation: ""
  },
  {
    id: "math-1",
    area: "Matematik",
    gain: "10 iÃ§inde nesne sayÄ±sÄ±nÄ± doÄŸru olarak belirtir.",
    status: "not_started",
    priority: "high",
    observation: ""
  },
  {
    id: "attention-1",
    area: "Dikkat ve YÃ¶nerge Takibi",
    gain: "Ä°ki aÅŸamalÄ± yÃ¶nergeyi yetiÅŸkin desteÄŸiyle yerine getirir.",
    status: "developing",
    priority: "medium",
    observation: ""
  },
  {
    id: "social-1",
    area: "Sosyal Beceri",
    gain: "SÄ±ra alma gerektiren etkinliklere uygun ÅŸekilde katÄ±lÄ±r.",
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
    longTermGoal: `${item.area} alanÄ±nda baÄŸÄ±msÄ±zlÄ±k ve iÅŸlevsel performansÄ±nÄ± artÄ±rÄ±r.`,
    shortTermGoal: item.gain,
    criteria: "5 denemenin 4'Ã¼nde doÄŸru performans gÃ¶sterir (%80).",
    methods: "Model olma, ipucu sunma, tekrar, pekiÅŸtirme ve yapÄ±landÄ±rÄ±lmÄ±ÅŸ Ã¶ÄŸretim.",
    materials: "Ã‡alÄ±ÅŸma sayfasÄ±, somut materyal, gÃ¶rsel destek ve Ã¶ÄŸretmen gÃ¶zlem formu.",
    startDate: "",
    endDate: "",
    evaluation: "GÃ¶zlem, performans gÃ¶revi ve kÄ±sa deÄŸerlendirme kayÄ±tlarÄ± ile izlenir."
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
      ? `Ã–ÄŸrenci: ${selectedStudent.fullName}
SÄ±nÄ±f: ${selectedStudent.gradeLevel || "-"}
Okul: ${selectedStudent.schoolName || "-"}
EÄŸitim ihtiyacÄ±: ${selectedStudent.educationNeed || "-"}`
      : "Ã–ÄŸrenci seÃ§ilmedi.";

    const evaluationBlock = evaluationItems
      .map((item) => `- ${item.area}: ${item.gain} | ${statusLabels[item.status]} | ${priorityLabels[item.priority]}${item.observation ? ` | Not: ${item.observation}` : ""}`)
      .join("\n");

    const planBlock = planItems
      .map((item, index) => `${index + 1}. ${item.area}
Uzun dÃ¶nemli amaÃ§: ${item.longTermGoal}
KÄ±sa dÃ¶nemli amaÃ§: ${item.shortTermGoal}
Ã–lÃ§Ã¼t: ${item.criteria}
YÃ¶ntem ve teknik: ${item.methods}
Materyaller: ${item.materials}
Tarih: ${item.startDate || "..."} - ${item.endDate || "..."}
DeÄŸerlendirme: ${item.evaluation}`)
      .join("\n\n");

    return `BEP ÃœRETÄ°M MOTORU Ã‡IKTISI

${studentBlock}

1. Kaba DeÄŸerlendirme
${evaluationBlock}

2. KazanÄ±m DurumlandÄ±rma
BaÅŸlanmadÄ±: ${statusGroups.notStarted.length}
GeliÅŸtirilmeli: ${statusGroups.developing.length}
Edinildi: ${statusGroups.acquired.length}

3. BEP'e AktarÄ±lan KazanÄ±mlar
${planItems.map((item) => `- ${item.shortTermGoal}`).join("\n") || "AktarÄ±lan kazanÄ±m yok."}

4. BEP PlanÄ±
${planBlock || "Plan oluÅŸturulmadÄ±."}

Not: Bu Ã§Ä±ktÄ± kaba deÄŸerlendirme verilerinden BEP planÄ± Ã¼retmek iÃ§in hazÄ±rlanmÄ±ÅŸtÄ±r. Sistem tanÄ± koymaz, tedavi Ã¶nermez ve kesin hukuki karar Ã¼retmez.`;
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
        gain: "Yeni kazanÄ±mÄ± yazÄ±n.",
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
    setMessage("SeÃ§ili kazanÄ±mlar BEP planÄ±na aktarÄ±ldÄ±.");
  }

  function updatePlanItem(id: string, patch: Partial<PlanItem>) {
    setPlanItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  async function saveBepPlan() {
    setIsSaving(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo modunda BEP planÄ± kaydÄ± simÃ¼le edildi.");
      setIsSaving(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;

    if (!user) {
      setMessage("BEP planÄ±nÄ± kaydetmek iÃ§in giriÅŸ yapmalÄ±sÄ±nÄ±z.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("bep_documents").insert({
      teacher_id: user.id,
      student_id: selectedStudentId || null,
      title: selectedStudent ? `BEP PlanÄ± - ${selectedStudent.fullName}` : "BEP PlanÄ±",
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

    setMessage("BEP planÄ± kaydedildi.");
  }

  async function downloadWord() {
    const tableRows = [
      new TableRow({
        children: ["GeliÅŸim AlanÄ±", "Uzun DÃ¶nemli AmaÃ§", "KÄ±sa DÃ¶nemli AmaÃ§", "Ã–lÃ§Ã¼t", "YÃ¶ntem", "Materyal"].map((title) =>
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
            paragraph("BEP PlanÄ±", true),
            paragraph(selectedStudent ? `Ã–ÄŸrenci: ${selectedStudent.fullName}` : "Ã–ÄŸrenci seÃ§ilmedi."),
            paragraph("Kaba DeÄŸerlendirme Ã–zeti", true),
            ...evaluationItems.map((item) => paragraph(`${item.area} - ${item.gain}: ${statusLabels[item.status]} (${priorityLabels[item.priority]})`)),
            paragraph("BEP'e AktarÄ±lan Plan", true),
            new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tableRows }),
            paragraph("GÃ¼venlik Notu", true),
            paragraph("Bu belge eÄŸitimsel planlama amacÄ±yla hazÄ±rlanmÄ±ÅŸtÄ±r. TanÄ±, tedavi veya kesin hukuki karar yerine geÃ§mez.")
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
      <section className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-bold">BEP Ãœretim Motoru</h2>
            <p className="mt-2 text-sm text-slate-600">AkÄ±ÅŸ: Kaba DeÄŸerlendirme â†’ KazanÄ±m DurumlandÄ±rma â†’ BEP'e AktarÄ±m â†’ BEP PlanÄ± â†’ Word/PDF Ã‡Ä±ktÄ±.</p>
          </div>
          <label className="block min-w-72 text-sm font-medium text-slate-700">
            Ã–ÄŸrenci
            <select value={selectedStudentId} onChange={(event) => setSelectedStudentId(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10">
              <option value="">Ã–ÄŸrenci seÃ§</option>
              {students.map((student) => <option key={student.id} value={student.id}>{student.fullName}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">1. Kaba DeÄŸerlendirme</h2>
            <p className="mt-1 text-sm text-slate-600">KazanÄ±mlarÄ± gÃ¶zlem sonucuna gÃ¶re iÅŸaretleyin, Ã¶ncelik ve not ekleyin.</p>
          </div>
          <button type="button" onClick={addEvaluationItem} className="rounded-lg border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]">KazanÄ±m ekle</button>
        </div>
        <div className="mt-5 space-y-4">
          {evaluationItems.map((item) => (
            <div key={item.id} className="grid gap-3 rounded-md border border-slate-200 p-4 lg:grid-cols-[1fr_1.5fr_0.8fr_0.8fr]">
              <input value={item.area} onChange={(event) => updateEvaluation(item.id, { area: event.target.value })} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm" />
              <input value={item.gain} onChange={(event) => updateEvaluation(item.id, { gain: event.target.value })} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm" />
              <select value={item.status} onChange={(event) => updateEvaluation(item.id, { status: event.target.value as EvaluationStatus })} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm">
                <option value="not_started">BaÅŸlanmadÄ±</option>
                <option value="developing">GeliÅŸtirilmeli</option>
                <option value="acquired">Edinildi</option>
              </select>
              <select value={item.priority} onChange={(event) => updateEvaluation(item.id, { priority: event.target.value as Priority })} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm">
                <option value="high">Ã–ncelikli</option>
                <option value="medium">Orta</option>
                <option value="low">Ä°zleme</option>
              </select>
              <textarea value={item.observation} onChange={(event) => updateEvaluation(item.id, { observation: event.target.value })} placeholder="KÄ±sa gÃ¶zlem notu" rows={2} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm lg:col-span-4" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <h2 className="text-lg font-bold">2. KazanÄ±m DurumlandÄ±rma</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <StatusColumn title="BaÅŸlanmadÄ±" items={statusGroups.notStarted} selectedGainIds={selectedGainIds} onToggle={toggleGain} />
          <StatusColumn title="GeliÅŸtirilmeli" items={statusGroups.developing} selectedGainIds={selectedGainIds} onToggle={toggleGain} />
          <StatusColumn title="Edinildi" items={statusGroups.acquired} selectedGainIds={selectedGainIds} onToggle={toggleGain} />
        </div>
        <button type="button" onClick={transferToBepPlan} className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98]">SeÃ§ili kazanÄ±mlarÄ± BEP'e aktar</button>
      </section>

      <section className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <h2 className="text-lg font-bold">3. BEP PlanÄ±</h2>
        <div className="mt-5 space-y-4">
          {planItems.map((item) => (
            <div key={item.id} className="rounded-md border border-slate-200 p-4">
              <h3 className="font-bold">{item.area}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <TextArea label="Uzun dÃ¶nemli amaÃ§" value={item.longTermGoal} onChange={(value) => updatePlanItem(item.id, { longTermGoal: value })} />
                <TextArea label="KÄ±sa dÃ¶nemli amaÃ§" value={item.shortTermGoal} onChange={(value) => updatePlanItem(item.id, { shortTermGoal: value })} />
                <Input label="Ã–lÃ§Ã¼t" value={item.criteria} onChange={(value) => updatePlanItem(item.id, { criteria: value })} />
                <Input label="YÃ¶ntem ve teknik" value={item.methods} onChange={(value) => updatePlanItem(item.id, { methods: value })} />
                <Input label="Materyaller" value={item.materials} onChange={(value) => updatePlanItem(item.id, { materials: value })} />
                <Input label="DeÄŸerlendirme" value={item.evaluation} onChange={(value) => updatePlanItem(item.id, { evaluation: value })} />
                <Input label="BaÅŸlama tarihi" type="date" value={item.startDate} onChange={(value) => updatePlanItem(item.id, { startDate: value })} />
                <Input label="BitiÅŸ tarihi" type="date" value={item.endDate} onChange={(value) => updatePlanItem(item.id, { endDate: value })} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <h2 className="text-lg font-bold">4. Word/PDF Ã‡Ä±ktÄ± Motoru</h2>
          <p className="mt-2 text-sm text-slate-600">PlanÄ± kaydedin, Word olarak indirin veya PDF iÃ§in yazdÄ±rma ekranÄ±nÄ± aÃ§Ä±n.</p>
          {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={saveBepPlan} disabled={isSaving} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60">{isSaving ? "Kaydediliyor..." : "BEP planÄ±nÄ± kaydet"}</button>
            <button type="button" onClick={downloadWord} className="rounded-lg border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]">Word indir</button>
            <button type="button" onClick={printPdf} className="rounded-lg border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]">PDF yazdÄ±r</button>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <h2 className="text-lg font-bold">Ã–nizleme</h2>
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
        {!items.length ? <p className="text-sm text-slate-500">KayÄ±t yok.</p> : null}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
    </label>
  );
}
