/** Metode perhitungan upah tenaga kerja di modal "Bantu Hitung Upah". */
export type LaborMethod = "self" | "hourly" | "unit";

/** Tab navigasi utama aplikasi. */
export type TabId = "kalkulator" | "tersimpan" | "edukasi";

/**
 * Data form kalkulator. Semua field numerik disimpan sebagai string
 * (raw digit) agar mudah dikontrol oleh input & helper format ribuan.
 */
export interface FormData {
  id: number | null;
  name: string;
  quantity: string;
  costMaterial: string;
  costPackaging: string;
  costLabor: string;
  costOther: string;
  targetMargin: string;
  taxPercent: string;
  discountSim: string;
}

/** Input pembantu di modal perhitungan upah. */
export interface LaborHelperInputs {
  selfSalary: string;
  selfDays: string;
  selfHours: string;
  selfSpentHours: string;
  hourlyRate: string;
  hourlySpentHours: string;
  unitRate: string;
}

/** Produk yang disimpan ke localStorage. */
export interface SavedProduct {
  id: number;
  name: string;
  hppPerUnit: number;
  idealPrice: number;
  profitPerUnit: number;
  marginPercent: number;
  taxPercent: number;
  date: string;
  /** Snapshot input asli agar produk bisa diedit tanpa kehilangan rincian modal. */
  formSnapshot?: Omit<FormData, "id">;
}

/** Hasil kalkulasi turunan dari FormData. */
export interface PriceSuggestion {
  price: number;
  marginPercent: number;
  profitPerUnit: number;
}

export type MarginHealth = "empty" | "thin" | "safe" | "healthy" | "premium";

export interface CalculationResult {
  qty: number;
  totalCost: number;
  hppPerUnit: number;
  marginPercent: number;
  idealPrice: number;
  profitPerUnit: number;
  roundedPriceSuggestions: PriceSuggestion[];
  marginHealth: MarginHealth;
  taxPercent: number;
  taxAmount: number;
  finalPriceWithTax: number;
  discountPercent: number;
  discountAmount: number;
  priceAfterDiscount: number;
  taxAfterDiscount: number;
  finalCustomerPriceAfterDiscount: number;
  profitAfterDiscount: number;
  isDiscountSafe: boolean;
}

export const STORAGE_KEY = "marginmate_products_tactile";

export const INITIAL_FORM_DATA: FormData = {
  id: null,
  name: "",
  quantity: "0",
  costMaterial: "",
  costPackaging: "",
  costLabor: "",
  costOther: "",
  targetMargin: "30",
  taxPercent: "0",
  discountSim: "0",
};

export const INITIAL_LABOR_INPUTS: LaborHelperInputs = {
  selfSalary: "3000000",
  selfDays: "26",
  selfHours: "8",
  selfSpentHours: "2",
  hourlyRate: "15000",
  hourlySpentHours: "2",
  unitRate: "1000",
};
