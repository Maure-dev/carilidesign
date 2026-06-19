import type { ValuePropType } from "@app/modules/home/entities/entities";

type Props = {
  items: ValuePropType[];
};

export default function ValuePropsInterface({ items }: Props) {
  return (
    <section className="border-y border-sand bg-surface">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-1">
            <h3 className="font-display text-lg text-ink">{item.title}</h3>
            <p className="text-sm text-ink-soft">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
