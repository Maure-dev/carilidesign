import type { VercelRequest, VercelResponse } from "@vercel/node";

// GET /api/health — function de prueba para verificar que las Vercel Functions corren.
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ ok: true, service: "carilidesign-api" });
}
