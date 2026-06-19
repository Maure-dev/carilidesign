// Contenido y configuración del sitio. Vive EN CÓDIGO (defaults) con un override local
// opcional (localStorage) editable desde el Admin. NO usa Firebase: sólo productos,
// pedidos y mensajes usan Firebase.

const STORAGE_KEY = "carili_site_content";

// Defaults de todas las secciones editables (siteContent por slug).
export const SITE_DEFAULTS: Record<string, Record<string, unknown>> = {
  home: {
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
  },
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
  },
  contact: {
    email: "hola@carilidesign.com",
    phone: "+54 9 11 6982-8737",
    whatsapp: "5491169828737",
    instagram: "carili.design",
    address: "Lomas de Zamora 1622, Wilde, Buenos Aires, Argentina",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.72054126503!2d-58.310058423040935!3d-34.68700196190361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a332464030167d%3A0xd851e3dbc3c041c8!2sLomas%20de%20Zamora%201622%2C%20B1875FOL%20Wilde%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1781880738070!5m2!1sen!2sar"
  },
  payment: {
    bankName: "Banco (a configurar)",
    accountName: "Carili Design",
    cbu: "0000000000000000000000",
    alias: "carili.design",
    cashNote: "Coordinamos la entrega y el pago en efectivo por WhatsApp tras tu pedido."
  },
  shipping: {
    options: [
      { id: "pickup", name: "Retiro en taller", priceArs: 0 },
      { id: "correo", name: "Correo Argentino", priceArs: 8000 },
      { id: "andreani", name: "Andreani (a domicilio)", priceArs: 12000 }
    ]
  }
};

function loadOverrides(): Record<string, Record<string, unknown>> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function hasSiteContent(slug: string): boolean {
  return slug in SITE_DEFAULTS || slug in loadOverrides();
}

// Devuelve el contenido vigente de una sección: default de código + override local.
export function getSiteContent<T>(slug: string): T {
  const overrides = loadOverrides();
  const merged = { ...(SITE_DEFAULTS[slug] ?? {}), ...(overrides[slug] ?? {}) };
  return merged as unknown as T;
}

// Guarda el override local (no toca Firebase).
export function saveSiteContent(slug: string, doc: Record<string, unknown>): void {
  try {
    const all = loadOverrides();
    all[slug] = doc;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* noop: localStorage no disponible */
  }
}
