import type { ModuleCard, Student } from "@/lib/types";

export const teacherModules: ModuleCard[] = [
  { title: "BEP ve Değerlendirme", description: "Kaba değerlendirme, performans düzeyi ve BEP sürecini adım adım oluşturun.", href: "/dashboard/teacher/bep", icon: "ClipboardList" },
  { title: "Evrak Merkezi", description: "Resmi evrakları bilgileri girerek Word/PDF formatına hazır hale getirin.", href: "/dashboard/teacher/documents", icon: "Files" },
  { title: "Yapay Zekâ Tutanakları", description: "Toplantı ve kurul tutanaklarını kısa bilgilerle otomatik taslaklayın.", href: "/dashboard/teacher/ai-minutes", icon: "Sparkles" },
  { title: "Sınıf Rehberlik İşlemleri", description: "Plan, rapor, veli toplantısı ve öğrenci tanıma evraklarını yönetin.", href: "/dashboard/teacher/guidance", icon: "Compass" },
  { title: "Sosyal Kulüp Evrakları", description: "Kulüp planı, faaliyet raporu ve toplantı tutanaklarını hazırlayın.", href: "/dashboard/teacher/clubs", icon: "Users" },
  { title: "Materyal Havuzu", description: "Öğrenci düzeyi ve beceri alanına uygun materyallere ulaşın.", href: "/dashboard/teacher/materials", icon: "Boxes" },
  { title: "Öğrencilerim", description: "Öğrencilerin gelişimini, kazanımlarını ve evrak arşivini takip edin.", href: "/dashboard/teacher/students", icon: "GraduationCap" },
  { title: "Mevzuat Rehberi", description: "Özel eğitim, BEP, RAM ve veli hakları hakkında bilgilendirici içerikler.", href: "/dashboard/teacher/law", icon: "Scale" },
  { title: "Lisans / Paket Bilgim", description: "Paketinizi, kullanım haklarınızı ve üyelik durumunuzu görüntüleyin.", href: "/dashboard/teacher/license", icon: "BadgeCheck" },
  { title: "Destek", description: "Destek talebi oluşturun ve sık sorulan sorulara göz atın.", href: "/dashboard/teacher/support", icon: "LifeBuoy" }
];

export const teacherSubModules: Record<string, { title: string; items: string[]; note?: string }> = {
  bep: { title: "BEP ve Değerlendirme", items: ["BEP Hazırla", "Hızlı BEP Oluştur", "BEP Geçmişim", "ZEP Hazırla", "Kaba Değerlendirme Formu", "Ölçme Aracı Hazırla", "Eğitsel Performans Formu"] },
  documents: { title: "Evrak Merkezi", items: ["BEP Dosya Kapağı", "BEP Öğrenci Bilgileri", "BEP Geliştirme Birimi Kararları", "Veli Görüşme Formu", "Öğrenci Gözlem Formu", "Davranış İzleme Formu", "Gelişim Raporu", "Destek Eğitim Odası Evrakları", "Kaynaştırma/Bütünleştirme Evrakları"] },
  "ai-minutes": { title: "Yapay Zekâ Tutanakları", items: ["Zümre Toplantı Tutanağı", "Veli Toplantısı Tutanağı", "Şube Öğretmenler Kurulu Tutanağı", "BEP Toplantı Tutanağı", "Sınıf Rehberlik Faaliyet Raporu", "Sosyal Kulüp Toplantı Tutanağı", "Öğrenci Gelişim Raporu", "Veli Görüşme Notu"], note: "Bu sürümde form verilerinden örnek metin üreten yer tutucu servis kullanılır." },
  guidance: { title: "Sınıf Rehberlik İşlemleri", items: ["Sınıf Rehberlik Planları", "Sınıf Rehberlik Faaliyet Raporu", "Veli Toplantı Evrakları", "Öğrenci Tanıma Formları", "Rehberlik Etkinlik Planları", "Dönem Sonu Rehberlik Raporu"] },
  clubs: { title: "Sosyal Kulüp Evrakları", items: ["Sosyal Kulüp Yıllık Planı", "Sosyal Kulüp Faaliyet Planı", "Sosyal Kulüp Toplantı Tutanağı", "Dönem Sonu Faaliyet Raporu", "Ders Kesim Raporu", "Etkinlik İçerikleri"] },
  materials: { title: "Materyal Havuzu", items: ["Özel Eğitim Materyalleri", "Okuma Yazma Materyalleri", "Matematik Materyalleri", "Dikkat Çalışmaları", "Dil ve İletişim Materyalleri", "Sosyal Beceri Materyalleri", "Öz Bakım Becerileri", "İnce Motor Becerileri", "Kaba Motor Becerileri", "Materyal Yükle", "Favorilerim"] },
  law: { title: "Mevzuat Rehberi", items: ["Özel Eğitim Mevzuatı", "BEP Mevzuatı", "RAM Süreçleri", "Kaynaştırma/Bütünleştirme", "Destek Eğitim Odası", "Evde Eğitim", "Öğretmen Evrak Yükümlülükleri", "Veli Hakları", "Sık Sorulan Sorular"], note: "İçerikler bilgilendirme amaçlıdır; hukuki, tıbbi veya tanısal karar yerine geçmez." }
};

export const parentModules: ModuleCard[] = [
  { title: "Haklarımı Öğrenmek İstiyorum", description: "Özel eğitim hakları ve başvuru süreçleri için sade rehberler.", href: "/dashboard/parent/rights", icon: "ShieldCheck" },
  { title: "RAM Süreci", description: "Başvuru, değerlendirme ve raporlama adımlarını takip edin.", href: "/dashboard/parent/ram", icon: "Map" },
  { title: "BEP Süreci", description: "BEP toplantısı ve veli katılımı hakkında anlaşılır bilgiler.", href: "/dashboard/parent/bep", icon: "ClipboardList" },
  { title: "Kaynaştırma / Bütünleştirme", description: "Okul içi destek ve uyarlamalar için rehber içerikler.", href: "/dashboard/parent/inclusion", icon: "Network" },
  { title: "Destek Eğitim Odası", description: "Destek eğitim hakkı, planlama ve takip süreçleri.", href: "/dashboard/parent/support-education", icon: "BookOpen" },
  { title: "Evde Eğitim", description: "Evde eğitim başvuru ve uygulama süreci için başlangıç rehberi.", href: "/dashboard/parent/home-education", icon: "Home" },
  { title: "Uzman / Öğretmen Bul", description: "İleride uzman ve öğretmen eşleştirme altyapısı için alan.", href: "/dashboard/parent/experts", icon: "Search" },
  { title: "Veli Topluluğu", description: "Güvenli topluluk ve deneyim paylaşımı alanı.", href: "/dashboard/parent/community", icon: "MessagesSquare" },
  { title: "Soru-Cevap", description: "Sık sorulan sorular ve rehber cevaplar.", href: "/dashboard/parent/questions", icon: "CircleHelp" },
  { title: "Materyal Önerileri", description: "Evde uygulanabilecek materyal ve etkinlik önerileri.", href: "/dashboard/parent/materials", icon: "Puzzle" }
];

export const adminModules: ModuleCard[] = [
  { slug: "users", title: "Kullanıcılar" },
  { slug: "teachers", title: "Öğretmenler" },
  { slug: "parents", title: "Veliler" },
  { slug: "students", title: "Öğrenciler" },
  { slug: "materials", title: "Materyaller" },
  { slug: "law-contents", title: "Mevzuat İçerikleri" },
  { slug: "packages", title: "Paketler" },
  { slug: "support-tickets", title: "Destek Talepleri" },
  { slug: "settings", title: "Sistem Ayarları" }
].map((item) => ({ title: item.title, description: "Temel yönetim ve içerik kontrol alanı.", href: `/dashboard/admin/${item.slug}`, icon: "Settings" }));

export const adminSections: Record<string, { title: string; description: string; table: string; columns: string[] }> = {
  users: { title: "Kullanıcılar", description: "Profil, rol ve iletişim bilgileri.", table: "profiles", columns: ["full_name", "email", "role", "created_at"] },
  teachers: { title: "Öğretmenler", description: "Öğretmen profil ve lisans bilgileri.", table: "teacher_profiles", columns: ["branch", "school_name", "license_package", "bep_quota", "document_quota"] },
  parents: { title: "Veliler", description: "Veli profil kayıtları.", table: "parent_profiles", columns: ["city", "district", "child_count", "created_at"] },
  students: { title: "Öğrenciler", description: "Sistemdeki öğrenci kayıtları.", table: "students", columns: ["full_name", "grade_level", "school_name", "student_status"] },
  materials: { title: "Materyaller", description: "Yüklenen materyal durumları.", table: "materials", columns: ["title", "category", "status", "is_premium"] },
  "law-contents": { title: "Mevzuat İçerikleri", description: "Rehber içerik yayın durumu.", table: "law_contents", columns: ["title", "category", "audience", "status"] },
  packages: { title: "Paketler", description: "Paket ve kota tanımları.", table: "packages", columns: ["name", "price", "bep_quota", "document_quota", "is_active"] },
  "support-tickets": { title: "Destek Talepleri", description: "Kullanıcı destek talepleri.", table: "support_tickets", columns: ["subject", "status", "created_at"] },
  settings: { title: "Sistem Ayarları", description: "MVP genel ayar alanı.", table: "profiles", columns: ["email", "role", "created_at"] }
};

export const sampleStudents: Student[] = [
  { id: "demo-1", fullName: "Deniz Yılmaz", gradeLevel: "3. sınıf", schoolName: "Cumhuriyet İlkokulu", studentStatus: "Kaynaştırma", educationNeed: "Okuma akıcılığı ve temel matematik" },
  { id: "demo-2", fullName: "Ece Kaya", gradeLevel: "5. sınıf", schoolName: "Atatürk Ortaokulu", studentStatus: "Destek eğitim", educationNeed: "Dikkat, yönerge takibi ve sosyal beceri" }
];

export const pricingPlans = [
  { name: "Ücretsiz Deneme", price: "0 TL", features: ["Sınırlı BEP taslağı", "Temel evrak önizleme", "Veli rehber içerikleri"] },
  { name: "Bireysel Öğretmen Paketi", price: "Yakında", features: ["BEP ve evrak kotası", "Öğrenci gelişim takibi", "Materyal havuzu"] },
  { name: "Kurum Paketi", price: "Yakında", features: ["Çoklu öğretmen yönetimi", "Kurum raporları", "Destek önceliği"] },
  { name: "Premium Materyal Paketi", price: "Yakında", features: ["Premium materyaller", "Beceri alanı filtreleri", "Favori listeleri"] }
];
