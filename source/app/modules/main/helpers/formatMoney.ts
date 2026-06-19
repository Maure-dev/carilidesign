// Formatea un monto en pesos argentinos. Soporta decimales (float): muestra los enteros
// sin decimales y agrega hasta 2 cuando el precio los tiene.
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
