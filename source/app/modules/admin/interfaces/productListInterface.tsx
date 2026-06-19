import type { ProductType } from "@app/modules/main/entities/entities";
import PriceInterface from "@app/modules/main/interfaces/priceInterface";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

type Props = {
  products: ProductType[];
  onNew: () => void;
  onEdit: (product: ProductType) => void;
  onDelete: (id: string) => void;
};

export default function ProductListInterface({ products, onNew, onEdit, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-ink">Productos ({products.length})</h2>
        <ButtonInterface onClick={onNew}>Nuevo producto</ButtonInterface>
      </div>
      <div className="overflow-x-auto rounded-card border border-sand">
        <table className="w-full min-w-[36rem] text-sm">
          <thead className="bg-surface text-left text-ink-soft">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-sand">
                <td className="px-4 py-2 text-ink">{product.name}</td>
                <td className="px-4 py-2">
                  <PriceInterface amount={product.priceArs} />
                </td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">{product.isActive ? "Publicado" : "Borrador"}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="mr-3 text-clay-deep hover:text-clay"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="text-ink-soft hover:text-error"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
