import type {
  AdminContentDocType,
  AdminContentKindType,
  AdminContentSectionType,
  AdminFaqItemType,
  AdminShippingOptionType,
  AdminValuePropType
} from "@app/modules/admin/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

type Props = {
  sections: AdminContentSectionType[];
  activeSlug: string;
  doc: AdminContentDocType;
  saving: boolean;
  onSelectSection: (slug: string) => void;
  onChange: (patch: Partial<AdminContentDocType>) => void;
  onSave: () => void;
};

const inputClass =
  "rounded-buttons border border-sand bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-clay";

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `opt-${Math.round(performance.now())}`;
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = ""
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-ink">{label}</span>
      {multiline ? (
        <textarea
          className={inputClass}
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function HomeForm({ doc, onChange }: { doc: AdminContentDocType; onChange: Props["onChange"] }) {
  const valueProps = doc.valueProps ?? [];
  const setValueProps = (next: AdminValuePropType[]) => onChange({ valueProps: next });

  return (
    <div className="flex flex-col gap-4">
      <Field
        label="Título del hero"
        value={doc.heroTitle ?? ""}
        onChange={(v) => onChange({ heroTitle: v })}
      />
      <Field
        label="Subtítulo del hero"
        value={doc.heroSubtitle ?? ""}
        multiline
        onChange={(v) => onChange({ heroSubtitle: v })}
      />
      <Field
        label="Imagen del hero (URL)"
        value={doc.heroImageUrl ?? ""}
        onChange={(v) => onChange({ heroImageUrl: v })}
      />
      <Field
        label="Título del proceso"
        value={doc.processTitle ?? ""}
        onChange={(v) => onChange({ processTitle: v })}
      />
      <Field
        label="Texto del proceso"
        value={doc.processText ?? ""}
        multiline
        onChange={(v) => onChange({ processText: v })}
      />
      <Field
        label="Imagen del proceso (URL)"
        value={doc.processImageUrl ?? ""}
        onChange={(v) => onChange({ processImageUrl: v })}
      />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-ink">Propuestas de valor</span>
        {valueProps.map((vp, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-buttons border border-sand p-3 sm:flex-row"
          >
            <input
              className={`${inputClass} sm:w-40`}
              placeholder="Título"
              value={vp.title}
              onChange={(e) =>
                setValueProps(
                  valueProps.map((x, i) => (i === index ? { ...x, title: e.target.value } : x))
                )
              }
            />
            <input
              className={`${inputClass} flex-1`}
              placeholder="Texto"
              value={vp.text}
              onChange={(e) =>
                setValueProps(
                  valueProps.map((x, i) => (i === index ? { ...x, text: e.target.value } : x))
                )
              }
            />
            <button
              type="button"
              onClick={() => setValueProps(valueProps.filter((_, i) => i !== index))}
              className="text-sm text-error"
            >
              Quitar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setValueProps([...valueProps, { title: "", text: "" }])}
          className="w-fit rounded-buttons border border-clay px-3 py-1 text-sm text-clay-deep hover:bg-sand"
        >
          + Agregar propuesta
        </button>
      </div>
    </div>
  );
}

function PageForm({ doc, onChange }: { doc: AdminContentDocType; onChange: Props["onChange"] }) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Título" value={doc.title ?? ""} onChange={(v) => onChange({ title: v })} />
      <Field
        label="Introducción"
        value={doc.intro ?? ""}
        multiline
        onChange={(v) => onChange({ intro: v })}
      />
      <Field
        label="Contenido (un párrafo por línea)"
        value={(doc.body ?? []).join("\n")}
        multiline
        onChange={(v) => onChange({ body: v.split("\n") })}
      />
      <Field
        label="Imagen (URL)"
        value={doc.imageUrl ?? ""}
        onChange={(v) => onChange({ imageUrl: v })}
      />
    </div>
  );
}

function FaqForm({ doc, onChange }: { doc: AdminContentDocType; onChange: Props["onChange"] }) {
  const faq = doc.faq ?? [];
  const setFaq = (next: AdminFaqItemType[]) => onChange({ faq: next });

  return (
    <div className="flex flex-col gap-4">
      <Field label="Título" value={doc.title ?? ""} onChange={(v) => onChange({ title: v })} />
      <Field
        label="Introducción"
        value={doc.intro ?? ""}
        onChange={(v) => onChange({ intro: v })}
      />
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-ink">Preguntas</span>
        {faq.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 rounded-buttons border border-sand p-3">
            <input
              className={inputClass}
              placeholder="Pregunta"
              value={item.question}
              onChange={(e) =>
                setFaq(faq.map((x, i) => (i === index ? { ...x, question: e.target.value } : x)))
              }
            />
            <textarea
              className={inputClass}
              rows={2}
              placeholder="Respuesta"
              value={item.answer}
              onChange={(e) =>
                setFaq(faq.map((x, i) => (i === index ? { ...x, answer: e.target.value } : x)))
              }
            />
            <button
              type="button"
              onClick={() => setFaq(faq.filter((_, i) => i !== index))}
              className="w-fit text-sm text-error"
            >
              Quitar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFaq([...faq, { question: "", answer: "" }])}
          className="w-fit rounded-buttons border border-clay px-3 py-1 text-sm text-clay-deep hover:bg-sand"
        >
          + Agregar pregunta
        </button>
      </div>
    </div>
  );
}

function ContactForm({ doc, onChange }: { doc: AdminContentDocType; onChange: Props["onChange"] }) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Email" value={doc.email ?? ""} onChange={(v) => onChange({ email: v })} />
      <Field label="Teléfono" value={doc.phone ?? ""} onChange={(v) => onChange({ phone: v })} />
      <Field
        label="WhatsApp (solo números, con código país)"
        value={doc.whatsapp ?? ""}
        onChange={(v) => onChange({ whatsapp: v })}
      />
      <Field
        label="Instagram (usuario)"
        value={doc.instagram ?? ""}
        onChange={(v) => onChange({ instagram: v })}
      />
      <Field
        label="Dirección"
        value={doc.address ?? ""}
        onChange={(v) => onChange({ address: v })}
      />
      <Field
        label="URL del mapa (embed)"
        value={doc.mapEmbedUrl ?? ""}
        onChange={(v) => onChange({ mapEmbedUrl: v })}
      />
    </div>
  );
}

function PaymentForm({ doc, onChange }: { doc: AdminContentDocType; onChange: Props["onChange"] }) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Banco" value={doc.bankName ?? ""} onChange={(v) => onChange({ bankName: v })} />
      <Field
        label="Titular de la cuenta"
        value={doc.accountName ?? ""}
        onChange={(v) => onChange({ accountName: v })}
      />
      <Field label="CBU" value={doc.cbu ?? ""} onChange={(v) => onChange({ cbu: v })} />
      <Field label="Alias" value={doc.alias ?? ""} onChange={(v) => onChange({ alias: v })} />
      <Field
        label="Nota para pago en efectivo"
        value={doc.cashNote ?? ""}
        multiline
        onChange={(v) => onChange({ cashNote: v })}
      />
    </div>
  );
}

function ShippingForm({
  doc,
  onChange
}: {
  doc: AdminContentDocType;
  onChange: Props["onChange"];
}) {
  const options = doc.options ?? [];
  const setOptions = (next: AdminShippingOptionType[]) => onChange({ options: next });

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-ink">Opciones de envío (correo y precio)</span>
      {options.map((opt, index) => (
        <div
          key={opt.id}
          className="flex flex-col gap-2 rounded-buttons border border-sand p-3 sm:flex-row sm:items-center"
        >
          <input
            className={`${inputClass} flex-1`}
            placeholder="Ej: Correo Argentino"
            value={opt.name}
            onChange={(e) =>
              setOptions(options.map((x, i) => (i === index ? { ...x, name: e.target.value } : x)))
            }
          />
          <input
            type="number"
            className={`${inputClass} sm:w-40`}
            placeholder="Precio (ARS)"
            value={opt.priceArs}
            onChange={(e) =>
              setOptions(
                options.map((x, i) =>
                  i === index ? { ...x, priceArs: Number(e.target.value) } : x
                )
              )
            }
          />
          <button
            type="button"
            onClick={() => setOptions(options.filter((_, i) => i !== index))}
            className="text-sm text-error"
          >
            Quitar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setOptions([...options, { id: newId(), name: "", priceArs: 0 }])}
        className="w-fit rounded-buttons border border-clay px-3 py-1 text-sm text-clay-deep hover:bg-sand"
      >
        + Agregar opción de envío
      </button>
    </div>
  );
}

function renderForm(
  kind: AdminContentKindType,
  doc: AdminContentDocType,
  onChange: Props["onChange"]
) {
  if (kind === "home") {
    return <HomeForm doc={doc} onChange={onChange} />;
  }
  if (kind === "faq") {
    return <FaqForm doc={doc} onChange={onChange} />;
  }
  if (kind === "contact") {
    return <ContactForm doc={doc} onChange={onChange} />;
  }
  if (kind === "payment") {
    return <PaymentForm doc={doc} onChange={onChange} />;
  }
  if (kind === "shipping") {
    return <ShippingForm doc={doc} onChange={onChange} />;
  }
  return <PageForm doc={doc} onChange={onChange} />;
}

export default function AdminContentEditorInterface({
  sections,
  activeSlug,
  doc,
  saving,
  onSelectSection,
  onChange,
  onSave
}: Props) {
  const active = sections.find((s) => s.slug === activeSlug) ?? sections[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.slug}
            type="button"
            onClick={() => onSelectSection(section.slug)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              section.slug === activeSlug
                ? "border-clay bg-clay text-white"
                : "border-sand bg-surface text-ink-soft hover:border-clay"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="flex max-w-2xl flex-col gap-5"
      >
        <h2 className="font-display text-xl text-ink">{active.label}</h2>
        {renderForm(active.kind, doc, onChange)}
        <ButtonInterface type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </ButtonInterface>
      </form>
    </div>
  );
}
