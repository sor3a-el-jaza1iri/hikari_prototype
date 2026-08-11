import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";
import { GARMENTS, type Garment } from "@/lib/garments";
import { GarmentMesh, StudioLights } from "./GarmentMesh";

function Apparel({ garment, active }: { garment: Garment; active: boolean }) {
  const group = useRef<Group>(null);
  const amount = useRef(active ? 1 : 0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const target = active ? 1 : 0;
    amount.current += (target - amount.current) * Math.min(1, delta * 4);
    const a = amount.current;
    g.visible = a > 0.01;
    g.scale.setScalar(0.75 + a * 0.25);
    g.rotation.y += delta * 0.45;
    g.traverse((o) => {
      const mat = (o as unknown as { material?: { opacity: number; transparent: boolean } })
        .material;
      if (mat) {
        mat.transparent = true;
        mat.opacity = a;
      }
    });
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <GarmentMesh garment={garment} />
    </group>
  );
}

export function ApparelViewport({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % GARMENTS.length), 3500);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none relative h-full w-full">
      <Canvas
        className="pointer-events-auto"
        camera={{ position: [0, 0.2, 4.6], fov: 42 }}
        dpr={[1, 1.8]}
        frameloop="always"
      >
        <StudioLights />
        {GARMENTS.map((g, i) => (
          <Apparel key={g.code} garment={g} active={i === index} />
        ))}
      </Canvas>
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.35em] text-steel uppercase">
        {GARMENTS[index]?.name}
        <span className="mt-1 block text-[9px] tracking-[0.25em] text-steel/60">
          {GARMENTS[index]?.code}
        </span>
      </div>
    </div>
  );
}
