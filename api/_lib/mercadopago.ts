import { MercadoPagoConfig } from "mercadopago";

// Cliente de Mercado Pago. El access token vive SOLO en el servidor (env de Vercel).
export function getMpClient(): MercadoPagoConfig {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN no está configurada");
  }
  return new MercadoPagoConfig({ accessToken });
}
