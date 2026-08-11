import { useMemo } from "react";
import { RED, type Garment } from "@/lib/garments";

/** Procedural garment built from primitives — shared by hero + product modal. */
export function GarmentMesh({ garment }: { garment: Garment }) {
  const [w, h, d] = garment.torso;
  const fabric = useMemo(
    () => ({ color: garment.color, roughness: 0.85, metalness: 0.05 }),
    [garment.color],
  );

  return (
    <>
      <mesh castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial {...fabric} />
      </mesh>
      <mesh position={[0, h / 2 - 0.08, 0]}>
        <boxGeometry args={[w + 0.14, 0.22, d + 0.04]} />
        <meshStandardMaterial {...fabric} />
      </mesh>
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
      <mesh position={[0, 0.12, d / 2 + 0.01]}>
        <planeGeometry args={[w * 0.42, 0.1]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.5} />
      </mesh>
    </>
  );
}

export function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-3, 2, -5]} intensity={6} color={RED} />
      <pointLight position={[0, -2, -3]} intensity={12} color={RED} distance={10} />
    </>
  );
}
