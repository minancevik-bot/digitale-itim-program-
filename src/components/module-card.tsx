import Link from "next/link";
import { AppIcon } from "@/components/icons";
import type { ModuleCard as ModuleCardType } from "@/lib/types";

export function ModuleCard({ card }: { card: ModuleCardType }) {
  return (
    <Link
      href={card.href}
      className="group rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-slate-50 active:scale-[0.98]"
    >
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/60 bg-white text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <AppIcon name={card.icon} />
      </div>
      <h3 className="text-base font-semibold tracking-[0] text-slate-900">{card.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.description}</p>
    </Link>
  );
}
