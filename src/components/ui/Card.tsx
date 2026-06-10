import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Kartu putih dengan border & shadow tactile khas Kalkulator Cuan. */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white border-2 border-mm-border rounded-3xl shadow-[0_4px_0_0_#e5e5e5] sm:shadow-[0_6px_0_0_#e5e5e5] ${className}`}
    >
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  step: number;
  title: string;
}

/** Header bernomor untuk tiap section form. */
export function SectionHeader({ step, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 border-b-2 border-mm-surface pb-3 sm:pb-4">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-mm-surface border-2 border-mm-border flex items-center justify-center text-base sm:text-lg font-black text-mm-faint">
        {step}
      </div>
      <h2 className="text-lg sm:text-xl font-black text-mm-ink">{title}</h2>
    </div>
  );
}
