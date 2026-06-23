export type DocumentDraftInput = Record<string, string> & {
  documentType: string;
};

export type DocumentField = {
  name: string;
  label: string;
  section?: string;
  type?: "text" | "date" | "textarea";
  required?: boolean;
};

const basicDocumentFields: DocumentField[] = [
  { name: "studentName", label: "Öğrenci adı soyadı", required: true },
  { name: "teacherName", label: "Öğretmen adı soyadı" },
  { name: "purpose", label: "Belge amacı" },
  { name: "notes", label: "Kısa notlar", type: "textarea" }
];

const meetingFields: DocumentField[] = [
  { name: "meetingTitle", label: "Toplantı başlığı", section: "Toplantı Bilgileri", required: true },
  { name: "meetingDate", label: "Toplantı tarihi", section: "Toplantı Bilgileri", type: "date" },
  { name: "meetingPlace", label: "Toplantı yeri", section: "Toplantı Bilgileri" },
  { name: "participants", label: "Katılımcılar", section: "Toplantı Bilgileri", type: "textarea" },
  { name: "agenda", label: "Gündem maddeleri", section: "İçerik", type: "textarea" },
  { name: "decisions", label: "Alınan kararlar", section: "İçerik", type: "textarea" },
  { name: "followUp", label: "Takip edilecek işler", section: "İçerik", type: "textarea" }
];

const parentInterviewFields: DocumentField[] = [
  { name: "studentName", label: "Öğrenci adı soyadı", section: "Görüşme Bilgileri", required: true },
  { name: "parentName", label: "Veli adı soyadı", section: "Görüşme Bilgileri" },
  { name: "teacherName", label: "Görüşmeyi yapan öğretmen", section: "Görüşme Bilgileri" },
  { name: "interviewDate", label: "Görüşme tarihi", section: "Görüşme Bilgileri", type: "date" },
  { name: "interviewMethod", label: "Görüşme yöntemi", section: "Görüşme Bilgileri" },
  { name: "interviewReason", label: "Görüşme nedeni", section: "İçerik", type: "textarea" },
  { name: "familyFeedback", label: "Veli görüş ve gözlemleri", section: "İçerik", type: "textarea" },
  { name: "teacherNotes", label: "Öğretmen notları", section: "İçerik", type: "textarea" },
  { name: "decisions", label: "Alınan kararlar / öneriler", section: "Sonuç", type: "textarea" }
];

const observationFields: DocumentField[] = [
  { name: "studentName", label: "Öğrenci adı soyadı", section: "Gözlem Bilgileri", required: true },
  { name: "observerName", label: "Gözlem yapan", section: "Gözlem Bilgileri" },
  { name: "observationDate", label: "Gözlem tarihi", section: "Gözlem Bilgileri", type: "date" },
  { name: "environment", label: "Gözlem ortamı", section: "Gözlem Bilgileri" },
  { name: "academicObservation", label: "Akademik becerilere ilişkin gözlem", section: "Gözlem Alanları", type: "textarea" },
  { name: "socialObservation", label: "Sosyal iletişim ve etkileşim", section: "Gözlem Alanları", type: "textarea" },
  { name: "behaviorObservation", label: "Davranış ve dikkat gözlemleri", section: "Gözlem Alanları", type: "textarea" },
  { name: "recommendations", label: "Öneriler", section: "Sonuç", type: "textarea" }
];

const progressReportFields: DocumentField[] = [
  { name: "studentName", label: "Öğrenci adı soyadı", section: "Rapor Bilgileri", required: true },
  { name: "teacherName", label: "Öğretmen adı soyadı", section: "Rapor Bilgileri" },
  { name: "reportPeriod", label: "Rapor dönemi", section: "Rapor Bilgileri" },
  { name: "targetSkills", label: "Çalışılan beceri ve kazanımlar", section: "Gelişim", type: "textarea" },
  { name: "progress", label: "Gözlenen ilerleme", section: "Gelişim", type: "textarea" },
  { name: "needs", label: "Desteklenmesi gereken alanlar", section: "Gelişim", type: "textarea" },
  { name: "familySuggestions", label: "Aileye öneriler", section: "Öneriler", type: "textarea" },
  { name: "nextSteps", label: "Sonraki dönem planı", section: "Öneriler", type: "textarea" }
];

const bepDocumentFields: DocumentField[] = [
  { name: "studentName", label: "Adı soyadı", section: "Öğrenci Bilgileri", required: true },
  { name: "schoolName", label: "Okulu", section: "Öğrenci Bilgileri" },
  { name: "studentNumber", label: "Okul numarası", section: "Öğrenci Bilgileri" },
  { name: "gradeLevel", label: "Sınıfı", section: "Öğrenci Bilgileri" },
  { name: "birthDate", label: "Doğum tarihi", section: "Öğrenci Bilgileri", type: "date" },
  { name: "placementDecision", label: "İl/ilçe özel eğitim hizmetleri yerleştirme kurul kararı", section: "Öğrenci Bilgileri", type: "textarea" },
  { name: "diagnosisInfo", label: "Özel eğitim ihtiyacına yönelik eğitsel tanı", section: "Öğrenci Bilgileri", type: "textarea" },
  { name: "previousSupport", label: "Daha önce aldığı destek eğitim hizmetleri ve süresi", section: "Öğrenci Bilgileri", type: "textarea" },
  { name: "currentSupport", label: "Almakta olduğu okul dışı destek eğitim hizmetleri ve süresi", section: "Öğrenci Bilgileri", type: "textarea" },
  { name: "assistiveDevices", label: "Kullandığı destek materyalleri/cihazlar", section: "Öğrenci Bilgileri", type: "textarea" },
  { name: "healthInfo", label: "Önemli sağlık bilgileri", section: "Öğrenci Bilgileri", type: "textarea" },
  { name: "environmentArrangements", label: "Eğitim ortamına ilişkin düzenlemeler", section: "Öğrenci Bilgileri", type: "textarea" },
  { name: "bepStartDate", label: "BEP başlangıç tarihi", section: "Öğrenci Bilgileri", type: "date" },
  { name: "bepEndDate", label: "BEP bitiş tarihi", section: "Öğrenci Bilgileri", type: "date" },
  { name: "motherName", label: "Anne adı soyadı", section: "Aile ile İlgili Bilgiler" },
  { name: "fatherName", label: "Baba adı soyadı", section: "Aile ile İlgili Bilgiler" },
  { name: "guardianName", label: "Veli/Vasi adı soyadı", section: "Aile ile İlgili Bilgiler" },
  { name: "guardianPhone", label: "Telefon", section: "Aile ile İlgili Bilgiler" },
  { name: "homeAddress", label: "Ev adresi", section: "Aile ile İlgili Bilgiler", type: "textarea" },
  { name: "workAddress", label: "İş adresi", section: "Aile ile İlgili Bilgiler", type: "textarea" },
  { name: "developmentStory", label: "Öğrencinin gelişim öyküsü", section: "Eğitsel Performans Formu", type: "textarea" },
  { name: "developmentArea", label: "Gelişim alanı / ders adı", section: "Eğitsel Performans Formu" },
  { name: "performanceLevel", label: "Performans düzeyi", section: "Eğitsel Performans Formu", type: "textarea" },
  { name: "behaviorProblem", label: "Varsa davranış problemini tanımlayınız", section: "Eğitsel Performans Formu", type: "textarea" },
  { name: "longTermGoals", label: "Uzun dönemli amaçlar", section: "Bireyselleştirilmiş Eğitim Planı", type: "textarea" },
  { name: "shortTermGoals", label: "Kısa dönemli amaçlar", section: "Bireyselleştirilmiş Eğitim Planı", type: "textarea" },
  { name: "criteria", label: "Ölçüt", section: "Bireyselleştirilmiş Eğitim Planı" },
  { name: "methods", label: "Yöntem ve teknik", section: "Bireyselleştirilmiş Eğitim Planı", type: "textarea" },
  { name: "materials", label: "Kullanılacak materyaller", section: "Bireyselleştirilmiş Eğitim Planı", type: "textarea" },
  { name: "evaluationMethods", label: "Ölçme-değerlendirme yöntemleri", section: "Bireyselleştirilmiş Eğitim Planı", type: "textarea" },
  { name: "schoolServices", label: "Okul içi diğer eğitim hizmetleri", section: "BEP Geliştirme Birimi Kararları", type: "textarea" },
  { name: "familyInfoFrequency", label: "Aile hangi sıklıkla bilgilendirilecek?", section: "BEP Geliştirme Birimi Kararları" },
  { name: "familyInfoMethod", label: "Aile hangi yolla bilgilendirilecek?", section: "BEP Geliştirme Birimi Kararları" },
  { name: "familyTraining", label: "Aile eğitimi yapılacak mı? Hangi yolla?", section: "BEP Geliştirme Birimi Kararları", type: "textarea" },
  { name: "otherDecisions", label: "Diğer kararlar", section: "BEP Geliştirme Birimi Kararları", type: "textarea" },
  { name: "nextMeetingDate", label: "Bir sonraki BEP toplantı tarihi", section: "BEP Geliştirme Birimi Kararları", type: "date" },
  { name: "generalEvaluation", label: "Genel BEP değerlendirmesi", section: "Genel BEP Değerlendirmesi", type: "textarea" },
  { name: "unitMembers", label: "BEP geliştirme birimi üyeleri", section: "BEP Geliştirme Birimi Üyeleri", type: "textarea" },
  { name: "principalName", label: "Okul müdürü", section: "BEP Geliştirme Birimi Üyeleri" }
];

export function isBepDocument(documentType: string) {
  return documentType.toLocaleLowerCase("tr").includes("bep");
}

function includesAny(documentType: string, values: string[]) {
  const normalized = documentType.toLocaleLowerCase("tr");
  return values.some((item) => normalized.includes(item));
}

export function getDocumentFields(documentType: string) {
  if (isBepDocument(documentType)) return bepDocumentFields;
  if (includesAny(documentType, ["veli görüşme"])) return parentInterviewFields;
  if (includesAny(documentType, ["gözlem"])) return observationFields;
  if (includesAny(documentType, ["zümre", "tutanak", "toplantı"])) return meetingFields;
  if (includesAny(documentType, ["gelişim raporu"])) return progressReportFields;
  return basicDocumentFields;
}

function value(input: DocumentDraftInput, name: string, fallback = "................................") {
  return input[name]?.trim() || fallback;
}

export function generateDocumentPreview(input: DocumentDraftInput) {
  if (isBepDocument(input.documentType)) return generateBepPreview(input);
  if (includesAny(input.documentType, ["veli görüşme"])) return generateParentInterviewPreview(input);
  if (includesAny(input.documentType, ["gözlem"])) return generateObservationPreview(input);
  if (includesAny(input.documentType, ["zümre", "tutanak", "toplantı"])) return generateMeetingPreview(input);
  if (includesAny(input.documentType, ["gelişim raporu"])) return generateProgressReportPreview(input);

  return {
    title: input.documentType,
    content: `${input.documentType}

Öğrenci: ${value(input, "studentName", "Örnek öğrenci")}
Öğretmen: ${value(input, "teacherName", "Örnek öğretmen")}
Amaç: ${value(input, "purpose", "Belge sürecini yapılandırmak")}

Notlar:
${value(input, "notes", "Bu alan form verilerine göre otomatik belge önizlemesi üretmek için hazırlanmıştır.")}`,
    exportReady: true
  };
}

function generateParentInterviewPreview(input: DocumentDraftInput) {
  return {
    title: input.documentType,
    exportReady: true,
    content: `${input.documentType}

Öğrenci: ${value(input, "studentName")}
Veli: ${value(input, "parentName")}
Görüşmeyi yapan öğretmen: ${value(input, "teacherName")}
Görüşme tarihi: ${value(input, "interviewDate")}
Görüşme yöntemi: ${value(input, "interviewMethod")}

Görüşme Nedeni
${value(input, "interviewReason")}

Veli Görüş ve Gözlemleri
${value(input, "familyFeedback")}

Öğretmen Notları
${value(input, "teacherNotes")}

Alınan Kararlar / Öneriler
${value(input, "decisions")}

Not: Bu form bilgilendirme ve eğitimsel takip amacıyla hazırlanmıştır.`
  };
}

function generateObservationPreview(input: DocumentDraftInput) {
  return {
    title: input.documentType,
    exportReady: true,
    content: `${input.documentType}

Öğrenci: ${value(input, "studentName")}
Gözlem yapan: ${value(input, "observerName")}
Gözlem tarihi: ${value(input, "observationDate")}
Gözlem ortamı: ${value(input, "environment")}

Akademik Becerilere İlişkin Gözlem
${value(input, "academicObservation")}

Sosyal İletişim ve Etkileşim
${value(input, "socialObservation")}

Davranış ve Dikkat Gözlemleri
${value(input, "behaviorObservation")}

Öneriler
${value(input, "recommendations")}`
  };
}

function generateMeetingPreview(input: DocumentDraftInput) {
  return {
    title: input.documentType,
    exportReady: true,
    content: `${input.documentType}

Toplantı başlığı: ${value(input, "meetingTitle", input.documentType)}
Tarih: ${value(input, "meetingDate")}
Yer: ${value(input, "meetingPlace")}

Katılımcılar
${value(input, "participants")}

Gündem Maddeleri
${value(input, "agenda")}

Alınan Kararlar
${value(input, "decisions")}

Takip Edilecek İşler
${value(input, "followUp")}

İmza
Katılımcılar tarafından imza altına alınmıştır.`
  };
}

function generateProgressReportPreview(input: DocumentDraftInput) {
  return {
    title: input.documentType,
    exportReady: true,
    content: `${input.documentType}

Öğrenci: ${value(input, "studentName")}
Öğretmen: ${value(input, "teacherName")}
Rapor dönemi: ${value(input, "reportPeriod")}

Çalışılan Beceri ve Kazanımlar
${value(input, "targetSkills")}

Gözlenen İlerleme
${value(input, "progress")}

Desteklenmesi Gereken Alanlar
${value(input, "needs")}

Aileye Öneriler
${value(input, "familySuggestions")}

Sonraki Dönem Planı
${value(input, "nextSteps")}`
  };
}

function generateBepPreview(input: DocumentDraftInput) {
  return {
    title: "Bireyselleştirilmiş Eğitim Programı (BEP) Dosyası",
    exportReady: true,
    content: `BİREYSELLEŞTİRİLMİŞ EĞİTİM PROGRAMI DOSYASI

ÖĞRENCİNİN
Adı Soyadı: ${value(input, "studentName")}
Okulu: ${value(input, "schoolName")}
Numarası: ${value(input, "studentNumber")}

1. Öğrenci Bilgileri
Sınıfı: ${value(input, "gradeLevel")}
Doğum tarihi: ${value(input, "birthDate")}
İl/ilçe özel eğitim hizmetleri yerleştirme kurul kararı:
${value(input, "placementDecision")}

Özel eğitim ihtiyacına yönelik aldığı eğitsel tanı:
${value(input, "diagnosisInfo")}

Daha önce aldığı okul içi ve okul dışı destek eğitim hizmetleri ve süresi:
${value(input, "previousSupport")}

Almakta olduğu okul dışı destek eğitim hizmetleri ve süresi:
${value(input, "currentSupport")}

Kullandığı destek materyalleri/cihazlar:
${value(input, "assistiveDevices")}

Önemli sağlık bilgileri:
${value(input, "healthInfo")}

Eğitim ortamına ilişkin düzenlemeler:
${value(input, "environmentArrangements")}

BEP Başlangıç Tarihi: ${value(input, "bepStartDate")}
BEP Bitiş Tarihi: ${value(input, "bepEndDate")}

2. Aile ile İlgili Bilgiler
Anne: ${value(input, "motherName")}
Baba: ${value(input, "fatherName")}
Veli/Vasi: ${value(input, "guardianName")}
Telefon: ${value(input, "guardianPhone")}
Ev Adresi: ${value(input, "homeAddress")}
İş Adresi: ${value(input, "workAddress")}

3. Eğitsel Performans Formu
Öğrencinin Gelişim Öyküsü:
${value(input, "developmentStory")}

Gelişim Alanı/Ders: ${value(input, "developmentArea")}
Performans Düzeyi:
${value(input, "performanceLevel")}

Varsa davranış problemini tanımlayınız:
${value(input, "behaviorProblem")}

4. Bireyselleştirilmiş Eğitim Planı
Uzun Dönemli Amaçlar:
${value(input, "longTermGoals")}

Kısa Dönemli Amaçlar:
${value(input, "shortTermGoals")}

Ölçüt: ${value(input, "criteria", "Örn. 5 denemenin 4'ünde başarılı olma (%80)")}
Yöntem ve Teknik:
${value(input, "methods")}

Kullanılacak Materyaller:
${value(input, "materials")}

Ölçme-Değerlendirme:
${value(input, "evaluationMethods")}

5. BEP Geliştirme Birimi Kararları
Okul içi diğer eğitim hizmetleri:
${value(input, "schoolServices")}

Aile bilgilendirme sıklığı: ${value(input, "familyInfoFrequency")}
Aile bilgilendirme yolu: ${value(input, "familyInfoMethod")}
Aile eğitimi:
${value(input, "familyTraining")}

Diğer kararlar:
${value(input, "otherDecisions")}

Bir sonraki BEP geliştirme birimi toplantı tarihi: ${value(input, "nextMeetingDate")}

6. Genel BEP Değerlendirmesi
${value(input, "generalEvaluation")}

7. BEP Geliştirme Birimi Üyeleri
${value(input, "unitMembers", "Müdür/Müdür Yardımcısı, veli/vasi, sınıf öğretmeni, alan öğretmenleri, rehber öğretmen ve ilgili diğer üyeler")}

Uygundur
Okul Müdürü: ${value(input, "principalName")}

Not: Bu belge örnek BEP Word dosyasındaki ana bölüm yapısı esas alınarak hazırlanmıştır. Sistem tanı koymaz, tedavi önermez ve kesin hukuki karar üretmez.`
  };
}
