import { useCheckoutActions } from "@app/modules/checkout/hooks/useCheckoutActions";
import CheckoutFormInterface from "@app/modules/checkout/interfaces/checkoutFormInterface";
import CheckoutSummaryInterface from "@app/modules/checkout/interfaces/checkoutSummaryInterface";
import PaymentMethodInterface from "@app/modules/checkout/interfaces/paymentMethodInterface";
import ShippingOptionsInterface from "@app/modules/checkout/interfaces/shippingOptionsInterface";
import { useCheckoutProvider } from "@app/modules/checkout/states/checkoutProvider";
import { useCart } from "@app/modules/main/hooks/useCart";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import CheckoutStepperInterface from "@app/modules/main/interfaces/checkoutStepperInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import { useEffect } from "react";
import { Link } from "react-router";

export default function CheckoutModule() {
  const { getCheckoutState } = useCheckoutProvider();
  const {
    handleChangeField,
    handleSetMethod,
    handleSetStep,
    handleBackToCart,
    handleLoadShipping,
    handleSelectShipping,
    handleContinueToPayment,
    handleSubmit
  } = useCheckoutActions();
  const { items, getTotal } = useCart();
  const { step, form, method, shippingOptions, shippingMethodId, errors, submitting } =
    getCheckoutState;

  useDocumentHead({ title: "Checkout" });

  useEffect(() => {
    handleLoadShipping();
  }, []);

  const selectedShipping = shippingOptions.find((o) => o.id === shippingMethodId) ?? null;
  const shippingCost = selectedShipping ? selectedShipping.priceArs : null;
  const subtotal = getTotal();
  const total = subtotal + (shippingCost ?? 0);

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16">
        <EmptyBoxInterface message="No hay productos para finalizar la compra." />
        <Link
          to="/catalogo"
          className="rounded-buttons bg-clay px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-deep"
        >
          Ver catálogo
        </Link>
      </section>
    );
  }

  const onStepNavigate = (index: number) => {
    if (index === 0) {
      handleBackToCart();
    } else if (index === 1) {
      handleSetStep("shipping");
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <CheckoutStepperInterface current={step === "shipping" ? 1 : 2} onNavigate={onStepNavigate} />

      <div className="grid gap-10 md:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-6">
          {step === "shipping" ? (
            <>
              <h1 className="font-display text-3xl text-ink">Datos de envío</h1>
              <CheckoutFormInterface form={form} errors={errors} onChange={handleChangeField} />
              <ShippingOptionsInterface
                options={shippingOptions}
                selectedId={shippingMethodId}
                onSelect={handleSelectShipping}
              />
              <ButtonInterface variant="secondary" onClick={handleBackToCart} className="w-fit">
                ← Volver al carrito
              </ButtonInterface>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl text-ink">Método de pago</h1>
              <PaymentMethodInterface method={method} onSelect={handleSetMethod} />
              <ButtonInterface
                variant="secondary"
                onClick={() => handleSetStep("shipping")}
                className="w-fit"
              >
                ← Volver a datos de envío
              </ButtonInterface>
            </>
          )}
        </div>

        {/* Resumen del pedido: visible en todos los pasos del stepper */}
        <aside className="flex flex-col gap-4 self-start md:sticky md:top-24">
          <CheckoutSummaryInterface items={items} shippingCost={shippingCost} total={total} />
          {step === "shipping" ? (
            <ButtonInterface onClick={handleContinueToPayment} block>
              Continuar al pago →
            </ButtonInterface>
          ) : (
            <ButtonInterface onClick={handleSubmit} disabled={submitting} block>
              {submitting ? "Procesando..." : "Confirmar pedido"}
            </ButtonInterface>
          )}
        </aside>
      </div>
    </section>
  );
}
