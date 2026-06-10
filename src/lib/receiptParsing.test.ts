import { describe, expect, it } from "vitest";
import { extractReceiptTotal } from "@/lib/receiptParsing";

describe("extractReceiptTotal", () => {
  it("extracts total from a simple TOTAL line", () => {
    const text = `
      TOKO MAJU
      ROTI 10.000
      SUSU 15.000
      TOTAL 25.000
    `;

    expect(extractReceiptTotal(text)).toBe(25000);
  });

  it("extracts total from GRAND TOTAL with Rp prefix", () => {
    const text = `
      SUBTOTAL Rp 120.000
      DISKON Rp 5.000
      GRAND TOTAL Rp 115.000
    `;

    expect(extractReceiptTotal(text)).toBe(115000);
  });

  it("extracts total from TOTAL BELANJA with comma separator", () => {
    const text = `
      MINIMARKET
      TOTAL BELANJA 45,500
      TUNAI 50,000
      KEMBALI 4,500
    `;

    expect(extractReceiptTotal(text)).toBe(45500);
  });

  it("prefers a total label over payment and change labels", () => {
    const text = `
      TOTAL BAYAR 83.250
      TUNAI 100.000
      KEMBALI 16.750
    `;

    expect(extractReceiptTotal(text)).toBe(83250);
  });

  it("returns null when there is no clear total label", () => {
    const text = `
      TOKO CONTOH
      REF 9988776655
      ITEM A 10.000
      ITEM B 20.000
      TUNAI 50.000
    `;

    expect(extractReceiptTotal(text)).toBeNull();
  });

  it("does not treat KEMBALI as the receipt total", () => {
    const text = `
      TUNAI 100.000
      KEMBALI 17.000
    `;

    expect(extractReceiptTotal(text)).toBeNull();
  });

  it("does not treat SUBTOTAL as the final total", () => {
    const text = `
      SUBTOTAL 120.000
      TUNAI 150.000
      KEMBALI 30.000
    `;

    expect(extractReceiptTotal(text)).toBeNull();
  });

  it("extracts final subtotal when receipt says it includes tax", () => {
    const text = `
      SUB TOTAL (TERMASUK PPN) 451,190
      PEMBAYARAN-BCA (DEBIT) 451,190
    `;

    expect(extractReceiptTotal(text)).toBe(451190);
  });

  it("uses non-cash payment amount as a fallback when total text is damaged", () => {
    const text = `
      qup Total * il
      .gcA (DEBIT) 451, 190
    `;

    expect(extractReceiptTotal(text)).toBe(451190);
  });

  it("handles OCR noise around currency separators", () => {
    const text = `
      T0TAL   Rp.  1 2 3 . 4 0 0
    `;

    expect(extractReceiptTotal(text)).toBe(123400);
  });
});
