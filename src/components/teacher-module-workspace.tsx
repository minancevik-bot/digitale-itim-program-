"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/icons";
import { DocumentWorkflow } from "@/components/document-workflow";

function isHistoryItem(item: string) {
  return item.toLocaleLowerCase("tr").includes("geçmiş");
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
            ? "Kaydedilen belge taslaklarını ve oluşturulan evrakları görüntüleyin."
            : "Bu işlemin formunu açın, önizleyin, kaydedin ve Word/PDF olarak indirin.";

          if (isHistory) {
            return (
              <Link key={item} href="/dashboard/teacher/document-history" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-soft">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700">
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
              className={`rounded-lg border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${
                isSelected ? "border-brand-600 ring-2 ring-brand-100" : "border-slate-200 hover:border-brand-600"
              }`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700">
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
