import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const teacherFeatures = [
  {
    icon: CheckCircle2,
    title: "Akıllı Kaba Değerlendirme",
    description: "Uzun listeler yerine hızlı tıklamalarla öğrenci performansını belirleyin."
  },
  {
    icon: FileText,
    title: "Otomatik BEP Üretimi",
    description: "Değerlendirme sonuçlarınızı sistem otomatik analiz eder ve resmî Word/PDF formatında BEP planınıza dönüştürür."
  },
  {
    icon: Layers,
    title: "Zengin Materyal Havuzu",
    description: "Hedeflenen kazanıma uygun, onaylanmış eğitim materyallerine anında ulaşın."
  }
];

const parentBenefits = [
  "RAM süreçleri hakkında adım adım bilgilendirme",
  "BEP ve yasal haklar konusunda sadeleştirilmiş rehberler",
  "Evde destekleyici materyal önerileri"
];

const steps = [
  "Öğrenci Profilini Oluşturun.",
  "Kazanımları İşaretleyip Değerlendirmeyi Tamamlayın.",
  "BEP Dosyanızı Orijinal Formatıyla Tek Tıkla İndirin."
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <TrustBadge />
        <TeacherFeatures />
        <ParentSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          EğitimPlatformu
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/login" className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">
            Öğretmen Girişi
          </Link>
          <Link href="/parents" className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">
            Veli Girişi
          </Link>
          <Link href="/register?role=teacher" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md">
            Ücretsiz Başla
          </Link>
        </div>
        <Link href="/register?role=teacher" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 md:hidden">
          Başla
        </Link>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-blue-50 to-white" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            Özel eğitim süreçleri için tek dijital çalışma alanı
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Eğitimde Evrak Yükünü Hafifletin, Öğrencinize Odaklanın.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Kaba değerlendirmeden BEP planına, materyal havuzundan RAM rehberliğine kadar tüm süreçler tek bir dijital platformda. Öğretmenler için zaman tasarrufu, veliler için şeffaf takip.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register?role=teacher" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md">
              Öğretmen Olarak Ücretsiz Başla
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/parents" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-700 hover:shadow-sm">
              Veliler İçin Rehberi İncele
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-500">Kurulum gerektirmez. İlk BEP taslağınızı dakikalar içinde oluşturun.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm font-semibold text-blue-700">BEP Motoru</p>
                <h2 className="mt-1 text-xl font-bold">Kaba Değerlendirme Özeti</h2>
              </div>
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">%80 hazır</span>
            </div>
            <div className="mt-5 grid gap-3">
              {["Okuma Yazma", "Matematik", "Dikkat ve Yönerge", "Sosyal Beceri"].map((item, index) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{item}</span>
                    <span className="text-xs font-bold text-blue-700">{index === 3 ? "Edinildi" : "BEP'e aktar"}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: `${index === 0 ? 70 : index === 1 ? 45 : index === 2 ? 58 : 90}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white">
              <Download className="h-4 w-4" />
              BEP Word Çıktısı Hazır
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBadge() {
  return (
    <section className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-white px-5 py-4 text-center text-sm font-bold text-slate-800 shadow-sm">
        <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />
        MEB Kazanımları ile Entegre ve Resmî BEP Formatlarına %100 Uyumlu
      </div>
    </section>
  );
}

function TeacherFeatures() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Öğretmen paneli</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Öğretmenler İçin Neden Kullanmalıyım?</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Özel eğitim evraklarını tek tek hazırlamak yerine, değerlendirme verisini doğrudan plan ve çıktıya dönüştürün.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {teacherFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
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
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Veli rehberi</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Çocuğunuzun Eğitim Yolculuğunda Artık Yalnız Değilsiniz.</h2>
          <div className="mt-8 space-y-4">
            {parentBenefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="font-semibold text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="rounded-xl bg-blue-50 p-6">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-blue-700">Veli Takip Paneli</p>
              <h3 className="mt-2 text-2xl font-bold">RAM ve BEP Süreçleri</h3>
              <div className="mt-6 space-y-3">
                {["RAM başvuru hazırlığı", "BEP toplantı notları", "Evde materyal önerileri"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <span className="font-semibold text-slate-700">{item}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{index === 0 ? "Tamamlandı" : "Takipte"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Nasıl çalışır?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">BEP dosyanızı üç adımda hazırlayın.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">{index + 1}</div>
              <h3 className="mt-6 text-xl font-bold text-slate-950">{step}</h3>
              <p className="mt-3 leading-7 text-slate-600">Sistem sizi sıradaki adıma yönlendirir ve çıktıyı hazır belge formatına dönüştürür.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-lg font-bold text-slate-950">EğitimPlatformu</Link>
          <p className="mt-2 text-sm text-slate-500">Öğretmen ve veliler için güvenilir özel eğitim süreç yönetimi.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
          <Link href="/login" className="transition hover:text-blue-700">Portal Girişleri</Link>
          <Link href="/terms" className="transition hover:text-blue-700">Kullanım Şartları</Link>
          <Link href="/kvkk" className="transition hover:text-blue-700">Gizlilik Politikası</Link>
          <Link href="/dashboard/teacher/support" className="rounded-lg border border-slate-300 bg-white px-4 py-2 transition hover:border-blue-600 hover:text-blue-700">Destek Al</Link>
        </div>
      </div>
    </footer>
  );
}
