import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

const RED = "#730800";

type Garment = {
  name: string;
  code: string;
  color: string;
  /** torso [w,h,d] */
  torso: [number, number, number];
  sleeveLength: number;
  hood: boolean;
  collar: boolean;
};

export const GARMENTS: Garment[] = [
  {
    name: "OVERSIZED HOODIE",
    code: "HK-01 / KUMO FLEECE",
    color: "#1b1b1f",
    torso: [1.5, 1.9, 0.62],
    sleeveLength: 1.35,
    hood: true,
    collar: false,
  },
  {
    name: "GRAPHIC TEE",
    code: "HK-02 / RAW COTTON",
    color: "#2a2a2e",
    torso: [1.3, 1.65, 0.42],
    sleeveLength: 0.62,
    hood: false,
    collar: false,
  },
  {
    name: "STREETWEAR JACKET",
    code: "HK-03 / COATED SHELL",
    color: "#141418",
    torso: [1.62, 1.8, 0.7],
    sleeveLength: 1.45,
    hood: false,
    collar: true,
  },
];

function Apparel({ garment, active }: { garment: Garment; active: boolean }) {
  const group = useRef<Group>(null);
  const amount = useRef(active ? 1 : 0);
  const [w, h, d] = garment.torso;

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

  const fabric = useMemo(
    () => ({ color: garment.color, roughness: 0.85, metalness: 0.05 }),
    [garment.color],
  );

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      {/* torso */}
      <mesh castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial {...fabric} />
      </mesh>
      {/* shoulders */}
      <mesh position={[0, h / 2 - 0.08, 0]}>
        <boxGeometry args={[w + 0.14, 0.22, d + 0.04]} />
        <meshStandardMaterial {...fabric} />
      </mesh>
      {/* sleeves */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[s * (w / 2 + 0.16), h / 2 - garment.sleeveLength / 2 - 0.1, 0]}
          rotation={[0, 0, s * 0.12]}
        >
          <boxGeometry args={[0.34, garment.sleeveLength, d * 0.75]} />
          <meshStandardMaterial {...fabric} />
        </mesh>
      ))}
      {/* hood or collar */}
      {garment.hood && (
        <mesh position={[0, h / 2 + 0.18, -d * 0.28]} rotation={[0.35, 0, 0]}>
          <sphereGeometry args={[0.46, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          <meshStandardMaterial {...fabric} side={2} />
        </mesh>
      )}
      {garment.collar && (
        <mesh position={[0, h / 2 + 0.1, 0]}>
          <torusGeometry args={[0.34, 0.09, 12, 28]} />
          <meshStandardMaterial {...fabric} />
        </mesh>
      )}
      {/* brand chest mark */}
      <mesh position={[0, 0.12, d / 2 + 0.01]}>
        <planeGeometry args={[w * 0.42, 0.1]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Rig({ index }: { index: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-3, 2, -5]} intensity={6} color={RED} />
      <pointLight position={[0, -2, -3]} intensity={12} color={RED} distance={10} />
      {GARMENTS.map((g, i) => (
        <Apparel key={g.code} garment={g} active={i === index} />
      ))}
    </>
  );
}

export function ApparelViewport({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % GARMENTS.length), 3500);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return <div className="h-[46vh] min-h-[300px] w-full" aria-hidden />;

  return (
    <div className="relative h-[46vh] min-h-[300px] w-full">
      <Canvas camera={{ position: [0, 0.2, 4.6], fov: 42 }} dpr={[1, 1.8]} frameloop="always">
        <Rig index={index} />
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
