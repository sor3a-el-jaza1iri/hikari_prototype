import { Minus, Plus, X } from "lucide-react";
import { useStore } from "@/lib/store";

export function CartPopup() {
  const { lines, total, setQty, remove, setCartOpen, t } = useStore();

  return (
    <div className="w-full max-w-sm rounded-none border border-white/15 bg-zinc-surface p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-steel uppercase">
        <span>{t("cart")}</span>
        <button
          type="button"
          onClick={() => setCartOpen(false)}
          aria-label={t("close")}
          className="p-1 text-steel transition-colors hover:text-offwhite"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {lines.length === 0 ? (
        <p className="py-8 text-center font-mono text-[10px] tracking-[0.3em] text-steel uppercase">
          {t("emptyCart")}
        </p>
      ) : (
        <ul className="max-h-[45vh] space-y-3 overflow-y-auto pr-1">
          {lines.map((l) => (
            <li
              key={l.garment.id}
              className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 border border-white/5 p-2"
            >
              <img
                src={l.garment.image}
                alt={l.garment.name}
                loading="lazy"
                width={768}
                height={768}
                className="h-12 w-12 shrink-0 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-mono text-[11px] tracking-widest text-offwhite uppercase">
                  {l.garment.name}
                </p>
                <p className="font-mono text-[10px] text-steel">
                  ${l.garment.price.toFixed(2)}
                  {l.size ? ` / ${"SIZE"} ${l.size}` : ""}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="decrease"
                    onClick={() => setQty(l.garment.id, l.qty - 1)}
                    className="grid h-6 w-6 place-items-center border border-white/15 text-offwhite transition-colors hover:bg-white/10"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-5 text-center font-mono text-[11px] text-offwhite">
                    {l.qty}
                  </span>
                  <button
                    type="button"
                    aria-label="increase"
                    onClick={() => setQty(l.garment.id, l.qty + 1)}
                    className="grid h-6 w-6 place-items-center border border-white/15 text-offwhite transition-colors hover:bg-white/10"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                aria-label={t("remove")}
                onClick={() => remove(l.garment.id)}
                className="shrink-0 self-start p-1 text-steel transition-colors hover:text-hikari-red-hot"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="mb-3 flex items-center justify-between font-mono text-xs tracking-[0.25em] text-offwhite uppercase">
          <span>{t("total")}</span>
          <span className="text-hikari-red-hot">${total.toFixed(2)}</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="w-[60%] rounded-none border border-white/20 px-5 py-3 font-mono text-xs md:text-sm text-white uppercase transition-colors hover:bg-white/10"
          >
            {t("continueShopping")}
          </button>
          <button
            type="button"
            className="w-[40%] rounded-none bg-hikari-red px-5 py-3 font-mono text-xs md:text-sm text-white uppercase transition-colors hover:bg-hikari-red-hot"
          >
            {t("finishOrder")}
          </button>
        </div>
      </div>
    </div>
  );
}
