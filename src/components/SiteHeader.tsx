import { Package } from "lucide-react";
import { useStore } from "@/lib/store";
import { HikariLogo } from "./HikariLogo";
import { CartPopup } from "./CartPopup";

export function SiteHeader({ isLoaded }: { isLoaded: boolean }) {
  const { lang, setLang, t, count, cartOpen, setCartOpen } = useStore();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-3 py-3 sm:px-6 sm:py-4">
        <a
          href="/"
          aria-label="Hikari"
          className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <HikariLogo
            className="h-11 w-auto max-w-[9rem] fill-none stroke-white text-white sm:h-12 sm:max-w-[11rem]"
            mode="outline"
          />
        </a>

        <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
          <div className="flex shrink-0 items-center border border-white/15 font-mono text-xs tracking-widest uppercase md:text-sm">
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-4 py-2 transition-colors ${
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
            className="relative shrink-0 border border-white/15 p-2.5 text-offwhite transition-colors hover:border-hikari-red"
          >
            <Package className="h-5 w-5" strokeWidth={2.5} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center bg-hikari-red px-1 font-mono text-[10px] text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {cartOpen && (
        <div className="absolute top-full right-2 mt-2 flex w-[calc(100vw-1rem)] justify-end sm:right-6 sm:w-auto">
          <CartPopup />
        </div>
      )}
    </header>
  );
}
