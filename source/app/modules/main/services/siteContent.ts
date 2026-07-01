import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Lee un documento de contenido desde Firestore (siteContent/{slug}). Sin fallback de código:
// la data vive sólo en Firestore. Lo usa el Admin para editar; devuelve {} si el doc no existe.
export async function fetchSiteContent<T>(slug: string): Promise<T> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("firestore-unavailable");
  }
  const snap = await getDoc(doc(db, "siteContent", slug));
  return (snap.exists() ? snap.data() : {}) as T;
}

// Guarda el contenido de una sección en Firestore (sólo admin, según reglas de seguridad).
export async function saveSiteContent(slug: string, data: Record<string, unknown>): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("firestore-unavailable");
  }
  await setDoc(doc(db, "siteContent", slug), data, { merge: true });
}
