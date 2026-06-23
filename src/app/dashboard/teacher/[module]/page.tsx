import { notFound } from "next/navigation";
import { BepEngineWorkspace } from "@/components/bep-engine-workspace";
import { DashboardShell } from "@/components/dashboard-shell";
import { LawWorkspace } from "@/components/law-workspace";
import { MaterialWorkspace } from "@/components/material-workspace";
import { TeacherModuleWorkspace } from "@/components/teacher-module-workspace";
import { requireRole } from "@/lib/auth";
import { teacherSubModules } from "@/lib/data";

export default async function TeacherModulePage({ params }: { params: Promise<{ module: string }> }) {
  const current = await requireRole("teacher");
  const { module: moduleSlug } = await params;
  const module = teacherSubModules[moduleSlug];
  if (!module) notFound();

  return (
    <DashboardShell title={module.title} subtitle={module.note} crumb={module.title} profileName={current?.profile?.full_name}>
      {moduleSlug === "bep" ? <BepEngineWorkspace /> : null}
      {moduleSlug === "materials" ? <MaterialWorkspace items={module.items} /> : null}
      {moduleSlug === "law" ? <LawWorkspace items={module.items} /> : null}
      {moduleSlug !== "bep" && moduleSlug !== "materials" && moduleSlug !== "law" ? <TeacherModuleWorkspace items={module.items} /> : null}
    </DashboardShell>
  );
}
