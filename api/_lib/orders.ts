import { adminDb } from "./firebaseAdmin.js";

export async function getOrder(orderId: string) {
  const snap = await adminDb().collection("orders").doc(orderId).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}

export async function updateOrder(orderId: string, patch: Record<string, unknown>) {
  await adminDb().collection("orders").doc(orderId).set(patch, { merge: true });
}

export async function addStatusHistory(orderId: string, entry: Record<string, unknown>) {
  await adminDb().collection("orders").doc(orderId).collection("statusHistory").add(entry);
}
