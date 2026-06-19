import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import { type Auth, browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";
import { type FirebaseStorage, getStorage } from "firebase/storage";

// Init único del SDK de Firebase cliente. Config desde variables ENV_* (envPrefix de Vite).
// Para Firebase se usa el SDK directamente; Axios queda reservado para las Vercel Functions.
const firebaseConfig = {
  apiKey: import.meta.env.ENV_FIREBASE_API_KEY,
  authDomain: import.meta.env.ENV_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.ENV_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.ENV_FIREBASE_APP_ID
};

// Permite que la app renderice aunque Firebase no esté configurado todavía (dev sin .env).
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
  storageInstance = getStorage(app);
  setPersistence(authInstance, browserLocalPersistence).catch(() => {
    /* noop: si falla la persistencia se usa la default */
  });
}

export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;
