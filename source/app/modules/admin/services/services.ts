import type { ProductType } from "@app/modules/main/entities/entities";
import type {
  AdminContentDocType,
  AdminMessageType,
  AdminOrderType,
  AdminUserType,
  ProductDraftType
} from "@app/modules/admin/entities/entities";
import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { fetchSiteContent, saveSiteContent } from "@app/modules/main/services/siteContent";

function requireDb() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("firestore-unavailable");
  }
  return db;
}

export async function listAllProducts(): Promise<ProductType[]> {
  const database = requireDb();
  const snap = await getDocs(collection(database, "products"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProductType);
}

export async function saveProduct(draft: ProductDraftType): Promise<void> {
  const database = requireDb();
  const data = {
    name: draft.name,
    slug: draft.slug,
    description: draft.description,
    category: draft.category,
    shape: draft.shape,
    priceArs: draft.priceArs,
    stock: draft.stock,
    isActive: draft.isActive,
    isFeatured: draft.isFeatured,
    images: draft.images,
    customizationOptions: [],
    updatedAt: serverTimestamp()
  };
  if (draft.id) {
    await setDoc(doc(database, "products", draft.id), data, { merge: true });
  } else {
    await addDoc(collection(database, "products"), { ...data, createdAt: serverTimestamp() });
  }
}

export async function deleteProductById(id: string): Promise<void> {
  const database = requireDb();
  await deleteDoc(doc(database, "products", id));
}

export async function listAllOrders(): Promise<AdminOrderType[]> {
  const database = requireDb();
  const snap = await getDocs(query(collection(database, "orders"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as AdminOrderType);
}

export async function transitionOrder(orderId: string, to: string, idToken: string): Promise<void> {
  await axios.post(
    "/api/admin/orders-status",
    { orderId: orderId, to: to },
    { headers: { Authorization: `Bearer ${idToken}` } }
  );
}

export async function confirmPayment(
  orderId: string,
  approved: boolean,
  idToken: string
): Promise<void> {
  await axios.post(
    "/api/admin/confirm-payment",
    { orderId: orderId, approved: approved },
    { headers: { Authorization: `Bearer ${idToken}` } }
  );
}

// Contenido del sitio: lee/escribe el documento real en Firestore (siteContent/{slug}).
export async function getContentDoc(slug: string): Promise<AdminContentDocType> {
  return fetchSiteContent<AdminContentDocType>(slug);
}

export async function saveContentDoc(slug: string, content: AdminContentDocType): Promise<void> {
  await saveSiteContent(slug, content);
}

export async function listMessages(): Promise<AdminMessageType[]> {
  const database = requireDb();
  const snap = await getDocs(
    query(collection(database, "contactMessages"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as AdminMessageType);
}

export async function markMessageRead(id: string): Promise<void> {
  const database = requireDb();
  await updateDoc(doc(database, "contactMessages", id), { read: true });
}

export async function listUsers(idToken: string): Promise<AdminUserType[]> {
  const res = await axios.get<{ users: AdminUserType[] }>("/api/admin/users", {
    headers: { Authorization: `Bearer ${idToken}` }
  });
  return res.data.users;
}

export async function setUserRole(uid: string, admin: boolean, idToken: string): Promise<void> {
  await axios.post(
    "/api/admin/set-role",
    { uid: uid, admin: admin },
    { headers: { Authorization: `Bearer ${idToken}` } }
  );
}
