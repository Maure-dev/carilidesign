import type { ProductType } from "@app/modules/main/entities/entities";
import type {
  AdminContentDocType,
  AdminMessageType,
  AdminOrderType,
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
import { SEED_PRODUCTS } from "@app/modules/main/helpers/seedData";
import { getSiteContent, saveSiteContent } from "@app/modules/main/helpers/siteContent";

// ── Datos de ejemplo para previsualizar el panel en modo demo (sin Firebase) ──
const DEMO_ORDERS: AdminOrderType[] = [
  {
    id: "demo-1",
    orderNumber: "0001",
    userId: "demo",
    total: 60000,
    paymentMethod: "bank_transfer",
    paymentStatus: "in_review",
    orderStatus: "pending_payment"
  },
  {
    id: "demo-2",
    orderNumber: "0002",
    userId: "demo",
    total: 52000,
    paymentMethod: "mercadopago",
    paymentStatus: "paid",
    orderStatus: "paid"
  },
  {
    id: "demo-3",
    orderNumber: "0003",
    userId: "demo",
    total: 72000,
    paymentMethod: "cash",
    paymentStatus: "pending",
    orderStatus: "pending_payment"
  }
];

const DEMO_MESSAGES: AdminMessageType[] = [
  {
    id: "m1",
    name: "Cliente Demo",
    email: "demo@correo.com",
    message: "Hola, ¿hacen envíos a Córdoba? Me interesa la Bacha Luna.",
    read: false
  }
];

export async function listAllProducts(): Promise<ProductType[]> {
  if (!isFirebaseConfigured || !db) {
    return SEED_PRODUCTS;
  }
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProductType);
}

export async function saveProduct(draft: ProductDraftType): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    return;
  }
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
    await setDoc(doc(db, "products", draft.id), data, { merge: true });
  } else {
    await addDoc(collection(db, "products"), { ...data, createdAt: serverTimestamp() });
  }
}

export async function deleteProductById(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    return;
  }
  await deleteDoc(doc(db, "products", id));
}

export async function listAllOrders(): Promise<AdminOrderType[]> {
  if (!isFirebaseConfigured || !db) {
    return DEMO_ORDERS;
  }
  const snap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as AdminOrderType);
}

export async function transitionOrder(orderId: string, to: string, idToken: string): Promise<void> {
  if (!isFirebaseConfigured) {
    return;
  }
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
  if (!isFirebaseConfigured) {
    return;
  }
  await axios.post(
    "/api/admin/confirm-payment",
    { orderId: orderId, approved: approved },
    { headers: { Authorization: `Bearer ${idToken}` } }
  );
}

// Contenido del sitio: vive en código + override local (no Firebase). Muestra el contenido vigente.
export async function getContentDoc(slug: string): Promise<AdminContentDocType> {
  return getSiteContent<AdminContentDocType>(slug);
}

export async function saveContentDoc(slug: string, content: AdminContentDocType): Promise<void> {
  saveSiteContent(slug, content);
}

export async function listMessages(): Promise<AdminMessageType[]> {
  if (!isFirebaseConfigured || !db) {
    return DEMO_MESSAGES;
  }
  const snap = await getDocs(
    query(collection(db, "contactMessages"), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as AdminMessageType);
}

export async function markMessageRead(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    return;
  }
  await updateDoc(doc(db, "contactMessages", id), { read: true });
}
