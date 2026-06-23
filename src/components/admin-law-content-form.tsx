"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLawContentForm() {
  const [values, setValues] = useState({
    title: "",
    category: "",
    audience: "both",
    status: "published",
    content: ""
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo modunda iÃ§erik kaydÄ± simÃ¼le edildi.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("law_contents").insert(values);
    setIsSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Mevzuat/rehber iÃ§eriÄŸi kaydedildi.");
    setValues({ title: "", category: "", audience: "both", status: "published", content: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <h2 className="text-lg font-bold">Yeni Rehber Ä°Ã§erik</h2>
      <p className="mt-1 text-sm text-slate-600">Ä°Ã§erikler bilgilendirme amaÃ§lÄ±dÄ±r; kesin hukuki veya tÄ±bbi hÃ¼kÃ¼m iÃ§ermemelidir.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          BaÅŸlÄ±k
          <input required value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Kategori
          <input required value={values.category} onChange={(event) => setValues((current) => ({ ...current, category: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Hedef kitle
          <select value={values.audience} onChange={(event) => setValues((current) => ({ ...current, audience: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10">
            <option value="both">Ã–ÄŸretmen + Veli</option>
            <option value="teacher">Ã–ÄŸretmen</option>
            <option value="parent">Veli</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Durum
          <select value={values.status} onChange={(event) => setValues((current) => ({ ...current, status: event.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10">
            <option value="published">YayÄ±nda</option>
            <option value="draft">Taslak</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Ä°Ã§erik
          <textarea required value={values.content} onChange={(event) => setValues((current) => ({ ...current, content: event.target.value }))} rows={5} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
        </label>
      </div>
      {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
      <button disabled={isSubmitting} className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60">
        {isSubmitting ? "Kaydediliyor..." : "Ä°Ã§eriÄŸi kaydet"}
      </button>
    </form>
  );
}
