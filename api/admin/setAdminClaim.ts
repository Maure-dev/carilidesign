import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth, adminDb } from "../_lib/firebaseAdmin.js";

// POST /api/admin/setAdminClaim
// Promueve un usuario a admin (custom claim). Autoriza si el llamante ya es admin
// o si su email está en ADMIN_BOOTSTRAP_EMAILS (bootstrap del primer admin).
// Body: { uid?: string, email?: string }. Header: Authorization: Bearer <idToken>.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const authHeader = req.headers.authorization ?? "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!idToken) {
    res.status(401).json({ error: "Falta el token de autenticación" });
    return;
  }

  const bootstrapEmails = (process.env.ADMIN_BOOTSTRAP_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  try {
    const auth = adminAuth();
    const caller = await auth.verifyIdToken(idToken);
    const callerEmail = (caller.email ?? "").toLowerCase();
    const callerIsAdmin = caller.admin === true;
    const callerIsBootstrap = callerEmail !== "" && bootstrapEmails.includes(callerEmail);

    if (!callerIsAdmin && !callerIsBootstrap) {
      res.status(403).json({ error: "No autorizado" });
      return;
    }

    const body = (req.body ?? {}) as { uid?: string; email?: string };
    let targetUid = body.uid;
    if (!targetUid && body.email) {
      const target = await auth.getUserByEmail(body.email);
      targetUid = target.uid;
    }
    if (!targetUid) {
      res.status(400).json({ error: "Falta uid o email del usuario objetivo" });
      return;
    }

    await auth.setCustomUserClaims(targetUid, { admin: true });
    await adminDb().collection("users").doc(targetUid).set({ role: "admin" }, { merge: true });

    res.status(200).json({ ok: true, uid: targetUid });
  } catch (error) {
    console.error("setAdminClaim error:", error);
    res.status(500).json({ error: "No se pudo asignar el rol admin" });
  }
}
