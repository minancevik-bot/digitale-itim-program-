"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/icons";
import { DocumentWorkflow } from "@/components/document-workflow";

function isHistoryItem(item: string) {
  return item.toLocaleLowerCase("tr").includes("geÃ§miÅŸ");
}

export function TeacherModuleWorkspace({ items }: { items: string[] }) {
  const firstFormItem = useMemo(() => items.find((item) => !isHistoryItem(item)) ?? items[0], [items]);
  const [selectedItem, setSelectedItem] = useState(firstFormItem);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          const isHistory = isHistoryItem(item);
          const isSelected = item === selectedItem;
          const description = isHistory
            ? "Kaydedilen belge taslaklarÄ±nÄ± ve oluÅŸturulan evraklarÄ± gÃ¶rÃ¼ntÃ¼leyin."
            : "Bu iÅŸlemin formunu aÃ§Ä±n, Ã¶nizleyin, kaydedin ve Word/PDF olarak indirin.";

          if (isHistory) {
            return (
              <Link key={item} href="/dashboard/teacher/document-history" className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-slate-50 text-slate-900">
                  <AppIcon name="ClipboardList" />
                </div>
                <h3 className="text-base font-bold text-slate-950">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </Link>
            );
          }

          return (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedItem(item)}
              className={`rounded-lg border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${
                isSelected ? "border-slate-900 ring-2 ring-slate-200/60" : "border-slate-200 hover:border-slate-900"
              }`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-slate-50 text-slate-900">
                <AppIcon name="ClipboardList" />
              </div>
              <h3 className="text-base font-bold text-slate-950">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </button>
          );
        })}
      </div>
      <div id="document-workflow" className="mt-8">
        <DocumentWorkflow documentType={selectedItem} />
      </div>
    </>
  );
}
