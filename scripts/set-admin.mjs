// Promueve un usuario a administrador (custom claim admin=true).
//
// Requisitos:
//   1. El usuario ya tiene que existir (registrate en la app con ese email primero).
//   2. Descargá la clave de servicio de Firebase (Configuración del proyecto → Cuentas de
//      servicio → Generar nueva clave privada) y guardala como scripts/serviceAccount.json.
//
// Uso:  node set-admin.mjs <email>
import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const email = process.argv[2];
if (!email) {
  console.error("Uso: node set-admin.mjs <email>");
  process.exit(1);
}

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccount.json", import.meta.url), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });

const auth = getAuth();
const user = await auth.getUserByEmail(email);
await auth.setCustomUserClaims(user.uid, { admin: true });

console.log(`OK: ${email} (uid ${user.uid}) ahora es admin.`);
console.log("Cerrá sesión y volvé a entrar en la app para refrescar el token.");
process.exit(0);
