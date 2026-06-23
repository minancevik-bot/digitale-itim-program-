"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const categories = [
  "Ã–zel EÄŸitim Materyalleri",
  "Okuma Yazma Materyalleri",
  "Matematik Materyalleri",
  "Dikkat Ã‡alÄ±ÅŸmalarÄ±",
  "Dil ve Ä°letiÅŸim Materyalleri",
  "Sosyal Beceri Materyalleri",
  "Ã–z BakÄ±m Becerileri",
  "Ä°nce Motor Becerileri",
  "Kaba Motor Becerileri"
];

export function MaterialUploadForm() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: categories[0],
    targetAge: "",
    targetSkill: "",
    fileUrl: ""
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo modunda materyal yÃ¼kleme simÃ¼le edildi. Supabase env deÄŸerleri girildiÄŸinde materials tablosuna pending kayÄ±t aÃ§Ä±lÄ±r.");
      setIsSubmitting(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;
    if (!user) {
      setMessage("Materyal yÃ¼klemek iÃ§in giriÅŸ yapmalÄ±sÄ±nÄ±z.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("materials").insert({
      title: values.title,
      description: values.description,
      category: values.category,
      target_age: values.targetAge,
      target_skill: values.targetSkill,
      file_url: values.fileUrl,
      uploaded_by: user.id,
      status: "pending"
    });

    setIsSubmitting(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Materyal onay bekleyen kayÄ±t olarak eklendi.");
    setValues({ title: "", description: "", category: categories[0], targetAge: "", targetSkill: "", fileUrl: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <h2 className="text-lg font-bold">Materyal YÃ¼kle</h2>
      <p className="mt-1 text-sm text-slate-600">Ä°lk MVPâ€™de dosya depolama yerine baÄŸlantÄ± alanÄ± kullanÄ±lÄ±r; Supabase Storage sonraki aÅŸamada baÄŸlanabilir.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          BaÅŸlÄ±k
          <input required value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Kategori
          <select value={values.category} onChange={(event) => setValues((current) => ({ ...current, category: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10">
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Hedef yaÅŸ
          <input value={values.targetAge} onChange={(event) => setValues((current) => ({ ...current, targetAge: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Hedef beceri
          <input value={values.targetSkill} onChange={(event) => setValues((current) => ({ ...current, targetSkill: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Dosya baÄŸlantÄ±sÄ±
          <input value={values.fileUrl} onChange={(event) => setValues((current) => ({ ...current, fileUrl: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          AÃ§Ä±klama
          <textarea value={values.description} onChange={(event) => setValues((current) => ({ ...current, description: event.target.value }))} rows={4} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
      </div>
      {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
      <button disabled={isSubmitting} className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60">
        {isSubmitting ? "Kaydediliyor..." : "Onaya gÃ¶nder"}
      </button>
    </form>
  );
}
