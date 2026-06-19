import type { VercelRequest, VercelResponse } from "@vercel/node";

// POST /api/contact/send — Envía el mensaje de contacto por email (Resend) si hay API key.
// Body: { name, email, message }. El mensaje también se guarda en Firestore desde el cliente.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const { name, email, message } = (req.body ?? {}) as {
    name?: string;
    email?: string;
    message?: string;
  };
  if (!name || !email || !message) {
    res.status(400).json({ error: "Faltan datos" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // Sin proveedor de email configurado: el mensaje igual quedó guardado en Firestore.
    res.status(200).json({ ok: true, emailed: false });
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Carili Design <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: `De: ${name} <${email}>\n\n${message}`
      })
    });
    if (!response.ok) {
      throw new Error(`Resend respondió ${response.status}`);
    }
    res.status(200).json({ ok: true, emailed: true });
  } catch (error) {
    console.error("contact/send error:", error);
    res.status(502).json({ error: "No se pudo enviar el email" });
  }
}
