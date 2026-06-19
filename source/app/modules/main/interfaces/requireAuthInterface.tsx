import { useEffect } from "react";
import { Outlet } from "react-router";
import { useSession } from "@app/modules/main/hooks/useSession";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { isFirebaseConfigured } from "@app/modules/main/services/firebase";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";

type Props = {
  requireAdmin?: boolean;
};

// Bypass SOLO de preview: mientras Firebase no esté configurado (modo demo), se permite
// el acceso a las rutas protegidas para poder recorrer la UI (cuenta, admin) sin backend.
// En producción (Firebase configurado) el guard exige sesión y rol admin reales.
const DEMO_BYPASS = !isFirebaseConfigured;

// Guard de rutas: exige sesión (y opcionalmente rol admin). Envuelve rutas con <Outlet/>.
export default function RequireAuthInterface({ requireAdmin = false }: Props) {
  const { loading, isAuthenticated, isAdmin } = useSession();
  const router = useRouter();
  const { onNotification } = useNotification();

  useEffect(() => {
    if (DEMO_BYPASS || loading) {
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

  if (DEMO_BYPASS) {
    return <Outlet />;
  }
  if (loading || !isAuthenticated || (requireAdmin && !isAdmin)) {
    return <LoadingInterface />;
  }
  return <Outlet />;
}
