// Función pura, sin efectos secundarios.
// Formatea una fecha ISO a dd/mm/aaaa (es-AR). Devuelve "" si es inválida.
export function formatDate(value: string): string {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}
