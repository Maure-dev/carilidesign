import { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { getTasks } from "@app/modules/home/services/services";

// Hook de acciones del módulo: llama a los services y actualiza el estado.
// El try/catch (manejo de errores) vive acá, no en los services.
export const useHomeActions = () => {
  const { setHomeState } = useHomeProvider();
  const { onNotification } = useNotification();

  const handleLoadTasks = async (): Promise<void> => {
    setHomeState((s) => ({ ...s, loading: true }));
    try {
      const res = await getTasks();
      setHomeState((s) => ({
        ...s,
        // El backend puede no estar disponible (p. ej. sin proxy configurado):
        // garantizamos que data siempre sea un array para no romper el render.
        data: res.data?.data ?? [],
        loading: false
      }));
    } catch {
      onNotification(false, "No se pudieron cargar las tareas.");
      setHomeState((s) => ({ ...s, loading: false }));
    }
  };

  return { handleLoadTasks };
};
