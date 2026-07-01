import { getMyOrders, getOrderById } from "@app/modules/account/services/services";
import { useAccountProvider } from "@app/modules/account/states/accountProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useSession } from "@app/modules/main/hooks/useSession";

export const useAccountActions = () => {
  const { setAccountState } = useAccountProvider();
  const { user } = useSession();
  const { onNotification } = useNotification();

  const handleLoadOrders = async (): Promise<void> => {
    setAccountState((s) => ({ ...s, loading: true }));
    try {
      const orders = await getMyOrders(user?.uid ?? null);
      setAccountState((s) => ({ ...s, orders: orders, loading: false }));
    } catch {
      onNotification(false, "No se pudieron cargar tus pedidos.");
      setAccountState((s) => ({ ...s, loading: false }));
    }
  };

  const handleLoadOrder = async (id: string): Promise<void> => {
    setAccountState((s) => ({ ...s, loading: true }));
    try {
      const order = await getOrderById(id);
      setAccountState((s) => ({ ...s, selected: order, loading: false }));
    } catch {
      onNotification(false, "No se pudo cargar el pedido.");
      setAccountState((s) => ({ ...s, loading: false }));
    }
  };

  return { handleLoadOrders, handleLoadOrder };
};
