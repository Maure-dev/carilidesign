import {
  type UserCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@app/modules/main/services/firebase";

function requireAuth() {
  if (!auth) {
    throw new Error("auth-unavailable");
  }
  return auth;
}

// Escritura de perfil best-effort: nunca debe tumbar el alta/ingreso. Si falla
// (reglas de Firestore sin deployar, red, etc.) avisamos por consola y seguimos:
// la cuenta de Auth ya existe y el perfil puede recrearse luego.
async function ensureUserDoc(uid: string, email: string, displayName: string): Promise<void> {
  if (!db) {
    console.warn("Firestore no disponible: no se guardó el perfil del usuario.");
    return;
  }
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        uid: uid,
        email: email,
        displayName: displayName || null,
        role: "user",
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    console.warn("No se pudo guardar el perfil del usuario en Firestore:", error);
  }
}

export async function loginEmail(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(requireAuth(), email, password);
}

export async function registerEmail(
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> {
  const cred = await createUserWithEmailAndPassword(requireAuth(), email, password);
  // updateProfile y ensureUserDoc son posteriores al alta y no deben hacerla fallar.
  if (displayName) {
    try {
      await updateProfile(cred.user, { displayName: displayName });
    } catch (error) {
      console.warn("No se pudo actualizar el nombre del usuario:", error);
    }
  }
  await ensureUserDoc(cred.user.uid, email, displayName);
  return cred;
}

export async function loginGoogle(): Promise<UserCredential> {
  const cred = await signInWithPopup(requireAuth(), new GoogleAuthProvider());
  await ensureUserDoc(cred.user.uid, cred.user.email ?? "", cred.user.displayName ?? "");
  return cred;
}

export async function recoverPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(requireAuth(), email);
}

export async function logout(): Promise<void> {
  return signOut(requireAuth());
}
