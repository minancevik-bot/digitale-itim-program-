"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function StudentDeleteButton({ studentId }: { studentId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("Bu öğrenci kaydını silmek istediğinizden emin misiniz?");
    if (!confirmed) return;

    setIsDeleting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Demo modunda silme işlemi simüle edildi.");
      setIsDeleting(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;

    if (!user) {
      setMessage("Silme işlemi için giriş yapmalısınız.");
      setIsDeleting(false);
      return;
    }

    const { error } = await supabase.from("students").delete().eq("id", studentId).eq("teacher_id", user.id);

    if (error) {
      setMessage(error.message);
      setIsDeleting(false);
      return;
    }

    router.push("/dashboard/teacher/students");
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-60"
      >
        {isDeleting ? "Siliniyor..." : "Öğrenciyi sil"}
      </button>
      {message ? <p className="mt-3 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
    </div>
  );
}
