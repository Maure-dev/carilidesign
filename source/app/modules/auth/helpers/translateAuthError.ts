// Traduce códigos de error de Firebase Auth a mensajes en español (función pura).
const MESSAGES: Record<string, string> = {
  "auth-unavailable": "La autenticación no está disponible (configurá Firebase).",
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/invalid-email": "El email no es válido.",
  "auth/user-not-found": "No existe una cuenta con ese email.",
  "auth/wrong-password": "Email o contraseña incorrectos.",
  "auth/email-already-in-use": "Ya existe una cuenta con ese email.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/popup-closed-by-user": "Cerraste la ventana antes de completar el ingreso.",
  "auth/too-many-requests": "Demasiados intentos. Probá más tarde."
};

export function translateAuthError(error: unknown): string {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code: unknown }).code)
      : error instanceof Error
        ? error.message
        : "";
  return MESSAGES[code] ?? "Ocurrió un error. Intentá de nuevo.";
}
