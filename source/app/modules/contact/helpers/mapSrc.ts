// Devuelve el src del mapa para embeber. Acepta tanto la URL directa como el
// `<iframe ... src="...">` completo de Google Maps. Exige https (seguridad).
export function getMapSrc(value: string | undefined): string | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  const match = trimmed.match(/src="([^"]+)"/);
  const url = match ? match[1] : trimmed;
  return url.startsWith("https://") ? url : null;
}
