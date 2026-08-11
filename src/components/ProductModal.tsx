import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Garment } from "@/lib/garments";
import { useStore } from "@/lib/store";
import { GarmentMesh, StudioLights } from "./GarmentMesh";

const THUMB_FILTERS = [
  "",
  "grayscale contrast-125",
  "sepia hue-rotate-[300deg] saturate-150",
  "brightness-75 contrast-150",
];

export function ProductModal({ garment, onClose }: { garment: Garment; onClose: () => void }) {
  const { t, lang, add } = useStore();
  const [qty, setQty] = useState(1);
  const [view, setView] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={garment.name}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-white/15 bg-zinc-surface p-3 sm:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-2 right-2 z-10 border border-white/15 p-1.5 text-steel transition-colors hover:text-offwhite"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-4 md:grid-cols-2">
          {/* media stage */}
          <div className="flex gap-2">
            <div className="relative aspect-square min-w-0 flex-1 border border-white/10 bg-obsidian">
              {view === null ? (
                <Canvas camera={{ position: [0, 0.2, 4.4], fov: 42 }} dpr={[1, 1.8]}>
                  <StudioLights />
                  <group position={[0, -0.15, 0]}>
                    <GarmentMesh garment={garment} />
                  </group>
                  <OrbitControls enablePan={false} enableZoom={false} />
                </Canvas>
              ) : (
                <img
                  src={garment.image}
                  alt={garment.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className={`h-full w-full object-cover ${THUMB_FILTERS[view]}`}
                />
              )}
              <span className="pointer-events-none absolute bottom-1 left-2 font-mono text-[9px] tracking-[0.25em] text-steel uppercase">
                {view === null ? t("view3d") : `${garment.code}`}
              </span>
            </div>

            <div className="flex w-14 shrink-0 flex-col gap-2">
              <button
                type="button"
                onClick={() => setView(null)}
                className={`grid aspect-square place-items-center border font-mono text-[8px] tracking-widest uppercase ${
                  view === null ? "border-hikari-red text-offwhite" : "border-white/10 text-steel"
                }`}
              >
                3D
              </button>
              {THUMB_FILTERS.slice(0, 4).map((f, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setView(i)}
                  aria-label={`${garment.name} view ${i + 1}`}
                  className={`aspect-square border ${
                    view === i ? "border-hikari-red" : "border-white/10"
                  }`}
                >
                  <img
                    src={garment.image}
                    alt=""
                    loading="lazy"
                    width={768}
                    height={768}
                    className={`h-full w-full object-cover ${f}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* action panel */}
          <div className="flex min-w-0 flex-col">
            <p className="font-mono text-[10px] tracking-[0.3em] text-steel uppercase">
              {garment.drop} — {garment.code}
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-offwhite uppercase">
              {garment.name}
            </h2>
            <p className="mt-3 font-mono text-xs leading-relaxed text-steel">
              {garment.description[lang]}
            </p>

            <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-steel uppercase">
              {t("fabricSpecs")}
            </p>
            <p className="mt-1 font-mono text-xs leading-relaxed text-offwhite/80">
              {garment.fabric[lang]}
            </p>

            <p className="mt-4 font-mono text-xl text-offwhite">${garment.price.toFixed(2)}</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-steel uppercase">
                {t("quantity")}
              </span>
              <div className="flex items-center border border-white/15">
                <button
                  type="button"
                  aria-label="decrease"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-8 w-8 place-items-center text-offwhite hover:bg-white/10"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center font-mono text-xs text-offwhite">{qty}</span>
                <button
                  type="button"
                  aria-label="increase"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-8 w-8 place-items-center text-offwhite hover:bg-white/10"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                add(garment, qty);
                onClose();
              }}
              className="mt-5 w-full rounded-none bg-hikari-red px-6 py-3.5 font-mono text-xs md:text-sm tracking-widest text-white uppercase transition-colors hover:bg-hikari-red-hot"
            >
              {t("addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
