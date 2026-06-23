insert into public.law_contents (title, category, audience, content, status)
values
  ('Özel eğitim hakları', 'Veli Hakları', 'both', 'Özel eğitim hizmetleri eğitimsel değerlendirme, yerleştirme, destek eğitim ve okul içi uyarlama süreçlerini kapsar. Bu içerik bilgilendirme amaçlıdır.', 'published'),
  ('RAM süreci', 'RAM Süreçleri', 'both', 'RAM başvuru, değerlendirme, raporlama ve yönlendirme adımlarından oluşur. Kesin işlem için ilgili kurum duyuruları ve resmi mevzuat esas alınmalıdır.', 'published'),
  ('BEP süreci', 'BEP Mevzuatı', 'both', 'BEP, öğrencinin bireysel gereksinimlerine göre amaç, yöntem, materyal ve değerlendirme adımlarının planlandığı eğitim programıdır.', 'published'),
  ('Destek eğitim odası', 'Destek Eğitim Odası', 'both', 'Destek eğitim odası uygulamaları öğrencinin ihtiyacına, okul planlamasına ve resmi kararlara göre yürütülür.', 'published')
on conflict do nothing;

insert into public.materials (title, description, category, target_age, target_skill, status, is_premium)
values
  ('Okuma akıcılığı kartları', 'Hece, kelime ve kısa cümle çalışmaları için örnek materyal.', 'Okuma Yazma Materyalleri', '7-10', 'Okuma akıcılığı', 'approved', false),
  ('Dikkat ve eşleme çalışma sayfası', 'Görsel dikkat, yönerge takibi ve sınıflama becerileri için başlangıç materyali.', 'Dikkat Çalışmaları', '6-9', 'Dikkat', 'approved', false)
on conflict do nothing;
