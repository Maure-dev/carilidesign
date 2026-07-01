import type { ContactFormType } from "@app/modules/contact/entities/entities";
import { db, isFirebaseConfigured } from "@app/modules/main/services/firebase";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Guarda el mensaje en Firestore (los mensajes SÍ usan Firebase).
export async function saveContactMessage(form: ContactFormType): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("firestore-unavailable");
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
