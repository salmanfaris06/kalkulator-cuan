import { useEffect } from "react";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
  onOpenGuide: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    window.localStorage.setItem("marginmate_theme", "light");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#efe9df] px-4 py-5 font-sans text-[#101010] selection:bg-mm-blue selection:text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.96),rgba(255,255,255,0.48)_34%,transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(238,233,223,0.24)_42%,rgba(155,176,132,0.28))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44vh] bg-[radial-gradient(ellipse_at_50%_100%,rgba(64,91,55,0.38),rgba(154,168,125,0.22)_36%,transparent_72%)]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[22rem] w-[120vw] -translate-x-1/2 rounded-[100%] bg-[linear-gradient(180deg,rgba(92,122,74,0.26),rgba(65,86,55,0.16))] blur-2xl" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col">
        <main className="flex flex-1 flex-col items-center justify-center pt-12 text-center sm:pt-16">
          <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.92] tracking-[-0.055em] text-black sm:text-7xl lg:text-8xl">
            Hitung Harga Jual. Pastikan Tetap Cuan.
          </h1>

          <p className="mt-7 max-w-2xl text-balance text-base font-bold leading-relaxed text-slate-600 sm:text-xl">
            Masukkan modal dan target profit. Kalkulator Cuan bantu menentukan
            harga jual menguntungkan tanpa rumus ribet.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="flex items-center justify-center gap-2 rounded-full border-b-[5px] border-black/25 bg-white px-7 py-4 text-base font-black text-[#101010] shadow-[0_16px_42px_rgba(31,41,55,0.14)] transition-[transform,box-shadow] duration-150 ease-[var(--ease-out-strong)] active:translate-y-[5px] active:border-b-0 active:shadow-[0_8px_24px_rgba(31,41,55,0.12)] sm:px-9 sm:text-lg"
            >
              Mulai Cuan
              <ArrowRight strokeWidth={3} size={20} />
            </button>
            <p className="text-sm font-bold text-slate-500">
              Gratis • Tanpa Login • Data Tersimpan di Browser Kamu
            </p>
          </div>

          <div className="mt-12 w-full max-w-3xl rounded-[2rem] border border-black/10 bg-[#101010] p-3 text-left shadow-[0_30px_90px_rgba(31,41,55,0.24)] sm:mt-14 sm:rounded-[2.25rem] sm:p-4">
            <div className="rounded-[1.45rem] border border-white/10 bg-[#171717] p-4 sm:rounded-[1.75rem] sm:p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-mm-green p-3 text-white">
                    <TrendingUp strokeWidth={3} size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white/35">
                      Contoh hasil
                    </p>
                    <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                      Brownies Cup
                    </h2>
                  </div>
                </div>
                <div className="hidden rounded-full border border-mm-green/30 bg-mm-green/15 px-3 py-1 text-xs font-black text-mm-green sm:block">
                  Cuan aman
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <ResultMetric label="Modal / produk" value="Rp8.500" />
                <ResultMetric label="Target profit" value="35%" />
                <div className="rounded-2xl border border-mm-blue/25 bg-mm-blue/12 p-4 sm:col-span-2">
                  <p className="text-xs font-black uppercase tracking-widest text-mm-blue">
                    Harga jual cuan
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                      Rp13.000
                    </p>
                    <CheckCircle2
                      className="mb-2 text-mm-green"
                      strokeWidth={3}
                      size={28}
                    />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-white/35">
                      Diskon 10%
                    </span>
                    <span className="rounded-full bg-mm-green px-3 py-1 text-xs font-black text-white">
                      Masih aman
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold leading-relaxed text-white/55">
                    Harga promo tetap di atas modal, jadi cuan tidak bocor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface ResultMetricProps {
  label: string;
  value: string;
}

function ResultMetric({ label, value }: ResultMetricProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-black uppercase tracking-widest text-white/35">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-white sm:text-3xl">{value}</p>
    </div>
  );
}
