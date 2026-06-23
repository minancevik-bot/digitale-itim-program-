"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type TicketRow = {
  id: string;
  subject: string;
  status: string;
  created_at: string;
};

export function AdminSupportTicketActions() {
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [message, setMessage] = useState("Destek talepleri yÃ¼kleniyor.");

  async function loadTickets() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setTickets([{ id: "demo-ticket", subject: "Demo destek talebi", status: "open", created_at: new Date().toISOString() }]);
      setMessage("Demo destek talepleri gÃ¶steriliyor.");
      return;
    }

    const { data, error } = await supabase
      .from("support_tickets")
      .select("id, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      setMessage(error.message);
      return;
    }

    setTickets((data ?? []) as TicketRow[]);
    setMessage(data?.length ? "Destek talepleri listelendi." : "Destek talebi yok.");
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setTickets((current) => current.map((ticket) => ticket.id === id ? { ...ticket, status } : ticket));
      setMessage("Demo modunda destek talebi gÃ¼ncellendi.");
      return;
    }

    const { error } = await supabase.from("support_tickets").update({ status }).eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }

    await loadTickets();
  }

  useEffect(() => {
    void loadTickets();
  }, []);

  return (
    <section className="mb-6 rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <h2 className="text-lg font-bold">Destek Talebi YÃ¶netimi</h2>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      <div className="mt-4 grid gap-3">
        {tickets.map((ticket) => (
          <article key={ticket.id} className="rounded-md border border-slate-200 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold">{ticket.subject}</h3>
                <p className="mt-1 text-sm text-slate-600">{ticket.status} â€¢ {new Intl.DateTimeFormat("tr-TR").format(new Date(ticket.created_at))}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => updateStatus(ticket.id, "open")} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm font-semibold">AÃ§Ä±k</button>
                <button type="button" onClick={() => updateStatus(ticket.id, "in_progress")} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98]">Ä°ÅŸlemde</button>
                <button type="button" onClick={() => updateStatus(ticket.id, "closed")} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">Kapat</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
