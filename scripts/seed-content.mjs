// Carga el contenido inicial de las secciones en Firestore (colección `siteContent`),
// para que la data del sitio venga de Firebase y sea editable desde Admin.
// NO pisa secciones que ya existan: podés re-correrlo sin perder tus ediciones.
//
// Requiere scripts/serviceAccount.json (ver set-admin.mjs).
// Uso:  node seed-content.mjs
import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccount.json", import.meta.url), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// Snapshot del contenido inicial (espejo de SITE_DEFAULTS del front).
const CONTENT = {
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
  },
  terms: {
    slug: "terms",
    title: "Términos y condiciones",
    intro: "Condiciones de uso del sitio y de compra en Carili Design.",
    body: [
      "Estos términos regulan el uso del sitio y la compra de productos de Carili Design. Al realizar un pedido, aceptás estas condiciones.",
      "Nuestros productos son piezas de cerámica hechas y esmaltadas a mano. Por su naturaleza artesanal pueden existir pequeñas variaciones de color, textura y medidas respecto de las fotos; no se consideran defectos.",
      "Los precios están expresados en pesos argentinos (ARS) e incluyen impuestos cuando corresponde. Podemos actualizarlos sin previo aviso; el precio válido es el vigente al momento de confirmar el pedido.",
      "Aceptamos los medios de pago indicados en el checkout (Mercado Pago, transferencia bancaria y efectivo a coordinar). El pedido se considera confirmado una vez acreditado el pago.",
      "Los envíos se realizan a través de los correos y con los costos informados en el checkout. Los plazos son estimados y pueden variar según la zona y el transporte.",
      "Al tratarse de productos artesanales y, en muchos casos, personalizados, los cambios y devoluciones se evalúan caso por caso. Si tu pedido llega dañado, escribinos dentro de las 48 horas de recibido adjuntando fotos para gestionar una solución.",
      "Las imágenes, textos y la marca del sitio son propiedad de Carili Design y no pueden reproducirse sin autorización.",
      "Ante cualquier duda podés escribirnos desde la sección Contacto."
    ]
  },
  privacy: {
    slug: "privacy",
    title: "Política de privacidad",
    intro: "Cómo tratamos y protegemos tus datos personales.",
    body: [
      "En Carili Design cuidamos tus datos personales. Esta política explica qué información recopilamos y cómo la usamos.",
      "Recopilamos los datos que nos brindás al crear tu cuenta o realizar un pedido (nombre, email, teléfono y dirección de envío) para procesar y entregar tu compra y para contactarte por tu pedido.",
      "Los pagos se procesan a través de Mercado Pago; no almacenamos los datos de tu tarjeta. La gestión de cuentas y pedidos se realiza sobre servicios de Google Firebase.",
      "No vendemos ni cedemos tus datos a terceros con fines comerciales. Sólo compartimos la información necesaria con los proveedores de pago y de envío para completar tu compra.",
      "Usamos el almacenamiento local del navegador para recordar tu carrito y el progreso de la compra. No se utiliza con fines publicitarios.",
      "Podés solicitar el acceso, la corrección o la eliminación de tus datos escribiéndonos desde la sección Contacto."
    ]
  }
};

let created = 0;
let skipped = 0;
for (const [slug, data] of Object.entries(CONTENT)) {
  const ref = db.collection("siteContent").doc(slug);
  const snap = await ref.get();
  if (snap.exists) {
    console.log("skip (ya existe):", slug);
    skipped += 1;
    continue;
  }
  await ref.set(data);
  console.log("OK:", slug);
  created += 1;
}

console.log(`Listo: ${created} secciones creadas, ${skipped} ya existían.`);
process.exit(0);
