import type { ProductType, SiteContentMapType } from "@app/modules/main/entities/entities";
import { collection, getDocs } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";

export type SiteBootstrapType = {
  content: SiteContentMapType;
  products: ProductType[];
};

// Carga inicial del sitio: trae todo el contenido (siteContent) y los productos desde
// Firestore en una sola tanda. Lanza si Firebase no está configurado o la lectura falla;
// el caller (MainProvider) muestra la pantalla de mantenimiento en ese caso.
export async function fetchSiteBootstrap(): Promise<SiteBootstrapType> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("firestore-unavailable");
  }
  const [contentSnap, productsSnap] = await Promise.all([
    getDocs(collection(db, "siteContent")),
    getDocs(collection(db, "products"))
  ]);

  const content: SiteContentMapType = {};
  contentSnap.forEach((d) => {
    content[d.id] = d.data() as Record<string, unknown>;
  });

  const products = productsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProductType);

  return { content: content, products: products };
}
