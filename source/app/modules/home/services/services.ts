import type { HomeContentType } from "@app/modules/home/entities/entities";
import type { ProductType } from "@app/modules/main/entities/entities";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { SEED_PRODUCTS } from "@app/modules/main/helpers/seedData";
import { getSiteContent } from "@app/modules/main/helpers/siteContent";

// Productos destacados: desde Firestore (SDK) o seed si Firebase no está configurado.
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

// Contenido de la home: vive en código (editable desde Admin), NO en Firebase.
export async function getHomeContent(): Promise<HomeContentType> {
  return getSiteContent<HomeContentType>("home");
}
