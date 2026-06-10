import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

const educationCards = [
  {
    step: 1,
    title: "Modal per Unit (HPP)",
    summary: "Batas aman paling bawah sebelum produk mulai rugi.",
    color: "bg-mm-yellow",
    formula: "HPP = (Bahan + Kemasan + Tenaga Kerja + Lainnya) ÷ Porsi",
    example: "Contoh: Rp100.000 ÷ 10 porsi = Rp10.000 / unit",
    body: (
      <>
        <h4 className="font-extrabold text-mm-ink mb-2 text-base sm:text-lg">💡 Kenapa penting?</h4>
        <p className="text-mm-muted font-bold text-sm sm:text-lg leading-relaxed">
          HPP (Harga Pokok Penjualan) adalah garis batas bawah alias “nyawa” bisnismu.
          Banyak UMKM rugi karena <strong>menganggap tenaga sendiri itu gratis</strong> atau lupa
          menghitung biaya tak terlihat seperti gas dan listrik. Kalau kamu jual di bawah HPP,
          kamu bukan lagi jualan, tapi sedekah!
        </p>
      </>
    ),
  },
  {
    step: 2,
    title: "Harga Jual Ideal",
    summary: "Margin sejati dihitung dari harga jual akhir, bukan markup modal.",
    color: "bg-mm-green",
    formula: "Harga Jual = Modal ÷ (1 - Persentase Margin)",
    example: "Contoh: Rp10.000 ÷ (1 - 20%) = Rp12.500",
    body: (
      <>
        <div className="bg-[#ffdf00]/20 border-2 border-[#ffdf00] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          <h4 className="font-black text-[#b39b00] mb-2 sm:mb-3 text-base sm:text-lg flex items-center gap-2">
            ⚠️ Kesalahan Terbesar UMKM
          </h4>
          <p className="text-[#b39b00] font-bold text-sm sm:text-lg leading-relaxed">
            Banyak yang ngira kalau modal Rp10.000 dan pengen untung 20%, harga jualnya adalah
            Rp10.000 + (20% x Rp10.000) = <strong>Rp12.000</strong>.
            <br />
            <br />
            Ini salah besar! Itu namanya <strong>Markup</strong>. Kalau kamu jual Rp12.000,
            margin untung aslimu cuma 16,6%. Di dunia ritel dan akuntansi, Margin selalu
            dihitung dari Harga Jual Akhir, bukan dari Modal.
          </p>
        </div>
        <h4 className="font-extrabold text-mm-ink mb-2 text-base sm:text-lg">✨ Cara Kerja Kalkulator Cuan:</h4>
        <p className="text-mm-muted font-bold text-sm sm:text-lg leading-relaxed">
          Kalkulator Cuan menggunakan rumus Margin sejati. Jika modal Rp10.000 dan target margin 20%,
          rumusnya: Rp10.000 ÷ (1 - 0.20) = <strong>Rp12.500</strong>. Untungmu Rp2.500.
          Pas dicek (Rp2.500 ÷ Rp12.500), yap! Sempurna 20%.
        </p>
      </>
    ),
  },
  {
    step: 3,
    title: "Simulasi Diskon",
    summary: "Diskon memotong profit, bukan memotong modal.",
    color: "bg-mm-red",
    formula: "Harga Diskon = Harga Jual - (Harga Jual x Diskon%)",
    example: "Jika margin 20% tapi diskon 30%, promo bisa langsung rugi.",
    body: (
      <>
        <h4 className="font-extrabold text-mm-ink mb-2 text-base sm:text-lg">💡 Aturan Emas Diskon:</h4>
        <p className="text-mm-muted font-bold text-sm sm:text-lg leading-relaxed">
          Diskon itu <strong>memotong untung, bukan memotong modal!</strong> Jika margin untungmu
          20%, dan kamu nekat ngasih diskon 30% buat promo tanggal kembar, dipastikan kamu
          menombok (rugi) dari kantong sendiri alias <em>bakar uang</em>.
          <br />
          <br />
          Kalkulator Cuan menghitung ulang laba bersih setelah diskon agar kamu tahu persis kapan
          promomu masih untung, dan kapan kamu harus mengerem diskon.
        </p>
      </>
    ),
  },
  {
    step: 4,
    title: "Pajak / PB1",
    summary: "Pajak ditambahkan di atas harga jual, bukan memotong profit.",
    color: "bg-mm-blue",
    formula: "Harga Katalog = Harga Jual + Pajak Pembeli",
    example: "Contoh: Rp100.000 + PPN 11% = Rp111.000",
    body: (
      <>
        <h4 className="font-extrabold text-mm-ink mb-2 text-base sm:text-lg">
          ⚖️ Pajak itu Dititipkan, Bukan Memotong Untung
        </h4>
        <p className="text-mm-muted font-bold text-sm sm:text-lg leading-relaxed mb-4">
          Di Indonesia, Pajak Penjualan (seperti PPN 11%-12% atau Pajak Restoran PB1 10%)
          secara ideal <strong>dibebankan kepada pembeli akhir</strong>. Artinya, pajak harus
          ditambahkan <em>di atas</em> Harga Jual Idealmu.
        </p>
        <div className="bg-mm-surface border-2 border-mm-border rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <ul className="space-y-3 sm:space-y-4 text-mm-ink font-bold text-sm sm:text-lg">
            <li className="flex justify-between border-b-2 border-mm-border pb-2 sm:pb-3 gap-3">
              <span className="text-mm-muted">Harga Jual (Masuk Kantongmu):</span>
              <span className="font-black whitespace-nowrap">Rp100.000</span>
            </li>
            <li className="flex justify-between border-b-2 border-mm-border pb-2 sm:pb-3 gap-3">
              <span className="text-mm-yellow text-xs sm:text-lg">Pajak PPN 11%:</span>
              <span className="font-black text-mm-yellow-ink whitespace-nowrap">+ Rp11.000</span>
            </li>
            <li className="flex justify-between pt-1 sm:pt-2 gap-3">
              <span className="text-mm-green font-black uppercase tracking-widest text-[10px] sm:text-sm">
                Harga di Menu/Katalog:
              </span>
              <span className="font-black text-lg sm:text-2xl text-mm-green whitespace-nowrap">
                Rp111.000
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

export function EducationTab() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-mm-ink mb-3 sm:mb-4">
          Membongkar Rahasia Sistem 🕵️‍♂️
        </h2>
        <p className="text-base sm:text-xl font-bold text-mm-muted">
          Formula tetap terlihat, detailnya bisa kamu buka saat butuh.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {educationCards.map((card, index) => (
          <EducationCard key={card.step} {...card} defaultOpen={index === 0} />
        ))}
      </div>
    </div>
  );
}

interface EducationCardProps {
  step: number;
  title: string;
  summary: string;
  color: string;
  formula: string;
  example: string;
  body: ReactNode;
  defaultOpen?: boolean;
}

function EducationCard({
  step,
  title,
  summary,
  color,
  formula,
  example,
  body,
  defaultOpen = false,
}: EducationCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="bg-white border-2 border-mm-border rounded-3xl shadow-[0_4px_0_0_#e5e5e5] sm:shadow-[0_6px_0_0_#e5e5e5] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full text-left transition-colors hover:bg-mm-surface/40 active:bg-mm-surface"
      >
        <div className={`${color} p-4 sm:p-5 border-b-2 border-mm-border`}>
          <div className="flex items-center justify-between gap-4 text-white">
            <h3 className="text-lg sm:text-2xl font-black flex items-center gap-2 sm:gap-3">
              <span className="bg-white/30 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl">
                {step}
              </span>
              {title}
            </h3>
            <ChevronDown
              strokeWidth={3}
              className={`shrink-0 transition-transform duration-200 ease-[var(--ease-out-strong)] ${open ? "rotate-180" : ""}`}
              size={22}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="mb-3 text-sm sm:text-base font-extrabold text-mm-muted">{summary}</p>
          <div className="bg-mm-surface border-2 border-mm-border rounded-xl sm:rounded-2xl p-3 sm:p-4 font-mono font-bold text-xs sm:text-base text-center text-mm-ink">
            {formula}
          </div>
          <p className="mt-2 text-xs sm:text-sm font-bold text-mm-faint">{example}</p>
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-[var(--ease-out-strong)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t-2 border-mm-surface p-5 sm:p-6 md:p-8 transition-transform duration-200 ease-[var(--ease-out-strong)]">
            {body}
          </div>
        </div>
      </div>
    </article>
  );
}
