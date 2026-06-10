/** Format angka menjadi mata uang Rupiah tanpa desimal. */
export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format string/angka menjadi grup ribuan (1.000.000) untuk tampilan input.
 * Mengembalikan string kosong untuk nilai kosong/null/undefined.
 */
export function formatThousand(val: string | number | null | undefined): string {
  if (val === null || val === undefined || val === "") return "";
  const raw = val.toString().replace(/\D/g, "");
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Ambil hanya digit dari string input (kebalikan tampilan format ribuan). */
export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Format angka persen, mendukung desimal dengan koma untuk tampilan Indonesia. */
export function formatPercentInput(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "";
  const [integer = "", decimal] = value.toString().replace(",", ".").split(".");
  const formattedInteger = formatThousand(integer);
  return decimal !== undefined ? `${formattedInteger},${decimal}` : formattedInteger;
}
