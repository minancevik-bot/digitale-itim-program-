import Link from "next/link";
import { AppIcon } from "@/components/icons";
import type { ModuleCard as ModuleCardType } from "@/lib/types";

export function ModuleCard({ card }: { card: ModuleCardType }) {
  return (
    <Link
      href={card.href}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-soft"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700">
        <AppIcon name={card.icon} />
      </div>
      <h3 className="text-base font-bold text-slate-950">{card.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
    </Link>
  );
}
