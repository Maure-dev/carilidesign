import type { ProductType } from "@app/modules/main/entities/entities";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { SEED_PRODUCTS } from "@app/modules/main/helpers/seedData";

// Productos activos del catálogo. Fallback a seed sin Firebase.
export async function getActiveProducts(): Promise<ProductType[]> {
  if (!isFirebaseConfigured || !db) {
    return SEED_PRODUCTS.filter((p) => p.isActive);
  }
  const ref = query(collection(db, "products"), where("isActive", "==", true));
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProductType);
}
