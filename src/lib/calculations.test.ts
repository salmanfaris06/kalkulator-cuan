import { describe, expect, it } from "vitest";
import { calculate, calculateLaborCost } from "./calculations";
import { INITIAL_FORM_DATA, INITIAL_LABOR_INPUTS } from "@/types/product";
import type { FormData } from "@/types/product";

function form(overrides: Partial<FormData> = {}): FormData {
  return { ...INITIAL_FORM_DATA, ...overrides };
}

describe("calculate — HPP", () => {
  it("membagi total modal dengan jumlah porsi", () => {
    const r = calculate(
      form({ costMaterial: "10000", costPackaging: "5000", quantity: "3" }),
    );
    expect(r.totalCost).toBe(15000);
    expect(r.hppPerUnit).toBe(5000);
  });

  it("menghasilkan HPP 0 saat quantity belum diisi", () => {
    const r = calculate(form({ costMaterial: "9000", quantity: "0" }));
    expect(r.qty).toBe(0);
    expect(r.hppPerUnit).toBe(0);
    expect(r.idealPrice).toBe(0);
  });

  it("menjumlahkan semua komponen biaya", () => {
    const r = calculate(
      form({
        costMaterial: "1000",
        costPackaging: "2000",
        costLabor: "3000",
        costOther: "4000",
        quantity: "1",
      }),
    );
    expect(r.totalCost).toBe(10000);
  });
});

describe("calculate — harga jual ideal (margin sejati)", () => {
  // Oracle dari tab edukasi: modal 10.000, margin 20% -> 12.500
  it("modal 10.000 margin 20% menghasilkan harga 12.500", () => {
    const r = calculate(
      form({ costMaterial: "10000", quantity: "1", targetMargin: "20" }),
    );
    expect(r.idealPrice).toBe(12500);
    expect(r.profitPerUnit).toBe(2500);
    // verifikasi margin sejati: profit / harga = 20%
    expect(r.profitPerUnit / r.idealPrice).toBeCloseTo(0.2, 10);
  });

  it("margin 0% menghasilkan harga sama dengan HPP", () => {
    const r = calculate(
      form({ costMaterial: "8000", quantity: "1", targetMargin: "0" }),
    );
    expect(r.idealPrice).toBe(8000);
    expect(r.profitPerUnit).toBe(0);
  });

  it("clamp margin maksimum 99%", () => {
    const r = calculate(
      form({ costMaterial: "100", quantity: "1", targetMargin: "150" }),
    );
    expect(r.marginPercent).toBe(99);
    expect(r.idealPrice).toBeCloseTo(10000, 6);
  });

  it("clamp margin minimum 0% untuk nilai negatif", () => {
    const r = calculate(
      form({ costMaterial: "5000", quantity: "1", targetMargin: "-30" }),
    );
    expect(r.marginPercent).toBe(0);
    expect(r.idealPrice).toBe(5000);
  });
});

describe("calculate — pajak (dibebankan ke pembeli)", () => {
  it("pajak ditambahkan di atas harga ideal, tidak memotong profit", () => {
    const r = calculate(
      form({ costMaterial: "10000", quantity: "1", targetMargin: "20", taxPercent: "11" }),
    );
    expect(r.idealPrice).toBe(12500);
    expect(r.taxAmount).toBeCloseTo(1375, 6);
    expect(r.finalPriceWithTax).toBeCloseTo(13875, 6);
    // profit tetap utuh
    expect(r.profitPerUnit).toBe(2500);
  });

  it("clamp pajak negatif menjadi 0", () => {
    const r = calculate(form({ costMaterial: "10000", taxPercent: "-5" }));
    expect(r.taxPercent).toBe(0);
    expect(r.taxAmount).toBe(0);
  });
});

describe("calculate — simulasi diskon", () => {
  it("menghitung harga & laba setelah diskon", () => {
    const r = calculate(
      form({ costMaterial: "10000", quantity: "1", targetMargin: "20", discountSim: "10" }),
    );
    expect(r.idealPrice).toBe(12500);
    expect(r.discountAmount).toBeCloseTo(1250, 6);
    expect(r.priceAfterDiscount).toBeCloseTo(11250, 6);
    expect(r.profitAfterDiscount).toBeCloseTo(1250, 6);
    expect(r.isDiscountSafe).toBe(true);
  });

  it("menandai diskon tidak aman saat laba negatif", () => {
    // margin 20% -> harga 12500, hpp 10000. Diskon 30% -> harga 8750 < hpp -> rugi
    const r = calculate(
      form({ costMaterial: "10000", quantity: "1", targetMargin: "20", discountSim: "30" }),
    );
    expect(r.profitAfterDiscount).toBeLessThan(0);
    expect(r.isDiscountSafe).toBe(false);
  });

  it("menerapkan pajak di atas harga promo", () => {
    const r = calculate(
      form({
        costMaterial: "10000",
        quantity: "1",
        targetMargin: "20",
        discountSim: "10",
        taxPercent: "11",
      }),
    );
    expect(r.priceAfterDiscount).toBeCloseTo(11250, 6);
    expect(r.taxAfterDiscount).toBeCloseTo(1237.5, 6);
    expect(r.finalCustomerPriceAfterDiscount).toBeCloseTo(12487.5, 6);
  });
});

describe("calculateLaborCost", () => {
  it("metode 'self': gaji / (hari * jam) * waktu bikin", () => {
    // 3.000.000 / (26*8) = 14423.07.../jam * 2 = 28846.15 -> round 28846
    const result = calculateLaborCost("self", INITIAL_LABOR_INPUTS, "1");
    expect(result).toBe(28846);
  });

  it("metode 'hourly': upah per jam * lama pengerjaan", () => {
    const result = calculateLaborCost("hourly", INITIAL_LABOR_INPUTS, "1");
    expect(result).toBe(30000); // 15000 * 2
  });

  it("metode 'unit': upah borongan * jumlah unit", () => {
    const result = calculateLaborCost("unit", INITIAL_LABOR_INPUTS, "5");
    expect(result).toBe(5000); // 1000 * 5
  });

  it("metode 'unit' fallback qty 1 saat quantity kosong", () => {
    const result = calculateLaborCost("unit", INITIAL_LABOR_INPUTS, "");
    expect(result).toBe(1000);
  });

  it("metode 'self' tahan pembagian nol (hari/jam = 0 -> fallback 1)", () => {
    const result = calculateLaborCost(
      "self",
      { ...INITIAL_LABOR_INPUTS, selfDays: "0", selfHours: "0" },
      "1",
    );
    // fallback days=1, hours=1 -> 3.000.000/1 * 2 = 6.000.000
    expect(result).toBe(6000000);
  });
});
