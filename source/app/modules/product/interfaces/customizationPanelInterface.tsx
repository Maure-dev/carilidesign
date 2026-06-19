import type { ProductType } from "@app/modules/main/entities/entities";
import type { ProductSelectionType } from "@app/modules/product/entities/entities";

type Props = {
  product: ProductType;
  selection: ProductSelectionType;
  errors: Record<string, string>;
  onSelectChoice: (optionId: string, choiceId: string) => void;
  onEngraving: (optionId: string, text: string) => void;
};

export default function CustomizationPanelInterface({
  product,
  selection,
  errors,
  onSelectChoice,
  onEngraving
}: Props) {
  return (
    <div className="flex flex-col gap-5">
      {product.customizationOptions.map((option) => (
        <fieldset key={option.id} className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-ink">
            {option.label}
            {option.required && <span className="text-clay-deep"> *</span>}
          </legend>

          {option.control === "select" && (
            <select
              value={selection[option.id] ?? ""}
              onChange={(e) => onSelectChoice(option.id, e.target.value)}
              className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm text-ink"
            >
              <option value="" disabled>
                Elegí una opción
              </option>
              {option.choices.map((choice) => (
                <option key={choice.id} value={choice.id}>
                  {choice.label}
                  {choice.priceDelta > 0 ? ` (+$${choice.priceDelta})` : ""}
                </option>
              ))}
            </select>
          )}

          {option.control === "swatch" && (
            <div className="flex flex-wrap gap-2">
              {option.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => onSelectChoice(option.id, choice.id)}
                  aria-label={choice.label}
                  aria-pressed={selection[option.id] === choice.id}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors ${
                    selection[option.id] === choice.id
                      ? "border-clay text-ink"
                      : "border-sand text-ink-soft hover:border-clay"
                  }`}
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-sand"
                    style={{ backgroundColor: choice.swatchColor }}
                  />
                  {choice.label}
                </button>
              ))}
            </div>
          )}

          {option.control === "text" && (
            <input
              type="text"
              maxLength={option.maxLength}
              value={selection[option.id] ?? ""}
              onChange={(e) => onEngraving(option.id, e.target.value)}
              placeholder="Texto a grabar (opcional)"
              className="rounded-buttons border border-sand bg-surface px-3 py-2 text-sm text-ink"
            />
          )}

          {errors[option.id] && <span className="text-xs text-error">{errors[option.id]}</span>}
        </fieldset>
      ))}
    </div>
  );
}
