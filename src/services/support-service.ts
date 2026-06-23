import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SupportTicket = {
  id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

type TicketRow = {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

export async function listSupportTickets(userId?: string): Promise<SupportTicket[]> {
  const fallback = [
    {
      id: "demo-ticket",
      subject: "Demo destek talebi",
      message: "Supabase env değerleri girildiğinde destek talepleri canlı listelenir.",
      status: "open",
      createdAt: new Date().toISOString()
    }
  ];

  if (!userId) return fallback;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("support_tickets")
    .select("id, subject, message, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) return fallback;

  return ((data ?? []) as TicketRow[]).map((ticket) => ({
    id: ticket.id,
    subject: ticket.subject,
    message: ticket.message,
    status: ticket.status,
    createdAt: ticket.created_at
  }));
}
