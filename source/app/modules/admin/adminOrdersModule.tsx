import { useAdminActions } from "@app/modules/admin/hooks/useAdminActions";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { useEffect } from "react";
import OrderListInterface from "./interfaces/orderListInterface";

export default function AdminOrdersModule() {
  const { getAdminState } = useAdminProvider();
  const actions = useAdminActions();
  const { loading, orders } = getAdminState;

  useDocumentHead({ title: "Pedidos" });

  useEffect(() => {
    actions.handleLoadOrders();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-ink">Pedidos</h1>
      {loading ? (
        <LoadingInterface />
      ) : (
        <OrderListInterface
          orders={orders}
          onTransition={actions.handleTransition}
          onConfirmPayment={actions.handleConfirmPayment}
        />
      )}
    </section>
  );
}
