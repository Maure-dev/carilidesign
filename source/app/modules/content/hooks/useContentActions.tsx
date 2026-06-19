import { useContentProvider } from "@app/modules/content/states/contentProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { getPageContent } from "@app/modules/content/services/services";

export const useContentActions = () => {
  const { setContentState } = useContentProvider();
  const { onNotification } = useNotification();

  const handleLoadPage = async (slug: string): Promise<void> => {
    setContentState((s) => ({ ...s, loading: true }));
    try {
      const page = await getPageContent(slug);
      setContentState((s) => ({ ...s, page: page, loading: false }));
    } catch {
      onNotification(false, "No se pudo cargar la página.");
      setContentState((s) => ({ ...s, loading: false, error: "load_error" }));
    }
  };

  return { handleLoadPage };
};
