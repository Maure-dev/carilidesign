import type { FaqItemType } from "@app/modules/content/entities/entities";

type Props = {
  items: FaqItemType[];
};

// Acordeón accesible con <details>/<summary> nativos.
export default function FaqInterface({ items }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-card border border-sand bg-surface px-5 py-4"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-ink">
            {item.question}
            <span className="text-clay-deep transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
