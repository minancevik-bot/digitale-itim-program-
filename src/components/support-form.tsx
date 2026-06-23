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
      setStatus("Demo modunda destek talebi simÃ¼le edildi.");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;

    if (!user) {
      setStatus("Destek talebi oluÅŸturmak iÃ§in giriÅŸ yapmalÄ±sÄ±nÄ±z.");
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

    setStatus("Destek talebi oluÅŸturuldu.");
    setSubject("");
    setMessage("");
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <h2 className="font-bold">Destek talebi oluÅŸtur</h2>
      <input required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Konu" className="mt-4 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
      <textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Mesaj" rows={6} className="mt-4 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
      {status ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{status}</p> : null}
      <button disabled={isSubmitting} className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60">
        {isSubmitting ? "GÃ¶nderiliyor..." : "GÃ¶nder"}
      </button>
    </form>
  );
}
