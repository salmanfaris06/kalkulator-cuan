import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "success" | "danger";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-mm-blue text-white border-mm-blue-dark",
  success:
    "bg-mm-green text-white border-mm-green-dark",
  danger:
    "bg-mm-red text-white border-mm-red-dark",
};

interface PushButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

/**
 * Tombol "tactile" dengan efek tertekan (border bawah tebal yang hilang saat
 * ditekan). Menggantikan pola border-b-[6px] active:translate-y yang berulang.
 */
export function PushButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: PushButtonProps) {
  return (
    <button
      className={`font-extrabold rounded-2xl border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all flex justify-center items-center gap-2 sm:gap-3 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
