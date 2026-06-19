import type { ResultStatusType } from "@app/modules/checkoutResult/entities/entities";

// Función pura: deriva el estado del resultado a partir del pathname.
export function getStatusFromPath(pathname: string): ResultStatusType {
  if (pathname.includes("/pago/exito")) {
    return "success";
  }
  if (pathname.includes("/pago/error")) {
    return "error";
  }
  return "pending";
}
