import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import { type Auth, browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";

// Init único del SDK de Firebase cliente. Usamos Auth y Firestore (plan Spark, gratis).
// El almacenamiento de imágenes NO usa Firebase Storage (requiere Blaze): se usa Cloudinary
// (ver modules/main/services/imageUpload.ts).
const firebaseConfig = {
  apiKey: import.meta.env.ENV_FIREBASE_API_KEY,
  authDomain: import.meta.env.ENV_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.ENV_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.ENV_FIREBASE_APP_ID
};

// Permite que la app renderice aunque Firebase no esté configurado todavía (dev sin .env).
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
  setPersistence(authInstance, browserLocalPersistence).catch(() => {
    /* noop: si falla la persistencia se usa la default */
  });
}

export const auth = authInstance;
export const db = dbInstance;
