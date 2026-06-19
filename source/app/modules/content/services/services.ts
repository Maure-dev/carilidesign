import type { PageContentType } from "@app/modules/content/entities/entities";
import { doc, getDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { DEFAULT_PAGES } from "@app/modules/content/constants/constants";

export async function getPageContent(slug: string): Promise<PageContentType | null> {
  const fallback = DEFAULT_PAGES[slug] ?? null;

  if (!isFirebaseConfigured || !db) {
    return fallback;
  }
  const snap = await getDoc(doc(db, "siteContent", slug));
  if (!snap.exists()) {
    return fallback;
  }
  return {
    ...(fallback ?? { slug: slug, title: slug, body: [] }),
    ...(snap.data() as Partial<PageContentType>)
  };
}
