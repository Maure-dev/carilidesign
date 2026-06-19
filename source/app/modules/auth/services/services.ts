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

async function ensureUserDoc(uid: string, email: string, displayName: string): Promise<void> {
  if (!db) {
    return;
  }
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
  if (displayName) {
    await updateProfile(cred.user, { displayName: displayName });
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
