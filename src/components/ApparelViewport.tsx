import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Group, Box3, Vector3, Mesh } from "three";
import { GARMENTS, type Garment } from "@/lib/garments";

export function StudioLights() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 7]} intensity={2.0} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} />
    </>
  );
}

export function GarmentMesh({ garment }: { garment: Garment }) {
  // useGLTF handles GLTF/GLB loading and automatically attaches a DRACOLoader decoder
  const { scene } = useGLTF(garment.gltfPath);

  // Clone and auto-normalize Scale + Position once using useMemo
  const normalizedObj = useMemo(() => {
    const cloned = scene.clone(true);

    // Ensure material properties handle transparency properly
    cloned.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (mesh.material) {
          const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          if (mat) {
            mat.transparent = true;
            mat.needsUpdate = true;
          }
        }
      }
    });

    // Calculate Bounding Box to center geometry at origin (0,0,0) and scale to standard height
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();

    box.getSize(size);
    box.getCenter(center);

    // Center the model's pivot
    cloned.position.x -= center.x;
    cloned.position.y -= center.y;
    cloned.position.z -= center.z;

    // Create a container group so the centering translation doesn't conflict with world scale
    const wrapper = new Group();
    wrapper.add(cloned);

    // Standardize height to approx ~2.2 units regardless of export scale
    const maxDimension = Math.max(size.x, size.y, size.z);
    if (maxDimension > 0) {
      const targetScale = 2.2 / maxDimension;
      wrapper.scale.setScalar(targetScale);
    }

    return wrapper;
  }, [scene]);

  return <primitive object={normalizedObj} />;
}

function Apparel({
  garment,
  active,
  sharedRotationRef,
}: {
  garment: Garment;
  active: boolean;
  sharedRotationRef: React.MutableRefObject<number>;
}) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    // Direct visibility toggle without scaling or opacity fading
    g.visible = active;

    if (active) {
      // Continuously update shared rotation angle
      sharedRotationRef.current += delta * 0.45;
      g.rotation.y = sharedRotationRef.current;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <GarmentMesh garment={garment} />
    </group>
  );
}

export function ApparelViewport({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sharedRotationRef = useRef(0);

  // Client hydration check for SSR environments
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % GARMENTS.length), 3500);
    return () => clearInterval(id);
  }, [active]);

  if (!active || !isClient) return null;

  return (
    <div className="pointer-events-none relative h-full w-full overflow-hidden">
      <Canvas
        className="pointer-events-auto h-full w-full"
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.8]}
        frameloop="always"
      >
        <StudioLights />
        <Suspense fallback={null}>
          {GARMENTS.map((g, i) => (
            <Apparel
              key={g.code}
              garment={g}
              active={i === index}
              sharedRotationRef={sharedRotationRef}
            />
          ))}
        </Suspense>
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

// Preload all assets into memory to ensure seamless swapping between models
GARMENTS.forEach((g) => {
  if (g.gltfPath) {
    useGLTF.preload(g.gltfPath);
  }
});