# 🎓 YEARLOG – Online Mezuniyet Yıllığı Platformu

Bu proje, [Web Tabanlı Uygulama Programlama] dersi kapsamında geliştirilmiş **online öğrenci mezuniyet sitesi** uygulamasıdır. Öğrenciler veya arkadaş grupları kendi sınıflarına özel dijital yıllıklar oluşturabilir, anılarını paylaşabilir ve çıktısını PDF olarak alabilir.

## 📌 Özellikler

✅ Grup/Sınıf adına giriş yapılabilir  
✅ Her grup için ayrı yıllık kartları oluşturulabilir  
✅ Öğrenciler için:
- Ad, soyad, lakap, not, en sevdiği ders gibi bilgiler
- Fotoğraf ve isteğe bağlı video yükleme 
✅ Kartları favorilere ekleme / güncelleme / silme  
✅ PDF çıktısı: Her öğrenci için ayrı sayfa  
✅ Tamamen responsive (mobil uyumlu) tasarım  
✅ Firebase, localStorage gibi sistemlerle veri saklama (şu an frontend odaklıdır)

NASIL YAPILDI 
Projede kodlama işlemleri için Visual Studio Code (VS Code) entegre geliştirme ortamı (IDE) tercih edilmiştir. Bu ortam sayesinde HTML, CSS ve JavaScript dosyaları organize bir şekilde yazılmış; eklentiler yardımıyla hata kontrolü, canlı sunum ve hızlı geliştirme imkanı sağlanmıştır. Ayrıca Pycharm yerel sunucu özelliğinden dolayı tercih edilmiştir. Son dokunuşlar VSC ve Pycharm üzerinden eş zamanlı gerçekleşmiştir.
Projenin backend tarafı için sunucusuz bir çözüm olan Firebase altyapısı kullanılmıştır. Aşağıdaki Firebase servislerinden yararlanılmıştır:
•	Firebase Authentication: Kullanıcı kayıt, giriş, çıkış ve oturum takibi için.
•	Firestore Database: Yıllık bilgileri ve kullanıcı verilerinin depolanması için.
Bu sayede geleneksel backend kurulumu yapılmadan, modern bir uygulama oluşturulmuştur.

PROJE SAYFALARI VE İŞLEVLERİ
1. index.html — Ana Giriş Sayfası
Kullanıcıyı karşılayan ilk sayfadır. Giriş yapmamış kullanıcıların kayıt olmasını veya giriş yapmasını teşvik eder. Navigasyon çubuğu sayesinde içeriklere yönlendirme yapılır.
 2. register.html — Kayıt Sayfası
Yeni kullanıcıların e-posta ve şifre ile kaydolmasını sağlayan form yapısı içerir. Form gönderimi, main.js üzerinden Firebase Authentication ile gerçekleştirilir.
 3. login.html — Giriş Sayfası
Sisteme daha önce kaydolmuş kullanıcıların oturum açtığı sayfadır. Kullanıcı bilgileri doğrulandıktan sonra yönlendirme yapılır. Giriş işlemleri yine main.js ile gerçekleştirilir.
 4. create.html — Yıllık Oluşturma Sayfası
Kullanıcıların ad, soyad, fotoğraf, mesaj gibi bilgileri girerek kendi dijital yıllıklarını oluşturabildiği sayfadır. Girilen veriler main.js aracılığıyla Firestore veritabanına kaydedilir.
 5. yearbookList.html — Yıllık Listeleme Sayfası
Tüm kullanıcı yıllıklarının listelendiği sayfadır. Firestore'dan dinamik olarak veri çekilerek kullanıcıların oluşturduğu içerikler görsel olarak burada listelenir.


 
6. favorites.html — Favori Yıllıklar Sayfası
Kullanıcının beğendiği yıllıkları favorilere ekleyerek daha sonra tekrar görüntülemesini sağlayan sayfadır. Sayfa, kullanıcıya ait favori yıllık kayıtlarını Firestore’dan çeker ve görsel kartlar hâlinde listeler.
•	favorites.js: Bu sayfaya özel JavaScript dosyasıdır. Favori verilerini Firebase üzerinden çeker, DOM üzerine yerleştirir ve kullanıcıya özel liste sunar. Ayrıca kullanıcıya başarı/bilgi mesajları (toast) göstermek için etkileşimli görseller içerir.
 7. profil.html — Profil Sayfası
Kullanıcının kendi profil bilgilerini görüntüleyebileceği, gerektiğinde düzenleyebileceği bir sayfadır. Oturum açan kullanıcıya özel veriler gösterilir.
•	profil.js: Kullanıcının Firebase’de saklanan profil verilerini çeken ve bu verileri arayüzde görüntüleyen JavaScript dosyasıdır. Ayrıca oturum doğrulama kontrolü ve kullanıcıya özel içerik filtreleme işlemleri içerir.
main.js — Ana JavaScript Dosyası
Tüm HTML sayfalarının dinamik işlevlerini yöneten ana betik dosyasıdır. Başlıca işlevleri şunlardır:
•	Firebase Authentication ile kullanıcı kayıt/giriş/çıkış işlemleri
•	Firestore veritabanına veri ekleme ve çekme işlemleri
•	Sayfa yönlendirmeleri
•	Form doğrulama ve hata yönetimi
•	Oturum kontrolü ve güvenlik (örneğin: login olmadan create.html'e erişimi engelleme)
Bu dosya sayesinde projenin tamamı tek bir merkezden kontrol edilmekte, bu da kod tekrarını azaltmakta ve bakım kolaylığı sağlamaktadır.
 style.css — Stil Dosyası
Tüm sayfalarda ortak olarak kullanılan CSS stil dosyasıdır. Görsel bütünlük ve kullanıcı deneyimi açısından kritik rol oynar. Başlıca özellikleri:
•	Sayfa düzeni ve hizalama (flexbox ve grid kullanımı)
•	Renk temaları ve yazı tipi ayarları
•	Responsive (mobil uyumlu) yapı
•	Buton, form ve başlık tasarımları

SONUÇ
Bu proje, modern web teknolojilerini kullanarak kullanıcıların dijital ortamda etkileşimli bir yıllık deneyimi yaşamalarını sağlar. Gerek frontend tasarımı gerekse backend servisleriyle, kullanıcıya güvenli ve sorunsuz bir kullanım sunar.
