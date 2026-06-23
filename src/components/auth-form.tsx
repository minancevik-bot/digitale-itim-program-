"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/types";

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 ease-out focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

const labelClass = "block text-sm font-medium text-slate-700";

function rolePath(role: UserRole) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "parent") return "/dashboard/parent";
  return "/dashboard/teacher";
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      router.push(searchParams.get("next") ?? "/dashboard/teacher");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult.user;
    const { data: profile } = user
      ? await supabase.from("profiles").select("role").eq("user_id", user.id).maybeSingle()
      : { data: null };

    router.push(searchParams.get("next") ?? rolePath((profile?.role as UserRole | undefined) ?? "teacher"));
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-slate-200/60 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12"
    >
      <h1 className="text-2xl font-bold tracking-[0] text-slate-900">Giriş yap</h1>
      <p className="mb-8 mt-2 text-sm leading-relaxed text-slate-500">
        Hesabınıza girin ve BEP çalışma alanınıza kaldığınız yerden devam edin.
      </p>

      <label className={labelClass}>
        E-posta
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </label>

      <label className={`${labelClass} mt-5`}>
        Şifre
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
      </label>

      {message ? (
        <p className="mt-5 rounded-lg border border-slate-200/60 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
          {message}
        </p>
      ) : null}

      <button
        disabled={isSubmitting}
        className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
      </button>
    </form>
  );
}

export function RegisterForm({ initialRole }: { initialRole: UserRole }) {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      router.push(rolePath(role));
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role
        }
      }
    });

    if (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    if (data.session && data.user) {
      await supabase.from("profiles").upsert(
        {
          user_id: data.user.id,
          full_name: fullName,
          email,
          role
        },
        { onConflict: "user_id" }
      );

      router.push(rolePath(role));
      router.refresh();
      return;
    }

    setMessage("Kayıt alındı. E-posta doğrulaması açıksa gelen kutusundan hesabınızı onaylayın.");
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-slate-200/60 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12"
    >
      <h1 className="text-2xl font-bold tracking-[0] text-slate-900">Kayıt ol</h1>
      <p className="mb-8 mt-2 text-sm leading-relaxed text-slate-500">
        Rolünüzü seçin; giriş sonrası sizi doğru çalışma alanına yönlendirelim.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["teacher", "Öğretmenim"],
          ["parent", "Veliyim"]
        ].map(([value, label]) => (
          <label
            key={value}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition-all duration-300 ease-out hover:border-slate-900/30"
          >
            <input
              className="mr-2"
              type="radio"
              name="role"
              checked={role === value}
              onChange={() => setRole(value as UserRole)}
            />
            {label}
          </label>
        ))}
      </div>

      <label className={`${labelClass} mt-5`}>
        Ad soyad
        <input required value={fullName} onChange={(event) => setFullName(event.target.value)} className={inputClass} />
      </label>

      <label className={`${labelClass} mt-5`}>
        E-posta
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </label>

      <label className={`${labelClass} mt-5`}>
        Şifre
        <input
          required
          minLength={6}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
      </label>

      {message ? (
        <p className="mt-5 rounded-lg border border-slate-200/60 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
          {message}
        </p>
      ) : null}

      <button
        disabled={isSubmitting}
        className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
      </button>
    </form>
  );
}
