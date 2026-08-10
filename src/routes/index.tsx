import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LogoStage } from "@/components/LogoStage";
import { ApparelViewport } from "@/components/ApparelViewport";


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
  const [isLoaded, setIsLoaded] = useState(false);
  const handleDone = useCallback(() => setIsLoaded(true), []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian">
      <LogoStage onMorphComplete={handleDone} />

      {/* Background layers */}
      <div className="kumo-layer pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(115,8,0,0.18),transparent_60%)]"
        aria-hidden
      />


      {/* Foreground */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-white/5 px-6 py-5 font-mono text-[10px] tracking-[0.35em] text-steel uppercase">
          <span className="text-offwhite">HIKARI</span>
          <span>SS/26 — 光</span>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center px-6 py-10">
          <div
            className={`w-full max-w-4xl transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <ApparelViewport active={isLoaded} />
          </div>

          {isLoaded && (
            <div className="hikari-rise mt-10 flex flex-col items-center gap-6 text-center">
              <div className="border border-white/10 bg-zinc-surface px-5 py-2 font-mono text-[10px] tracking-[0.4em] text-steel uppercase">
                Drop 001 — Kumo Series
              </div>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-offwhite uppercase sm:text-6xl">
                Engineered for the <span className="text-hikari-red">Night Shift</span>
              </h1>
              <p className="max-w-md font-mono text-xs leading-relaxed tracking-widest text-steel">
                Industrial cuts, heavyweight fabrication, zero ornament.
              </p>

              <button
                type="button"
                className="rounded-none bg-hikari-red px-8 py-3 font-mono tracking-widest text-white uppercase shadow-[0_0_30px_-6px_#730800] transition-colors hover:bg-hikari-red-hot"
              >
                Shop Now
              </button>

              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="font-mono text-[10px] tracking-[0.4em] text-steel">
                  [ SCROLL TO EXPLORE ]
                </span>
                <ChevronDown className="chevron-pulse h-4 w-4 text-hikari-red" aria-hidden />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
