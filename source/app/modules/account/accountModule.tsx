import { useEffect } from "react";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useAccountProvider } from "@app/modules/account/states/accountProvider";
import { useAccountActions } from "@app/modules/account/hooks/useAccountActions";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import AccountOrdersListInterface from "@app/modules/account/interfaces/accountOrdersListInterface";
import AccountOrderDetailInterface from "@app/modules/account/interfaces/accountOrderDetailInterface";

export default function AccountModule() {
  const router = useRouter();
  const orderId = router.params.id;
  const { getAccountState } = useAccountProvider();
  const { handleLoadOrders, handleLoadOrder } = useAccountActions();
  const { orders, selected, loading } = getAccountState;

  useDocumentHead({ title: orderId ? "Pedido" : "Mi cuenta" });

  useEffect(() => {
    if (orderId) {
      handleLoadOrder(orderId);
    } else {
      handleLoadOrders();
    }
  }, [orderId]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      {loading ? (
        <LoadingInterface />
      ) : orderId ? (
        selected ? (
          <AccountOrderDetailInterface order={selected} />
        ) : (
          <EmptyBoxInterface message="No encontramos ese pedido." />
        )
      ) : (
        <>
          <h1 className="font-display text-3xl text-ink">Mis pedidos</h1>
          <AccountOrdersListInterface orders={orders} />
        </>
      )}
    </section>
  );
}
