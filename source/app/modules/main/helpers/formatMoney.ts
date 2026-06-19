// Formatea un monto entero en pesos argentinos. Convención monetaria única: ARS entero.
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
