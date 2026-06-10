import { formatPercentInput, formatThousand } from "@/lib/format";

interface MoneyInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Ukuran ringkas untuk grid 2 kolom. */
  compact?: boolean;
  disabled?: boolean;
  highlight?: boolean;
}

/** Input mata uang dengan prefix "Rp" dan format ribuan otomatis. */
export function MoneyInput({
  name,
  value,
  onChange,
  placeholder = "0",
  compact = false,
  disabled = false,
  highlight = false,
}: MoneyInputProps) {
  const pad = compact ? "pl-10 sm:pl-12" : "pl-12 sm:pl-14";
  const prefixPad = compact ? "pl-3 sm:pl-4" : "pl-4 sm:pl-5";
  const prefixSize = compact ? "text-sm sm:text-base" : "text-base sm:text-lg";

  return (
    <div className="relative">
      <span
        className={`absolute inset-y-0 left-0 flex items-center ${prefixPad} text-mm-faint font-black ${prefixSize}`}
      >
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        name={name}
        value={formatThousand(value)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-mm-surface border-2 ${highlight ? "border-mm-yellow shadow-[0_0_0_4px_rgba(255,200,0,0.18)]" : "border-mm-border"} rounded-xl sm:rounded-2xl p-3 sm:p-4 ${pad} text-base sm:text-lg font-bold text-mm-ink focus:border-mm-blue outline-none transition-all disabled:cursor-not-allowed disabled:opacity-45`}
      />
    </div>
  );
}

interface PercentInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Warna teks angka (tailwind text-* class). */
  tone?: string;
  focusBorder?: string;
  disabled?: boolean;
  highlight?: boolean;
}

/** Input persentase dengan suffix "%". */
export function PercentInput({
  name,
  value,
  onChange,
  placeholder = "0",
  tone = "text-mm-blue",
  focusBorder = "focus:border-mm-blue",
  disabled = false,
  highlight = false,
}: PercentInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="decimal"
        name={name}
        value={formatPercentInput(value)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-mm-surface border-2 ${highlight ? "border-mm-yellow shadow-[0_0_0_4px_rgba(255,200,0,0.18)]" : "border-mm-border"} rounded-xl sm:rounded-2xl p-4 sm:p-5 text-lg sm:text-xl font-black ${tone} ${focusBorder} outline-none transition-all disabled:cursor-not-allowed disabled:opacity-45`}
      />
      <span className="absolute right-5 sm:right-6 inset-y-0 flex items-center text-lg sm:text-xl font-black text-mm-faint">
        %
      </span>
    </div>
  );
}
