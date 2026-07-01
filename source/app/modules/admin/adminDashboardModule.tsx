import { useEffect } from "react";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useAdminActions } from "@app/modules/admin/hooks/useAdminActions";
import { computeDashboardMetrics } from "@app/modules/admin/helpers/dashboardMetrics";
import AdminDashboardInterface from "./interfaces/adminDashboardInterface";

export default function AdminDashboardModule() {
  const { getAdminState } = useAdminProvider();
  const actions = useAdminActions();
  const { products, orders, messages } = getAdminState;

  useDocumentHead({ title: "Panel" });

  useEffect(() => {
    actions.handleLoadProducts();
    actions.handleLoadOrders();
    actions.handleLoadMessages();
  }, []);

  return <AdminDashboardInterface metrics={computeDashboardMetrics(products, orders, messages)} />;
}
