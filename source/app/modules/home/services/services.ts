import type { HomeContentType } from "@app/modules/home/entities/entities";
import type { ProductType } from "@app/modules/main/entities/entities";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { SEED_PRODUCTS } from "@app/modules/main/helpers/seedData";
import { DEFAULT_HOME_CONTENT } from "@app/modules/home/constants/constants";

// Lee de Firestore (SDK). Si Firebase no está configurado, usa datos de ejemplo (seed).
export async function getFeaturedProducts(max = 3): Promise<ProductType[]> {
  if (!isFirebaseConfigured || !db) {
    return SEED_PRODUCTS.filter((p) => p.isFeatured && p.isActive).slice(0, max);
  }
  const ref = query(
    collection(db, "products"),
    where("isActive", "==", true),
    where("isFeatured", "==", true),
    limit(max)
  );
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProductType);
}

export async function getHomeContent(): Promise<HomeContentType> {
  if (!isFirebaseConfigured || !db) {
    return DEFAULT_HOME_CONTENT;
  }
  const snap = await getDoc(doc(db, "siteContent", "home"));
  if (!snap.exists()) {
    return DEFAULT_HOME_CONTENT;
  }
  return { ...DEFAULT_HOME_CONTENT, ...(snap.data() as Partial<HomeContentType>) };
}
