import type { ContactFormType, ContactInfoType } from "@app/modules/contact/entities/entities";
import axios from "axios";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { DEFAULT_CONTACT_INFO } from "@app/modules/contact/constants/constants";

// Guarda el mensaje en Firestore (si está configurado).
export async function saveContactMessage(form: ContactFormType): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    return;
  }
  await addDoc(collection(db, "contactMessages"), {
    name: form.name,
    email: form.email,
    message: form.message,
    read: false,
    createdAt: serverTimestamp()
  });
}

// Dispara el envío de email vía la Vercel Function (best-effort).
export async function sendContactEmail(form: ContactFormType): Promise<void> {
  await axios.post("/api/contact/send", form);
}

export async function getContactInfo(): Promise<ContactInfoType> {
  if (!isFirebaseConfigured || !db) {
    return DEFAULT_CONTACT_INFO;
  }
  const snap = await getDoc(doc(db, "siteContent", "contact"));
  if (!snap.exists()) {
    return DEFAULT_CONTACT_INFO;
  }
  return { ...DEFAULT_CONTACT_INFO, ...(snap.data() as Partial<ContactInfoType>) };
}
