import type { HomeContentType } from "@app/modules/home/entities/entities";
import { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { useCatalog } from "@app/modules/main/hooks/useCatalog";
import { useSiteContent } from "@app/modules/main/hooks/useSiteContent";

export const useHomeActions = () => {
  const { setHomeState } = useHomeProvider();
  const { getSection } = useSiteContent();
  const { featured } = useCatalog();

  // La data ya vino en el bootstrap: leemos del store global (sin fetch ni fallback).
  const handleLoadHome = (): void => {
    const content = getSection<HomeContentType>("home");
    setHomeState((s) => ({ ...s, content: content, featured: featured(3), loading: false }));
  };

  return { handleLoadHome };
};
