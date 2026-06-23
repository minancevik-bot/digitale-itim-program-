import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Goal,
  Layers3,
  Orbit,
  Route,
  Sparkles
} from "lucide-react";

const features = [
  {
    title: "Saniyeler İçinde BEP Planı",
    description:
      "Kaba değerlendirme sonuçlarını düzenli, okunabilir ve çıktıya hazır BEP planlarına dönüştürün.",
    icon: FileText,
    className: "md:col-span-2"
  },
  {
    title: "Binlerce Ders Materyali",
    description:
      "Hedef kazanıma uygun materyalleri öğretmen akışını bozmadan aynı çalışma alanında keşfedin.",
    icon: Layers3,
    className: ""
  },
  {
    title: "Kazanım Odaklı Akış",
    description:
      "Öğrencinin mevcut durumunu, hedeflerini ve ilerleme adımlarını tek bir sakin düzende izleyin.",
    icon: BrainCircuit,
    className: ""
  },
  {
    title: "Veli Ekosistemi",
    description:
      "Hak arayışı, bilgi paylaşımı ve uzman seçimi için aileleri sade ve güvenilir bir yapı içinde buluşturun.",
    icon: Orbit,
    className: "md:col-span-2"
  },
  {
    title: "Aktif Gelişim Takibi",
    description:
      "Bilişsel, akademik ve psikomotor gelişim adımlarını anlaşılır göstergelerle görünür kılın.",
    icon: Activity,
    className: "md:col-span-3"
  }
];

const parentBenefits = [
  "RAM süreçleri hakkında adım adım bilgilendirme",
  "BEP ve yasal haklar konusunda sadeleştirilmiş rehberler",
  "Evde destekleyici materyal önerileri"
];

const timelineSteps = [
  {
    title: "Öğrenci profilini oluşturun.",
    description:
      "Temel bilgiler, eğitim ihtiyacı ve gözlem notları güvenli bir öğrenci dosyasında toplanır.",
    icon: Orbit
  },
  {
    title: "Kazanımları konumlandırın.",
    description:
      "Kaba değerlendirme sonuçları edinildi, geliştirilmeli ve başlanmadı durumlarına ayrılır.",
    icon: Goal
  },
  {
    title: "BEP dosyanızı indirin.",
    description:
      "Aktarılan kazanımlar düzenlenebilir plan satırlarına ve çıktı dosyasına dönüşür.",
    icon: FileText
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <ParentSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}

function LandingNavbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:text-slate-700 active:scale-[0.98]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            EP
          </span>
          EğitimPlatformu
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 ease-out hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register?role=teacher"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98]"
          >
            Ücretsiz Başla
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(99,102,241,0.14),transparent_30%),radial-gradient(circle_at_18%_42%,rgba(14,165,233,0.08),transparent_26%),radial-gradient(circle_at_82%_45%,rgba(168,85,247,0.10),transparent_28%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAFAFA] to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          ✨ Özel Eğitimde Yeni Standart
        </span>

        <h1 className="mb-6 text-6xl font-extrabold leading-[0.98] tracking-[0] text-slate-900 md:text-7xl">
          Evrak Değil, Eğitime Odaklanın. Gerisini Bize Bırakın.
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
          Saniyeler içinde hazırlanan BEP planları ve binlerce ders materyali ile öğretmenlerin hayatını kolaylaştırıyoruz. Velilerimizi ise hak arayışında, bilgi paylaşımında ve uzman seçiminde destekleyen dev bir ekosistemde buluşturuyoruz.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register?role=teacher"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
          >
            Öğretmen Olarak Başla
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/parents"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 active:scale-[0.98] sm:w-auto"
          >
            Veli Topluluğuna Katıl
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="scroll-fade-up mt-32 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-slate-500">
            Tek platform, iki güçlü deneyim
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[0] text-slate-900 md:text-5xl">
            Öğretmenlerin üretim hızını, velilerin güven hissini artıran sade sistem.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
            BEP hazırlığı, materyal erişimi, aile rehberliği ve ilerleme takibi aynı tutarlı tasarım diliyle birleşir.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`group rounded-3xl border border-slate-200/60 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 ${feature.className}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/60 bg-white text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-[0] text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-slate-500">
                  {feature.description}
                </p>

                {feature.title === "Aktif Gelişim Takibi" ? (
                  <div className="mt-10 grid gap-3 md:grid-cols-3">
                    {["Bilişsel ilerleme", "Akademik hedef", "Psikomotor ritim"].map((label) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-slate-200/60 bg-slate-50 p-4"
                      >
                        <Route className="h-5 w-5 text-slate-700" />
                        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-900">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ParentSection() {
  return (
    <section className="scroll-fade-up px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Sparkles className="h-6 w-6 text-slate-900" />
          <h2 className="mt-8 text-4xl font-semibold leading-[1.08] tracking-[0] text-slate-900 md:text-5xl">
            Veliler için bilgiye, hakka ve doğru uzmana giden sakin yol.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            Ailelerin ihtiyaç duyduğu rehberliği sadeleştirir, güvenilir kaynakları erişilebilir hale getiririz.
          </p>
        </div>

        <div className="grid gap-4">
          {parentBenefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-4 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-900" />
              <p className="text-base font-medium leading-relaxed text-slate-500">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="scroll-fade-up px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase text-slate-500">Nasıl çalışır?</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[0] text-slate-900 md:text-5xl">
            Kaba değerlendirmeden çıktıya, üç net adım.
          </h2>
        </div>

        <div className="mt-16 grid gap-6">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="grid gap-5 rounded-3xl border border-slate-200/60 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:grid-cols-[4rem_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/60 bg-white text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">0{index + 1}</p>
                  <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-[0] text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-500">{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/60 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold text-slate-900 transition-all duration-300 ease-out hover:text-slate-700 active:scale-[0.98]"
          >
            EğitimPlatformu
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Öğretmen ve veliler için güvenilir özel eğitim süreç yönetimi.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
          <Link
            href="/login"
            className="transition-all duration-300 ease-out hover:text-slate-900 active:scale-[0.98]"
          >
            Portal Girişleri
          </Link>
          <Link
            href="/terms"
            className="transition-all duration-300 ease-out hover:text-slate-900 active:scale-[0.98]"
          >
            Kullanım Şartları
          </Link>
          <Link
            href="/kvkk"
            className="transition-all duration-300 ease-out hover:text-slate-900 active:scale-[0.98]"
          >
            Gizlilik Politikası
          </Link>
          <Link
            href="/dashboard/teacher/support"
            className="rounded-xl border border-slate-200/60 bg-white px-4 py-2 text-slate-900 shadow-sm transition-all duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]"
          >
            Destek Al
          </Link>
        </div>
      </div>
    </footer>
  );
}
