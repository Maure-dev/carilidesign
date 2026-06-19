import { adminDb } from "./firebaseAdmin.js";

export type OrderDoc = {
  id: string;
  userId?: string | null;
  items?: { productId: string; quantity: number; name?: string; unitPrice?: number }[];
  subtotal?: number;
  total?: number;
  shippingCost?: number;
  shippingMethod?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  orderStatus?: string;
  mp?: Record<string, unknown>;
};

export async function getOrder(orderId: string): Promise<OrderDoc | null> {
  const snap = await adminDb().collection("orders").doc(orderId).get();
  if (!snap.exists) {
    return null;
  }
  return { id: snap.id, ...(snap.data() as Record<string, unknown>) } as OrderDoc;
}

export async function updateOrder(orderId: string, patch: Record<string, unknown>) {
  await adminDb().collection("orders").doc(orderId).set(patch, { merge: true });
}

export async function addStatusHistory(orderId: string, entry: Record<string, unknown>) {
  await adminDb().collection("orders").doc(orderId).collection("statusHistory").add(entry);
}
