import type { HomeContentType, HomeDataType } from "@app/modules/home/entities/entities";

export const DEFAULT_HOME_CONTENT: HomeContentType = {
  heroTitle: "Bachas de baño hechas a mano",
  heroSubtitle:
    "Cerámica de autor, modelada y esmaltada a mano en Argentina. Cada pieza es única y se puede personalizar.",
  heroImageUrl: "https://picsum.photos/seed/carili-hero/1200/1400",
  valueProps: [
    { title: "Hecho a mano", text: "Cada bacha se modela y esmalta artesanalmente." },
    { title: "Pieza única", text: "No hay dos iguales: textura y color irrepetibles." },
    { title: "Personalizable", text: "Elegí medida, esmalte y grabado a tu gusto." },
    { title: "Envíos a todo el país", text: "Embalaje cuidado y pago seguro." }
  ],
  processTitle: "El oficio detrás de cada pieza",
  processText:
    "Trabajamos la cerámica con técnicas tradicionales: torno, esmaltes propios y cocción a alta temperatura. El resultado son bachas resistentes, con la calidez y las pequeñas imperfecciones que solo da el trabajo a mano.",
  processImageUrl: "https://picsum.photos/seed/carili-proceso/1000/1200"
};

export const INITIAL_STATE = {
  HOME_PAGE: {
    loading: true,
    featured: [],
    content: DEFAULT_HOME_CONTENT,
    error: null
  } satisfies HomeDataType
};
