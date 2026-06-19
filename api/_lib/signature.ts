import crypto from "node:crypto";
import type { VercelRequest } from "@vercel/node";

// Verifica la firma x-signature de Mercado Pago (formato "ts=...,v1=...") con MP_WEBHOOK_SECRET.
// Manifest: id:<data.id>;request-id:<x-request-id>;ts:<ts>;
export function verifyMpSignature(req: VercelRequest, dataId: string): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    return false;
  }
  const signature = req.headers["x-signature"];
  const requestId = req.headers["x-request-id"];
  if (typeof signature !== "string") {
    return false;
  }

  const parts: Record<string, string> = {};
  for (const segment of signature.split(",")) {
    const [key, value] = segment.split("=").map((s) => s.trim());
    if (key && value) {
      parts[key] = value;
    }
  }

  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) {
    return false;
  }

  const manifest = `id:${dataId};request-id:${requestId ?? ""};ts:${ts};`;
  const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
  } catch {
    return false;
  }
}
