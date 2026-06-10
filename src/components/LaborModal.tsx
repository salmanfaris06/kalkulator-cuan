import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useMarginStore } from "@/store/useMarginStore";
import { formatThousand } from "@/lib/format";
import { PushButton } from "@/components/ui/PushButton";
import type { LaborHelperInputs, LaborMethod } from "@/types/product";

interface LaborModalProps {
  onClose: () => void;
}

const METHODS: { id: LaborMethod; label: string }[] = [
  { id: "self", label: "Diri Sendiri" },
  { id: "hourly", label: "Harian" },
  { id: "unit", label: "Borongan" },
];

const helperFieldClass =
  "w-full bg-mm-surface border-2 border-mm-border rounded-lg sm:rounded-xl text-mm-ink font-black outline-none focus:border-mm-blue";

export function LaborModal({ onClose }: LaborModalProps) {
  const [method, setMethod] = useState<LaborMethod>("self");
  const laborInputs = useMarginStore((s) => s.laborInputs);
  const setLaborField = useMarginStore((s) => s.setLaborField);
  const applyLaborCost = useMarginStore((s) => s.applyLaborCost);
  const qty = useMarginStore((s) => s.formData.quantity);

  const handleChange =
    (name: keyof LaborHelperInputs) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setLaborField(name, e.target.value);

  const handleApply = () => {
    applyLaborCost(method);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-mm-ink/40 backdrop-blur-sm z-50 flex justify-center items-end md:items-center p-0 md:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[2rem] md:rounded-[2.5rem] border-[3px] border-b-0 md:border-b-[3px] border-mm-border shadow-[0_12px_0_0_#e5e5e5] overflow-hidden animate-slide-up">
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden bg-mm-surface">
          <div className="w-12 h-1.5 bg-mm-border rounded-full" />
        </div>

        <div className="p-4 sm:p-6 border-b-2 border-mm-border flex justify-between items-center bg-mm-surface">
          <h3 className="font-black text-lg sm:text-xl text-mm-ink flex items-center gap-2">
            <Sparkles strokeWidth={2.5} size={20} /> Bantu Hitung Upah
          </h3>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="text-mm-faint hover:text-mm-red transition-colors p-1.5 sm:p-2 bg-white rounded-xl border-2 border-mm-border"
          >
            <X strokeWidth={2.5} size={24} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[70vh] md:max-h-none overflow-y-auto">
          <div className="bg-mm-blue/10 border-2 border-mm-blue/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
            <p className="text-xs sm:text-sm font-bold text-mm-blue-dark leading-relaxed">
              Jangan pernah anggap kerjamu gratis! Pilih cara bayar upah untuk
              dimasukkan ke dalam HPP.
            </p>
          </div>

          <div className="flex bg-mm-surface border-2 border-mm-border p-1.5 rounded-xl sm:rounded-2xl">
            {METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg sm:rounded-xl transition-all ${
                  method === m.id
                    ? "bg-white text-mm-ink shadow-[0_2px_0_0_#e5e5e5] border-2 border-mm-border"
                    : "text-mm-faint"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {method === "self" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white border-2 border-mm-border rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-black text-mm-ink mb-2">
                  Target Gaji Anda Sebulan?
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-3.5 sm:top-4 text-base sm:text-lg text-mm-faint font-black">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatThousand(laborInputs.selfSalary)}
                    onChange={handleChange("selfSalary")}
                    className={`${helperFieldClass} p-3 sm:p-4 pl-10 sm:pl-12 text-base sm:text-lg`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <HelperNumber
                  label="Hari Kerja"
                  value={laborInputs.selfDays}
                  onChange={handleChange("selfDays")}
                />
                <HelperNumber
                  label="Jam / Hari"
                  value={laborInputs.selfHours}
                  onChange={handleChange("selfHours")}
                />
                <HelperNumber
                  label="Waktu Bikin"
                  value={laborInputs.selfSpentHours}
                  onChange={handleChange("selfSpentHours")}
                  suffix="jam"
                />
              </div>
            </div>
          )}

          {method === "hourly" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-black text-mm-muted uppercase tracking-wide mb-1.5 sm:mb-2">
                    Upah per Jam
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 sm:left-3 top-3 sm:top-4 text-xs sm:text-sm text-mm-faint font-black">
                      Rp
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatThousand(laborInputs.hourlyRate)}
                      onChange={handleChange("hourlyRate")}
                      className={`${helperFieldClass} p-2.5 sm:p-3 pl-8 sm:pl-10 text-xs sm:text-sm`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-black text-mm-muted uppercase tracking-wide mb-1.5 sm:mb-2">
                    Lama Pengerjaan
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatThousand(laborInputs.hourlySpentHours)}
                      onChange={handleChange("hourlySpentHours")}
                      className={`${helperFieldClass} p-2.5 sm:p-3 pr-8 sm:pr-10 text-xs sm:text-sm`}
                    />
                    <span className="absolute right-2.5 sm:right-3 top-3 sm:top-4 text-[10px] sm:text-xs font-black text-mm-faint">
                      jam
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {method === "unit" && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[10px] sm:text-xs font-black text-mm-muted uppercase tracking-wide mb-1.5 sm:mb-2">
                  Upah Borongan per Unit
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-3.5 sm:top-4 text-base sm:text-lg text-mm-faint font-black">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatThousand(laborInputs.unitRate)}
                    onChange={handleChange("unitRate")}
                    className={`${helperFieldClass} p-3 sm:p-4 pl-10 sm:pl-12 text-base sm:text-lg`}
                  />
                </div>
                <p className="text-xs sm:text-sm text-mm-muted font-bold mt-2 sm:mt-3">
                  Akan dikalikan otomatis dengan{" "}
                  <strong>{Math.max(1, Number(qty) || 1)} unit</strong> yang
                  kamu buat.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 bg-white border-t-2 border-mm-border">
          <PushButton
            variant="success"
            onClick={handleApply}
            className="w-full text-base sm:text-lg py-3 sm:py-4 px-6"
          >
            Terapkan Angka
          </PushButton>
        </div>
      </div>
    </div>
  );
}

interface HelperNumberProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: string;
}

function HelperNumber({ label, value, onChange, suffix }: HelperNumberProps) {
  return (
    <div>
      <label className="block text-[8px] sm:text-[10px] font-black text-mm-muted uppercase tracking-wide mb-1 sm:mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={onChange}
          className={`${helperFieldClass} p-2 sm:p-3 text-center text-xs sm:text-sm`}
        />
        {suffix && (
          <span className="absolute right-1.5 sm:right-2 top-2 sm:top-3 text-[8px] sm:text-[10px] font-black text-mm-faint">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
