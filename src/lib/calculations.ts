import type {
  CalculationResult,
  FormData,
  LaborHelperInputs,
  LaborMethod,
} from "@/types/product";

/** Parse string angka mentah menjadi number, fallback ke 0. */
function toNumber(value: string, fallback = 0): number {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Hitung biaya tenaga kerja berdasarkan metode di modal "Bantu Hitung Upah".
 * Dipertahankan persis dari logika asli.
 */
export function calculateLaborCost(
  method: LaborMethod,
  inputs: LaborHelperInputs,
  quantity: string,
): number {
  let result = 0;

  if (method === "self") {
    const salary = toNumber(inputs.selfSalary);
    const days = toNumber(inputs.selfDays, 1) || 1;
    const hours = toNumber(inputs.selfHours, 1) || 1;
    const spent = toNumber(inputs.selfSpentHours);
    const ratePerHour = salary / (days * hours);
    result = ratePerHour * spent;
  } else if (method === "hourly") {
    const rate = toNumber(inputs.hourlyRate);
    const spent = toNumber(inputs.hourlySpentHours);
    result = rate * spent;
  } else if (method === "unit") {
    const rate = toNumber(inputs.unitRate);
    const qtyNum = toNumber(quantity, 1) || 1;
    result = rate * qtyNum;
  }

  return Math.round(result);
}

/**
 * Kalkulasi lengkap HPP, harga jual ideal, pajak, dan simulasi diskon.
 * Pure function — perilaku identik dengan implementasi monolitik asli.
 */
export function calculate(form: FormData): CalculationResult {
  const qtyInput = toNumber(form.quantity);
  const qty = qtyInput > 0 ? qtyInput : 0;
  const material = toNumber(form.costMaterial);
  const packaging = toNumber(form.costPackaging);
  const labor = toNumber(form.costLabor);
  const other = toNumber(form.costOther);

  const totalCost = material + packaging + labor + other;
  const hppPerUnit = qty > 0 ? totalCost / qty : 0;

  const marginPercent = Math.min(99, Math.max(0, toNumber(form.targetMargin)));
  const marginDecimal = marginPercent / 100;

  const idealPrice = marginDecimal < 1 ? hppPerUnit / (1 - marginDecimal) : 0;
  const profitPerUnit = idealPrice - hppPerUnit;
  const roundedPriceSuggestions = getRoundedPriceSuggestions(idealPrice, hppPerUnit);
  const marginHealth = getMarginHealth(marginPercent, hppPerUnit);

  const taxPercent = Math.max(0, toNumber(form.taxPercent));
  const taxAmount = idealPrice * (taxPercent / 100);
  const finalPriceWithTax = idealPrice + taxAmount;

  const discountPercent = toNumber(form.discountSim);
  const discountAmount = idealPrice * (discountPercent / 100);
  const priceAfterDiscount = idealPrice - discountAmount;
  const taxAfterDiscount = priceAfterDiscount * (taxPercent / 100);
  const finalCustomerPriceAfterDiscount = priceAfterDiscount + taxAfterDiscount;
  const profitAfterDiscount = priceAfterDiscount - hppPerUnit;
  const isDiscountSafe = profitAfterDiscount > 0;

  return {
    qty,
    totalCost,
    hppPerUnit,
    marginPercent,
    idealPrice,
    profitPerUnit,
    roundedPriceSuggestions,
    marginHealth,
    taxPercent,
    taxAmount,
    finalPriceWithTax,
    discountPercent,
    discountAmount,
    priceAfterDiscount,
    taxAfterDiscount,
    finalCustomerPriceAfterDiscount,
    profitAfterDiscount,
    isDiscountSafe,
  };
}

function getRoundedPriceSuggestions(idealPrice: number, hppPerUnit: number) {
  if (idealPrice <= 0 || hppPerUnit <= 0) return [];

  const steps = [500, 1000, 5000];
  const suggestions = new Map<
    number,
    { price: number; marginPercent: number; profitPerUnit: number }
  >();

  for (const step of steps) {
    const price = Math.ceil(idealPrice / step) * step;
    if (price <= 0) continue;

    const profitPerUnit = price - hppPerUnit;
    const marginPercent = price > 0 ? (profitPerUnit / price) * 100 : 0;
    suggestions.set(price, {
      price,
      profitPerUnit,
      marginPercent: Math.max(0, Math.round(marginPercent * 100) / 100),
    });
  }

  return Array.from(suggestions.values()).slice(0, 3);
}

function getMarginHealth(marginPercent: number, hppPerUnit: number) {
  if (hppPerUnit <= 0) return "empty";
  if (marginPercent < 15) return "thin";
  if (marginPercent < 30) return "safe";
  if (marginPercent <= 60) return "healthy";
  return "premium";
}
