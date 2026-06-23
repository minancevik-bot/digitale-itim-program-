"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SupportForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Demo modunda destek talebi simüle edildi.");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;

    if (!user) {
      setStatus("Destek talebi oluşturmak için giriş yapmalısınız.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("support_tickets").insert({
      user_id: user.id,
      subject,
      message
    });

    if (error) {
      setStatus(error.message);
      setIsSubmitting(false);
      return;
    }

    setStatus("Destek talebi oluşturuldu.");
    setSubject("");
    setMessage("");
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="font-bold">Destek talebi oluştur</h2>
      <input required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Konu" className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2" />
      <textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Mesaj" rows={6} className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2" />
      {status ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{status}</p> : null}
      <button disabled={isSubmitting} className="mt-4 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}
