import type { ProductType } from "@app/modules/main/entities/entities";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { SEED_PRODUCTS } from "@app/modules/main/helpers/seedData";

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
  if (!isFirebaseConfigured || !db) {
    return SEED_PRODUCTS.find((p) => p.slug === slug && p.isActive) ?? null;
  }
  const ref = query(
    collection(db, "products"),
    where("slug", "==", slug),
    where("isActive", "==", true),
    limit(1)
  );
  const snap = await getDocs(ref);
  const d = snap.docs[0];
  return d ? ({ id: d.id, ...d.data() } as ProductType) : null;
}
