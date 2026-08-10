import { useEffect, useState } from "react";
import { HikariLogo } from "./HikariLogo";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"draw" | "fill" | "out">("draw");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fill"), 1500);
    const t2 = setTimeout(() => setPhase("out"), 2100);
    const t3 = setTimeout(() => onDone(), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian transition-opacity duration-500 ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
    >
      <HikariLogo className="w-[62vw] max-w-3xl" mode={phase === "draw" ? "draw" : "fill"} />
      <p className="mt-10 font-mono text-[10px] tracking-[0.5em] text-steel uppercase">
        {phase === "draw" ? "Calibrating" : "System ready"}
      </p>
    </div>
  );
}
