import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth } from "../_lib/firebaseAdmin.js";
import { addStatusHistory, getOrder, updateOrder } from "../_lib/orders.js";

// POST /api/admin/confirm-payment — Confirmación MANUAL de pago (efectivo / transferencia).
// Sólo admin. El estado 'paid' sigue siendo server-authoritative.
// Body: { orderId, approved: boolean }. Header: Authorization: Bearer <idToken>.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const authHeader = req.headers.authorization ?? "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!idToken) {
    res.status(401).json({ error: "Falta token" });
    return;
  }

  try {
    const caller = await adminAuth().verifyIdToken(idToken);
    if (caller.admin !== true) {
      res.status(403).json({ error: "No autorizado" });
      return;
    }

    const { orderId, approved } = (req.body ?? {}) as { orderId?: string; approved?: boolean };
    if (!orderId) {
      res.status(400).json({ error: "Falta orderId" });
      return;
    }

    const order = await getOrder(orderId);
    if (!order) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    if (order.paymentMethod === "mercadopago") {
      res.status(409).json({ error: "Los pagos de Mercado Pago se confirman por webhook" });
      return;
    }

    const paymentStatus = approved ? "paid" : "rejected";
    const orderStatus = approved ? "paid" : order.orderStatus;
    await updateOrder(orderId, {
      paymentStatus: paymentStatus,
      orderStatus: orderStatus,
      ...(approved ? { paidAt: new Date().toISOString() } : {})
    });
    await addStatusHistory(orderId, {
      to: orderStatus,
      changedBy: caller.uid,
      reason: approved ? "manual_payment_confirmed" : "manual_payment_rejected",
      at: new Date().toISOString()
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("confirm-payment error:", error);
    res.status(500).json({ error: "No se pudo confirmar el pago" });
  }
}
