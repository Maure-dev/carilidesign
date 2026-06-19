import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Preference } from "mercadopago";
import { getMpClient } from "./_lib/mercadopago.js";
import { getOrder, updateOrder } from "./_lib/orders.js";
import { revalidateOrder } from "./_lib/validation.js";

// POST /api/create-preference  Body: { orderId }
// Relee el pedido y los productos de Firestore, revalida el monto (server-authoritative)
// y crea la preferencia de Mercado Pago. El access token vive sólo en el servidor.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }
  const orderId = (req.body ?? {}).orderId;
  if (!orderId) {
    res.status(400).json({ error: "Falta orderId" });
    return;
  }

  try {
    const order = await getOrder(orderId);
    if (!order) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    if (order.orderStatus !== "pending_payment") {
      res.status(409).json({ error: "El pedido no está pendiente de pago" });
      return;
    }

    const check = await revalidateOrder(order);
    if (!check.ok) {
      res.status(409).json({ error: "Validación fallida", reason: check.reason });
      return;
    }

    const baseUrl = process.env.APP_BASE_URL ?? "";
    const preference = new Preference(getMpClient());
    const result = await preference.create({
      body: {
        items: [
          {
            id: orderId,
            title: "Pedido Carili Design",
            quantity: 1,
            unit_price: order.total ?? 0,
            currency_id: "ARS"
          }
        ],
        external_reference: orderId,
        back_urls: {
          success: `${baseUrl}/pago/exito`,
          failure: `${baseUrl}/pago/error`,
          pending: `${baseUrl}/pago/pendiente`
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/mp-webhook`
      }
    });

    await updateOrder(orderId, { mp: { ...(order.mp ?? {}), preferenceId: result.id } });
    res.status(200).json({ initPoint: result.init_point, preferenceId: result.id });
  } catch (error) {
    console.error("create-preference error:", error);
    res.status(500).json({ error: "No se pudo crear la preferencia" });
  }
}
