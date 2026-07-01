import { Outlet } from "react-router";
import MainProvider from "@app/modules/main/states/mainProvider";
import { useScrollToTop } from "@app/modules/main/hooks/useScrollToTop";
import SiteGateInterface from "@app/modules/main/interfaces/siteGateInterface";

// Layout raíz: estado global (sesión + bootstrap) y compuerta (loader / mantenimiento / app).
// El chrome del storefront y el shell del admin se montan como layouts hijos.
export default function MainModuleProvider() {
  useScrollToTop();

  return (
    <MainProvider>
      <SiteGateInterface>
        <Outlet />
      </SiteGateInterface>
    </MainProvider>
  );
}
