import AdminProvider from "@app/modules/admin/states/adminProvider";
import NotificationInterface from "@app/modules/main/interfaces/notificationInterface";
import { Outlet } from "react-router";
import AdminSidebarInterface from "./interfaces/adminSidebarInterface";
import AdminTopbarInterface from "./interfaces/adminTopbarInterface";

// Shell dedicado del panel de administración: layout propio (sidebar + topbar),
// distinto del storefront. El estado del admin es compartido por las rutas hijas.
export default function AdminLayoutModuleProvider() {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-canvas text-ink">
        <AdminSidebarInterface />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbarInterface />
          <main className="flex-1 px-4 py-8 sm:px-6">
            <div className="mx-auto w-full max-w-5xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <NotificationInterface />
    </AdminProvider>
  );
}
