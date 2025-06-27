# BirdyBirdy Todo Uygulaması

Modern web teknolojilerini öğrenme sürecimde geliştirdiğim bir todo uygulaması. Bu proje, özellikle NestJS backend framework'ünü öğrenme amacıyla geliştirildi ve modern frontend teknolojilerini de içeriyor.

## Teknolojiler

### Frontend
- **Next.js**: React framework'ü üzerine kurulu, sayfa yönlendirme ve SSR özellikleri için
- **TypeScript**: Tip güvenliği ve daha iyi kod organizasyonu için
- **Tailwind CSS**: Modern ve responsive tasarım için
- **Framer Motion**: Akıcı animasyonlar ve geçişler için
- **React Hot Toast**: Kullanıcı bildirimleri için
- **JWT**: Kullanıcı kimlik doğrulama için

### Backend
- **NestJS**: Modern ve ölçeklenebilir backend mimarisi
- **MongoDB**: Veritabanı çözümü
- **JWT**: Token tabanlı kimlik doğrulama

## Özellikler

### Kullanıcı İşlemleri
- Kayıt olma ve giriş yapma
- JWT tabanlı oturum yönetimi
- Kullanıcıya özel todo listesi

### Todo İşlemleri
- Todo oluşturma, düzenleme ve silme
- Kategorilere göre todo'ları düzenleme
- Todo'ları tamamlandı/tamamlanmadı olarak işaretleme
- Aktif ve tamamlanan todo'ları ayrı listeleme

### Tasarım ve Kullanıcı Deneyimi
- Tam responsive tasarım
- Koyu/açık tema desteği
- Akıcı animasyonlar ve geçişler
- Kullanıcı dostu arayüz
- Modern ve minimal tasarım
- Toast bildirimleri ile kullanıcı etkileşimi

## Kurulum

1. Projeyi klonlayın
```bash
git clone [repo-url]
cd frontend
```

2. Bağımlılıkları yükleyin
```bash
pnpm install
```

3. Geliştirme sunucusunu başlatın
```bash
pnpm dev
```

4. Tarayıcınızda açın
```
http://localhost:3000
```

## Ortam Değişkenleri

`.env` dosyasında aşağıdaki değişkenleri tanımlayın:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Proje Yapısı

```
frontend/
├── components/         # Yeniden kullanılabilir bileşenler
├── pages/             # Sayfa bileşenleri
├── public/            # Statik dosyalar
├── styles/            # CSS dosyaları
└── types/             # TypeScript tip tanımlamaları
```

### Önemli Bileşenler

- `TodoCard`: Todo kartı bileşeni
- `TodoModal`: Yeni todo ekleme modalı
- `TodoSidebar`: Todo düzenleme kenar çubuğu
- `Navbar`: Gezinme ve tema değiştirme çubuğu
- `Layout`: Sayfa düzeni wrapper bileşeni

## Öğrenme Hedefleri

Bu proje, aşağıdaki teknolojileri ve konseptleri öğrenmek için geliştirildi:

### Backend (NestJS)
- MVC mimarisi
- Dependency Injection
- Decorators kullanımı
- MongoDB ile veritabanı işlemleri
- JWT implementasyonu
- REST API geliştirme

### Frontend
- Next.js ile sayfa yönlendirme
- TypeScript ile tip güvenli geliştirme
- Tailwind CSS ile modern tasarım
- Tema değiştirme implementasyonu
- Form validasyonları
- API entegrasyonu
- Animasyon ve geçişler

## Gelecek Özellikler

- [ ] Todo'lar için deadline ekleme
- [ ] Todo'ları sürükle-bırak ile sıralama
- [ ] Todo'ları paylaşma
- [ ] Takvim görünümü
- [ ] Bildirim sistemi
- [ ] Todo'lara dosya ekleme
- [ ] Etiket sistemi

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: X'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
