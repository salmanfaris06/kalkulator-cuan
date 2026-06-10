const STRONG_TOTAL_LABELS = ["GRAND TOTAL", "TOTAL BELANJA", "TOTAL BAYAR"];
const BASIC_TOTAL_LABELS = ["JUMLAH", "TOTAL"];
const FINAL_SUBTOTAL_HINTS = ["TERMASUK PPN", "TERMASUK PAJAK", "INCL PPN", "INCLUDE PPN"];
const NON_CASH_PAYMENT_LABELS = ["DEBIT", "BCA", "BRI", "BNI", "MANDIRI", "QRIS", "EDC"];
const EXCLUDED_LABELS = [
  "SUBTOTAL",
  "SUB TOTAL",
  "KEMBALI",
  "CHANGE",
  "TUNAI",
  "CASH",
  "BAYARAN",
  "REF",
  "REFERENSI",
];

export function extractReceiptTotal(text: string): number | null {
  const normalizedLines = normalizeOcrText(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const candidates: Array<{ value: number; score: number }> = [];

  for (const line of normalizedLines) {
    const isFinalSubtotal = hasFinalSubtotalHint(line);
    const isNonCashPayment = hasNonCashPaymentLabel(line);
    if (containsExcludedLabel(line) && !isFinalSubtotal && !isNonCashPayment) continue;

    const labelScore = isFinalSubtotal ? 3 : getTotalLabelScore(line);
    if (labelScore === 0 && !isNonCashPayment) continue;

    const values = extractMoneyValues(line);
    for (const value of values) {
      if (value > 0) {
        candidates.push({ value, score: labelScore || 1 });
      }
    }
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => b.score - a.score || b.value - a.value);
  return candidates[0].value;
}

function normalizeOcrText(text: string): string {
  return text
    .toUpperCase()
    .replace(/T0TAL/g, "TOTAL")
    .replace(/T\s*O\s*T\s*A\s*L/g, "TOTAL");
}

function containsExcludedLabel(line: string): boolean {
  return EXCLUDED_LABELS.some((label) => line.includes(label));
}

function hasFinalSubtotalHint(line: string): boolean {
  return line.includes("SUBTOTAL") || line.includes("SUB TOTAL")
    ? FINAL_SUBTOTAL_HINTS.some((hint) => line.includes(hint))
    : false;
}

function hasNonCashPaymentLabel(line: string): boolean {
  return NON_CASH_PAYMENT_LABELS.some((label) => line.includes(label));
}

function getTotalLabelScore(line: string): number {
  for (const label of STRONG_TOTAL_LABELS) {
    if (line.includes(label)) return 3;
  }

  for (const label of BASIC_TOTAL_LABELS) {
    if (hasWordLabel(line, label)) return 2;
  }

  return 0;
}

function hasWordLabel(line: string, label: string): boolean {
  return new RegExp(`(^|\\s)${label}(\\s|:|$)`).test(line);
}

function extractMoneyValues(line: string): number[] {
  const values: number[] = [];
  const withoutCurrency = line.replace(/RP\.?/g, " ");
  const compactDigitRuns = withoutCurrency.match(/[\d][\d\s.,]{2,}[\d]/g) ?? [];

  for (const run of compactDigitRuns) {
    const parsed = parseMoneyValue(run);
    if (parsed !== null) values.push(parsed);
  }

  return values;
}

function parseMoneyValue(raw: string): number | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 3) return null;

  const value = Number.parseInt(digits, 10);
  return Number.isFinite(value) ? value : null;
}
