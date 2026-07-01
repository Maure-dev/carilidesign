import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth, adminDb } from "../_lib/firebaseAdmin.js";

// POST /api/admin/set-role — Asigna o quita el rol admin (custom claim) a un usuario.
// Sólo admin. Body: { uid, admin: boolean }. Header: Authorization: Bearer <idToken>.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const authHeader = req.headers.authorization ?? "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!idToken) {
    res.status(401).json({ error: "Falta token" });
    return;
  }

  try {
    const auth = adminAuth();
    const caller = await auth.verifyIdToken(idToken);
    if (caller.admin !== true) {
      res.status(403).json({ error: "No autorizado" });
      return;
    }

    const { uid, admin } = (req.body ?? {}) as { uid?: string; admin?: boolean };
    if (!uid || typeof admin !== "boolean") {
      res.status(400).json({ error: "Faltan datos (uid, admin)" });
      return;
    }
    // Evita que un admin se quite el rol a sí mismo (para no quedar sin acceso).
    if (uid === caller.uid && !admin) {
      res.status(400).json({ error: "No podés quitarte tu propio rol de admin" });
      return;
    }

    await auth.setCustomUserClaims(uid, { admin: admin });
    await adminDb()
      .collection("users")
      .doc(uid)
      .set({ role: admin ? "admin" : "user" }, { merge: true });

    res.status(200).json({ ok: true, uid: uid, admin: admin });
  } catch (error) {
    console.error("set-role error:", error);
    res.status(500).json({ error: "No se pudo cambiar el rol" });
  }
}
