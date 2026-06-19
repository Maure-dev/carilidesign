import type {
  AdminContentDocType,
  AdminTabType,
  ProductDraftType
} from "@app/modules/admin/entities/entities";
import type { OrderStatusType, ProductType } from "@app/modules/main/entities/entities";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { auth } from "@app/modules/main/services/firebase";
import { EMPTY_DRAFT } from "@app/modules/admin/constants/constants";
import { validateProduct } from "@app/modules/admin/helpers/validateProduct";
import {
  confirmPayment,
  deleteProductById,
  getContentDoc,
  listAllOrders,
  listAllProducts,
  listMessages,
  markMessageRead,
  saveContentDoc,
  saveProduct,
  transitionOrder
} from "@app/modules/admin/services/services";

async function getIdToken(): Promise<string> {
  if (auth?.currentUser) {
    return auth.currentUser.getIdToken();
  }
  return "";
}

function productToDraft(product: ProductType): ProductDraftType {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category,
    shape: product.shape ?? "",
    priceArs: product.priceArs,
    stock: product.stock,
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    images: product.images
  };
}

export const useAdminActions = () => {
  const { getAdminState, setAdminState } = useAdminProvider();
  const { onNotification } = useNotification();

  const handleSetTab = (tab: AdminTabType): void => {
    setAdminState((s) => ({ ...s, tab: tab }));
  };

  const handleLoadProducts = async (): Promise<void> => {
    setAdminState((s) => ({ ...s, loading: true }));
    try {
      const products = await listAllProducts();
      setAdminState((s) => ({ ...s, products: products, loading: false }));
    } catch {
      onNotification(false, "No se pudieron cargar los productos.");
      setAdminState((s) => ({ ...s, loading: false }));
    }
  };

  const handleNewDraft = (): void => {
    setAdminState((s) => ({ ...s, draft: { ...EMPTY_DRAFT } }));
  };

  const handleEditDraft = (product: ProductType): void => {
    setAdminState((s) => ({ ...s, draft: productToDraft(product) }));
  };

  const handleCancelDraft = (): void => {
    setAdminState((s) => ({ ...s, draft: null }));
  };

  const handleChangeDraft = (patch: Partial<ProductDraftType>): void => {
    setAdminState((s) => (s.draft ? { ...s, draft: { ...s.draft, ...patch } } : s));
  };

  const handleAddImage = (url: string): void => {
    if (!url.trim()) {
      return;
    }
    setAdminState((s) =>
      s.draft
        ? {
            ...s,
            draft: {
              ...s.draft,
              images: [...s.draft.images, { url: url.trim(), alt: s.draft.name }]
            }
          }
        : s
    );
  };

  const handleRemoveImage = (index: number): void => {
    setAdminState((s) =>
      s.draft
        ? { ...s, draft: { ...s.draft, images: s.draft.images.filter((_, i) => i !== index) } }
        : s
    );
  };

  const handleSaveProduct = async (): Promise<void> => {
    const draft = getAdminState.draft;
    if (!draft) {
      return;
    }
    const errors = validateProduct(draft);
    if (Object.keys(errors).length > 0) {
      onNotification(false, Object.values(errors)[0] ?? "Revisá el formulario.");
      return;
    }
    setAdminState((s) => ({ ...s, saving: true }));
    try {
      await saveProduct(draft);
      onNotification(true, "Producto guardado.");
      setAdminState((s) => ({ ...s, saving: false, draft: null }));
      await handleLoadProducts();
    } catch {
      onNotification(false, "No se pudo guardar el producto.");
      setAdminState((s) => ({ ...s, saving: false }));
    }
  };

  const handleDeleteProduct = async (id: string): Promise<void> => {
    try {
      await deleteProductById(id);
      onNotification(true, "Producto eliminado.");
      await handleLoadProducts();
    } catch {
      onNotification(false, "No se pudo eliminar el producto.");
    }
  };

  const handleLoadOrders = async (): Promise<void> => {
    setAdminState((s) => ({ ...s, loading: true }));
    try {
      const orders = await listAllOrders();
      setAdminState((s) => ({ ...s, orders: orders, loading: false }));
    } catch {
      onNotification(false, "No se pudieron cargar los pedidos.");
      setAdminState((s) => ({ ...s, loading: false }));
    }
  };

  const handleTransition = async (orderId: string, to: OrderStatusType): Promise<void> => {
    try {
      await transitionOrder(orderId, to, await getIdToken());
      onNotification(true, "Estado actualizado.");
      await handleLoadOrders();
    } catch {
      onNotification(false, "No se pudo actualizar el estado.");
    }
  };

  const handleConfirmPayment = async (orderId: string, approved: boolean): Promise<void> => {
    try {
      await confirmPayment(orderId, approved, await getIdToken());
      onNotification(true, approved ? "Pago confirmado." : "Pago rechazado.");
      await handleLoadOrders();
    } catch {
      onNotification(false, "No se pudo confirmar el pago.");
    }
  };

  const handleLoadContent = async (): Promise<void> => {
    setAdminState((s) => ({ ...s, loading: true }));
    try {
      const doc = await getContentDoc(getAdminState.contentSlug);
      setAdminState((s) => ({ ...s, contentDoc: doc, loading: false }));
    } catch {
      onNotification(false, "No se pudo cargar el contenido.");
      setAdminState((s) => ({ ...s, loading: false }));
    }
  };

  const handleSelectContentSection = async (slug: string): Promise<void> => {
    // Cambia de sección al instante (sin spinner que oculte el selector) y carga el doc.
    setAdminState((s) => ({ ...s, contentSlug: slug, contentDoc: {} }));
    try {
      const doc = await getContentDoc(slug);
      setAdminState((s) => ({ ...s, contentDoc: doc }));
    } catch {
      onNotification(false, "No se pudo cargar el contenido.");
    }
  };

  const handleChangeContentDoc = (patch: Partial<AdminContentDocType>): void => {
    setAdminState((s) => ({ ...s, contentDoc: { ...s.contentDoc, ...patch } }));
  };

  const handleSaveContent = async (): Promise<void> => {
    setAdminState((s) => ({ ...s, saving: true }));
    try {
      await saveContentDoc(getAdminState.contentSlug, getAdminState.contentDoc);
      onNotification(true, "Contenido guardado.");
      setAdminState((s) => ({ ...s, saving: false }));
    } catch {
      onNotification(false, "No se pudo guardar el contenido.");
      setAdminState((s) => ({ ...s, saving: false }));
    }
  };

  const handleLoadMessages = async (): Promise<void> => {
    setAdminState((s) => ({ ...s, loading: true }));
    try {
      const messages = await listMessages();
      setAdminState((s) => ({ ...s, messages: messages, loading: false }));
    } catch {
      onNotification(false, "No se pudieron cargar los mensajes.");
      setAdminState((s) => ({ ...s, loading: false }));
    }
  };

  const handleMarkRead = async (id: string): Promise<void> => {
    try {
      await markMessageRead(id);
      await handleLoadMessages();
    } catch {
      onNotification(false, "No se pudo marcar como leído.");
    }
  };

  return {
    handleSetTab,
    handleLoadProducts,
    handleNewDraft,
    handleEditDraft,
    handleCancelDraft,
    handleChangeDraft,
    handleAddImage,
    handleRemoveImage,
    handleSaveProduct,
    handleDeleteProduct,
    handleLoadOrders,
    handleTransition,
    handleConfirmPayment,
    handleLoadContent,
    handleSelectContentSection,
    handleChangeContentDoc,
    handleSaveContent,
    handleLoadMessages,
    handleMarkRead
  };
};
