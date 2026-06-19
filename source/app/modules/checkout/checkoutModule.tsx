import { Link } from "react-router";
import { useCheckoutProvider } from "@app/modules/checkout/states/checkoutProvider";
import { useCheckoutActions } from "@app/modules/checkout/hooks/useCheckoutActions";
import { useCart } from "@app/modules/main/hooks/useCart";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import CheckoutFormInterface from "@app/modules/checkout/interfaces/checkoutFormInterface";
import PaymentMethodInterface from "@app/modules/checkout/interfaces/paymentMethodInterface";
import CheckoutSummaryInterface from "@app/modules/checkout/interfaces/checkoutSummaryInterface";

export default function CheckoutModule() {
  const { getCheckoutState } = useCheckoutProvider();
  const { handleChangeField, handleSetMethod, handleSubmit } = useCheckoutActions();
  const { items, getTotal } = useCart();
  const { form, method, errors, submitting } = getCheckoutState;

  useDocumentHead({ title: "Checkout" });

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

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-10 md:grid-cols-[1fr_20rem]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-3xl text-ink">Finalizar compra</h1>
          <CheckoutFormInterface form={form} errors={errors} onChange={handleChangeField} />
        </div>
        <PaymentMethodInterface method={method} onSelect={handleSetMethod} />
      </div>
      <aside className="flex flex-col gap-4">
        <CheckoutSummaryInterface items={items} total={getTotal()} />
        <ButtonInterface onClick={handleSubmit} disabled={submitting} block>
          {submitting ? "Procesando..." : "Confirmar pedido"}
        </ButtonInterface>
      </aside>
    </section>
  );
}
