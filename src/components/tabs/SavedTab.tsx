import { useMemo, useState } from "react";
import { Copy, List, Trash, TrendingUp } from "lucide-react";
import { useMarginStore } from "@/store/useMarginStore";
import { formatIDR } from "@/lib/format";
import { PushButton } from "@/components/ui/PushButton";
import type { SavedProduct, TabId } from "@/types/product";

interface SavedTabProps {
  onTabChange: (tab: TabId) => void;
}

export function SavedTab({ onTabChange }: SavedTabProps) {
  const savedProducts = useMarginStore((s) => s.savedProducts);
  const loadProduct = useMarginStore((s) => s.loadProduct);
  const duplicateProduct = useMarginStore((s) => s.duplicateProduct);
  const deleteProduct = useMarginStore((s) => s.deleteProduct);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const stats = useMemo(() => {
    if (savedProducts.length === 0) {
      return { averageMargin: 0, averageProfit: 0, highestPrice: 0 };
    }

    const totals = savedProducts.reduce(
      (acc, product) => ({
        margin: acc.margin + product.marginPercent,
        profit: acc.profit + product.profitPerUnit,
        highestPrice: Math.max(acc.highestPrice, product.idealPrice),
      }),
      { margin: 0, profit: 0, highestPrice: 0 },
    );

    return {
      averageMargin: Math.round(totals.margin / savedProducts.length),
      averageProfit: totals.profit / savedProducts.length,
      highestPrice: totals.highestPrice,
    };
  }, [savedProducts]);

  const handleLoad = (product: SavedProduct) => {
    loadProduct(product);
    onTabChange("kalkulator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDuplicate = (product: SavedProduct) => {
    duplicateProduct(product);
    setConfirmDelete(null);
    onTabChange("kalkulator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      deleteProduct(id);
      setConfirmDelete(null);
      return;
    }

    setConfirmDelete(id);
    setTimeout(() => setConfirmDelete(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {savedProducts.length === 0 ? (
        <EmptyState onStart={() => onTabChange("kalkulator")} />
      ) : (
        <div className="space-y-5 sm:space-y-6">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <StatCard label="Produk" value={`${savedProducts.length}`} helper="tersimpan" />
            <StatCard label="Rata-rata Margin" value={`${stats.averageMargin}%`} helper="target profit" />
            <StatCard label="Rata-rata Untung" value={formatIDR(stats.averageProfit)} helper="per unit" />
          </section>

          <div className="rounded-3xl border-2 border-mm-blue/20 bg-mm-blue/10 p-4 text-mm-blue-dark shadow-[0_4px_0_0_rgba(28,176,246,0.18)]">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/70 p-2">
                <TrendingUp strokeWidth={2.5} size={18} />
              </div>
              <p className="text-sm font-extrabold leading-relaxed">
                Produk termahalmu saat ini ada di sekitar {formatIDR(stats.highestPrice)}.
                Gunakan tombol duplikat untuk cepat membuat varian produk yang mirip.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                confirming={confirmDelete === product.id}
                onLoad={() => handleLoad(product)}
                onDuplicate={() => handleDuplicate(product)}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-20 sm:py-32 px-4 bg-white border-2 border-mm-border rounded-3xl shadow-[0_6px_0_0_#e5e5e5]">
      <div className="bg-mm-surface w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-mm-faint">
        <List strokeWidth={2.5} size={28} />
      </div>
      <h3 className="font-black text-xl sm:text-2xl text-mm-ink mb-2">
        Produk pertamamu belum disimpan
      </h3>
      <p className="text-sm sm:text-lg font-bold text-mm-muted mb-6 sm:mb-8">
        Hitung HPP sekali, lalu simpan agar bisa dipakai ulang untuk varian produk berikutnya.
      </p>
      <PushButton onClick={onStart} className="inline-flex py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base">
        Mulai Menghitung Sekarang
      </PushButton>
    </div>
  );
}

function StatCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-3xl border-2 border-mm-border bg-white p-4 shadow-[0_4px_0_0_#e5e5e5]">
      <p className="text-[10px] font-black uppercase tracking-widest text-mm-faint">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-mm-ink">{value}</p>
      <p className="mt-0.5 text-xs font-bold text-mm-muted">{helper}</p>
    </div>
  );
}

interface ProductCardProps {
  product: SavedProduct;
  confirming: boolean;
  onLoad: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function ProductCard({ product, confirming, onLoad, onDuplicate, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white border-2 border-mm-border shadow-[0_4px_0_0_#e5e5e5] sm:shadow-[0_6px_0_0_#e5e5e5] rounded-3xl p-5 sm:p-6 flex flex-col gap-4 transition-transform duration-150 ease-[var(--ease-out-strong)] hover:-translate-y-1">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-black text-lg sm:text-xl text-mm-ink">{product.name}</h3>
          <p className="font-bold text-xs sm:text-sm text-mm-faint mt-1">Disimpan: {product.date}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div className="bg-mm-green/10 text-mm-green border-2 border-mm-green/20 text-xs sm:text-sm font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl">
            Margin {product.marginPercent}%
          </div>
          {product.taxPercent > 0 && (
            <div className="bg-mm-yellow/10 text-mm-yellow-ink border-2 border-mm-yellow/20 text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl">
              Pajak {product.taxPercent}%
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-mm-surface p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-mm-border">
        <Metric label="Harga Jual" value={formatIDR(product.idealPrice)} className="col-span-2" />
        <Metric label="Profit" value={formatIDR(product.profitPerUnit)} />
        <Metric label="HPP / Unit" value={formatIDR(product.hppPerUnit)} className="col-span-3" />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-1">
        <button
          onClick={onDelete}
          className={`font-extrabold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border-b-[4px] transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
            confirming
              ? "bg-mm-red text-white border-mm-red-dark active:border-b-0 active:translate-y-[4px]"
              : "bg-white text-mm-red border-2 border-mm-border hover:bg-mm-red/5 active:scale-[0.97]"
          }`}
        >
          <Trash strokeWidth={2.5} size={17} />
          <span className="hidden sm:inline">{confirming ? "Yakin?" : "Hapus"}</span>
        </button>
        <button
          onClick={onDuplicate}
          className="bg-white text-mm-blue border-2 border-mm-border font-extrabold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all hover:bg-mm-blue/5 active:scale-[0.97] flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          <Copy strokeWidth={2.5} size={17} />
          <span className="hidden sm:inline">Duplikat</span>
        </button>
        <button
          onClick={onLoad}
          className="bg-mm-blue text-white border-b-[4px] border-mm-blue-dark font-extrabold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl active:border-b-0 active:translate-y-[4px] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          Edit
        </button>
      </div>

      {confirming && (
        <p className="text-center text-[11px] font-bold text-mm-red">
          Klik sekali lagi untuk menghapus permanen.
        </p>
      )}
    </div>
  );
}

function Metric({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="font-extrabold text-[10px] sm:text-xs text-mm-muted uppercase tracking-wider mb-0.5 sm:mb-1">
        {label}
      </p>
      <p className="font-black text-mm-ink text-sm sm:text-lg break-words">{value}</p>
    </div>
  );
}
