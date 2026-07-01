import type { OrderType } from "@app/modules/account/entities/entities";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";

export async function getMyOrders(uid: string | null): Promise<OrderType[]> {
  if (!isFirebaseConfigured || !db || !uid) {
    return [];
  }
  const ref = query(
    collection(db, "orders"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as OrderType);
}

export async function getOrderById(id: string): Promise<OrderType | null> {
  if (!isFirebaseConfigured || !db) {
    return null;
  }
  const snap = await getDoc(doc(db, "orders", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as OrderType) : null;
}
