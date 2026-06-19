import { adminDb } from "./firebaseAdmin.js";

// Revalida el pedido contra Firestore: productos activos, stock suficiente y monto coherente.
// El total del pedido debe ser >= subtotal de precios base (las personalizaciones SUMAN).
// Nota: la revalidación exacta de deltas de personalización requiere persistir la selección
// estructurada en el pedido (mejora futura); acá validamos contra el precio base.
export async function revalidateOrder(order: {
  items?: { productId: string; quantity: number }[];
  total?: number;
}): Promise<{ ok: boolean; reason?: string; baseSubtotal?: number }> {
  let baseSubtotal = 0;

  for (const item of order.items ?? []) {
    const snap = await adminDb().collection("products").doc(item.productId).get();
    if (!snap.exists) {
      return { ok: false, reason: "product_not_found" };
    }
    const product = snap.data() ?? {};
    if (!product.isActive) {
      return { ok: false, reason: "product_inactive" };
    }
    if (typeof product.stock === "number" && product.stock < item.quantity) {
      return { ok: false, reason: "out_of_stock" };
    }
    baseSubtotal += (product.priceArs ?? 0) * item.quantity;
  }

  if ((order.total ?? 0) < baseSubtotal) {
    return { ok: false, reason: "amount_mismatch" };
  }
  return { ok: true, baseSubtotal: baseSubtotal };
}
