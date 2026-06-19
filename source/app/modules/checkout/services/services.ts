import type { AxiosResponse } from "axios";
import axios from "axios";
import type {
  CreatePreferenceResponseType,
  OrderDraftType,
  ShippingOptionType
} from "@app/modules/checkout/entities/entities";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { getSiteContent } from "@app/modules/main/helpers/siteContent";
import { DEFAULT_SHIPPING_OPTIONS } from "@app/modules/checkout/constants/constants";

// Crea el pedido en Firestore (pending_payment). En modo demo (sin Firebase) devuelve un id simulado.
export async function createOrder(draft: OrderDraftType): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    return `demo-${draft.items.length}-${draft.total}`;
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

// Opciones de envío: viven en código (editables desde Admin), NO en Firebase.
export async function getShippingOptions(): Promise<ShippingOptionType[]> {
  const content = getSiteContent<{ options?: ShippingOptionType[] }>("shipping");
  return content.options && content.options.length > 0 ? content.options : DEFAULT_SHIPPING_OPTIONS;
}

// Llama a la Vercel Function que crea la preferencia de Mercado Pago.
export async function createPreference(
  orderId: string
): Promise<AxiosResponse<CreatePreferenceResponseType>> {
  return await axios.post("/api/create-preference", { orderId: orderId });
}
