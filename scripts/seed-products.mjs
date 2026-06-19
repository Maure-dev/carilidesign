// Carga productos de ejemplo en Firestore (colección `products`), para arrancar con datos.
// Opcional: después podés crear/editar productos desde el panel Admin.
//
// Requiere scripts/serviceAccount.json (ver set-admin.mjs).
// Uso:  node seed-products.mjs
import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccount.json", import.meta.url), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const SIZE = {
  id: "size",
  kind: "size",
  control: "select",
  label: "Medida",
  required: true,
  choices: [
    { id: "s", label: "Chica (35 cm)", priceDelta: 0 },
    { id: "m", label: "Mediana (42 cm)", priceDelta: 8000 },
    { id: "l", label: "Grande (50 cm)", priceDelta: 16000 }
  ]
};
const GLAZE = {
  id: "glaze",
  kind: "glaze",
  control: "swatch",
  label: "Esmalte",
  required: true,
  choices: [
    { id: "arena", label: "Arena", priceDelta: 0, swatchColor: "#e7dbc8" },
    { id: "terracota", label: "Terracota", priceDelta: 4000, swatchColor: "#c06b4e" },
    { id: "salvia", label: "Salvia", priceDelta: 4000, swatchColor: "#9caf88" },
    { id: "carbon", label: "Carbón", priceDelta: 6000, swatchColor: "#2a2521" }
  ]
};
const ENGRAVING = {
  id: "engraving",
  kind: "engraving",
  control: "text",
  label: "Grabado (opcional)",
  required: false,
  maxLength: 24,
  choices: [{ id: "engraving", label: "Grabado a mano", priceDelta: 5000 }]
};

function product(slug, name, description, priceArs, shape, isFeatured) {
  return {
    slug,
    name,
    description,
    shortDescription: description.slice(0, 90),
    category: "bachas",
    shape,
    baseColor: "arena",
    priceArs,
    images: [
      { url: `https://picsum.photos/seed/${slug}-1/900/1100`, alt: `${name} — vista principal`, isPrimary: true },
      { url: `https://picsum.photos/seed/${slug}-2/900/1100`, alt: `${name} — detalle` }
    ],
    customizationOptions: [SIZE, GLAZE, ENGRAVING],
    stock: 5,
    isActive: true,
    isFeatured,
    material: "Cerámica esmaltada",
    dimensions: { widthCm: 42, depthCm: 35, heightCm: 14 }
  };
}

const PRODUCTS = [
  product("bacha-luna", "Bacha Luna", "Pieza redonda de cerámica esmaltada, modelada a mano. Cada bacha es única.", 52000, "redonda", true),
  product("bacha-valle", "Bacha Valle", "Forma ovalada de líneas suaves, ideal para baños de estilo cálido y natural.", 58000, "ovalada", true),
  product("bacha-piedra", "Bacha Piedra", "Inspirada en cantos rodados, con textura mate y bordes irregulares hechos a mano.", 64000, "organica", true),
  product("bacha-sol", "Bacha Sol", "Diseño cuadrado contemporáneo con esmalte brillante de gran profundidad.", 61000, "cuadrada", false),
  product("bacha-rio", "Bacha Río", "Bacha de apoyo alargada, pensada para mesadas amplias. Acabado artesanal.", 72000, "alargada", false),
  product("bacha-monte", "Bacha Monte", "Cerámica de tono terroso con relieve sutil. Una pieza con carácter.", 55000, "redonda", false)
];

for (const p of PRODUCTS) {
  await db
    .collection("products")
    .doc(p.slug)
    .set({ ...p, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  console.log("OK:", p.name);
}

console.log(`Listo: ${PRODUCTS.length} productos cargados en Firestore.`);
process.exit(0);
