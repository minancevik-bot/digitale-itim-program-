"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const categories = [
  "Özel Eğitim Materyalleri",
  "Okuma Yazma Materyalleri",
  "Matematik Materyalleri",
  "Dikkat Çalışmaları",
  "Dil ve İletişim Materyalleri",
  "Sosyal Beceri Materyalleri",
  "Öz Bakım Becerileri",
  "İnce Motor Becerileri",
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
      setMessage("Demo modunda materyal yükleme simüle edildi. Supabase env değerleri girildiğinde materials tablosuna pending kayıt açılır.");
      setIsSubmitting(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;
    if (!user) {
      setMessage("Materyal yüklemek için giriş yapmalısınız.");
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

    setMessage("Materyal onay bekleyen kayıt olarak eklendi.");
    setValues({ title: "", description: "", category: categories[0], targetAge: "", targetSkill: "", fileUrl: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-bold">Materyal Yükle</h2>
      <p className="mt-1 text-sm text-slate-600">İlk MVP’de dosya depolama yerine bağlantı alanı kullanılır; Supabase Storage sonraki aşamada bağlanabilir.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Başlık
          <input required value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Kategori
          <select value={values.category} onChange={(event) => setValues((current) => ({ ...current, category: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Hedef yaş
          <input value={values.targetAge} onChange={(event) => setValues((current) => ({ ...current, targetAge: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Hedef beceri
          <input value={values.targetSkill} onChange={(event) => setValues((current) => ({ ...current, targetSkill: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Dosya bağlantısı
          <input value={values.fileUrl} onChange={(event) => setValues((current) => ({ ...current, fileUrl: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Açıklama
          <textarea value={values.description} onChange={(event) => setValues((current) => ({ ...current, description: event.target.value }))} rows={4} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
      </div>
      {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
      <button disabled={isSubmitting} className="mt-5 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
        {isSubmitting ? "Kaydediliyor..." : "Onaya gönder"}
      </button>
    </form>
  );
}
