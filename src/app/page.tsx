import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileText,
  Goal,
  Layers3,
  Orbit,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";

const teacherBento = [
  {
    title: "Akıllı Kaba Değerlendirme",
    description: "Uzun listeler yerine hızlı işaretlemelerle performans düzeyi, öncelik ve gözlem notlarını aynı ekranda toplayın.",
    icon: BrainCircuit,
    className: "lg:col-span-2 lg:row-span-2",
    visual: "matrix"
  },
  {
    title: "Otomatik BEP Üretimi",
    description: "Kazanım durumlandırması plan hedeflerine dönüşür; Word/PDF çıktısı tek akışta hazırlanır.",
    icon: FileText,
    className: "lg:col-span-1",
    visual: "document"
  },
  {
    title: "Psikomotor Takip",
    description: "Dikkat, yönerge, ritim, denge ve aktif öğrenme adımlarını yapılandırılmış kartlarla izleyin.",
    icon: Activity,
    className: "lg:col-span-1",
    visual: "motion"
  },
  {
    title: "Materyal Eşleştirme",
    description: "Hedef kazanıma uygun, onaylı materyal önerilerini planın içine bağlayın.",
    icon: Layers3,
    className: "lg:col-span-2",
    visual: "layers"
  }
];

const parentBenefits = [
  "RAM süreçleri hakkında adım adım bilgilendirme",
  "BEP ve yasal haklar konusunda sadeleştirilmiş rehberler",
  "Evde destekleyici materyal önerileri"
];

const timelineSteps = [
  {
    title: "Öğrenci Profilini Oluşturun.",
    description: "Temel bilgiler, eğitim ihtiyacı ve gözlem notları güvenli bir öğrenci dosyasında toplanır.",
    icon: Orbit
  },
  {
    title: "Kazanımları İşaretleyip Değerlendirmeyi Tamamlayın.",
    description: "Kaba değerlendirme sonuçları edinildi, geliştirilmeli ve başlanmadı durumlarına ayrılır.",
    icon: Goal
  },
  {
    title: "BEP Dosyanızı Orijinal Formatıyla Tek Tıkla İndirin.",
    description: "Aktarılan kazanımlar düzenlenebilir plan satırlarına ve çıktı dosyasına dönüşür.",
    icon: FileText
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureBento />
        <ParentSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/15">
            <Sparkles className="h-4 w-4 text-indigo-200" />
          </span>
          <span className="text-base font-semibold">EğitimPlatformu</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-white/10 hover:text-white">
            Giriş Yap
          </Link>
          <Link href="/register?role=teacher" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-50">
            Ücretsiz Başla
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-slate-950 px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="absolute right-[-120px] top-28 h-[360px] w-[360px] rounded-full bg-violet-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-indigo-200" />
            MEB kazanımlarıyla uyumlu, çıktı odaklı BEP akışı
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
            Eğitimde Evrak Yükünü Hafifletin, Öğrencinize Odaklanın.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Kaba değerlendirmeden BEP planına, materyal havuzundan RAM rehberliğine kadar tüm süreçler tek bir dijital platformda. Öğretmenler için zaman tasarrufu, veliler için şeffaf takip.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/register?role=teacher" className="group inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgb(79,70,229,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-400">
              Öğretmen Olarak Ücretsiz Başla
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/parents" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
              Veliler İçin Rehberi İncele
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <MiniDashboardMockup />
      </div>
    </section>
  );
}

function MiniDashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[2rem] bg-indigo-400/20 blur-3xl" />
      <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-[0_24px_90px_rgb(0,0,0,0.26)] backdrop-blur-md">
        <div className="rounded-[1.5rem] border border-white/15 bg-white/80 p-5 text-slate-950 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-indigo-600">Canlı Değerlendirme</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">Kazanım Matrisi</h2>
            </div>
            <div className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              %82 tamamlandı
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              ["Okuma akıcılığı", "Geliştirilmeli", 68],
              ["Yönerge takibi", "Aktarılacak", 74],
              ["Ritim ve denge", "İzleniyor", 58],
              ["Sosyal katılım", "Edinildi", 91]
            ].map(([label, status, value]) => (
              <div key={label as string} className="group rounded-2xl border border-gray-100 bg-white/70 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-800">{label}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{status}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["12", "Kazanım"],
              ["4", "Öncelik"],
              ["1", "Çıktı"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-gray-100 bg-slate-50 p-4 text-center">
                <p className="text-2xl font-semibold text-slate-900">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBento() {
  return (
    <section className="relative bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute left-16 top-16 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute bottom-10 right-16 h-72 w-72 rounded-full bg-violet-200/35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-indigo-600">Öğretmen ve veli deneyimi</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-slate-900 sm:text-5xl">
            Planlama, takip ve çıktı üretimi tek premium çalışma alanında.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Değerlendirmeyi yalnızca kayıt altına almayın; kazanımı konumlandırın, planı oluşturun, aile iletişimini şeffaflaştırın.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(220px,auto)] gap-6 lg:grid-cols-4">
          {teacherBento.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={`group overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 ${item.className}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-gray-100 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-500">Canlı akış</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{item.description}</p>
                <BentoVisual type={item.visual} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoVisual({ type }: { type: string }) {
  if (type === "matrix") {
    return (
      <div className="mt-8 grid gap-2 rounded-2xl border border-gray-100 bg-slate-950 p-4">
        {["Planlama", "Odak", "Hareket", "İletişim"].map((row, index) => (
          <div key={row} className="grid grid-cols-[1fr_0.7fr_0.7fr] gap-2 text-xs">
            <div className="rounded-lg bg-white/10 px-3 py-2 font-medium text-white">{row}</div>
            <div className="rounded-lg bg-indigo-400/20 px-3 py-2 text-indigo-100">{index < 2 ? "Öncelik" : "İzleme"}</div>
            <div className="rounded-lg bg-emerald-400/20 px-3 py-2 text-emerald-100">{index === 0 ? "Aktar" : "Takip"}</div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "motion") {
    return (
      <div className="mt-8 flex items-end gap-2">
        {[42, 66, 52, 78, 92].map((height, index) => (
          <div key={height} className="flex-1 rounded-t-2xl bg-gradient-to-t from-indigo-500 to-violet-300 transition-all duration-300 group-hover:-translate-y-1" style={{ height: `${height}px`, transitionDelay: `${index * 35}ms` }} />
        ))}
      </div>
    );
  }

  if (type === "layers") {
    return (
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {["Kazanım", "Materyal", "Çıktı"].map((label) => (
          <div key={label} className="rounded-2xl border border-gray-100 bg-white/70 p-4">
            <Route className="h-5 w-5 text-indigo-600" />
            <p className="mt-3 text-sm font-semibold text-slate-800">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">Resmî format</span>
        <Zap className="h-5 w-5 text-indigo-600" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2 rounded-full bg-indigo-200" />
        <div className="h-2 w-4/5 rounded-full bg-slate-200" />
        <div className="h-2 w-2/3 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function ParentSection() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-indigo-600">Veli görünürlüğü</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-slate-900 sm:text-5xl">
            Çocuğunuzun Eğitim Yolculuğunda Artık Yalnız Değilsiniz.
          </h2>
          <div className="mt-8 space-y-4">
            {parentBenefits.map((benefit) => (
              <div key={benefit} className="group flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                <p className="font-medium leading-relaxed text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-gray-100 bg-slate-50 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-indigo-600">Aile rehberi</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">Takip panosu</h3>
              </div>
              <TrendingUp className="h-7 w-7 text-indigo-600" />
            </div>
            <div className="mt-6 grid gap-4">
              {[
                ["RAM başvuru adımları", "3/4 tamamlandı"],
                ["BEP toplantı hazırlığı", "Notlar hazır"],
                ["Ev çalışmaları", "5 materyal önerildi"]
              ].map(([title, status]) => (
                <div key={title} className="rounded-2xl border border-gray-100 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-800">{title}</span>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-indigo-300">Nasıl çalışır?</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">BEP dosyanızı kontrollü bir üretim hattında hazırlayın.</h2>
        </div>

        <div className="relative mt-14 space-y-8">
          <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-indigo-400 via-white/20 to-transparent sm:block" />
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="group relative grid gap-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14] sm:grid-cols-[3rem_1fr]">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-300/40 bg-indigo-400/20 shadow-[0_0_30px_rgb(129,140,248,0.28)]">
                  <Icon className="h-5 w-5 text-indigo-100" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-indigo-200">0{index + 1}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-300">{step.description}</p>
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
    <footer className="border-t border-gray-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-lg font-semibold text-slate-900">EğitimPlatformu</Link>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Öğretmen ve veliler için güvenilir özel eğitim süreç yönetimi.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/login" className="transition-all duration-300 hover:text-indigo-600">Portal Girişleri</Link>
          <Link href="/terms" className="transition-all duration-300 hover:text-indigo-600">Kullanım Şartları</Link>
          <Link href="/kvkk" className="transition-all duration-300 hover:text-indigo-600">Gizlilik Politikası</Link>
          <Link href="/dashboard/teacher/support" className="rounded-full border border-gray-200 bg-white px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            Destek Al
          </Link>
        </div>
      </div>
    </footer>
  );
}
