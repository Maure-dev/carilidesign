import { Link } from "react-router";
import { useCart } from "@app/modules/main/hooks/useCart";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import CheckoutStepperInterface from "@app/modules/main/interfaces/checkoutStepperInterface";
import CartItemInterface from "@app/modules/cart/interfaces/cartItemInterface";
import CartSummaryInterface from "@app/modules/cart/interfaces/cartSummaryInterface";

export default function CartModule() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();

  useDocumentHead({ title: "Carrito" });

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16">
        <EmptyBoxInterface message="Tu carrito está vacío." />
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
    <section className="mx-auto max-w-5xl px-4 py-10">
      <CheckoutStepperInterface current={0} />
      <div className="grid gap-10 md:grid-cols-[1fr_20rem]">
        <div>
          <h1 className="mb-4 font-display text-3xl text-ink">Tu carrito</h1>
          {items.map((item) => (
            <CartItemInterface
              key={item.id}
              item={item}
              onQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
        <aside>
          <CartSummaryInterface total={getTotal()} />
        </aside>
      </div>
    </section>
  );
}
