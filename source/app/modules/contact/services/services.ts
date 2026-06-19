import type { ContactFormType, ContactInfoType } from "@app/modules/contact/entities/entities";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import { getSiteContent } from "@app/modules/main/helpers/siteContent";

// Guarda el mensaje en Firestore (los mensajes SÍ usan Firebase).
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

// Datos de contacto: viven en código (editables desde Admin), NO en Firebase.
export async function getContactInfo(): Promise<ContactInfoType> {
  return getSiteContent<ContactInfoType>("contact");
}
