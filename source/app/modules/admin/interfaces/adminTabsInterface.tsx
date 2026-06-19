import type { AdminTabType } from "@app/modules/admin/entities/entities";

type Props = {
  tab: AdminTabType;
  onTab: (tab: AdminTabType) => void;
};

const TABS: { value: AdminTabType; label: string }[] = [
  { value: "products", label: "Productos" },
  { value: "orders", label: "Pedidos" },
  { value: "content", label: "Contenido" },
  { value: "messages", label: "Mensajes" }
];

export default function AdminTabsInterface({ tab, onTab }: Props) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-sand pb-2">
      {TABS.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onTab(item.value)}
          className={`rounded-buttons px-4 py-2 text-sm font-medium transition-colors ${
            tab === item.value ? "bg-clay text-white" : "text-ink-soft hover:bg-sand"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
