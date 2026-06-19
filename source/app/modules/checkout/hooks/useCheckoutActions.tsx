import type { ShippingFormType } from "@app/modules/checkout/entities/entities";
import type { PaymentMethodType } from "@app/modules/main/entities/entities";
import { useCheckoutProvider } from "@app/modules/checkout/states/checkoutProvider";
import { useCart } from "@app/modules/main/hooks/useCart";
import { useSession } from "@app/modules/main/hooks/useSession";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { createOrder, createPreference } from "@app/modules/checkout/services/services";
import { validateCheckout } from "@app/modules/checkout/helpers/validateCheckout";

export const useCheckoutActions = () => {
  const { getCheckoutState, setCheckoutState } = useCheckoutProvider();
  const { items, getTotal, clearCart } = useCart();
  const { user } = useSession();
  const { onNotification } = useNotification();
  const router = useRouter();

  const handleChangeField = (field: keyof ShippingFormType, value: string): void => {
    setCheckoutState((s) => ({
      ...s,
      form: { ...s.form, [field]: value },
      errors: { ...s.errors, [field]: undefined }
    }));
  };

  const handleSetMethod = (method: PaymentMethodType): void => {
    setCheckoutState((s) => ({ ...s, method: method }));
  };

  const handleSubmit = async (): Promise<void> => {
    const { form, method } = getCheckoutState;
    const errors = validateCheckout(form);
    if (Object.keys(errors).length > 0) {
      setCheckoutState((s) => ({ ...s, errors: errors }));
      onNotification(false, "Revisá los datos del formulario.");
      return;
    }
    if (items.length === 0) {
      onNotification(false, "Tu carrito está vacío.");
      return;
    }

    setCheckoutState((s) => ({ ...s, submitting: true }));
    try {
      const total = getTotal();
      const orderId = await createOrder({
        userId: user?.uid ?? null,
        items: items,
        shipping: form,
        paymentMethod: method,
        subtotal: total,
        total: total
      });

      // Pago online: crear preferencia y redirigir a Mercado Pago.
      if (method === "mercadopago" && isFirebaseConfigured) {
        const res = await createPreference(orderId);
        clearCart();
        window.location.assign(res.data.initPoint);
        return;
      }

      // Transferencia / efectivo (o modo demo): pedido pendiente de confirmación.
      clearCart();
      router.navigate(`/pago/pendiente?order=${orderId}&metodo=${method}`);
    } catch {
      onNotification(false, "No se pudo procesar el pedido. Intentá de nuevo.");
      setCheckoutState((s) => ({ ...s, submitting: false }));
    }
  };

  return { handleChangeField, handleSetMethod, handleSubmit };
};
