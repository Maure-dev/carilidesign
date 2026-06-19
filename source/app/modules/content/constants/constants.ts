import type { ContentDataType, PageContentType } from "@app/modules/content/entities/entities";

// Mapeo ruta -> slug del documento de contenido.
export const ROUTE_TO_SLUG: Record<string, string> = {
  "/nosotros": "about",
  "/materiales-y-proceso": "materials",
  "/como-instalar": "install",
  "/como-lavar": "care",
  "/preguntas-frecuentes": "faq"
};

export const DEFAULT_PAGES: Record<string, PageContentType> = {
  about: {
    slug: "about",
    title: "Nosotros",
    intro: "Cerámica de autor, hecha a mano en Argentina.",
    body: [
      "Carili Design nace del oficio de la cerámica: cada bacha se modela, esmalta y cuece a mano en nuestro taller.",
      "Creemos en las piezas únicas, en los materiales nobles y en el valor de lo hecho con tiempo y dedicación. No producimos en serie: cada bacha tiene su textura, su color y su carácter.",
      "Trabajamos por encargo y a medida, acompañando a cada cliente para que su pieza sea exactamente como la imagina."
    ],
    imageUrl: "https://picsum.photos/seed/carili-nosotros/1000/700"
  },
  materials: {
    slug: "materials",
    title: "Materiales y proceso",
    intro: "De la arcilla a tu baño, paso a paso.",
    body: [
      "Usamos arcillas de alta temperatura y esmaltes propios, libres de plomo, aptos para el contacto con agua.",
      "El proceso comienza con el modelado a mano o en torno. Luego viene el secado, la primera cocción (bizcocho), el esmaltado y una segunda cocción a más de 1200°C que vitrifica la pieza y la hace resistente e impermeable.",
      "Las pequeñas variaciones de color y textura no son defectos: son la huella del trabajo artesanal y hacen que tu bacha sea irrepetible."
    ],
    imageUrl: "https://picsum.photos/seed/carili-materiales/1000/700"
  },
  install: {
    slug: "install",
    title: "¿Cómo la instalo?",
    intro: "Recomendaciones para una instalación segura.",
    body: [
      "Nuestras bachas son de apoyo: se colocan sobre la mesada. Te recomendamos que la instalación la realice un plomero o instalador con experiencia.",
      "1. Marcá la posición del desagüe sobre la mesada y realizá la perforación según el diámetro de la válvula.",
      "2. Colocá la válvula de desagüe con su sellador correspondiente y ajustá sin forzar la cerámica.",
      "3. Apoyá la bacha y conectá el desagüe al sifón. Usá grifería de pared o de mesada alta (tipo monocomando) según el modelo.",
      "4. Verificá que no haya pérdidas antes del primer uso. Evitá golpes y herramientas metálicas en contacto directo con el esmalte."
    ]
  },
  care: {
    slug: "care",
    title: "¿Cómo la lavo?",
    intro: "Cuidados para que dure muchos años.",
    body: [
      "Limpiá la bacha con agua, jabón neutro y un paño o esponja suave. La superficie esmaltada es impermeable y fácil de mantener.",
      "Evitá productos abrasivos, esponjas de acero y limpiadores con ácidos o cloro concentrado: pueden opacar el esmalte con el tiempo.",
      "Para manchas difíciles, dejá actuar agua tibia con bicarbonato y enjuagá. No uses la bacha como superficie de apoyo para objetos pesados o filosos.",
      "Ante cambios bruscos de temperatura (agua hirviendo sobre cerámica fría) tené precaución para evitar el shock térmico."
    ]
  },
  faq: {
    slug: "faq",
    title: "Preguntas frecuentes",
    intro: "Resolvemos las dudas más comunes.",
    body: [],
    faq: [
      {
        question: "¿Las bachas son aptas para uso diario?",
        answer:
          "Sí. La doble cocción a alta temperatura vitrifica la cerámica y la hace resistente, impermeable y apta para el uso cotidiano en el baño."
      },
      {
        question: "¿Puedo personalizar el color y la medida?",
        answer:
          "Sí. En cada producto podés elegir la medida, el esmalte y agregar un grabado. Si necesitás algo especial, escribinos por Contacto."
      },
      {
        question: "¿Cuánto tarda en llegar?",
        answer:
          "Al ser piezas hechas a mano, los tiempos varían según el modelo y la personalización. Te informamos el plazo estimado al confirmar el pedido."
      },
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos Mercado Pago (tarjetas y otros medios), transferencia bancaria y efectivo a coordinar."
      },
      {
        question: "¿Hacen envíos a todo el país?",
        answer:
          "Sí, realizamos envíos a todo el país con embalaje reforzado para proteger la pieza durante el transporte."
      }
    ]
  }
};

export const INITIAL_STATE = {
  CONTENT_PAGE: {
    loading: true,
    page: null,
    error: null
  } satisfies ContentDataType
};
