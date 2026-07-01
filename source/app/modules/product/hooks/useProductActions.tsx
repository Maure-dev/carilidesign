import type { ProductType } from "@app/modules/main/entities/entities";
import { useCart } from "@app/modules/main/hooks/useCart";
import { useCatalog } from "@app/modules/main/hooks/useCatalog";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import type { ProductSelectionType } from "@app/modules/product/entities/entities";
import { computePrice } from "@app/modules/product/helpers/computePrice";
import {
  buildSelectionSnapshot,
  validateSelection
} from "@app/modules/product/helpers/validateSelection";
import { useProductProvider } from "@app/modules/product/states/productProvider";

// Preselecciona la primera opción de cada selector/swatch requerido.
function defaultSelection(product: ProductType): ProductSelectionType {
  const selection: ProductSelectionType = {};
  for (const option of product.customizationOptions) {
    if (option.required && option.control !== "text" && option.choices[0]) {
      selection[option.id] = option.choices[0].id;
    }
  }
  return selection;
}

export const useProductActions = () => {
  const { setProductState } = useProductProvider();
  const { onNotification } = useNotification();
  const router = useRouter();
  const { addItem } = useCart();
  const { bySlug } = useCatalog();

  // El producto ya vino en el bootstrap: se busca por slug en el store global.
  const handleLoadProduct = (slug: string): void => {
    const product = bySlug(slug);
    setProductState((s) => ({
      ...s,
      product: product,
      selection: product ? defaultSelection(product) : {},
      galleryIndex: 0,
      quantity: 1,
      loading: false
    }));
  };

  const handleSelectChoice = (optionId: string, choiceId: string): void => {
    setProductState((s) => ({ ...s, selection: { ...s.selection, [optionId]: choiceId } }));
  };

  const handleEngravingChange = (optionId: string, text: string): void => {
    setProductState((s) => ({ ...s, selection: { ...s.selection, [optionId]: text } }));
  };

  const handleSetQuantity = (quantity: number): void => {
    setProductState((s) => ({ ...s, quantity: Math.max(1, quantity) }));
  };

  const handleSelectImage = (index: number): void => {
    setProductState((s) => ({ ...s, galleryIndex: index }));
  };

  const handleAddToCart = (
    product: ProductType,
    selection: ProductSelectionType,
    quantity: number
  ): void => {
    const validation = validateSelection(product, selection);
    if (!validation.valid) {
      onNotification(false, "Completá las opciones requeridas.");
      return;
    }
    const image = product.images.find((i) => i.isPrimary) ?? product.images[0];
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: image?.url,
        unitPrice: computePrice(product, selection),
        options: buildSelectionSnapshot(product, selection)
      },
      quantity
    );
    onNotification(true, "Producto agregado al carrito.");
    router.navigate("/carrito");
  };

  return {
    handleLoadProduct,
    handleSelectChoice,
    handleEngravingChange,
    handleSetQuantity,
    handleSelectImage,
    handleAddToCart
  };
};
