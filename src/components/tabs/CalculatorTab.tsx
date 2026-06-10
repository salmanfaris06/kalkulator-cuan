import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { useMarginStore } from "@/store/useMarginStore";
import { calculate } from "@/lib/calculations";
import { formatIDR, formatThousand } from "@/lib/format";
import { Card, SectionHeader } from "@/components/ui/Card";
import { MoneyInput, PercentInput } from "@/components/ui/Inputs";
import { ResultPanel } from "@/components/ResultPanel";
import { LaborModal } from "@/components/LaborModal";
import { ReceiptScanModal } from "@/components/ReceiptScanModal";
import type { FormData } from "@/types/product";

export function CalculatorTab() {
  const formData = useMarginStore((s) => s.formData);
  const formError = useMarginStore((s) => s.formError);
  const setField = useMarginStore((s) => s.setField);
  const resetForm = useMarginStore((s) => s.resetForm);
  const saveProduct = useMarginStore((s) => s.saveProduct);

  const [isLaborModalOpen, setLaborModalOpen] = useState(false);
  const [isReceiptScanOpen, setReceiptScanOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showMiniResult, setShowMiniResult] = useState(false);
  const resultPanelRef = useRef<HTMLDivElement>(null);

  const result = calculate(formData);
  const quantityValue = Number.parseFloat(formData.quantity) || 0;
  const materialValue = toNumber(formData.costMaterial);
  const canFillQuantity = formData.name.trim().length > 0;
  const canFillCosts = canFillQuantity && quantityValue > 0;
  const canFillLaterCosts = canFillCosts && materialValue > 0;
  const canFillPricing = canFillCosts && hasAnyCost(formData);
  const shouldHighlightName = !canFillQuantity;
  const shouldHighlightQuantity = canFillQuantity && quantityValue <= 0;
  const shouldHighlightMaterial = canFillCosts && materialValue <= 0;

  useEffect(() => {
    const node = resultPanelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMiniResult(!entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleSave = () => {
    const ok = saveProduct();
    if (!ok) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 animate-fade-in">
        {/* Kolom Kiri: Form Input */}
        <div className="lg:col-span-7 space-y-6">
          {formData.id && (
            <div className="bg-mm-yellow/10 border-2 border-mm-yellow rounded-xl sm:rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-[0_4px_0_0_#ffc800]">
              <span className="font-bold text-mm-yellow-ink text-sm sm:text-base">
                Edit mode: <strong>{formData.name}</strong>
              </span>
              <button
                onClick={resetForm}
                className="text-mm-yellow-ink font-black uppercase text-xs sm:text-sm hover:underline"
              >
                Batal / Baru
              </button>
            </div>
          )}

          {/* Section 1: Info Produk */}
          <Card className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <SectionHeader step={1} title="Info Produk" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest mb-1.5 sm:mb-2">
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Contoh: Brownies Lumer"
                  className={`w-full bg-mm-surface border-2 ${
                    formError
                      ? "border-mm-red"
                      : shouldHighlightName
                        ? "border-mm-yellow shadow-[0_0_0_4px_rgba(255,200,0,0.18)] focus:border-mm-yellow"
                        : "border-mm-border focus:border-mm-blue"
                  } rounded-xl sm:rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-bold text-mm-ink outline-none transition-all`}
                />
                {formError && (
                  <p className="text-mm-red text-xs sm:text-sm font-bold mt-2">
                    {formError}
                  </p>
                )}
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest mb-1.5 sm:mb-2">
                  Jml Porsi
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatThousand(formData.quantity)}
                  onChange={(e) => setField("quantity", e.target.value)}
                  disabled={!canFillQuantity}
                  className={`w-full bg-mm-surface border-2 ${shouldHighlightQuantity ? "border-mm-yellow shadow-[0_0_0_4px_rgba(255,200,0,0.18)] focus:border-mm-yellow" : "border-mm-border focus:border-mm-blue"} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-black text-center text-mm-ink outline-none transition-all disabled:cursor-not-allowed disabled:opacity-45`}
                />
              </div>
            </div>
          </Card>

          {/* Section 2: Struktur Modal */}
          <Card className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <SectionHeader step={2} title="Struktur Modal" />
            <div className="space-y-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3 sm:mb-2">
                  <label className="block text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest">
                    Bahan Baku Utama
                  </label>
                  <button
                    type="button"
                    onClick={() => setReceiptScanOpen(true)}
                    disabled={!canFillCosts}
                    className="rounded-lg bg-mm-blue/10 px-2 py-1 text-[10px] font-black text-mm-blue transition-colors hover:bg-mm-blue/15 disabled:cursor-not-allowed disabled:opacity-45 sm:text-xs"
                  >
                    Scan Struk
                  </button>
                </div>
                <MoneyInput
                  name="costMaterial"
                  value={formData.costMaterial}
                  onChange={(v) => setField("costMaterial", v)}
                  disabled={!canFillCosts}
                  highlight={shouldHighlightMaterial}
                />
                <HelperText>{canFillCosts ? "Total biaya bahan untuk semua porsi yang dibuat." : "Isi nama produk dan jumlah porsi dulu."}</HelperText>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest mb-1.5 sm:mb-2">
                  Kemasan & Label
                </label>
                <MoneyInput
                  name="costPackaging"
                  value={formData.costPackaging}
                  onChange={(v) => setField("costPackaging", v)}
                  disabled={!canFillLaterCosts}
                />
                <HelperText>{canFillLaterCosts ? "Box, plastik, stiker, label, paper bag, dan sejenisnya." : "Isi bahan baku utama dulu."}</HelperText>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <label className="block text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest">
                      Tenaga Kerja
                    </label>
                    <button
                      type="button"
                      onClick={() => setLaborModalOpen(true)}
                      disabled={!canFillLaterCosts}
                      className="text-[10px] sm:text-xs bg-mm-yellow/20 text-mm-yellow-ink font-black px-2 py-1 rounded-lg hover:bg-mm-yellow/30 transition-colors flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <Sparkles strokeWidth={2.5} size={16} /> Bantu
                    </button>
                  </div>
                  <MoneyInput
                    name="costLabor"
                    value={formData.costLabor}
                    onChange={(v) => setField("costLabor", v)}
                    compact
                    disabled={!canFillLaterCosts}
                  />
                  <HelperText>{canFillLaterCosts ? "Masukkan upahmu sendiri juga agar HPP tidak bocor." : "Isi bahan baku utama dulu."}</HelperText>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest mb-1.5 sm:mb-2">
                    Lainnya (Gas/Dll)
                  </label>
                  <MoneyInput
                    name="costOther"
                    value={formData.costOther}
                    onChange={(v) => setField("costOther", v)}
                    compact
                    disabled={!canFillLaterCosts}
                  />
                  <HelperText>{canFillLaterCosts ? "Gas, listrik, transport, biaya sewa, atau biaya kecil lain." : "Isi bahan baku utama dulu."}</HelperText>
                </div>
              </div>
            </div>

            <div className="bg-mm-surface border-2 border-mm-border rounded-xl sm:rounded-2xl p-4 sm:p-5 flex justify-between items-center mt-6">
              <span className="font-extrabold text-xs sm:text-sm text-mm-muted uppercase tracking-widest">
                Modal / Produk (HPP)
              </span>
              <span className="text-xl sm:text-2xl font-black text-mm-ink">
                {formatIDR(result.hppPerUnit)}
              </span>
            </div>
          </Card>

          {/* Section 3: Target Profit & Pajak */}
          <Card className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <SectionHeader step={3} title="Target Profit & Pajak" />
            <div>
              <label className="block text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest mb-2 sm:mb-3">
                Persentase Keuntungan
              </label>
              <PercentInput
                name="targetMargin"
                value={formData.targetMargin}
                onChange={(v) => setField("targetMargin", v)}
                disabled={!canFillPricing}
              />
              <HelperText>{canFillPricing ? "Margin dihitung dari harga jual akhir, bukan dari modal." : "Isi struktur modal dulu."}</HelperText>
            </div>

            <div className="pt-4 border-t-2 border-mm-surface">
              <label className="text-xs sm:text-sm font-black text-mm-muted uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
                Pajak Pembeli
                <span className="bg-mm-yellow/20 text-mm-yellow-ink text-[8px] sm:text-[10px] px-2 py-1 rounded-lg uppercase">
                  Opsional
                </span>
              </label>
              <div className="mb-3 flex flex-wrap gap-2">
                {[
                  { label: "Tanpa Pajak", value: "0" },
                  { label: "PB1 10%", value: "10" },
                  { label: "PPN 11%", value: "11" },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setField("taxPercent", preset.value)}
                    disabled={!canFillPricing}
                    className={`rounded-xl border-2 px-3 py-2 text-[11px] font-black transition-[transform,background-color,color,border-color] duration-150 ease-[var(--ease-out-strong)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45 ${
                      formData.taxPercent === preset.value
                        ? "border-mm-yellow bg-mm-yellow/20 text-mm-yellow-ink"
                        : "border-mm-border bg-white text-mm-faint hover:bg-mm-surface"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <PercentInput
                name="taxPercent"
                value={formData.taxPercent}
                onChange={(v) => setField("taxPercent", v)}
                tone="text-mm-yellow"
                focusBorder="focus:border-mm-yellow"
                disabled={!canFillPricing}
              />
              <p className="text-[10px] sm:text-xs font-bold text-mm-faint mt-2">
                {canFillPricing ? "Otomatis ditambahkan di atas harga jual, tidak memotong profitmu." : "Isi struktur modal dulu sebelum mengatur pajak."}
              </p>
            </div>
          </Card>
        </div>

        {/* Kolom Kanan: Hasil */}
        <ResultPanel
          result={result}
          formData={formData}
          saveSuccess={saveSuccess}
          onDiscountChange={(v) => setField("discountSim", v)}
          onApplySuggestedMargin={(margin) => setField("targetMargin", margin.toString())}
          onSave={handleSave}
          canFillDiscount={canFillPricing}
          rootRef={resultPanelRef}
        />
      </div>

      <div
        className={`fixed inset-x-3 bottom-[5.75rem] z-40 rounded-2xl border-2 border-mm-green/25 bg-white/95 p-3 shadow-[0_8px_24px_rgba(60,74,92,0.16)] backdrop-blur transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] sm:hidden dark:bg-mm-surface/95 ${
          showMiniResult
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-mm-faint">
              Harga jual
            </p>
            <p className="text-lg font-black tracking-tight text-mm-green">
              {formatIDR(result.idealPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-mm-blue px-4 py-2 text-xs font-black text-white shadow-[0_4px_0_0_#1899d6] active:translate-y-1 active:shadow-none"
          >
            Simpan
          </button>
        </div>
      </div>

      {isReceiptScanOpen && (
        <ReceiptScanModal
          onClose={() => setReceiptScanOpen(false)}
          onApply={(value) => setField("costMaterial", value)}
        />
      )}

      {isLaborModalOpen && (
        <LaborModal onClose={() => setLaborModalOpen(false)} />
      )}
    </>
  );
}

function HelperText({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1.5 text-[11px] sm:text-xs font-bold leading-relaxed text-mm-faint">
      {children}
    </p>
  );
}

function hasAnyCost(formData: FormData): boolean {
  return (
    toNumber(formData.costMaterial) > 0 ||
    toNumber(formData.costPackaging) > 0 ||
    toNumber(formData.costLabor) > 0 ||
    toNumber(formData.costOther) > 0
  );
}

function toNumber(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}
