import { useState } from "react";
import { GARMENTS, type Garment } from "@/lib/garments";
import { useStore } from "@/lib/store";
import { ProductModal } from "./ProductModal";

function ProductCard({ garment, onOpen }: { garment: Garment; onOpen: () => void }) {
  const { t, add } = useStore();
  const few = garment.stock < 20;

  return (
    <article className="flex flex-col rounded-none border border-white/10 bg-zinc-surface p-2 transition-all hover:border-hikari-red md:p-3">
      <button type="button" onClick={onOpen} className="block text-left">
        <img
          src={garment.image}
          alt={garment.name}
          loading="lazy"
          width={768}
          height={768}
          className="aspect-square w-full object-cover"
        />
        <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-steel uppercase">
          {garment.drop}
        </p>
        <h3 className="mt-1 truncate text-sm font-bold tracking-tight text-offwhite uppercase md:text-base">
          {garment.name}
        </h3>
        <p className="mt-1 font-mono text-xs text-offwhite/80">${garment.price.toFixed(2)}</p>
        <p
          className={`mt-1 font-mono text-[9px] tracking-[0.2em] uppercase ${
            few ? "text-hikari-red-hot" : "text-emerald-500"
          }`}
        >
          {few ? t("fewLeft") : t("inStock")}
        </p>
      </button>
      <button
        type="button"
        onClick={() => add(garment)}
        className="mt-2 w-full rounded-none bg-hikari-red py-2 font-mono text-[10px] tracking-widest text-white uppercase transition-colors hover:bg-hikari-red-hot md:text-xs"
      >
        {t("addToCart")}
      </button>
    </article>
  );
}

export function ProductGrid() {
  const { t } = useStore();
  const [selected, setSelected] = useState<Garment | null>(null);

  return (
    <section id="shop" className="relative z-20 border-t border-white/5 bg-obsidian">
      <div className="px-4 pt-10 md:px-8">
        <h2 className="text-2xl font-black tracking-tight text-offwhite uppercase md:text-4xl">
          {t("collection")}
        </h2>
        <p className="mt-2 font-mono text-xs tracking-widest text-steel">{t("collectionSub")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3 md:gap-6 md:p-8 lg:grid-cols-4">
        {GARMENTS.map((g) => (
          <ProductCard key={g.id} garment={g} onOpen={() => setSelected(g)} />
        ))}
      </div>

      {selected && <ProductModal garment={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
