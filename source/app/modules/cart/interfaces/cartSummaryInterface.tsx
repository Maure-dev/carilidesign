import PriceInterface from "@app/modules/main/interfaces/priceInterface";
import { Link } from "react-router";

type Props = {
  total: number;
};

export default function CartSummaryInterface({ total }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-sand bg-surface p-5">
      <div className="flex items-center justify-between text-ink">
        <span className="text-ink-soft">Subtotal</span>
        <PriceInterface amount={total} className="font-display text-xl text-ink" />
      </div>
      <p className="text-xs text-ink-soft">El costo de envío se calcula en el checkout.</p>
      <Link
        to="/checkout"
        className="rounded-buttons bg-clay px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-clay-deep"
      >
        Continuar con la compra
      </Link>
      <Link to="/catalogo" className="text-center text-sm text-clay-deep hover:text-clay">
        Seguir comprando
      </Link>
    </div>
  );
}
