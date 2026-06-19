import type { PageContentType } from "@app/modules/content/entities/entities";
import { getSiteContent, hasSiteContent } from "@app/modules/main/helpers/siteContent";

// Contenido de páginas informativas: vive en código (editable desde Admin), NO en Firebase.
export async function getPageContent(slug: string): Promise<PageContentType | null> {
  if (!hasSiteContent(slug)) {
    return null;
  }
  return getSiteContent<PageContentType>(slug);
}
