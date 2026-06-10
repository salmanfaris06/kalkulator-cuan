import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ImagePlus, Loader2, ScanLine, X } from "lucide-react";
import { recognizeReceiptText } from "@/lib/receiptOcr";
import { extractReceiptTotal } from "@/lib/receiptParsing";
import { formatIDR, formatThousand, stripNonDigits } from "@/lib/format";

interface ReceiptScanModalProps {
  onClose: () => void;
  onApply: (value: string) => void;
}

type ScanStatus = "idle" | "reading" | "success" | "not-found" | "error";

export function ReceiptScanModal({ onClose, onApply }: ReceiptScanModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [detectedTotal, setDetectedTotal] = useState("");
  const [status, setStatus] = useState<ScanStatus>("idle");
  const scanIdRef = useRef(0);
  const previewUrlRef = useRef("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const formattedDetectedTotal = useMemo(
    () => formatThousand(detectedTotal),
    [detectedTotal],
  );

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    return () => {
      scanIdRef.current += 1;
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    const scanId = ++scanIdRef.current;

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;
    setPreviewUrl(nextPreviewUrl);
    setDetectedTotal("");
    setStatus("reading");

    try {
      const text = await recognizeReceiptText(file);
      if (scanId !== scanIdRef.current) return;

      const total = extractReceiptTotal(text);

      if (total === null) {
        setStatus("not-found");
        return;
      }

      setDetectedTotal(total.toString());
      setStatus("success");
    } catch {
      if (scanId !== scanIdRef.current) return;
      setStatus("error");
    }
  };

  const handleApply = () => {
    const rawValue = stripNonDigits(detectedTotal);
    if (!rawValue || Number(rawValue) <= 0) {
      setStatus("not-found");
      return;
    }

    onApply(rawValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-mm-ink/45 p-3 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-scan-title"
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl border-2 border-mm-border bg-white shadow-[0_8px_0_0_#d1d5db] dark:bg-mm-surface dark:shadow-[0_8px_0_0_#0b1220]"
      >
        <div className="shrink-0 flex items-start justify-between gap-4 border-b-2 border-mm-border p-5 sm:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-mm-blue">
              Bantu Isi Modal
            </p>
            <h2 id="receipt-scan-title" className="mt-1 text-2xl font-black text-mm-ink">Scan Struk Belanja</h2>
            <p className="mt-2 text-sm font-bold leading-relaxed text-mm-muted">
              Upload foto struk bahan baku. Kalkulator Cuan akan coba membaca total belanja.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-2xl border-2 border-mm-border bg-mm-surface p-2 text-mm-muted transition-transform active:scale-95"
            aria-label="Tutup scan struk"
          >
            <X strokeWidth={2.5} size={20} />
          </button>
        </div>

        <div className="receipt-modal-scroll min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
          {!previewUrl ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-mm-blue/40 bg-mm-blue/5 p-6 text-center transition-colors hover:bg-mm-blue/10">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
                disabled={status === "reading"}
              />
              <ImagePlus strokeWidth={2.5} className="mb-3 text-mm-blue" size={30} />
              <span className="text-sm font-black text-mm-blue">Pilih / Foto Struk</span>
              <span className="mt-1 text-xs font-bold text-mm-faint">
                Foto diproses di perangkat kamu dan tidak dikirim ke server.
              </span>
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border-2 border-mm-border bg-mm-surface">
              <img src={previewUrl} alt="Preview struk" className="max-h-[32dvh] w-full object-contain" />
              <label className="absolute right-3 top-3 cursor-pointer rounded-xl border-2 border-white bg-mm-blue px-3 py-2 text-xs font-black text-white shadow-[0_4px_0_0_#1899d6,0_8px_24px_rgba(0,0,0,0.35)] transition-[transform,background-color,box-shadow] active:translate-y-0.5 active:shadow-[0_2px_0_0_#1899d6,0_6px_18px_rgba(0,0,0,0.35)] hover:bg-mm-blue-dark">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
                  disabled={status === "reading"}
                />
                Ubah Foto
              </label>
            </div>
          )}

          {status === "reading" && (
            <div className="flex items-start gap-3 rounded-2xl border-2 border-mm-blue/20 bg-mm-blue/10 p-4 text-mm-blue">
              <Loader2 strokeWidth={2.5} size={20} className="mt-0.5 animate-spin" />
              <div>
                <p className="font-black">Sedang membaca struk...</p>
                <p className="text-sm font-bold opacity-80">
                  Ini bisa butuh beberapa detik di HP tertentu.
                </p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="rounded-2xl border-2 border-mm-green/25 bg-mm-green/10 p-4 text-mm-green-dark">
              <p className="flex items-center gap-2 font-black">
                <Check strokeWidth={2.5} size={18} /> Total terbaca: {formatIDR(Number(detectedTotal))}
              </p>
            </div>
          )}

          {status === "not-found" && (
            <div className="rounded-2xl border-2 border-mm-yellow/30 bg-mm-yellow/10 p-4 text-mm-yellow-ink">
              <p className="font-black">Belum bisa membaca total struk.</p>
              <p className="text-sm font-bold">
                Coba foto yang lebih terang, atau isi totalnya manual.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border-2 border-mm-red/25 bg-mm-red/10 p-4 text-mm-red">
              <p className="font-black">Scan gagal dijalankan.</p>
              <p className="text-sm font-bold">Coba pilih foto lagi, atau isi totalnya manual.</p>
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-mm-muted">
              Total Struk
            </label>
            <div className="flex items-center rounded-2xl border-2 border-mm-border bg-mm-surface px-4 focus-within:border-mm-blue">
              <span className="mr-2 font-black text-mm-muted">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={formattedDetectedTotal}
                onChange={(event) => setDetectedTotal(stripNonDigits(event.target.value))}
                placeholder="0"
                className="w-full bg-transparent py-4 text-lg font-black text-mm-ink outline-none"
              />
            </div>
            <p className="mt-2 text-xs font-bold text-mm-faint">
              Cek lagi ya, hasil scan bisa salah kalau foto buram atau struk terlipat.
            </p>
          </div>
        </div>

        <div className="shrink-0 grid grid-cols-1 gap-3 border-t-2 border-mm-border bg-mm-surface p-5 sm:grid-cols-2 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border-2 border-mm-border bg-white px-4 py-3 text-sm font-black text-mm-muted transition-transform active:scale-95 dark:bg-mm-surface"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={status === "reading"}
            className="rounded-2xl border-2 border-mm-blue bg-mm-blue px-4 py-3 text-sm font-black text-white shadow-[0_5px_0_0_#1899d6] transition-[transform,box-shadow,opacity] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <ScanLine strokeWidth={2.5} size={18} /> Pakai untuk Bahan Baku
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
