import { ROUTE_TO_SLUG } from "@app/modules/content/constants/constants";

// Deriva el slug del contenido a partir del pathname (función pura).
export function getPageSlug(pathname: string): string | null {
  return ROUTE_TO_SLUG[pathname] ?? null;
}
