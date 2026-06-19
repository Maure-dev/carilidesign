import CatalogProvider from "@app/modules/catalog/states/catalogProvider";
import CatalogModule from "./catalogModule";

export default function CatalogModuleProvider() {
  return (
    <CatalogProvider>
      <CatalogModule />
    </CatalogProvider>
  );
}
