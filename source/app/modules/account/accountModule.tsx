import { useAccountActions } from "@app/modules/account/hooks/useAccountActions";
import AccountOrderDetailInterface from "@app/modules/account/interfaces/accountOrderDetailInterface";
import AccountOrdersListInterface from "@app/modules/account/interfaces/accountOrdersListInterface";
import { useAccountProvider } from "@app/modules/account/states/accountProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useSession } from "@app/modules/main/hooks/useSession";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { useEffect } from "react";

export default function AccountModule() {
  const router = useRouter();
  const orderId = router.params.id;
  const { user, logout } = useSession();
  const { onNotification } = useNotification();
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

  const handleLogout = async () => {
    try {
      await logout();
      onNotification(true, "Sesión cerrada.");
      router.navigate("/");
    } catch {
      onNotification(false, "No se pudo cerrar la sesión. Intentá de nuevo.");
    }
  };

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
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="font-display text-3xl text-ink">Mis pedidos</h1>
              {user && <p className="text-sm text-ink-soft">{user.displayName || user.email}</p>}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-buttons border border-sand px-4 py-2 text-sm font-medium text-ink hover:bg-sand"
            >
              Cerrar sesión
            </button>
          </div>
          <AccountOrdersListInterface orders={orders} />
        </>
      )}
    </section>
  );
}
