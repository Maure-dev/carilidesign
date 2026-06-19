import ProductProvider from "@app/modules/product/states/productProvider";
import ProductModule from "./productModule";

export default function ProductModuleProvider() {
  return (
    <ProductProvider>
      <ProductModule />
    </ProductProvider>
  );
}
