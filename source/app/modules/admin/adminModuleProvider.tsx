import AdminProvider from "@app/modules/admin/states/adminProvider";
import AdminModule from "./adminModule";

export default function AdminModuleProvider() {
  return (
    <AdminProvider>
      <AdminModule />
    </AdminProvider>
  );
}
