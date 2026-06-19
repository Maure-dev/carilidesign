import { useEffect } from "react";

type DocumentMeta = {
  title: string;
  description?: string;
  ogImage?: string;
};

const BASE_TITLE = "Carili Design";

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Setea title/description/OpenGraph por ruta. Cada Module lo invoca con sus metadatos.
export const useDocumentHead = (meta: DocumentMeta): void => {
  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = meta.title ? `${meta.title} · ${BASE_TITLE}` : BASE_TITLE;

    document.title = fullTitle;
    upsertMeta("property", "og:title", fullTitle);
    if (meta.description) {
      upsertMeta("name", "description", meta.description);
      upsertMeta("property", "og:description", meta.description);
    }
    if (meta.ogImage) {
      upsertMeta("property", "og:image", meta.ogImage);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [meta.title, meta.description, meta.ogImage]);
};
