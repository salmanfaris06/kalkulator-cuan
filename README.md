# Kalkulator Cuan

Kalkulator Cuan adalah aplikasi kalkulator harga jual, HPP/modal per produk, margin, pajak, dan simulasi diskon untuk pelaku UMKM Indonesia.

Tujuan utamanya sederhana: membantu pemilik usaha menentukan harga jual yang aman dan menguntungkan tanpa spreadsheet rumit.

## Fitur Utama

- Kalkulator modal per produk / HPP
- Scan foto struk belanja untuk bantu mengisi bahan baku utama
- Perhitungan harga jual berbasis margin sejati
- Rekomendasi harga bulat untuk katalog
- Indikator kesehatan margin:
  - Belum dihitung
  - Untung tipis
  - Cukup aman
  - Sehat
  - Premium
- Simulasi pajak pembeli:
  - Tanpa pajak
  - PB1 10%
  - PPN 11%
  - Custom
- Simulasi diskon aman atau rugi
- Bantuan hitung biaya tenaga kerja
- Simpan produk ke localStorage
- Edit produk tersimpan dengan snapshot input lengkap
- Duplikat produk untuk membuat varian
- Salin ringkasan harga untuk WhatsApp
- Tab edukasi rumus HPP, margin, diskon, dan pajak
- Mobile bottom navigation
- Dark mode dengan preferensi tersimpan
- Clean static background untuk tampilan lebih profesional

## Tech Stack

- [Vite](https://vite.dev/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [lucide-react](https://lucide.dev/)
- [Vitest](https://vitest.dev/)

## Cara Menjalankan Lokal

Pastikan Node.js dan npm sudah terpasang.

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di local dev server Vite, biasanya:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev
```

Menjalankan development server.

```bash
npm run build
```

Menjalankan TypeScript build check dan membuat production build.

```bash
npm run preview
```

Preview hasil production build secara lokal.

```bash
npm run typecheck
```

Menjalankan TypeScript type checking.

```bash
npm test
```

Menjalankan unit test dengan Vitest.

## Struktur Proyek

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── BottomNav.tsx
│   ├── Header.tsx
│   ├── LaborModal.tsx
│   ├── ReceiptScanModal.tsx
│   ├── ResultPanel.tsx
│   ├── ThemeToggle.tsx
│   ├── tabs/
│   │   ├── CalculatorTab.tsx
│   │   ├── EducationTab.tsx
│   │   └── SavedTab.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Inputs.tsx
│       └── PushButton.tsx
├── lib/
│   ├── calculations.ts
│   ├── calculations.test.ts
│   ├── format.ts
│   ├── receiptOcr.ts
│   ├── receiptParsing.ts
│   └── receiptParsing.test.ts
├── store/
│   └── useMarginStore.ts
└── types/
    └── product.ts
```

## Logika Kalkulasi

Logika utama berada di:

```text
src/lib/calculations.ts
```

File ini berisi pure functions untuk:

- menghitung modal per produk / HPP
- menghitung harga jual ideal
- menghitung laba per produk
- menghitung pajak
- menghitung simulasi diskon
- membuat rekomendasi harga bulat
- menentukan status kesehatan margin
- menghitung bantuan biaya tenaga kerja

Unit test tersedia di:

```text
src/lib/calculations.test.ts
```

## Penyimpanan Data

Produk tersimpan disimpan di `localStorage` melalui Zustand persist dengan key:

```text
marginmate_products_tactile
```

Setiap produk baru menyimpan `formSnapshot`, sehingga saat diedit, rincian input seperti jumlah porsi, bahan baku, kemasan, tenaga kerja, dan biaya lainnya tetap muncul.

## Scan Struk OCR

Fitur scan struk menggunakan OCR client-side dengan Tesseract.js. Foto struk diproses di browser pengguna dan tidak dikirim ke server.

Untuk MVP, OCR hanya mencoba membaca total akhir struk. User tetap harus mengecek dan mengoreksi hasil scan sebelum dipakai untuk mengisi `Bahan Baku Utama`.

## Catatan Desain

Kalkulator Cuan menggunakan gaya visual tactile/playful:

- card rounded besar
- shadow tebal seperti tombol fisik
- warna brand biru, hijau, kuning, merah
- background statis yang clean agar terasa lebih profesional
- bottom nav khusus mobile
- tooltip icon-only pada desktop

Prinsip UX utama:

> Sederhana dulu, pintar saat dibutuhkan.

## Status

MVP aktif dalam pengembangan.

Fokus saat ini:

- pengalaman kalkulasi yang mudah untuk UMKM
- performa ringan
- UI mobile-first
- penyimpanan lokal tanpa backend

## Roadmap Ide Berikutnya

- Marketplace fee simulator
- Perbandingan channel jualan
- Search dan filter produk tersimpan
- Export / share ringkasan harga
- Mode sederhana dan mode lengkap
- Backup/sync data pengguna
