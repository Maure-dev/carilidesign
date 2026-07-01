import { Outlet, useLocation } from "react-router";
import ErrorBoundaryInterface from "./errorBoundaryInterface";
import FooterInterface from "./footerInterface";
import HeaderInterface from "./headerInterface";
import NotificationInterface from "./notificationInterface";
import SkipLinkInterface from "./skipLinkInterface";

// Chrome del storefront (header/footer/notificaciones) con fade en el cambio de ruta.
export default function StorefrontLayoutInterface() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <SkipLinkInterface />
      <HeaderInterface />
      <main id="contenido" className="flex-1">
        <ErrorBoundaryInterface>
          {/* key por ruta: al navegar, el contenido entra con un fade sutil */}
          <div key={pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </ErrorBoundaryInterface>
      </main>
      <FooterInterface />
      <NotificationInterface />
    </div>
  );
}
