import { useEffect, useState } from "react";
import { HikariLogo } from "./HikariLogo";

export type LogoPhase = "draw" | "fill" | "dissolve" | "done";

/** Shared geometry so the loader logo and the hero watermark are pixel-identical. */
export const LOGO_BOX = "w-[80vw] max-w-6xl";

/**
 * Preloader overlay. The logo is rendered at the exact same size/coordinates as
 * the hero watermark beneath it, so when the overlay fades there is no shift.
 */
export function LogoStage({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<LogoPhase>("draw");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("fill"), 1500),
      setTimeout(() => setPhase("dissolve"), 2100),
      setTimeout(() => setPhase("done"), 2500),
      setTimeout(() => {
        setHidden(true);
        onDone();
      }, 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-obsidian transition-opacity duration-500 ease-out ${
        phase === "done" ? "opacity-0" : "opacity-100"
      }`}
    >
      <HikariLogo
        className={LOGO_BOX}
        mode={phase === "draw" ? "draw" : phase === "fill" ? "fill" : "ambient"}
      />

      <p
        className={`absolute inset-x-0 bottom-[18vh] text-center font-mono text-[10px] tracking-[0.5em] text-steel uppercase transition-opacity duration-300 ${
          phase === "draw" ? "opacity-100" : "opacity-0"
        }`}
      >
        Calibrating
      </p>
    </div>
  );
}
