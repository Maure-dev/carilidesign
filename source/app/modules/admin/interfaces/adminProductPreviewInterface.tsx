import type { ProductDraftType } from "@app/modules/admin/entities/entities";
import type { ProductType } from "@app/modules/main/entities/entities";
import ProductCardInterface from "@app/modules/main/interfaces/productCardInterface";

type Props = { draft: ProductDraftType };

// Vista previa: arma un producto a partir del borrador y muestra la card real del catálogo.
export default function AdminProductPreviewInterface({ draft }: Props) {
  const preview: ProductType = {
    id: draft.id ?? "preview",
    slug: draft.slug || "preview",
    name: draft.name || "Nombre del producto",
    description: draft.description,
    shortDescription: draft.description,
    category: draft.category,
    shape: draft.shape,
    priceArs: draft.priceArs,
    images: draft.images,
    customizationOptions: [],
    stock: draft.stock,
    isActive: draft.isActive,
    isFeatured: draft.isFeatured
  };

  return (
    <div className="flex flex-col gap-3 self-start xl:sticky xl:top-24">
      <span className="text-sm font-medium text-ink">Vista previa en el catálogo</span>
      <div className="rounded-card border border-sand bg-canvas p-6">
        {/* No interactivo: es solo previsualización */}
        <div className="pointer-events-none mx-auto max-w-xs">
          <ProductCardInterface product={preview} />
        </div>
      </div>
      <p className="text-xs text-ink-soft">Así se verá la card en el catálogo. Recordá Guardar.</p>
    </div>
  );
}
