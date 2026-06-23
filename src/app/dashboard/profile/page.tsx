import { DashboardShell } from "@/components/dashboard-shell";
import { ProfileSettingsForm } from "@/components/profile-settings-form";
import { getCurrentProfile } from "@/lib/auth";
import { getProfileSettings } from "@/services/profile-service";

export default async function ProfilePage() {
  const current = await getCurrentProfile();
  const settings = await getProfileSettings();

  return (
    <DashboardShell title="Profil ve Hesap Ayarları" subtitle="Hesap bilgilerinizi ve rolünüze bağlı profil alanlarını güncelleyin." crumb="Profil" profileName={current?.profile?.full_name}>
      <ProfileSettingsForm settings={settings} />
    </DashboardShell>
  );
}
