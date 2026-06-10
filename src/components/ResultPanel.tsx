import { useState, type Ref } from "react";
import { Check, Copy, Lightbulb, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PercentInput } from "@/components/ui/Inputs";
import { formatIDR } from "@/lib/format";
import type { CalculationResult, FormData } from "@/types/product";

interface ResultPanelProps {
  result: CalculationResult;
  formData: FormData;
  saveSuccess: boolean;
  onDiscountChange: (value: string) => void;
  onApplySuggestedMargin: (marginPercent: number) => void;
  onSave: () => void;
  canFillDiscount?: boolean;
  rootRef?: Ref<HTMLDivElement>;
}

export function ResultPanel({
  result,
  formData,
  saveSuccess,
  onDiscountChange,
  onApplySuggestedMargin,
  onSave,
  canFillDiscount = true,
  rootRef,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);
  const insight = getSmartInsight(result);
  const {
    idealPrice,
    taxPercent,
    taxAmount,
    finalPriceWithTax,
    profitPerUnit,
    marginPercent,
    discountPercent,
    priceAfterDiscount,
    taxAfterDiscount,
    profitAfterDiscount,
    isDiscountSafe,
  } = result;

  const handleCopySummary = async () => {
    const summary = [
      `${formData.name || "Produk"}`,
      `Harga: ${formatIDR(result.roundedPriceSuggestions[0]?.price ?? result.idealPrice)}${result.qty > 1 ? " / produk" : ""}`,
      result.taxPercent > 0
        ? `Harga sudah termasuk estimasi pajak pembeli: ${formatIDR(result.finalPriceWithTax)}`
        : null,
      "Belum termasuk ongkir jika ada.",
    ]
      .filter(Boolean)
      .join("\n");

    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div ref={rootRef} className="lg:col-span-5 relative mt-2 lg:mt-0">
      <div className="lg:sticky lg:top-[10rem] space-y-6">
        {/* Result Stack */}
        <div className="bg-mm-green border-2 border-mm-green rounded-3xl shadow-[0_6px_0_0_#46a302] sm:shadow-[0_8px_0_0_#46a302] text-white relative overflow-hidden">
          <div className="p-6 sm:p-8 pb-5">
            <p className="font-extrabold uppercase tracking-widest text-[#d7ffb8] mb-1 sm:mb-2 text-xs sm:text-sm">
              Rekomendasi Harga Jual
            </p>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 break-words tracking-tighter">
              {formatIDR(idealPrice)}
            </h3>
            <div className="mb-5 sm:mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-[#d7ffb8]">
              <span>Aman untuk target margin {marginPercent}%{taxPercent > 0 ? ", belum termasuk pajak pembeli" : ""}.</span>
              <span className={`rounded-full border-2 px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getMarginHealthClass(result.marginHealth)}`}>
                {getMarginHealthLabel(result.marginHealth)}
              </span>
            </div>

            {taxPercent > 0 && (
              <div className="bg-mm-green-dark rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6 border-2 border-mm-green shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#d7ffb8] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                    + Pajak ({taxPercent}%)
                  </span>
                  <span className="font-black text-xs sm:text-sm">
                    {formatIDR(taxAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 sm:pt-3 border-t-2 border-mm-green/50 mt-2 sm:mt-3">
                  <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-widest">
                    Harga di Katalog
                  </span>
                  <span className="font-black text-lg sm:text-xl">
                    {formatIDR(finalPriceWithTax)}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex justify-between items-center border-2 border-white/20">
              <div>
                <p className="text-[#d7ffb8] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mb-0.5 sm:mb-1">
                  Untung / Unit
                </p>
                <p className="font-black text-lg sm:text-xl">
                  {formatIDR(profitPerUnit)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#d7ffb8] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mb-0.5 sm:mb-1">
                  Margin
                </p>
                <p className="font-black text-lg sm:text-xl">{marginPercent}%</p>
              </div>
            </div>

            {result.roundedPriceSuggestions.length > 0 && (
              <div className="mt-4 rounded-2xl bg-white/15 border-2 border-white/15 p-3">
                <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#d7ffb8]">
                  Harga mudah untuk katalog
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {result.roundedPriceSuggestions.map((item) => (
                    <button
                      key={item.price}
                      type="button"
                      onClick={() => onApplySuggestedMargin(item.marginPercent)}
                      className="rounded-xl bg-white/15 p-3 text-left transition-[transform,background-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-white/25 active:scale-[0.97]"
                      aria-label={`Gunakan harga ${formatIDR(item.price)} dengan margin ${item.marginPercent}%`}
                    >
                      <p className="text-lg font-black">{formatIDR(item.price)}</p>
                      <p className="text-[10px] font-bold text-[#d7ffb8]">
                        Klik pakai margin {item.marginPercent}%
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {insight.severity === "normal" && (
              <div className="mt-4 rounded-2xl bg-white/15 border-2 border-white/15 p-3 text-[#d7ffb8]">
                <p className="flex items-start gap-2 text-xs sm:text-sm font-extrabold leading-relaxed">
                  <Lightbulb strokeWidth={2.5} size={16} className="mt-0.5 shrink-0" />
                  {insight.message}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 border-t-2 border-mm-green-dark/25 bg-mm-green-dark/25 p-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="rounded-2xl border-2 border-white/20 bg-white/15 px-4 py-3 text-sm font-black transition-[transform,background-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-white/20 active:scale-[0.97]"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {copied ? <Check strokeWidth={2.5} size={18} /> : <Copy strokeWidth={2.5} size={18} />}
                {copied ? "Teks Disalin" : "Salin untuk WhatsApp"}
              </span>
            </button>
            <button
              type="button"
              onClick={onSave}
              className="w-full rounded-2xl border-2 border-[#ffffff] bg-[#ffffff] px-4 py-3 text-sm font-black text-mm-blue shadow-[0_5px_0_0_rgba(255,255,255,0.45)] transition-[transform,box-shadow,background-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-[#f7f9fa] active:translate-y-1 active:shadow-none"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {saveSuccess ? (
                  <Check strokeWidth={2.5} size={18} />
                ) : (
                  <Save strokeWidth={2.5} size={18} />
                )}
                {saveSuccess
                  ? "Berhasil Disimpan"
                  : formData.id
                    ? "Perbarui Produk"
                    : "Simpan Produk"}
              </span>
            </button>
          </div>
        </div>

        {insight.severity !== "normal" && (
          <div className={`rounded-2xl border-2 p-4 shadow-[0_4px_0_0_#e5e5e5] ${insight.className}`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-white/60 p-2">
                <Lightbulb strokeWidth={2.5} size={18} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest opacity-70">
                  Insight Cepat
                </p>
                <p className="mt-1 text-sm font-extrabold leading-relaxed">
                  {insight.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Kartu Simulasi Diskon */}
        <Card className="p-5 sm:p-6 space-y-4">
          <h3 className="font-black text-base sm:text-lg text-mm-ink flex items-center gap-2">
            Simulasi Diskon
          </h3>
          <PercentInput
            name="discountSim"
            value={formData.discountSim}
            onChange={onDiscountChange}
            tone="text-mm-red"
            focusBorder="focus:border-mm-red"
            disabled={!canFillDiscount}
          />
          {!canFillDiscount && (
            <p className="mt-2 text-xs font-bold text-mm-faint">
              Isi struktur modal dulu sebelum simulasi diskon.
            </p>
          )}

          {discountPercent > 0 && (
            <div className="bg-mm-surface border-2 border-mm-border rounded-xl sm:rounded-2xl p-3 sm:p-4 mt-2">
              <div className="flex justify-between items-end mb-2">
                <p className="font-extrabold text-mm-muted text-xs sm:text-sm">
                  Harga Jual Promo
                </p>
                <p className="font-black text-lg sm:text-xl text-mm-ink">
                  {formatIDR(priceAfterDiscount)}
                </p>
              </div>
              {taxPercent > 0 && (
                <div className="flex justify-between items-end mb-2">
                  <p className="font-extrabold text-mm-faint text-[10px] sm:text-xs">
                    + Pajak Promo ({taxPercent}%)
                  </p>
                  <p className="font-black text-xs sm:text-sm text-mm-faint">
                    {formatIDR(taxAfterDiscount)}
                  </p>
                </div>
              )}
              <div className="flex justify-between items-end border-t-2 border-mm-border pt-2">
                <p className="font-extrabold text-mm-muted text-xs sm:text-sm">
                  Laba Bersih
                </p>
                <p
                  className={`font-black text-base sm:text-lg ${
                    isDiscountSafe ? "text-mm-green" : "text-mm-red"
                  }`}
                >
                  {formatIDR(profitAfterDiscount)}
                </p>
              </div>
              {!isDiscountSafe && (
                <div className="mt-2 sm:mt-3 bg-mm-red/10 text-mm-red font-black text-[10px] sm:text-xs p-2 sm:p-3 rounded-xl border-2 border-mm-red/20">
                  ⚠️ STOP! Diskon ini bikin kamu rugi.
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function getMarginHealthLabel(health: CalculationResult["marginHealth"]) {
  switch (health) {
    case "empty":
      return "Belum dihitung";
    case "thin":
      return "Untung tipis";
    case "safe":
      return "Cukup aman";
    case "healthy":
      return "Sehat";
    case "premium":
      return "Premium";
  }
}

function getMarginHealthClass(health: CalculationResult["marginHealth"]) {
  switch (health) {
    case "empty":
      return "border-white/20 bg-white/10 text-white";
    case "thin":
      return "border-mm-yellow/40 bg-mm-yellow/25 text-white";
    case "safe":
      return "border-white/20 bg-white/15 text-white";
    case "healthy":
      return "border-white/30 bg-white/20 text-white";
    case "premium":
      return "border-mm-blue/30 bg-mm-blue/20 text-white";
  }
}

function getSmartInsight(result: CalculationResult) {
  if (result.totalCost <= 0) {
    return {
      message: "Masukkan modal dulu agar rekomendasi harga jual bisa dihitung dengan akurat.",
      severity: "info" as const,
      className: "bg-mm-blue/10 border-mm-blue/20 text-mm-blue-dark",
    };
  }

  if (result.discountPercent > 0 && !result.isDiscountSafe) {
    return {
      message: "Diskon ini sudah melewati batas aman dan membuat laba bersih negatif.",
      severity: "danger" as const,
      className: "bg-mm-red/10 border-mm-red/20 text-mm-red",
    };
  }

  if (result.discountPercent > result.marginPercent && result.discountPercent > 0) {
    return {
      message: "Diskon lebih besar dari margin. Cek ulang biaya marketplace atau promo tambahan sebelum dipakai.",
      severity: "warning" as const,
      className: "bg-mm-yellow/15 border-mm-yellow/30 text-mm-yellow-ink",
    };
  }

  if (result.marginPercent < 15) {
    return {
      message: "Margin kamu cukup tipis. Pastikan biaya admin, marketplace, atau ongkir subsidi sudah ikut dihitung.",
      severity: "warning" as const,
      className: "bg-mm-yellow/15 border-mm-yellow/30 text-mm-yellow-ink",
    };
  }

  if (result.taxPercent > 0) {
    return {
      message: "Harga katalog sudah ditambah pajak pembeli, jadi profit utama tetap utuh.",
      severity: "normal" as const,
      className: "bg-mm-green/10 border-mm-green/20 text-mm-green-dark",
    };
  }

  return {
    message: "Menggunakan rumus margin sejati: profit dihitung dari harga jual akhir, bukan sekadar markup modal.",
    severity: "normal" as const,
    className: "bg-mm-green/10 border-mm-green/20 text-mm-green-dark",
  };
}
