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
    `Kalan BEP hakkı: ${license.bepQuota}`,
    `Kalan evrak hakkı: ${license.documentQuota}`,
    `Üyelik bitişi: ${expiresAt}`
  ];

  return (
    <DashboardShell title="Lisans / Paket Bilgim" crumb="Lisans / Paket Bilgim" profileName={current?.profile?.full_name}>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 font-semibold">{item}</div>
        ))}
      </div>
      <button className="mt-5 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Paket yükselt</button>
      <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 text-slate-600">
        Ödeme entegrasyonu bu MVP kapsamında kapalıdır. Paket verileri Supabase teacher_profiles ve packages tablolarına hazırlandı.
      </div>
    </DashboardShell>
  );
}
