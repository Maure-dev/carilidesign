import { Outlet } from "react-router";
import MainProvider from "@app/modules/main/states/mainProvider";
import NotificationInterface from "@app/modules/main/interfaces/notificationInterface";

// Layout raíz: envuelve toda la app con el estado global y renderiza las rutas hijas.
export default function MainModuleProvider() {
  return (
    <MainProvider>
      <div className="flex min-h-screen flex-col bg-white text-primary">
        <Outlet />
        <NotificationInterface />
      </div>
    </MainProvider>
  );
}
