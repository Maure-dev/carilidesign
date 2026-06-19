import { useMainProvider } from "@app/modules/main/states/mainProvider";

// Acceso al contenido del sitio cargado en el bootstrap (siteContent por slug).
// La data vive en Firestore; acá sólo se lee del store global.
export const useSiteContent = () => {
  const { getMainState } = useMainProvider();
  const { content } = getMainState.site;

  const getSection = <T,>(slug: string): T | null => (content[slug] as T) ?? null;

  return { content: content, getSection: getSection };
};
