import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth } from "../_lib/firebaseAdmin.js";
import { addStatusHistory, getOrder, updateOrder } from "../_lib/orders.js";

// Máquina de estados de fulfillment (no toca el estado de pago).
const ALLOWED: Record<string, string[]> = {
  pending_payment: ["cancelled"],
  paid: ["in_production", "cancelled"],
  in_production: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: []
};

// POST /api/admin/orders-status — Transición de estado del pedido (sólo admin, server-authoritative).
// Body: { orderId, to }. Header: Authorization: Bearer <idToken>.
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

    const { orderId, to } = (req.body ?? {}) as { orderId?: string; to?: string };
    if (!orderId || !to) {
      res.status(400).json({ error: "Faltan datos" });
      return;
    }

    const order = await getOrder(orderId);
    if (!order) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }

    const from = order.orderStatus ?? "";
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      res.status(409).json({ error: "Transición no permitida" });
      return;
    }

    await updateOrder(orderId, { orderStatus: to });
    await addStatusHistory(orderId, {
      from: from,
      to: to,
      changedBy: caller.uid,
      at: new Date().toISOString()
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("orders-status error:", error);
    res.status(500).json({ error: "No se pudo actualizar el estado" });
  }
}
