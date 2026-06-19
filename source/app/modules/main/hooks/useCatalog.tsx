import type { ProductType } from "@app/modules/main/entities/entities";
import { useMainProvider } from "@app/modules/main/states/mainProvider";

// Acceso a los productos cargados en el bootstrap. Expone sólo los activos y helpers
// para destacados y búsqueda por slug. La data vive en Firestore.
export const useCatalog = () => {
  const { getMainState } = useMainProvider();
  const active = getMainState.site.products.filter((p) => p.isActive);

  const featured = (max: number): ProductType[] => active.filter((p) => p.isFeatured).slice(0, max);

  const bySlug = (slug: string): ProductType | null => active.find((p) => p.slug === slug) ?? null;

  return { products: active, featured: featured, bySlug: bySlug };
};
