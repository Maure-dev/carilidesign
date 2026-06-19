import type { CustomizationOptionType, ProductType } from "@app/modules/main/entities/entities";

// Datos de ejemplo usados como fallback mientras Firebase no esté configurado.
// Permiten que la tienda sea navegable y demostrable en dev. En producción
// los services leen de Firestore (ver isFirebaseConfigured en services/firebase).

function img(seed: string, alt: string, isPrimary = false) {
  return {
    url: `https://picsum.photos/seed/${seed}/900/1100`,
    alt: alt,
    isPrimary: isPrimary
  };
}

const SIZE_OPTION: CustomizationOptionType = {
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

const GLAZE_OPTION: CustomizationOptionType = {
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

const ENGRAVING_OPTION: CustomizationOptionType = {
  id: "engraving",
  kind: "engraving",
  control: "text",
  label: "Grabado (opcional)",
  required: false,
  maxLength: 24,
  choices: [{ id: "engraving", label: "Grabado a mano", priceDelta: 5000 }]
};

function makeProduct(
  id: string,
  slug: string,
  name: string,
  description: string,
  priceArs: number,
  shape: string,
  isFeatured: boolean
): ProductType {
  return {
    id: id,
    slug: slug,
    name: name,
    description: description,
    shortDescription: description.slice(0, 90),
    category: "bachas",
    shape: shape,
    baseColor: "arena",
    priceArs: priceArs,
    images: [
      img(`${slug}-1`, `${name} — vista principal`, true),
      img(`${slug}-2`, `${name} — detalle`)
    ],
    customizationOptions: [SIZE_OPTION, GLAZE_OPTION, ENGRAVING_OPTION],
    stock: 5,
    isActive: true,
    isFeatured: isFeatured,
    material: "Cerámica esmaltada",
    dimensions: { widthCm: 42, depthCm: 35, heightCm: 14 }
  };
}

export const SEED_PRODUCTS: ProductType[] = [
  makeProduct(
    "p1",
    "bacha-luna",
    "Bacha Luna",
    "Pieza redonda de cerámica esmaltada, modelada a mano. Cada bacha es única.",
    52000,
    "redonda",
    true
  ),
  makeProduct(
    "p2",
    "bacha-valle",
    "Bacha Valle",
    "Forma ovalada de líneas suaves, ideal para baños de estilo cálido y natural.",
    58000,
    "ovalada",
    true
  ),
  makeProduct(
    "p3",
    "bacha-piedra",
    "Bacha Piedra",
    "Inspirada en cantos rodados, con textura mate y bordes irregulares hechos a mano.",
    64000,
    "organica",
    true
  ),
  makeProduct(
    "p4",
    "bacha-sol",
    "Bacha Sol",
    "Diseño cuadrado contemporáneo con esmalte brillante de gran profundidad.",
    61000,
    "cuadrada",
    false
  ),
  makeProduct(
    "p5",
    "bacha-rio",
    "Bacha Río",
    "Bacha de apoyo alargada, pensada para mesadas amplias. Acabado artesanal.",
    72000,
    "alargada",
    false
  ),
  makeProduct(
    "p6",
    "bacha-monte",
    "Bacha Monte",
    "Cerámica de tono terroso con relieve sutil. Una pieza con carácter.",
    55000,
    "redonda",
    false
  )
];
