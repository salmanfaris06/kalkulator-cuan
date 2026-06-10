import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  INITIAL_FORM_DATA,
  INITIAL_LABOR_INPUTS,
  STORAGE_KEY,
  type FormData,
  type LaborHelperInputs,
  type LaborMethod,
  type SavedProduct,
} from "@/types/product";
import { calculate, calculateLaborCost } from "@/lib/calculations";
import { stripNonDigits } from "@/lib/format";

/** Field form yang harus disimpan sebagai digit murni. */
const FORM_INTEGER_FIELDS = new Set<keyof FormData>([
  "quantity",
  "costMaterial",
  "costPackaging",
  "costLabor",
  "costOther",
]);

const FORM_PERCENT_FIELDS = new Set<keyof FormData>([
  "targetMargin",
  "taxPercent",
  "discountSim",
]);

const LABOR_NUMBER_FIELDS = new Set<keyof LaborHelperInputs>([
  "selfSalary",
  "hourlyRate",
  "unitRate",
  "selfDays",
  "selfHours",
  "selfSpentHours",
  "hourlySpentHours",
]);

interface MarginState {
  // form
  formData: FormData;
  formError: string;
  setField: (name: keyof FormData, value: string) => void;
  resetForm: () => void;

  // labor modal
  laborInputs: LaborHelperInputs;
  setLaborField: (name: keyof LaborHelperInputs, value: string) => void;
  applyLaborCost: (method: LaborMethod) => void;

  // produk tersimpan
  savedProducts: SavedProduct[];
  saveProduct: () => boolean;
  loadProduct: (product: SavedProduct) => void;
  duplicateProduct: (product: SavedProduct) => void;
  deleteProduct: (id: number) => void;
}

export const useMarginStore = create<MarginState>()(
  persist(
    (set, get) => ({
      formData: INITIAL_FORM_DATA,
      formError: "",

      setField: (name, value) =>
        set((state) => ({
          formError: "",
          formData: {
            ...state.formData,
            [name]: FORM_INTEGER_FIELDS.has(name)
              ? stripNonDigits(value)
              : FORM_PERCENT_FIELDS.has(name)
                ? sanitizePercent(value)
                : value,
          },
        })),

      resetForm: () => set({ formData: INITIAL_FORM_DATA, formError: "" }),

      laborInputs: INITIAL_LABOR_INPUTS,

      setLaborField: (name, value) =>
        set((state) => ({
          laborInputs: {
            ...state.laborInputs,
            [name]: LABOR_NUMBER_FIELDS.has(name) ? stripNonDigits(value) : value,
          },
        })),

      applyLaborCost: (method) => {
        const { laborInputs, formData } = get();
        const cost = calculateLaborCost(method, laborInputs, formData.quantity);
        set((state) => ({
          formData: { ...state.formData, costLabor: cost.toString() },
        }));
      },

      savedProducts: [],

      saveProduct: () => {
        const { formData, savedProducts } = get();
        if (!formData.name.trim()) {
          set({ formError: "⚠️ Oops! Kasih nama produknya dulu ya." });
          return false;
        }

        const result = calculate(formData);
        const product: SavedProduct = {
          id: formData.id ?? Date.now(),
          name: formData.name,
          hppPerUnit: result.hppPerUnit,
          idealPrice: result.idealPrice,
          profitPerUnit: result.profitPerUnit,
          marginPercent: result.marginPercent,
          taxPercent: result.taxPercent,
          date: new Date().toLocaleDateString("id-ID"),
          formSnapshot: {
            name: formData.name,
            quantity: formData.quantity,
            costMaterial: formData.costMaterial,
            costPackaging: formData.costPackaging,
            costLabor: formData.costLabor,
            costOther: formData.costOther,
            targetMargin: formData.targetMargin,
            taxPercent: formData.taxPercent,
            discountSim: formData.discountSim,
          },
        };

        const updated = formData.id
          ? savedProducts.map((p) => (p.id === formData.id ? product : p))
          : [product, ...savedProducts];

        set({ savedProducts: updated });
        return true;
      },

      loadProduct: (product) =>
        set({
          formData: product.formSnapshot
            ? {
                id: product.id,
                ...product.formSnapshot,
              }
            : {
                id: product.id,
                name: product.name,
                quantity: "1",
                costMaterial: product.hppPerUnit.toString(),
                costPackaging: "",
                costLabor: "",
                costOther: "",
                targetMargin: product.marginPercent.toString(),
                taxPercent: product.taxPercent ? product.taxPercent.toString() : "0",
                discountSim: "0",
              },
          formError: "",
        }),

      duplicateProduct: (product) => {
        const copyName = `${product.name} (Copy)`;
        const copy: SavedProduct = {
          ...product,
          id: Date.now(),
          name: copyName,
          date: new Date().toLocaleDateString("id-ID"),
          formSnapshot: product.formSnapshot
            ? { ...product.formSnapshot, name: copyName }
            : undefined,
        };

        set((state) => ({
          savedProducts: [copy, ...state.savedProducts],
          formData: copy.formSnapshot
            ? {
                id: copy.id,
                ...copy.formSnapshot,
                name: copy.name,
              }
            : {
                id: copy.id,
                name: copy.name,
                quantity: "1",
                costMaterial: copy.hppPerUnit.toString(),
                costPackaging: "",
                costLabor: "",
                costOther: "",
                targetMargin: copy.marginPercent.toString(),
                taxPercent: copy.taxPercent ? copy.taxPercent.toString() : "0",
                discountSim: "0",
              },
          formError: "",
        }));
      },

      deleteProduct: (id) =>
        set((state) => ({
          savedProducts: state.savedProducts.filter((p) => p.id !== id),
        })),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Hanya persist daftar produk; form & UI state bersifat sementara.
      partialize: (state) => ({ savedProducts: state.savedProducts }),
      // Migrasi dari format lama (array produk mentah di key yang sama).
      migrate: (persisted) => {
        if (Array.isArray(persisted)) {
          return { savedProducts: persisted as SavedProduct[] };
        }
        return persisted as { savedProducts: SavedProduct[] };
      },
    },
  ),
);

function sanitizePercent(value: string): string {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const [head, ...rest] = normalized.split(".");
  const decimals = rest.join("").slice(0, 2);
  return decimals ? `${head}.${decimals}` : head;
}
