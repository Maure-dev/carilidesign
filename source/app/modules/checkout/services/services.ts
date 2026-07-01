import type {
  CreatePreferenceResponseType,
  OrderDraftType
} from "@app/modules/checkout/entities/entities";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Crea el pedido en Firestore (pending_payment).
export async function createOrder(draft: OrderDraftType): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("firestore-unavailable");
  }
  const ref = await addDoc(collection(db, "orders"), {
    userId: draft.userId,
    items: draft.items,
    shipping: draft.shipping,
    shippingMethod: draft.shippingMethod,
    shippingCost: draft.shippingCost,
    paymentMethod: draft.paymentMethod,
    subtotal: draft.subtotal,
    total: draft.total,
    orderStatus: "pending_payment",
    paymentStatus: "pending",
    createdAt: serverTimestamp()
  });
  return ref.id;
}

// Llama a la Vercel Function que crea la preferencia de Mercado Pago.
export async function createPreference(
  orderId: string
): Promise<AxiosResponse<CreatePreferenceResponseType>> {
  return await axios.post("/api/create-preference", { orderId: orderId });
}
