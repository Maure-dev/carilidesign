import { useEffect } from "react";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useAdminActions } from "@app/modules/admin/hooks/useAdminActions";
import { CONTENT_SECTIONS } from "@app/modules/admin/constants/constants";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import AdminTabsInterface from "@app/modules/admin/interfaces/adminTabsInterface";
import ProductListInterface from "@app/modules/admin/interfaces/productListInterface";
import ProductFormInterface from "@app/modules/admin/interfaces/productFormInterface";
import OrderListInterface from "@app/modules/admin/interfaces/orderListInterface";
import AdminContentEditorInterface from "@app/modules/admin/interfaces/adminContentEditorInterface";
import MessagesListInterface from "@app/modules/admin/interfaces/messagesListInterface";

export default function AdminModule() {
  const { getAdminState } = useAdminProvider();
  const actions = useAdminActions();
  const { tab, loading, products, draft, saving, orders, contentSlug, contentDoc, messages } =
    getAdminState;

  useDocumentHead({ title: "Administración" });

  useEffect(() => {
    if (tab === "products") {
      actions.handleLoadProducts();
    } else if (tab === "orders") {
      actions.handleLoadOrders();
    } else if (tab === "content") {
      actions.handleLoadContent();
    } else {
      actions.handleLoadMessages();
    }
  }, [tab]);

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
      <h1 className="font-display text-3xl text-ink">Administración</h1>
      <AdminTabsInterface tab={tab} onTab={actions.handleSetTab} />

      {loading ? (
        <LoadingInterface />
      ) : (
        <>
          {tab === "products" &&
            (draft ? (
              <ProductFormInterface
                draft={draft}
                saving={saving}
                onChange={actions.handleChangeDraft}
                onAddImage={actions.handleAddImage}
                onRemoveImage={actions.handleRemoveImage}
                onSave={actions.handleSaveProduct}
                onCancel={actions.handleCancelDraft}
              />
            ) : (
              <ProductListInterface
                products={products}
                onNew={actions.handleNewDraft}
                onEdit={actions.handleEditDraft}
                onDelete={actions.handleDeleteProduct}
              />
            ))}
          {tab === "orders" && (
            <OrderListInterface
              orders={orders}
              onTransition={actions.handleTransition}
              onConfirmPayment={actions.handleConfirmPayment}
            />
          )}
          {tab === "content" && (
            <AdminContentEditorInterface
              sections={CONTENT_SECTIONS}
              activeSlug={contentSlug}
              doc={contentDoc}
              saving={saving}
              onSelectSection={actions.handleSelectContentSection}
              onChange={actions.handleChangeContentDoc}
              onSave={actions.handleSaveContent}
            />
          )}
          {tab === "messages" && (
            <MessagesListInterface messages={messages} onMarkRead={actions.handleMarkRead} />
          )}
        </>
      )}
    </section>
  );
}
