import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Payment } from "mercadopago";
import { getMpClient } from "./_lib/mercadopago.js";
import { adminDb } from "./_lib/firebaseAdmin.js";
import { addStatusHistory, getOrder, updateOrder } from "./_lib/orders.js";
import { verifyMpSignature } from "./_lib/signature.js";

function mapStatus(mpStatus: string): { paymentStatus: string; orderStatus: string } {
  if (mpStatus === "approved") {
    return { paymentStatus: "paid", orderStatus: "paid" };
  }
  if (mpStatus === "refunded" || mpStatus === "charged_back") {
    return { paymentStatus: "refunded", orderStatus: "cancelled" };
  }
  if (mpStatus === "cancelled") {
    return { paymentStatus: "rejected", orderStatus: "cancelled" };
  }
  if (mpStatus === "rejected") {
    return { paymentStatus: "rejected", orderStatus: "pending_payment" };
  }
  return { paymentStatus: "pending", orderStatus: "pending_payment" };
}

// POST /api/mp-webhook — Notificación de Mercado Pago.
// Verifica la firma, consulta el pago contra la API de MP (no confía en el payload),
// es idempotente (webhookLog) y actualiza el pedido con Admin SDK (server-authoritative).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const queryDataId = req.query["data.id"];
    const dataId = (Array.isArray(queryDataId) ? queryDataId[0] : queryDataId) ?? req.body?.data?.id;
    const eventId = String(dataId ?? "");

    if (!eventId || !verifyMpSignature(req, eventId)) {
      res.status(401).json({ error: "Firma inválida" });
      return;
    }

    const type = req.query.type ?? req.body?.type;
    if (type !== "payment") {
      res.status(200).json({ ok: true });
      return;
    }

    const eventRef = adminDb().collection("webhookLog").doc(eventId);
    if ((await eventRef.get()).exists) {
      res.status(200).json({ ok: true, duplicate: true });
      return;
    }

    const payment = await new Payment(getMpClient()).get({ id: eventId });
    const orderId = payment.external_reference;
    if (!orderId) {
      res.status(200).json({ ok: true });
      return;
    }
    const order = await getOrder(orderId);
    if (!order) {
      res.status(200).json({ ok: true });
      return;
    }

    const mapped = mapStatus(payment.status ?? "pending");
    await updateOrder(orderId, {
      paymentStatus: mapped.paymentStatus,
      orderStatus: mapped.orderStatus,
      mp: { ...(order.mp ?? {}), paymentId: payment.id, mpStatus: payment.status },
      ...(mapped.paymentStatus === "paid" ? { paidAt: new Date().toISOString() } : {})
    });
    await addStatusHistory(orderId, {
      to: mapped.orderStatus,
      changedBy: "system",
      reason: `mp:${payment.status}`,
      at: new Date().toISOString()
    });
    await eventRef.set({ type: "payment", processedAt: new Date().toISOString(), orderId: orderId });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("mp-webhook error:", error);
    res.status(200).json({ ok: false });
  }
}
