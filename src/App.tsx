import { lazy, Suspense, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";
import { CalculatorTab } from "@/components/tabs/CalculatorTab";
import { useMarginStore } from "@/store/useMarginStore";
import type { TabId } from "@/types/product";

const SavedTab = lazy(() =>
  import("@/components/tabs/SavedTab").then((module) => ({ default: module.SavedTab })),
);
const EducationTab = lazy(() =>
  import("@/components/tabs/EducationTab").then((module) => ({ default: module.EducationTab })),
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("kalkulator");
  const [hasStarted, setHasStarted] = useState(false);
  const savedCount = useMarginStore((s) => s.savedProducts.length);

  const openApp = (tab: TabId = "kalkulator") => {
    setActiveTab(tab);
    setHasStarted(true);
  };

  if (!hasStarted) {
    return <LandingPage onStart={() => openApp("kalkulator")} onOpenGuide={() => openApp("edukasi")} />;
  }

  return (
    <div className="relative min-h-screen bg-mm-bg font-sans text-mm-ink p-3 pb-24 sm:p-6 md:p-8 lg:p-12 flex justify-center selection:bg-mm-blue selection:text-white">
      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-6 sm:gap-8">
        <Header activeTab={activeTab} onTabChange={setActiveTab} savedCount={savedCount} />

        <main className="w-full">
          {activeTab === "kalkulator" && <CalculatorTab />}
          {activeTab === "tersimpan" && (
            <Suspense fallback={<TabFallback />}> 
              <SavedTab onTabChange={setActiveTab} />
            </Suspense>
          )}
          {activeTab === "edukasi" && (
            <Suspense fallback={<TabFallback />}> 
              <EducationTab />
            </Suspense>
          )}
        </main>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} savedCount={savedCount} />
    </div>
  );
}

function TabFallback() {
  return (
    <div className="bg-white border-2 border-mm-border rounded-3xl p-8 text-center font-black text-mm-faint shadow-[0_6px_0_0_#e5e5e5]">
      Memuat...
    </div>
  );
}
