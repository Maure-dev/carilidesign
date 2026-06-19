import type { PageContentType } from "@app/modules/content/entities/entities";
import { useContentProvider } from "@app/modules/content/states/contentProvider";
import { useSiteContent } from "@app/modules/main/hooks/useSiteContent";

export const useContentActions = () => {
  const { setContentState } = useContentProvider();
  const { getSection } = useSiteContent();

  // La data ya vino en el bootstrap: leemos la sección del store global.
  const handleLoadPage = (slug: string): void => {
    const doc = getSection<Record<string, unknown>>(slug);
    const page = doc ? ({ ...doc, slug: slug } as unknown as PageContentType) : null;
    setContentState((s) => ({ ...s, page: page, loading: false }));
  };

  return { handleLoadPage };
};
