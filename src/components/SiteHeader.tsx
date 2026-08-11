import { ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { HikariLogo } from "./HikariLogo";
import { CartPopup } from "./CartPopup";

export function SiteHeader({ isLoaded }: { isLoaded: boolean }) {
  const { lang, setLang, t, count, cartOpen, setCartOpen, stockLevel } = useStore();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
        <a
          href="/"
          aria-label="Hikari"
          className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <HikariLogo className="h-8 w-auto max-w-[6rem] fill-none stroke-white text-white" mode="outline" />
        </a>

        <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
          <span className="hidden shrink-0 border border-white/10 px-2 py-1 font-mono text-[9px] tracking-[0.2em] text-steel uppercase sm:inline-block">
            [ {t("stock")}: {stockLevel}% ]
          </span>

          <div className="flex shrink-0 items-center border border-white/15 font-mono text-[10px] tracking-widest uppercase">
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2 py-1 transition-colors ${
                  lang === l ? "bg-hikari-red text-white" : "text-steel hover:text-offwhite"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCartOpen(!cartOpen)}
            aria-label={t("cart")}
            className="relative shrink-0 border border-white/15 p-2 text-offwhite transition-colors hover:border-hikari-red"
          >
            <ShoppingBag className="h-4 w-4 fill-current" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 grid h-4 min-w-4 place-items-center bg-hikari-red px-1 font-mono text-[9px] text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <span className="block border-t border-white/5 px-3 pb-1.5 text-right font-mono text-[9px] tracking-[0.2em] text-steel uppercase sm:hidden">
        [ {t("stock")}: {stockLevel}% ]
      </span>

      {cartOpen && (
        <div className="absolute top-full right-2 mt-2 flex w-[calc(100vw-1rem)] justify-end sm:right-6 sm:w-auto">
          <CartPopup />
        </div>
      )}
    </header>
  );
}
