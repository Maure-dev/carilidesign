import { useEffect } from "react";
import { Outlet } from "react-router";
import { useSession } from "@app/modules/main/hooks/useSession";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";

type Props = {
  requireAdmin?: boolean;
};

// Guard de rutas: exige sesión (y opcionalmente rol admin). Envuelve rutas con <Outlet/>.
export default function RequireAuthInterface({ requireAdmin = false }: Props) {
  const { loading, isAuthenticated, isAdmin } = useSession();
  const router = useRouter();
  const { onNotification } = useNotification();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!isAuthenticated) {
      router.navigate("/ingresar", { state: { returnTo: router.pathname } });
      return;
    }
    if (requireAdmin && !isAdmin) {
      onNotification(false, "No tenés permiso para acceder a esa sección.");
      router.navigate("/");
    }
  }, [loading, isAuthenticated, isAdmin, requireAdmin]);

  if (loading || !isAuthenticated || (requireAdmin && !isAdmin)) {
    return <LoadingInterface />;
  }
  return <Outlet />;
}
