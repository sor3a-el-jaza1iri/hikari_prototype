import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { GARMENTS, type Garment } from "@/lib/garments";

/* ---------------- i18n ---------------- */

const DICT = {
  en: {
    shopNow: "SHOP NOW",
    total: "TOTAL",
    addToCart: "ADD TO CART",
    stock: "STOCK",
    cart: "BAG",
    emptyCart: "YOUR BAG IS EMPTY",
    continueShopping: "CONTINUE SHOPPING",
    finishOrder: "FINISH ORDER",
    inStock: "IN STOCK",
    fewLeft: "FEW LEFT",
    collection: "THE DROP",
    collectionSub: "Industrial cuts, heavyweight fabrication, zero ornament.",
    quantity: "QTY",
    fabricSpecs: "FABRIC SPECS",
    close: "CLOSE",
    scroll: "[ SCROLL TO EXPLORE ]",
    headline1: "Engineered for the",
    headline2: "Night Shift",
    tagline: "original anime insp. designs",
    dropBadge: "Drop 001 — Kumo Series",
    remove: "REMOVE",
    view3d: "3D VIEW",
  },
  fr: {
    shopNow: "ACHETER",
    total: "TOTAL",
    addToCart: "AJOUTER AU PANIER",
    stock: "STOCK",
    cart: "PANIER",
    emptyCart: "VOTRE PANIER EST VIDE",
    continueShopping: "CONTINUER MES ACHATS",
    finishOrder: "FINALISER LA COMMANDE",
    inStock: "EN STOCK",
    fewLeft: "DERNIÈRES PIÈCES",
    collection: "LE DROP",
    collectionSub: "Coupes industrielles, tissage lourd, zéro ornement.",
    quantity: "QTÉ",
    fabricSpecs: "COMPOSITION",
    close: "FERMER",
    scroll: "[ FAITES DÉFILER ]",
    headline1: "Conçu pour le",
    headline2: "Night Shift",
    tagline: "original anime insp. designs",
    dropBadge: "Drop 001 — Série Kumo",
    remove: "RETIRER",
    view3d: "VUE 3D",
  },
} as const;

export type Lang = keyof typeof DICT;
export type TKey = keyof (typeof DICT)["en"];

/* ---------------- cart ---------------- */

export type CartLine = { garment: Garment; qty: number };

type StoreValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
  lines: CartLine[];
  count: number;
  total: number;
  add: (g: Garment, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  stockLevel: number;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const t = useCallback((k: TKey) => DICT[lang][k], [lang]);

  const add = useCallback((g: Garment, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.garment.id === g.id);
      if (found) {
        return prev.map((l) => (l.garment.id === g.id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { garment: g, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.garment.id !== id)
        : prev.map((l) => (l.garment.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.garment.id !== id));
  }, []);

  const value = useMemo<StoreValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.garment.price, 0);
    const stockLevel = Math.round(
      GARMENTS.reduce((n, g) => n + g.stock, 0) / GARMENTS.length,
    );
    return {
      lang,
      setLang,
      t,
      lines,
      count,
      total,
      add,
      setQty,
      remove,
      cartOpen,
      setCartOpen,
      stockLevel,
    };
  }, [lang, t, lines, add, setQty, remove, cartOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
