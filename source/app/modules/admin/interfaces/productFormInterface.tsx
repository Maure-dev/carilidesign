import type { ProductDraftType } from "@app/modules/admin/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import FieldInterface from "@app/modules/main/interfaces/fieldInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import { InputInterface, TextareaInterface } from "@app/modules/main/interfaces/inputInterface";
import { Trash2, Upload } from "lucide-react";
import { useState } from "react";

type Props = {
  draft: ProductDraftType;
  saving: boolean;
  uploading: boolean;
  onChange: (patch: Partial<ProductDraftType>) => void;
  onAddImage: (url: string) => void;
  onUploadImage: (file: File) => void;
  onRemoveImage: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function ProductFormInterface({
  draft,
  saving,
  uploading,
  onChange,
  onAddImage,
  onUploadImage,
  onRemoveImage,
  onSave,
  onCancel
}: Props) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="flex flex-col gap-5 rounded-card border border-sand bg-surface p-5 shadow-card"
    >
      <h2 className="font-display text-xl text-ink">
        {draft.id ? "Editar producto" : "Nuevo producto"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldInterface label="Nombre" required>
          <InputInterface value={draft.name} onChange={(e) => onChange({ name: e.target.value })} />
        </FieldInterface>
        <FieldInterface
          label="Slug"
          required
          hint="Se usa en la URL del producto para identificarlo."
        >
          <InputInterface value={draft.slug} onChange={(e) => onChange({ slug: e.target.value })} />
        </FieldInterface>
        <FieldInterface label="Precio (ARS)" required>
          <InputInterface
            type="number"
            min="0"
            step="0.01"
            value={draft.priceArs}
            onChange={(e) => onChange({ priceArs: Number(e.target.value) })}
          />
        </FieldInterface>
        <FieldInterface label="Stock">
          <InputInterface
            type="number"
            min="0"
            value={draft.stock}
            onChange={(e) => onChange({ stock: Number(e.target.value) })}
          />
        </FieldInterface>
        <FieldInterface label="Categoría">
          <InputInterface
            value={draft.category}
            onChange={(e) => onChange({ category: e.target.value })}
          />
        </FieldInterface>
        <FieldInterface label="Forma">
          <InputInterface
            value={draft.shape}
            onChange={(e) => onChange({ shape: e.target.value })}
          />
        </FieldInterface>
      </div>

      <FieldInterface label="Descripción">
        <TextareaInterface
          rows={3}
          value={draft.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </FieldInterface>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            className="h-4 w-4 accent-clay"
            checked={draft.isActive}
            onChange={(e) => onChange({ isActive: e.target.checked })}
          />
          Publicado
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            className="h-4 w-4 accent-clay"
            checked={draft.isFeatured}
            onChange={(e) => onChange({ isFeatured: e.target.checked })}
          />
          Destacado
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-ink">Imágenes</span>
        {draft.images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {draft.images.map((image, index) => (
              <div
                key={image.url}
                className="group relative h-20 w-20 overflow-hidden rounded-buttons border border-sand"
              >
                <img src={image.url} alt={image.alt} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  aria-label="Quitar imagen"
                  className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-error text-white transition-opacity hover:bg-error/80"
                >
                  <IconInterface icon={Trash2} size="sm" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          className={`inline-flex w-fit cursor-pointer items-center gap-2 rounded-buttons bg-clay px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-clay-deep ${
            uploading ? "pointer-events-none opacity-70" : ""
          }`}
        >
          <IconInterface icon={Upload} size="sm" />
          {uploading ? "Subiendo imagen…" : "Subir imagen"}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onUploadImage(file);
              }
              e.target.value = "";
            }}
            className="hidden"
          />
        </label>

        <div className="flex gap-2">
          <InputInterface
            placeholder="…o pegá una URL de imagen"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <ButtonInterface
            type="button"
            variant="secondary"
            onClick={() => {
              onAddImage(imageUrl);
              setImageUrl("");
            }}
          >
            Agregar
          </ButtonInterface>
        </div>
      </div>

      <div className="flex gap-3">
        <ButtonInterface type="submit" loading={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </ButtonInterface>
        <ButtonInterface type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </ButtonInterface>
      </div>
    </form>
  );
}
