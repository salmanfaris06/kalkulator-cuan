import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "marginmate_theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl border-2 border-mm-border bg-white text-mm-muted transition-[transform,background-color,color,border-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-mm-surface active:scale-[0.96] dark:bg-mm-surface dark:text-mm-faint"
    >
      <span className="flex h-full w-full items-center justify-center">
        {isDark ? <Sun strokeWidth={2.5} size={20} /> : <Moon strokeWidth={2.5} size={20} />}
      </span>
    </button>
  );
}
