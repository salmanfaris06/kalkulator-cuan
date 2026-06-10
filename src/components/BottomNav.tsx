import { BookOpen, Calculator, List } from "lucide-react";
import type { TabId } from "@/types/product";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  savedCount: number;
}

const TABS: { id: TabId; label: string; shortLabel: string; icon: typeof Calculator }[] = [
  { id: "kalkulator", label: "Kalkulator", shortLabel: "Kalkulator", icon: Calculator },
  { id: "tersimpan", label: "Tersimpan", shortLabel: "Tersimpan", icon: List },
  { id: "edukasi", label: "Cara Hitung", shortLabel: "Panduan", icon: BookOpen },
];

export function BottomNav({ activeTab, onTabChange, savedCount }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-mm-border bg-white/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(60,74,92,0.10)] backdrop-blur sm:hidden dark:bg-mm-surface/95">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {TABS.map(({ id, label, shortLabel, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              aria-label={id === "tersimpan" ? `${label}, ${savedCount} tersimpan` : label}
              className={`relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-black uppercase tracking-wide transition-[transform,background-color,color,box-shadow] duration-150 ease-[var(--ease-out-strong)] active:scale-[0.97] ${
                active
                  ? "bg-mm-blue/10 text-mm-blue ring-2 ring-mm-blue/20"
                  : "text-mm-faint active:bg-mm-surface"
              }`}
            >
              <span className="relative">
                <Icon strokeWidth={2.6} size={22} />
                {id === "tersimpan" && savedCount > 0 && (
                  <span className="absolute -right-2.5 -top-2 min-w-5 h-5 px-1 rounded-full bg-mm-blue text-white text-[10px] font-black leading-5 border-2 border-white">
                    {savedCount > 99 ? "99+" : savedCount}
                  </span>
                )}
              </span>
              <span>{shortLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
