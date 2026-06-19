import { useEffect } from "react";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useProductProvider } from "@app/modules/product/states/productProvider";
import { useProductActions } from "@app/modules/product/hooks/useProductActions";
import { computePrice } from "@app/modules/product/helpers/computePrice";
import { validateSelection } from "@app/modules/product/helpers/validateSelection";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import ProductGalleryInterface from "@app/modules/product/interfaces/productGalleryInterface";
import ProductInfoInterface from "@app/modules/product/interfaces/productInfoInterface";
import CustomizationPanelInterface from "@app/modules/product/interfaces/customizationPanelInterface";
import AddToCartInterface from "@app/modules/product/interfaces/addToCartInterface";

export default function ProductModule() {
  const router = useRouter();
  const slug = router.params.slug ?? "";
  const {
    handleLoadProduct,
    handleSelectChoice,
    handleEngravingChange,
    handleSetQuantity,
    handleSelectImage,
    handleAddToCart
  } = useProductActions();
  const { getProductState } = useProductProvider();
  const { product, loading, galleryIndex, selection, quantity } = getProductState;

  useDocumentHead({
    title: product?.name ?? "Producto",
    description: product?.shortDescription ?? product?.description
  });

  useEffect(() => {
    if (slug) {
      handleLoadProduct(slug);
    }
  }, [slug]);

  if (loading) {
    return <LoadingInterface />;
  }
  if (!product) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <EmptyBoxInterface message="No encontramos este producto." />
      </div>
    );
  }

  const price = computePrice(product, selection);
  const { errors } = validateSelection(product, selection);

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
      <ProductGalleryInterface
        images={product.images}
        activeIndex={galleryIndex}
        onSelect={handleSelectImage}
      />
      <div className="flex flex-col gap-6">
        <ProductInfoInterface product={product} price={price} />
        <CustomizationPanelInterface
          product={product}
          selection={selection}
          errors={errors}
          onSelectChoice={handleSelectChoice}
          onEngraving={handleEngravingChange}
        />
        <AddToCartInterface
          quantity={quantity}
          onQuantity={handleSetQuantity}
          onAdd={() => handleAddToCart(product, selection, quantity)}
        />
      </div>
    </section>
  );
}
