import type { AdminContentType } from "@app/modules/admin/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

type Props = {
  content: AdminContentType;
  saving: boolean;
  onChange: (patch: Partial<AdminContentType>) => void;
  onSave: () => void;
};

const inputClass =
  "rounded-buttons border border-sand bg-surface px-3 py-2 text-sm outline-none focus:border-clay";

export default function ContentFormInterface({ content, saving, onChange, onSave }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="flex max-w-2xl flex-col gap-4"
    >
      <h2 className="font-display text-xl text-ink">Contenido de la home</h2>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Título del hero</span>
        <input
          className={inputClass}
          value={content.heroTitle}
          onChange={(e) => onChange({ heroTitle: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Subtítulo del hero</span>
        <textarea
          className={inputClass}
          rows={2}
          value={content.heroSubtitle}
          onChange={(e) => onChange({ heroSubtitle: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Texto "Nosotros"</span>
        <textarea
          className={inputClass}
          rows={4}
          value={content.aboutText}
          onChange={(e) => onChange({ aboutText: e.target.value })}
        />
      </label>
      <ButtonInterface type="submit" disabled={saving}>
        {saving ? "Guardando..." : "Guardar contenido"}
      </ButtonInterface>
    </form>
  );
}
