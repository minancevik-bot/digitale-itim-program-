"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/types";

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
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Giriş yap</h1>
      <p className="mt-2 text-sm text-slate-600">Supabase bilgileri yoksa demo panele yönlendirilir.</p>
      <label className="mt-5 block text-sm font-medium">
        E-posta
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      <label className="mt-4 block text-sm font-medium">
        Şifre
        <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
      <button disabled={isSubmitting} className="mt-5 w-full rounded-md bg-brand-600 px-4 py-2 font-semibold text-white disabled:opacity-60">
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

    setMessage("Kayıt alındı. Supabase e-posta doğrulaması açıksa gelen kutusundan hesabı onaylayın.");
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Kayıt ol</h1>
      <p className="mt-2 text-sm text-slate-600">Seçilen rol profil kaydına işlenir ve giriş sonrası ilgili panele yönlendirir.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="rounded-md border border-slate-300 p-4">
          <input className="mr-2" type="radio" name="role" checked={role === "teacher"} onChange={() => setRole("teacher")} />
          Öğretmenim
        </label>
        <label className="rounded-md border border-slate-300 p-4">
          <input className="mr-2" type="radio" name="role" checked={role === "parent"} onChange={() => setRole("parent")} />
          Veliyim
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium">
        Ad soyad
        <input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      <label className="mt-4 block text-sm font-medium">
        E-posta
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      <label className="mt-4 block text-sm font-medium">
        Şifre
        <input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      {message ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{message}</p> : null}
      <button disabled={isSubmitting} className="mt-5 w-full rounded-md bg-brand-600 px-4 py-2 font-semibold text-white disabled:opacity-60">
        {isSubmitting ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
      </button>
    </form>
  );
}
