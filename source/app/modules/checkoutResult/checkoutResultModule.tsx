import { Link } from "react-router";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { getStatusFromPath } from "@app/modules/checkoutResult/helpers/getStatusFromPath";

const COPY = {
  success: {
    title: "¡Gracias por tu compra!",
    text: "Recibimos tu pago. Te enviamos la confirmación por email y vas a poder seguir el estado en Mi cuenta."
  },
  error: {
    title: "No pudimos procesar el pago",
    text: "El pago fue rechazado o cancelado. Podés reintentar desde tu carrito o elegir otro método."
  },
  pending: {
    title: "Pedido registrado",
    text: "Tu pedido quedó pendiente de confirmación de pago."
  }
};

export default function CheckoutResultModule() {
  const router = useRouter();
  const status = getStatusFromPath(router.pathname);
  const params = new URLSearchParams(router.search);
  const method = params.get("metodo");

  const copy = COPY[status];
  useDocumentHead({ title: copy.title });

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-20 text-center">
      <h1 className="font-display text-4xl text-ink">{copy.title}</h1>
      <p className="text-ink-soft">{copy.text}</p>

      {status === "pending" && method === "bank_transfer" && (
        <div className="w-full rounded-card border border-sand bg-surface p-5 text-left text-sm text-ink-soft">
          <p className="mb-2 font-medium text-ink">Transferencia bancaria</p>
          <p>
            Te enviaremos los datos bancarios a tu email. Una vez realizada la transferencia, vas a
            poder subir el comprobante desde <strong>Mi cuenta</strong> para que confirmemos el
            pago.
          </p>
        </div>
      )}
      {status === "pending" && method === "cash" && (
        <div className="w-full rounded-card border border-sand bg-surface p-5 text-left text-sm text-ink-soft">
          <p className="mb-2 font-medium text-ink">Pago en efectivo</p>
          <p>Nos pondremos en contacto para coordinar la entrega y el pago.</p>
        </div>
      )}

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link
          to="/mi-cuenta"
          className="rounded-buttons bg-clay px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-deep"
        >
          Ver mis pedidos
        </Link>
        <Link
          to="/catalogo"
          className="rounded-buttons border border-clay px-5 py-2.5 text-sm font-medium text-clay-deep hover:bg-sand"
        >
          Seguir comprando
        </Link>
      </div>
    </section>
  );
}
