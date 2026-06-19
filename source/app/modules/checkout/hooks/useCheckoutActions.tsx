import type { CheckoutStepType, ShippingFormType } from "@app/modules/checkout/entities/entities";
import type { PaymentMethodType } from "@app/modules/main/entities/entities";
import { useCheckoutProvider } from "@app/modules/checkout/states/checkoutProvider";
import { useCart } from "@app/modules/main/hooks/useCart";
import { useSession } from "@app/modules/main/hooks/useSession";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { isFirebaseConfigured } from "@app/modules/main/services/firebase";
import {
  createOrder,
  createPreference,
  getShippingOptions
} from "@app/modules/checkout/services/services";
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

  const handleSetStep = (step: CheckoutStepType): void => {
    setCheckoutState((s) => ({ ...s, step: step }));
  };

  const handleBackToCart = (): void => {
    router.navigate("/carrito");
  };

  const handleLoadShipping = async (): Promise<void> => {
    try {
      const options = await getShippingOptions();
      setCheckoutState((s) => ({ ...s, shippingOptions: options }));
    } catch {
      /* se mantienen las opciones por defecto */
    }
  };

  const handleSelectShipping = (id: string): void => {
    setCheckoutState((s) => ({ ...s, shippingMethodId: id }));
  };

  // Paso 1 → 2: valida los datos de envío y que haya un envío elegido.
  const handleContinueToPayment = (): void => {
    const errors = validateCheckout(getCheckoutState.form);
    if (Object.keys(errors).length > 0) {
      setCheckoutState((s) => ({ ...s, errors: errors }));
      onNotification(false, "Revisá los datos del formulario.");
      return;
    }
    if (!getCheckoutState.shippingMethodId) {
      onNotification(false, "Elegí una opción de envío.");
      return;
    }
    setCheckoutState((s) => ({ ...s, step: "payment", errors: {} }));
  };

  const handleSubmit = async (): Promise<void> => {
    const { form, method, shippingOptions, shippingMethodId } = getCheckoutState;
    const errors = validateCheckout(form);
    if (Object.keys(errors).length > 0) {
      setCheckoutState((s) => ({ ...s, step: "shipping", errors: errors }));
      onNotification(false, "Revisá los datos del formulario.");
      return;
    }
    if (items.length === 0) {
      onNotification(false, "Tu carrito está vacío.");
      return;
    }
    const shipping = shippingOptions.find((o) => o.id === shippingMethodId);
    if (!shipping) {
      setCheckoutState((s) => ({ ...s, step: "shipping" }));
      onNotification(false, "Elegí una opción de envío.");
      return;
    }

    setCheckoutState((s) => ({ ...s, submitting: true }));
    try {
      const subtotal = getTotal();
      const total = subtotal + shipping.priceArs;
      const orderId = await createOrder({
        userId: user?.uid ?? null,
        items: items,
        shipping: form,
        shippingMethod: shipping.name,
        shippingCost: shipping.priceArs,
        paymentMethod: method,
        subtotal: subtotal,
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

  return {
    handleChangeField,
    handleSetMethod,
    handleSetStep,
    handleBackToCart,
    handleLoadShipping,
    handleSelectShipping,
    handleContinueToPayment,
    handleSubmit
  };
};
