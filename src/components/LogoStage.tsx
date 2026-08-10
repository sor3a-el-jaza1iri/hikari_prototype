import { useEffect, useState } from "react";
import { HikariLogo } from "./HikariLogo";

export type LogoPhase = "draw" | "fill" | "morph" | "ambient";

/**
 * Persistent Hikari logo. It draws, fills crimson, then morphs (never unmounts)
 * into the full-bleed ambient background watermark.
 */
export function LogoStage({ onMorphComplete }: { onMorphComplete: () => void }) {
  const [phase, setPhase] = useState<LogoPhase>("draw");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("fill"), 1500),
      setTimeout(() => setPhase("morph"), 2150),
      setTimeout(() => {
        setPhase("ambient");
        onMorphComplete();
      }, 3350),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onMorphComplete]);

  const isBackground = phase === "morph" || phase === "ambient";

  return (
    <>
      {/* Obsidian curtain fades away as the logo morphs back */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-40 bg-obsidian transition-opacity duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isBackground ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 flex items-center justify-center ${
          isBackground ? "z-0" : "z-50"
        }`}
      >
        <HikariLogo
          className={`logo-stage w-[62vw] max-w-3xl transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            isBackground ? "scale-[2.2] opacity-100" : "scale-100 opacity-100"
          }`}
          mode={phase === "draw" ? "draw" : isBackground ? "ambient" : "fill"}
        />
      </div>

      <p
        aria-hidden={isBackground}
        className={`pointer-events-none fixed inset-x-0 bottom-[22vh] z-50 text-center font-mono text-[10px] tracking-[0.5em] text-steel uppercase transition-opacity duration-500 ${
          isBackground ? "opacity-0" : "opacity-100"
        }`}
      >
        {phase === "draw" ? "Calibrating" : "System ready"}
      </p>
    </>
  );
}
