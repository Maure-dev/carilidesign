import { useState } from "react";
import type { ProductDraftType } from "@app/modules/admin/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

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

const inputClass =
  "rounded-buttons border border-sand bg-surface px-3 py-2 text-sm outline-none focus:border-clay";

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
      className="flex flex-col gap-4"
    >
      <h2 className="font-display text-xl text-ink">
        {draft.id ? "Editar producto" : "Nuevo producto"}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Nombre</span>
          <input
            className={inputClass}
            value={draft.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Slug (URL)</span>
          <input
            className={inputClass}
            value={draft.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Precio (ARS)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            value={draft.priceArs}
            onChange={(e) => onChange({ priceArs: Number(e.target.value) })}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Stock</span>
          <input
            type="number"
            className={inputClass}
            value={draft.stock}
            onChange={(e) => onChange({ stock: Number(e.target.value) })}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Categoría</span>
          <input
            className={inputClass}
            value={draft.category}
            onChange={(e) => onChange({ category: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Forma</span>
          <input
            className={inputClass}
            value={draft.shape}
            onChange={(e) => onChange({ shape: e.target.value })}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Descripción</span>
        <textarea
          className={inputClass}
          rows={3}
          value={draft.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </label>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={draft.isActive}
            onChange={(e) => onChange({ isActive: e.target.checked })}
          />
          Publicado
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={draft.isFeatured}
            onChange={(e) => onChange({ isFeatured: e.target.checked })}
          />
          Destacado
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-ink">Imágenes</span>
        <div className="flex flex-wrap gap-2">
          {draft.images.map((image, index) => (
            <span
              key={image.url}
              className="flex items-center gap-2 rounded-full border border-sand px-3 py-1 text-xs text-ink-soft"
            >
              {image.url.slice(0, 28)}…
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                aria-label="Quitar imagen"
                className="text-error"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <label
          className={`inline-flex w-fit cursor-pointer items-center gap-2 rounded-buttons bg-clay px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-clay-deep ${
            uploading ? "pointer-events-none opacity-70" : ""
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            width="1.1rem"
            height="1.1rem"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 16 V4" />
            <path d="M7 9 L12 4 L17 9" />
            <path d="M5 20 H19" />
          </svg>
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
          <input
            className={`flex-1 ${inputClass}`}
            placeholder="…o pegá una URL de imagen"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              onAddImage(imageUrl);
              setImageUrl("");
            }}
            className="rounded-buttons border border-clay px-4 text-sm text-clay-deep hover:bg-sand"
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <ButtonInterface type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </ButtonInterface>
        <ButtonInterface type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </ButtonInterface>
      </div>
    </form>
  );
}
