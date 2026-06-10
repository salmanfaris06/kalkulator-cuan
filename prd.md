# Product Requirements Document (PRD)

## Produk
**Nama sementara:** Kalkulator Cuan  
**Kategori:** Micro SaaS untuk kalkulator harga jual, HPP, margin, dan simulasi profit UMKM  
**Target pasar:** UMKM mikro dan kecil di Indonesia, terutama penjual makanan/minuman, reseller, toko online, handmade product, jasa cetak, dan usaha rumahan.

---

# 1. Ringkasan Produk

Kalkulator Cuan adalah aplikasi sederhana berbasis web/mobile-friendly yang membantu pelaku UMKM menghitung harga jual ideal berdasarkan biaya produksi, biaya operasional, marketplace fee, diskon, pajak, ongkir, dan target margin.

Produk ini bertujuan mengurangi kesalahan umum UMKM dalam menentukan harga, seperti hanya menambahkan markup asal-asalan tanpa memperhitungkan biaya tersembunyi. Dengan aplikasi ini, pengguna dapat mengetahui:

- Harga jual minimum agar tidak rugi
- Harga jual ideal berdasarkan target margin
- Estimasi laba bersih per produk
- Dampak diskon terhadap profit
- Perbandingan harga jual antar channel, seperti offline, Shopee, Tokopedia, TikTok Shop, Instagram, dan WhatsApp

---

# 2. Latar Belakang Masalah

Banyak pelaku UMKM menentukan harga jual berdasarkan intuisi, harga kompetitor, atau rumus sederhana seperti “modal + sedikit untung”. Cara ini sering tidak memperhitungkan biaya tambahan, seperti:

- Biaya kemasan
- Biaya tenaga kerja
- Biaya listrik/gas/sewa
- Komisi marketplace
- Biaya admin pembayaran
- Diskon promo
- Produk gagal/rusak
- Pajak atau biaya layanan
- Ongkos kirim subsidi

Akibatnya, UMKM bisa merasa omzet naik, tetapi laba sebenarnya kecil atau bahkan rugi.

---

# 3. Tujuan Produk

## Tujuan utama
Membantu UMKM menentukan harga jual yang sehat, kompetitif, dan menguntungkan.

## Tujuan bisnis
- Mendapatkan pengguna berbayar dari segmen UMKM mikro dan kecil.
- Membangun produk SaaS sederhana dengan biaya operasional rendah.
- Menjadi alat harian untuk perhitungan harga, margin, dan promo.

## Tujuan pengguna
- Mengetahui harga jual minimum agar tidak rugi.
- Menentukan harga jual ideal dengan mudah.
- Memahami dampak diskon dan biaya marketplace terhadap laba.
- Membuat keputusan harga tanpa perlu spreadsheet rumit.

---

# 4. Target Pengguna

## Primary User Persona

### Persona 1: Pemilik Usaha Makanan Rumahan
- Usia: 25–45 tahun
- Produk: kue, frozen food, catering, minuman botol, snack
- Channel jualan: WhatsApp, Instagram, reseller, bazaar
- Pain point:
  - Sulit menghitung HPP per porsi
  - Bingung memasukkan biaya gas, listrik, dan kemasan
  - Sering memberi diskon tanpa tahu dampaknya ke profit

### Persona 2: Reseller / Seller Marketplace
- Usia: 20–40 tahun
- Produk: fashion, aksesoris, skincare, produk digital ringan
- Channel jualan: Shopee, Tokopedia, TikTok Shop, WhatsApp
- Pain point:
  - Komisi marketplace berbeda-beda
  - Bingung menghitung harga setelah voucher dan diskon
  - Sulit membandingkan laba antar channel

### Persona 3: UMKM Handmade / Custom Product
- Produk: hampers, kerajinan, sablon, merchandise, souvenir
- Pain point:
  - Ada biaya bahan dan tenaga kerja yang bervariasi
  - Harga tiap pesanan bisa berbeda
  - Butuh invoice atau ringkasan harga cepat untuk pelanggan

---

# 5. Problem Statement

Pelaku UMKM membutuhkan cara cepat dan sederhana untuk menghitung harga jual yang menguntungkan, tetapi sebagian besar masih menggunakan kalkulator manual, catatan kertas, atau spreadsheet yang tidak praktis. Mereka membutuhkan aplikasi yang mudah digunakan, murah, dan langsung memberi rekomendasi harga jual berdasarkan struktur biaya yang nyata.

---

# 6. Value Proposition

**“Hitung harga jual yang aman dan menguntungkan dalam kurang dari 1 menit.”**

Manfaat utama:
- Tidak perlu paham akuntansi
- Tidak perlu membuat spreadsheet sendiri
- Bisa menghitung laba setelah diskon dan biaya marketplace
- Bisa menyimpan template produk
- Bisa membandingkan harga jual antar channel
- Bisa menghasilkan rekomendasi harga jual otomatis

---

# 7. Ruang Lingkup Produk

## In Scope untuk MVP

1. Kalkulator HPP sederhana
2. Kalkulator harga jual berdasarkan target margin
3. Kalkulator diskon dan promo
4. Simulasi biaya marketplace
5. Simpan produk dan riwayat kalkulasi
6. Ringkasan profit per produk
7. Export hasil ke PDF atau gambar sederhana
8. Dashboard produk sederhana
9. Login pengguna
10. Paket gratis dan berbayar

## Out of Scope untuk MVP

1. Integrasi langsung dengan marketplace
2. Akuntansi lengkap
3. Stok/inventory management kompleks
4. POS/kasir
5. Payroll
6. Integrasi payment gateway
7. Multi-user team management lanjutan
8. AI pricing otomatis berbasis data kompetitor real-time

---

# 8. Fitur MVP

## 8.1 Kalkulator HPP

### Deskripsi
Pengguna memasukkan seluruh komponen biaya untuk membuat atau mendapatkan satu produk.

### Input
- Nama produk
- Jumlah produksi / jumlah unit
- Biaya bahan utama
- Biaya kemasan
- Biaya tenaga kerja
- Biaya operasional tambahan
- Biaya produk gagal/rusak
- Catatan tambahan

### Output
- Total biaya produksi
- HPP per unit
- Estimasi biaya cadangan

### Acceptance Criteria
- Pengguna dapat menghitung HPP per unit dari total biaya dan jumlah unit.
- Sistem menampilkan hasil dengan format rupiah.
- Sistem memberi peringatan jika jumlah unit kosong atau 0.
- Sistem dapat menyimpan hasil kalkulasi ke produk.

---

## 8.2 Kalkulator Harga Jual & Margin

### Deskripsi
Pengguna menentukan target margin atau markup, lalu sistem memberikan harga jual minimum dan harga jual ideal.

### Input
- HPP per unit
- Target margin laba bersih
- Target markup
- Biaya tambahan per transaksi
- Biaya marketplace atau payment fee

### Output
- Harga jual minimum
- Harga jual ideal
- Laba bersih per unit
- Persentase margin aktual

### Acceptance Criteria
- Pengguna dapat memilih mode margin atau markup.
- Sistem menghitung harga jual berdasarkan input biaya.
- Sistem menampilkan status: Rugi, Aman, atau Untung.
- Sistem memberi rekomendasi pembulatan harga, misalnya Rp19.900, Rp24.900, Rp29.000.

---

## 8.3 Simulasi Diskon dan Promo

### Deskripsi
Pengguna dapat menguji apakah sebuah diskon masih aman untuk profit.

### Input
- Harga jual normal
- Diskon persen atau nominal
- Biaya promo tambahan
- Subsidi ongkir

### Output
- Harga setelah diskon
- Laba setelah diskon
- Margin setelah diskon
- Status profit

### Acceptance Criteria
- Sistem menunjukkan peringatan jika diskon menyebabkan rugi.
- Sistem dapat memberi rekomendasi diskon maksimal agar tetap untung.
- Pengguna dapat membandingkan beberapa skenario diskon.

---

## 8.4 Simulasi Channel Penjualan

### Deskripsi
Pengguna dapat membandingkan profit dari beberapa channel penjualan.

### Channel awal
- Offline
- WhatsApp / Instagram DM
- Shopee
- Tokopedia
- TikTok Shop
- Custom channel

### Input
- Harga jual per channel
- Fee marketplace
- Fee pembayaran
- Biaya admin
- Biaya promo

### Output
- Profit per channel
- Margin per channel
- Channel paling menguntungkan

### Acceptance Criteria
- Pengguna dapat menambahkan minimal 3 channel dalam satu simulasi.
- Sistem menampilkan perbandingan dalam tabel sederhana.
- Sistem menandai channel dengan profit tertinggi.

---

## 8.5 Simpan Produk

### Deskripsi
Pengguna dapat menyimpan produk dan menggunakan ulang data biaya untuk kalkulasi berikutnya.

### Data produk
- Nama produk
- Kategori
- HPP
- Harga jual saat ini
- Target margin
- Channel penjualan
- Catatan

### Acceptance Criteria
- Pengguna dapat membuat, mengedit, dan menghapus produk.
- Pengguna dapat mencari produk berdasarkan nama.
- Pengguna dapat menduplikasi produk untuk variasi harga.

---

## 8.6 Export Hasil

### Deskripsi
Pengguna dapat membagikan hasil kalkulasi sebagai PDF atau gambar.

### Use case
- Simpan laporan pribadi
- Kirim ke partner bisnis
- Kirim ke reseller
- Lampirkan ke proposal harga

### Acceptance Criteria
- Pengguna dapat export ringkasan harga dalam format PDF atau PNG.
- Export berisi nama produk, HPP, harga jual, margin, dan catatan.
- File export memiliki tampilan sederhana dan mudah dibaca.

---

# 9. User Journey MVP

## Journey 1: Hitung harga produk baru
1. Pengguna login
2. Klik “Hitung Produk Baru”
3. Masukkan biaya bahan, kemasan, tenaga kerja, dan biaya lain
4. Masukkan jumlah produksi
5. Sistem menghitung HPP per unit
6. Pengguna memasukkan target margin
7. Sistem memberi rekomendasi harga jual
8. Pengguna menyimpan produk

## Journey 2: Cek diskon aman atau tidak
1. Pengguna memilih produk tersimpan
2. Klik “Simulasi Diskon”
3. Masukkan diskon 10%, 20%, atau nominal tertentu
4. Sistem menghitung laba setelah diskon
5. Sistem memberi status: Aman atau Rugi
6. Pengguna menyimpan skenario

## Journey 3: Bandingkan harga antar marketplace
1. Pengguna memilih produk
2. Klik “Bandingkan Channel”
3. Masukkan fee tiap channel
4. Sistem menampilkan profit bersih per channel
5. Pengguna menentukan harga jual berbeda untuk tiap channel

---

# 10. Functional Requirements

## Akun & Login
- Pengguna dapat daftar menggunakan email/password.
- Pengguna dapat login dan logout.
- Pengguna dapat reset password.

## Produk
- Pengguna dapat membuat produk.
- Pengguna dapat mengedit produk.
- Pengguna dapat menghapus produk.
- Pengguna dapat menduplikasi produk.
- Pengguna dapat melihat daftar produk.

## Kalkulasi
- Sistem dapat menghitung HPP per unit.
- Sistem dapat menghitung harga jual berdasarkan margin.
- Sistem dapat menghitung harga jual berdasarkan markup.
- Sistem dapat menghitung profit setelah diskon.
- Sistem dapat menghitung fee marketplace.
- Sistem dapat membandingkan beberapa channel.

## Export
- Pengguna dapat export hasil kalkulasi.
- Pengguna dapat membagikan hasil dalam format file.

## Subscription
- Sistem membatasi jumlah produk untuk pengguna gratis.
- Sistem membuka fitur lanjutan untuk pengguna berbayar.

---

# 11. Non-Functional Requirements

## Performance
- Halaman kalkulator harus terbuka dalam kurang dari 3 detik pada koneksi mobile standar.
- Kalkulasi harus terasa instan setelah input berubah.

## Usability
- Aplikasi harus mobile-first.
- Input harus sederhana dan tidak terasa seperti software akuntansi.
- Bahasa utama: Bahasa Indonesia.
- Istilah akuntansi harus dijelaskan dengan tooltip sederhana.

## Security
- Password harus disimpan dengan hashing yang aman.
- Data pengguna hanya dapat diakses oleh pemilik akun.
- Export file tidak boleh dapat diakses publik tanpa izin.

## Reliability
- Data kalkulasi tersimpan otomatis atau dengan tombol simpan yang jelas.
- Sistem harus mencegah kehilangan data saat refresh halaman.

---

# 12. Formula Dasar

## HPP per unit
```text
HPP per unit = Total biaya produksi / Jumlah unit produksi
```

## Laba bersih per unit
```text
Laba bersih = Harga jual - HPP - Biaya tambahan - Fee marketplace - Biaya promo
```

## Margin laba
```text
Margin = (Laba bersih / Harga jual) x 100%
```

## Markup
```text
Markup = (Laba bersih / HPP) x 100%
```

## Harga jual berdasarkan target margin
```text
Harga jual = Total biaya / (1 - Target margin)
```

Contoh:  
Total biaya = Rp10.000  
Target margin = 30%  
Harga jual = 10.000 / (1 - 0,30) = Rp14.286

---

# 13. Pricing Strategy

## Free Plan
Harga: Rp0

Fitur:
- Maksimal 5 produk
- Kalkulator HPP
- Kalkulator margin dasar
- Simulasi diskon dasar

## Starter Plan
Harga: Rp29.000/bulan

Fitur:
- Maksimal 50 produk
- Simulasi channel penjualan
- Export PDF/PNG
- Riwayat kalkulasi
- Rekomendasi pembulatan harga

## Pro Plan
Harga: Rp79.000/bulan

Fitur:
- Produk unlimited
- Template biaya per kategori usaha
- Perbandingan multi-channel lanjutan
- Laporan profit sederhana
- Branding pada export

---

# 14. Metrics / KPI

## Acquisition
- Jumlah signup baru per minggu
- Conversion rate dari landing page ke signup
- Cost per acquisition

## Activation
- Persentase pengguna yang menyelesaikan kalkulasi pertama
- Persentase pengguna yang menyimpan produk pertama
- Waktu dari signup ke kalkulasi pertama

## Engagement
- Jumlah kalkulasi per pengguna per minggu
- Jumlah produk tersimpan per pengguna
- Jumlah simulasi diskon per pengguna

## Revenue
- Free-to-paid conversion rate
- Monthly recurring revenue
- Churn rate
- Average revenue per user

## Retention
- Day-7 retention
- Day-30 retention
- Pengguna yang kembali menghitung ulang produk

---

# 15. MVP Success Criteria

MVP dianggap berhasil jika dalam 8–12 minggu setelah launch:

- 1.000 pengguna mendaftar
- 40% pengguna menyelesaikan kalkulasi pertama
- 25% pengguna menyimpan minimal 1 produk
- 5% pengguna gratis berubah menjadi berbayar
- Minimal 50 pelanggan berbayar aktif
- Churn bulanan di bawah 10% untuk pelanggan berbayar awal

---

# 16. Risiko Produk

## Risiko 1: Pengguna tidak paham istilah margin dan markup
Mitigasi:
- Gunakan bahasa sederhana
- Tambahkan tooltip
- Tampilkan contoh otomatis
- Gunakan label seperti “Untung dari harga jual” dan “Naik dari modal”

## Risiko 2: UMKM merasa cukup dengan kalkulator biasa
Mitigasi:
- Fokus pada fitur simpan produk, simulasi diskon, dan marketplace fee
- Buat hasil visual yang mudah dibagikan
- Sediakan template per jenis usaha

## Risiko 3: Harga subscription terlalu mahal
Mitigasi:
- Mulai dari harga rendah
- Sediakan annual plan murah
- Beri free plan yang tetap berguna

## Risiko 4: Perhitungan dianggap rumit
Mitigasi:
- Default mode dibuat sederhana
- Advanced cost bisa disembunyikan
- Berikan rekomendasi otomatis

---

# 17. Roadmap

## Phase 1: MVP
Durasi: 4–6 minggu

Fitur:
- Login
- Kalkulator HPP
- Kalkulator margin
- Simulasi diskon
- Simpan produk
- Dashboard sederhana

## Phase 2: Monetization
Durasi: 2–4 minggu setelah MVP

Fitur:
- Subscription
- Limit free plan
- Export PDF/PNG
- Rekomendasi pembulatan harga

## Phase 3: Advanced UMKM Tools
Durasi: 2–3 bulan setelah launch

Fitur:
- Template usaha makanan, reseller, jasa, handmade
- Simulasi marketplace lanjutan
- Laporan profit sederhana
- Import CSV

## Phase 4: AI Assistant
Durasi: setelah validasi berbayar

Fitur:
- Saran harga otomatis
- Analisis diskon aman
- Penjelasan kenapa margin turun
- Rekomendasi strategi harga

---

# 18. Wireframe Konseptual

## Halaman Dashboard
- Ringkasan jumlah produk
- Produk dengan margin tertinggi
- Produk dengan margin terendah
- Tombol “Hitung Produk Baru”
- Daftar produk terakhir

## Halaman Kalkulator
Bagian input:
- Nama produk
- Jumlah produksi
- Biaya bahan
- Biaya kemasan
- Biaya tenaga kerja
- Biaya lain
- Target margin

Bagian output:
- HPP per unit
- Harga jual minimum
- Harga jual ideal
- Profit per unit
- Margin aktual
- Status: Rugi / Aman / Untung

## Halaman Simulasi Diskon
- Pilih produk
- Harga jual normal
- Input diskon
- Input biaya promo
- Hasil laba setelah diskon
- Diskon maksimal yang aman

---

# 19. Data Model Awal

## User
- id
- name
- email
- password_hash
- subscription_plan
- created_at

## Product
- id
- user_id
- name
- category
- production_quantity
- material_cost
- packaging_cost
- labor_cost
- operational_cost
- waste_cost
- hpp_per_unit
- current_price
- target_margin
- created_at
- updated_at

## CalculationScenario
- id
- user_id
- product_id
- scenario_type
- selling_price
- discount_value
- discount_type
- marketplace_fee
- payment_fee
- promo_cost
- net_profit
- margin_percentage
- created_at

---

# 20. Open Questions

1. Apakah produk akan fokus dulu ke F&B atau semua jenis UMKM?
2. Apakah perlu aplikasi mobile native atau cukup web responsive?
3. Apakah export PDF penting untuk MVP pertama?
4. Apakah pengguna perlu bisa memasukkan biaya dalam bentuk persentase dan nominal?
5. Apakah ingin ada fitur template HPP khusus, misalnya “produk makanan”, “reseller”, dan “jasa”?
6. Apakah model bisnis paling cocok subscription bulanan atau sekali bayar?

---

# 21. Rekomendasi Strategi MVP

Untuk validasi awal, produk sebaiknya tidak langsung dibuat terlalu kompleks. MVP paling kecil yang layak diuji adalah:

1. Kalkulator HPP
2. Kalkulator harga jual berdasarkan margin
3. Simulasi diskon aman/rugi
4. Simpan maksimal 5 produk
5. Export/share hasil sederhana

Target validasi awal:
- 50–100 UMKM mencoba produk
- 20 UMKM menggunakan lebih dari satu kali
- 5–10 UMKM bersedia membayar Rp29.000/bulan

Fokus utama bukan sekadar membuat kalkulator, tetapi membuktikan bahwa UMKM benar-benar membutuhkan alat yang bisa dipakai berulang untuk mengambil keputusan harga.

