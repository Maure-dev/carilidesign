import { useAdminActions } from "@app/modules/admin/hooks/useAdminActions";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { useEffect } from "react";
import AdminProductPreviewInterface from "./interfaces/adminProductPreviewInterface";
import ProductFormInterface from "./interfaces/productFormInterface";
import ProductListInterface from "./interfaces/productListInterface";

export default function AdminProductsModule() {
  const { getAdminState } = useAdminProvider();
  const actions = useAdminActions();
  const { loading, products, draft, saving, uploadingImage } = getAdminState;

  useDocumentHead({ title: "Productos" });

  useEffect(() => {
    actions.handleLoadProducts();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-ink">Productos</h1>
      {loading ? (
        <LoadingInterface />
      ) : draft ? (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,32rem)_minmax(0,1fr)]">
          <ProductFormInterface
            draft={draft}
            saving={saving}
            uploading={uploadingImage}
            onChange={actions.handleChangeDraft}
            onAddImage={actions.handleAddImage}
            onUploadImage={actions.handleUploadImage}
            onRemoveImage={actions.handleRemoveImage}
            onSave={actions.handleSaveProduct}
            onCancel={actions.handleCancelDraft}
          />
          <AdminProductPreviewInterface draft={draft} />
        </div>
      ) : (
        <ProductListInterface
          products={products}
          onNew={actions.handleNewDraft}
          onEdit={actions.handleEditDraft}
          onDelete={actions.handleDeleteProduct}
        />
      )}
    </section>
  );
}
