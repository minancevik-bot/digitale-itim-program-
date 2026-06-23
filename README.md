# Eğitim Platformu MVP

Öğretmen ve veli odaklı, Next.js App Router + TypeScript + Tailwind CSS + Supabase altyapılı başlangıç projesi.

## Kurulum

```bash
npm install
npm run dev
```

Yerel adres: `http://localhost:3000`

## Ortam Değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Supabase

SQL migration dosyası: `supabase/migrations/001_initial_schema.sql`

Oluşturulan tablolar:

- `profiles`
- `teacher_profiles`
- `parent_profiles`
- `students`
- `bep_documents`
- `generated_documents`
- `materials`
- `support_tickets`
- `law_contents`
- `packages`

RLS başlangıcı öğretmenin yalnızca kendi öğrencilerini ve belgelerini, velinin kendi profilini, adminin tüm verileri yönetmesini hedefler. Materyaller onay durumuna göre okunur.

## Test Akışları

Giriş/kayıt:

1. `/register` sayfasını açın.
2. Öğretmenim veya Veliyim rolünü seçin.
3. Supabase env değerleri doluysa gerçek kullanıcı oluşturulduğunu ve `profiles` kaydının trigger ile oluştuğunu kontrol edin.
4. `/login` sayfasında aynı kullanıcıyla giriş yapın.
5. Rolüne göre `/dashboard/teacher` veya `/dashboard/parent` rotasına yönlendiğini doğrulayın.

Öğretmen paneli:

1. `/dashboard/teacher` sayfasını açın.
2. Modül kartlarını kontrol edin.
3. `/dashboard/teacher/bep`, `/dashboard/teacher/documents`, `/dashboard/teacher/ai-minutes` sayfalarında alt işlem kartlarına tıklayın; seçilen işleme göre form alanlarının ve önizlemenin değiştiğini kontrol edin.
4. `/dashboard/teacher/bep` sayfasında BEP formunun örnek Word dosyasındaki kapak, öğrenci bilgileri, aile bilgileri, eğitsel performans, plan, kararlar, değerlendirme ve imza bölümlerine göre açıldığını kontrol edin.
5. BEP ekranındaki `Örnek BEP Word` bağlantısından referans dosyanın indirildiğini doğrulayın.
6. Belge önizleme alanında `.docx` Word taslağı indirme ve PDF yazdırma akışını deneyin.
7. Evrak Merkezi içinde `Veli Görüşme Formu`, `Öğrenci Gözlem Formu`; Yapay Zekâ Tutanakları içinde `Zümre Toplantı Tutanağı`; rapor alanlarında `Öğrenci Gelişim Raporu` için özel form ve taslak metin üretimini deneyin.
8. Belgeyi kaydedip `/dashboard/teacher/document-history` ekranında taslak geçmişini kontrol edin.
9. `/dashboard/teacher/students` sayfasında liste, arama alanı ve profil geçişini kontrol edin.
10. `/dashboard/teacher/students/new` sayfasında KVKK uyarısını, form alanlarını ve Supabase'e kayıt eklemeyi kontrol edin.
11. `/dashboard/teacher/support` sayfasından destek talebi oluşturmayı deneyin.
12. `/dashboard/teacher/license` sayfasında öğretmen profilindeki kota bilgilerinin okunduğunu kontrol edin.

Veli paneli:

1. `/dashboard/parent` sayfasını açın.
2. Haklar, RAM, BEP ve diğer rehber kartlarını kontrol edin.
3. Her kartın ilgili rehber sayfasına gittiğini doğrulayın.

Admin paneli:

1. Admin rolündeki kullanıcıyla `/dashboard/admin` sayfasını açın.
2. Kullanıcılar, paketler, materyaller ve destek talepleri kartlarından tablo önizleme sayfalarına gidin.
3. RLS nedeniyle görünmeyen kayıtlar varsa admin profil rolünün `admin` olduğunu doğrulayın.

## Eksikler ve Sonraki Aşama

- Belge kayıt geçmişi ve dosya depolama entegrasyonu.
- Öğrenci düzenleme/silme işlemleri ve detay ekranının canlı Supabase kaydından okunması.
- Admin CRUD ekranlarının genişletilmesi.
- AI tutanak servisinin gerçek API ile bağlanması.
- KVKK, açık rıza ve kullanım şartlarının hukuki metinlerle tamamlanması.

## Deploy Notu

Vercel üzerinde `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` değişkenlerini tanımlayın. Supabase SQL migration dosyasını proje veritabanında çalıştırın, ardından Next.js projesini standart Vercel akışıyla deploy edin.
