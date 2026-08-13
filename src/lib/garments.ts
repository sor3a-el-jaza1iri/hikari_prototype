import hoodieImg from "@/assets/hoodie.jpg";
import teeImg from "@/assets/tee.jpg";
import jacketImg from "@/assets/jacket.jpg";

export const RED = "#730800";

export type Garment = {
  id: string;
  name: string;
  code: string;
  drop: string;
  color: string;
  price: number;
  image: string;
  stock: number;
  fabric: { en: string; fr: string };
  description: { en: string; fr: string };
  /** torso [w,h,d] */
  torso: [number, number, number];
  sleeveLength: number;
  hood: boolean;
  collar: boolean;
  gltfPath: string;
};

export const GARMENTS: Garment[] = [
  {
    id: "hk-01",
    name: "OVERSIZED HOODIE",
    code: "HK-01 / KUMO FLEECE",
    drop: "[ DROP_001 ]",
    color: "#1b1b1f",
    price: 245,
    image: hoodieImg,
    stock: 78,
    fabric: {
      en: "620gsm brushed kumo fleece / 100% raw cotton / boxed shoulder",
      fr: "Molleton kumo gratté 620g/m² / 100% coton brut / épaule carrée",
    },
    description: {
      en: "Heavyweight night-shift hoodie cut oversized with dropped shoulders and a double-layer hood.",
      fr: "Sweat à capuche lourd coupe oversize, épaules tombantes et capuche double épaisseur.",
    },
    torso: [1.5, 1.9, 0.62],
    sleeveLength: 1.35,
    hood: true,
    collar: false,
    gltfPath: '/3d/Shirt Long Sleeves/Shirt Long Sleeves.glb',
  },
  {
    id: "hk-02",
    name: "GRAPHIC TEE",
    code: "HK-02 / RAW COTTON",
    drop: "[ DROP_001 ]",
    color: "#2a2a2e",
    price: 95,
    image: teeImg,
    stock: 34,
    fabric: {
      en: "240gsm raw cotton jersey / tubular body / crimson chest mark",
      fr: "Jersey coton brut 240g/m² / corps tubulaire / marque crimson",
    },
    description: {
      en: "Industrial-cut tee with a tubular body and a screen-printed crimson mark.",
      fr: "T-shirt de coupe industrielle, corps tubulaire et marque crimson sérigraphiée.",
    },
    torso: [1.3, 1.65, 0.42],
    sleeveLength: 0.62,
    hood: false,
    collar: false,
    gltfPath: '/3d/jacket/Jacket.glb',
  },
  {
    id: "hk-03",
    name: "STREETWEAR JACKET",
    code: "HK-03 / COATED SHELL",
    drop: "[ DROP_002 ]",
    color: "#141418",
    price: 390,
    image: jacketImg,
    stock: 9,
    fabric: {
      en: "Coated nylon shell / taped seams / matte hardware",
      fr: "Coque nylon enduite / coutures étanchées / quincaillerie mate",
    },
    description: {
      en: "Weather-sealed shell jacket engineered for the night shift. Zero ornament.",
      fr: "Veste coque étanche conçue pour le night shift. Zéro ornement.",
    },
    torso: [1.62, 1.8, 0.7],
    sleeveLength: 1.45,
    hood: false,
    collar: true,
    gltfPath: '/3d/female_jacket/Female_Jacket.gltf',
  },
];