import { DashboardShell } from "@/components/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { getTeacherLicense } from "@/services/license-service";

export default async function LicensePage() {
  const current = await requireRole("teacher");
  const license = await getTeacherLicense(current?.user.id);
  const expiresAt = license.licenseExpiresAt
    ? new Intl.DateTimeFormat("tr-TR").format(new Date(license.licenseExpiresAt))
    : "Belirlenmedi";

  const items = [
    `Mevcut paket: ${license.licensePackage}`,
    `Kalan BEP hakkÄ±: ${license.bepQuota}`,
    `Kalan evrak hakkÄ±: ${license.documentQuota}`,
    `Ãœyelik bitiÅŸi: ${expiresAt}`
  ];

  return (
    <DashboardShell title="Lisans / Paket Bilgim" crumb="Lisans / Paket Bilgim" profileName={current?.profile?.full_name}>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] font-semibold">{item}</div>
        ))}
      </div>
      <button className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98]">Paket yÃ¼kselt</button>
      <div className="mt-5 rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-slate-600">
        Ã–deme entegrasyonu bu MVP kapsamÄ±nda kapalÄ±dÄ±r. Paket verileri Supabase teacher_profiles ve packages tablolarÄ±na hazÄ±rlandÄ±.
      </div>
    </DashboardShell>
  );
}
