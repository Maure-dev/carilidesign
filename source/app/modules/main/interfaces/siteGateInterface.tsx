import type { ChildrenType } from "@app/modules/main/entities/entities";
import { useMainProvider } from "@app/modules/main/states/mainProvider";
import BootstrapLoaderInterface from "./bootstrapLoaderInterface";
import MaintenanceInterface from "./maintenanceInterface";

// Compuerta del sitio: gobierna qué se muestra según el estado del bootstrap de datos.
// loading → loader general; error → mantenimiento; ready → la app.
export default function SiteGateInterface({ children }: ChildrenType) {
  const { getMainState } = useMainProvider();
  const status = getMainState.site.status;

  if (status === "loading") {
    return <BootstrapLoaderInterface />;
  }
  if (status === "error") {
    return <MaintenanceInterface />;
  }
  return <>{children}</>;
}
