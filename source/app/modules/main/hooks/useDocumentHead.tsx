import { useSiteContent } from "@app/modules/main/hooks/useSiteContent";
import { useEffect } from "react";

type DocumentMeta = {
  title: string;
  description?: string;
  ogImage?: string;
};

type SeoDoc = {
  seoTitle?: string;
  seoDescription?: string;
  seoImageUrl?: string;
};

const FALLBACK_TITLE = "Carili Design";

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Setea title/description/OpenGraph por ruta. Los valores base (título, descripción y OG image)
// salen del doc SEO editable desde Admin; cada Module aporta su título/descr. específicos.
export const useDocumentHead = (meta: DocumentMeta): void => {
  const { getSection } = useSiteContent();
  const seo = getSection<SeoDoc>("seo");
  const baseTitle = seo?.seoTitle || FALLBACK_TITLE;
  const fallbackDescription = seo?.seoDescription;
  const fallbackOgImage = seo?.seoImageUrl;

  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = meta.title ? `${meta.title} · ${baseTitle}` : baseTitle;

    document.title = fullTitle;
    upsertMeta("property", "og:title", fullTitle);

    const description = meta.description || fallbackDescription;
    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
    }

    const ogImage = meta.ogImage || fallbackOgImage;
    if (ogImage) {
      upsertMeta("property", "og:image", ogImage);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [meta.title, meta.description, meta.ogImage, baseTitle, fallbackDescription, fallbackOgImage]);
};
