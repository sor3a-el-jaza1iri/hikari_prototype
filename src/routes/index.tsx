import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LogoStage, LOGO_BOX } from "@/components/LogoStage";
import { HikariLogo } from "@/components/HikariLogo";
import { ApparelViewport } from "@/components/ApparelViewport";
import { SiteHeader } from "@/components/SiteHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { StoreProvider, useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HIKARI — Industrial Streetwear" },
      {
        name: "description",
        content:
          "HIKARI: industrial streetwear engineered in obsidian and crimson. Oversized hoodies, graphic tees and coated shell jackets.",
      },
      { property: "og:title", content: "HIKARI — Industrial Streetwear" },
      {
        property: "og:description",
        content: "Industrial streetwear engineered in obsidian and crimson. Shop the HIKARI drop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  );
}

function Storefront() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleDone = useCallback(() => setIsLoaded(true), []);
  const { t } = useStore();

  return (
    <main className="relative w-full bg-obsidian">
      <div className="kumo-layer pointer-events-none absolute inset-0 z-0" aria-hidden />
      <LogoStage onDone={handleDone} />
      <SiteHeader isLoaded={isLoaded} />

      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background layers */}
        <div
          aria-hidden
          className={`pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${LOGO_BOX}`}
        >
          <HikariLogo className="w-full" mode="ambient" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_55%,rgba(115,8,0,0.18),transparent_60%)]"
          aria-hidden
        />

        {/* Isolated 3D viewport overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
          <div
            className={`h-[60vh] max-h-[600px] w-full max-w-4xl overflow-hidden transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <ApparelViewport active={isLoaded} />
          </div>
        </div>


        {/* Foreground */}
        <div className="relative z-20 flex min-h-screen flex-col">
          <div className="pointer-events-none flex flex-1 flex-col items-center justify-end px-4 pt-24 pb-10 sm:px-6">
            {isLoaded && (
              <div className="hikari-rise pointer-events-auto flex flex-col items-center gap-5 text-center sm:gap-6">
                <div className="border border-white/10 bg-zinc-surface px-4 py-2 font-mono text-[9px] tracking-[0.35em] text-steel uppercase sm:px-5 sm:text-[10px]">
                  {t("dropBadge")}
                </div>
                <h1 className="max-w-2xl text-3xl font-black tracking-tight text-offwhite uppercase sm:text-6xl">
                  {t("headline1")} <span className="text-hikari-red">{t("headline2")}</span>
                </h1>
                <p className="max-w-md font-mono text-xs tracking-wider text-steel uppercase md:text-sm">
                  {t("tagline")}
                </p>

                <a
                  href="#shop"
                  className="rounded-none bg-hikari-red px-10 py-4 font-mono text-xs tracking-widest md:text-sm text-white uppercase shadow-[0_0_30px_-6px_#730800] transition-colors hover:bg-hikari-red-hot"
                >
                  {t("shopNow")}
                </a>

                <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6">
                  <span className="font-mono text-[9px] tracking-[0.35em] text-steel sm:text-[10px]">
                    {t("scroll")}
                  </span>
                  <ChevronDown className="chevron-pulse h-4 w-4 text-hikari-red" aria-hidden />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductGrid />
    </main>
  );
}
