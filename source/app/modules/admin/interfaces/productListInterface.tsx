import type { ProductType } from "@app/modules/main/entities/entities";
import BadgeInterface from "@app/modules/main/interfaces/badgeInterface";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import IconButtonInterface from "@app/modules/main/interfaces/iconButtonInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";
import { Pencil, Plus, Trash2 } from "lucide-react";

type Props = {
  products: ProductType[];
  onNew: () => void;
  onEdit: (product: ProductType) => void;
  onDelete: (id: string) => void;
};

export default function ProductListInterface({ products, onNew, onEdit, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl text-ink">Productos ({products.length})</h2>
        <ButtonInterface onClick={onNew}>
          <IconInterface icon={Plus} size="sm" />
          Nuevo producto
        </ButtonInterface>
      </div>

      {products.length === 0 ? (
        <EmptyBoxInterface message="Todavía no cargaste productos." />
      ) : (
        <div className="overflow-x-auto rounded-card border border-sand">
          <table className="w-full min-w-[42rem] text-sm">
            <thead className="border-b border-sand bg-surface text-left text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const image = product.images.find((i) => i.isPrimary) ?? product.images[0];
                return (
                  <tr
                    key={product.id}
                    className="border-t border-sand transition-colors hover:bg-surface"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-buttons bg-sand">
                          {image && (
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium text-ink">{product.name}</span>
                          <span className="text-xs text-ink-soft">/{product.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <PriceInterface amount={product.priceArs} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={product.stock <= 3 ? "font-medium text-error" : "text-ink"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <BadgeInterface tone={product.isActive ? "success" : "sand"}>
                          {product.isActive ? "Publicado" : "Borrador"}
                        </BadgeInterface>
                        {product.isFeatured && (
                          <BadgeInterface tone="clay">Destacado</BadgeInterface>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <IconButtonInterface
                          label="Editar"
                          size="sm"
                          onClick={() => onEdit(product)}
                        >
                          <IconInterface icon={Pencil} size="sm" />
                        </IconButtonInterface>
                        <IconButtonInterface
                          label="Eliminar"
                          size="sm"
                          className="hover:text-error"
                          onClick={() => onDelete(product.id)}
                        >
                          <IconInterface icon={Trash2} size="sm" />
                        </IconButtonInterface>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
