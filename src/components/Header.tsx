import { Calculator, List, BookOpen, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { TabId } from "@/types/product";

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  savedCount: number;
}

const TABS: { id: TabId; label: string; icon: typeof Calculator }[] = [
  { id: "kalkulator", label: "Kalkulator", icon: Calculator },
  { id: "tersimpan", label: "Tersimpan", icon: List },
  { id: "edukasi", label: "Cara Hitung", icon: BookOpen },
];

export function Header({ activeTab, onTabChange, savedCount }: HeaderProps) {
  return (
    <header className="bg-white border-2 border-mm-border rounded-3xl shadow-[0_4px_0_0_#e5e5e5] sm:shadow-[0_6px_0_0_#e5e5e5] p-4 sm:p-6 sticky top-2 sm:top-4 z-40 flex flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-mm-blue text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[0_4px_0_0_#1899d6]">
          <TrendingUp strokeWidth={3} size={24} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-mm-ink">
            Kalkulator Cuan
          </h1>
          <p className="text-[10px] sm:text-xs font-bold text-mm-faint uppercase tracking-widest">
            Kalkulator HPP UMKM
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <nav className="hidden sm:flex gap-2 w-full md:w-auto pb-2 md:pb-0 overflow-visible">
          {TABS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              aria-label={id === "tersimpan" ? `${label}, ${savedCount} tersimpan` : label}
              className={`group relative z-50 h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl font-extrabold transition-[transform,background-color,color,border-color] duration-150 ease-[var(--ease-out-strong)] active:scale-[0.96] flex items-center justify-center shrink-0 ${
                active
                  ? "bg-mm-blue/10 text-mm-blue border-2 border-mm-blue/20"
                  : "text-mm-faint hover:bg-slate-100"
              }`}
            >
              <Icon strokeWidth={2.5} size={21} />
              {id === "tersimpan" && savedCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 h-5 px-1 rounded-full bg-mm-blue text-white text-[10px] font-black leading-5 border-2 border-white">
                  {savedCount > 99 ? "99+" : savedCount}
                </span>
              )}
              <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-50 hidden -translate-x-1/2 translate-y-1 scale-[0.98] whitespace-nowrap rounded-xl bg-mm-ink px-3 py-2 text-[11px] font-black uppercase tracking-widest text-white opacity-0 shadow-lg transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] before:absolute before:left-1/2 before:top-0 before:h-2 before:w-2 before:-translate-x-1/2 before:-translate-y-1 before:rotate-45 before:bg-mm-ink group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 sm:block dark:text-mm-surface">
                {label}
                {id === "tersimpan" ? ` (${savedCount})` : ""}
              </span>
            </button>
          );
          })}
        </nav>
      </div>
    </header>
  );
}
