import { Outlet } from "react-router";
import MainProvider from "@app/modules/main/states/mainProvider";
import { useScrollToTop } from "@app/modules/main/hooks/useScrollToTop";
import NotificationInterface from "@app/modules/main/interfaces/notificationInterface";
import HeaderInterface from "@app/modules/main/interfaces/headerInterface";
import FooterInterface from "@app/modules/main/interfaces/footerInterface";
import SkipLinkInterface from "@app/modules/main/interfaces/skipLinkInterface";
import ErrorBoundaryInterface from "@app/modules/main/interfaces/errorBoundaryInterface";

// Layout raíz: estado global + estructura del sitio (header/main/footer) + notificaciones.
export default function MainModuleProvider() {
  useScrollToTop();

  return (
    <MainProvider>
      <div className="flex min-h-screen flex-col bg-canvas text-ink">
        <SkipLinkInterface />
        <HeaderInterface />
        <main id="contenido" className="flex-1">
          <ErrorBoundaryInterface>
            <Outlet />
          </ErrorBoundaryInterface>
        </main>
        <FooterInterface />
        <NotificationInterface />
      </div>
    </MainProvider>
  );
}
