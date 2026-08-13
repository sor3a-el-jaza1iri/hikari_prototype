import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LogoStage, LOGO_BOX } from "@/components/LogoStage";
import { HikariLogo } from "@/components/HikariLogo";
import {ApparelViewport} from '@/components/ApparelViewport';
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
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_55%,rgba(115,8,0,0.15)_30%,rgba(115,8,0,0.25)_35%,rgba(255,255,255,0.95)_30%,rgba(255,255,255,1)_35%,rgba(255,255,255,0.4)_30%,transparent_36%)] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
          aria-hidden
        />

        {/* Isolated 3D viewport overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
          <div
            className={`h-[60vh] max-h-[600px] w-full max-w-4xl overflow-hidden transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <ApparelViewport active={true} />
          </div>
        </div>


        {/* Foreground */}
        <div className="relative z-20 flex min-h-screen flex-col justify-end">
          <div className="pointer-events-none flex flex-1 flex-col items-center justify-end px-4 pt-24 pb-8 sm:px-6 sm:pb-12">
            {isLoaded && (
              <div className="hikari-rise pointer-events-auto flex flex-col items-center text-center space-y-4 sm:space-y-6 max-w-3xl w-full">
                {/* Drop Badge */}
                <div className="border border-white/10 bg-zinc-surface px-4 py-2 font-mono text-[9px] tracking-[0.35em] text-steel uppercase sm:px-5 sm:text-[10px]">
                  {t("dropBadge")}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-black tracking-tight text-offwhite uppercase leading-tight sm:text-6xl sm:leading-none">
                  {t("headline1")}{" "}
                  <span className="block sm:inline text-hikari-red">
                    {t("headline2")}
                  </span>
                </h1>

                {/* Shop CTA Button (Lowered with explicit responsive margins) */}
                <div className="pt-16 sm:pt-8">
                  <a
                    href="#shop"
                    className="inline-block rounded-none bg-hikari-red px-8 py-3.5 font-mono text-xs tracking-widest text-white uppercase shadow-[0_0_30px_-6px_#730800] transition-all hover:bg-hikari-red-hot sm:px-10 sm:py-4 sm:text-sm"
                  >
                    {t("shopNow")}
                  </a>
                </div>

                {/* Scroll Indicator */}
                <div className="pt-2 flex flex-col items-center gap-2 sm:pt-4">
                  <span className="font-mono text-[10px] tracking-[0.35em] text-white font-semibold sm:text-[10px]">
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
