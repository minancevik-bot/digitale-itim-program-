"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ProfileSettings } from "@/services/profile-service";

export function ProfileSettingsForm({ settings }: { settings: ProfileSettings }) {
  const [base, setBase] = useState(settings.base);
  const [teacher, setTeacher] = useState(settings.teacher ?? { branch: "", schoolName: "", city: "", district: "" });
  const [parent, setParent] = useState(settings.parent ?? { city: "", district: "", childCount: 0 });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase || !settings.userId) {
      setMessage("Demo modunda profil güncelleme simüle edildi.");
      setIsSubmitting(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: base.fullName,
        phone: base.phone
      })
      .eq("user_id", settings.userId);

    if (profileError) {
      setMessage(profileError.message);
      setIsSubmitting(false);
      return;
    }

    if (base.role === "teacher") {
      const { error } = await supabase
        .from("teacher_profiles")
        .upsert(
          {
            user_id: settings.userId,
            branch: teacher.branch,
            school_name: teacher.schoolName,
            city: teacher.city,
            district: teacher.district
          },
          { onConflict: "user_id" }
        );

      if (error) {
        setMessage(error.message);
        setIsSubmitting(false);
        return;
      }
    }

    if (base.role === "parent") {
      const { error } = await supabase
        .from("parent_profiles")
        .upsert(
          {
            user_id: settings.userId,
            city: parent.city,
            district: parent.district,
            child_count: parent.childCount
          },
          { onConflict: "user_id" }
        );

      if (error) {
        setMessage(error.message);
        setIsSubmitting(false);
        return;
      }
    }

    setMessage("Profil bilgileri güncellendi.");
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-bold">Hesap Bilgileri</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Ad soyad
          <input value={base.fullName} onChange={(event) => setBase((current) => ({ ...current, fullName: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          E-posta
          <input value={base.email} disabled className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Telefon
          <input value={base.phone} onChange={(event) => setBase((current) => ({ ...current, phone: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Rol
          <input value={base.role} disabled className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500" />
        </label>
      </div>

      {base.role === "teacher" ? (
        <section className="mt-6">
          <h3 className="font-bold">Öğretmen Profili</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Branş
              <input value={teacher.branch} onChange={(event) => setTeacher((current) => ({ ...current, branch: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Okul adı
              <input value={teacher.schoolName} onChange={(event) => setTeacher((current) => ({ ...current, schoolName: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              İl
              <input value={teacher.city} onChange={(event) => setTeacher((current) => ({ ...current, city: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              İlçe
              <input value={teacher.district} onChange={(event) => setTeacher((current) => ({ ...current, district: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
          </div>
        </section>
      ) : null}

      {base.role === "parent" ? (
        <section className="mt-6">
          <h3 className="font-bold">Veli Profili</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="block text-sm font-medium text-slate-700">
              İl
              <input value={parent.city} onChange={(event) => setParent((current) => ({ ...current, city: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              İlçe
              <input value={parent.district} onChange={(event) => setParent((current) => ({ ...current, district: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Çocuk sayısı
              <input type="number" min={0} value={parent.childCount} onChange={(event) => setParent((current) => ({ ...current, childCount: Number(event.target.value) }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
          </div>
        </section>
      ) : null}

      {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
      <button disabled={isSubmitting} className="mt-5 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
        {isSubmitting ? "Kaydediliyor..." : "Profili kaydet"}
      </button>
    </form>
  );
}
