import { formatMoney } from "@app/modules/main/helpers/formatMoney";

type Props = {
  amount: number;
  className?: string;
};

// Muestra un precio formateado en ARS.
export default function PriceInterface({ amount, className = "" }: Props) {
  return <span className={className}>{formatMoney(amount)}</span>;
}
