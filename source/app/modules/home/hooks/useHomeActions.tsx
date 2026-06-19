import { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { getFeaturedProducts, getHomeContent } from "@app/modules/home/services/services";

export const useHomeActions = () => {
  const { setHomeState } = useHomeProvider();
  const { onNotification } = useNotification();

  const handleLoadHome = async (): Promise<void> => {
    setHomeState((s) => ({ ...s, loading: true }));
    try {
      const [content, featured] = await Promise.all([getHomeContent(), getFeaturedProducts(3)]);
      setHomeState((s) => ({ ...s, content: content, featured: featured, loading: false }));
    } catch {
      onNotification(false, "No se pudo cargar la página de inicio.");
      setHomeState((s) => ({ ...s, loading: false, error: "load_error" }));
    }
  };

  return { handleLoadHome };
};
