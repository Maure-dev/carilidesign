import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth } from "../_lib/firebaseAdmin.js";

// GET /api/admin/users — Lista usuarios de Firebase Auth (sólo admin).
// Header: Authorization: Bearer <idToken>.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
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

    const list = await auth.listUsers(200);
    const users = list.users.map((u) => ({
      uid: u.uid,
      email: u.email ?? null,
      displayName: u.displayName ?? null,
      isAdmin: u.customClaims?.admin === true
    }));

    res.status(200).json({ users: users });
  } catch (error) {
    console.error("users error:", error);
    res.status(500).json({ error: "No se pudieron listar los usuarios" });
  }
}
