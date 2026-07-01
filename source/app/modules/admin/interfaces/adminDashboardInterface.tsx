import { AlertTriangle, CheckCircle2, ClipboardList, Mail, Package, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardMetricsType } from "@app/modules/admin/helpers/dashboardMetrics";
import { formatMoney } from "@app/modules/main/helpers/formatMoney";
import CardInterface from "@app/modules/main/interfaces/cardInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

type Props = { metrics: DashboardMetricsType };

type Kpi = { label: string; value: string; icon: LucideIcon; highlight?: boolean };

export default function AdminDashboardInterface({ metrics }: Props) {
  const kpis: Kpi[] = [
    {
      label: "Pedidos pendientes",
      value: String(metrics.pendingOrders),
      icon: ClipboardList,
      highlight: metrics.pendingOrders > 0
    },
    { label: "Ingresos confirmados", value: formatMoney(metrics.revenue), icon: Wallet },
    { label: "Pedidos pagados", value: String(metrics.paidOrders), icon: CheckCircle2 },
    {
      label: "Mensajes sin leer",
      value: String(metrics.unreadMessages),
      icon: Mail,
      highlight: metrics.unreadMessages > 0
    },
    { label: "Productos", value: String(metrics.totalProducts), icon: Package },
    {
      label: "Stock bajo",
      value: String(metrics.lowStock),
      icon: AlertTriangle,
      highlight: metrics.lowStock > 0
    }
  ];

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-ink">Panel</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => (
          <CardInterface key={k.label} className="flex items-center gap-4">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                k.highlight ? "bg-clay/15 text-clay-deep" : "bg-sand text-ink-soft"
              }`}
            >
              <IconInterface icon={k.icon} size="md" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-2xl text-ink">{k.value}</span>
              <span className="text-sm text-ink-soft">{k.label}</span>
            </div>
          </CardInterface>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonInterface to="/admin/productos" variant="secondary" size="sm">
          Gestionar productos
        </ButtonInterface>
        <ButtonInterface to="/admin/pedidos" variant="secondary" size="sm">
          Ver pedidos
        </ButtonInterface>
        <ButtonInterface to="/admin/contenido" variant="secondary" size="sm">
          Editar contenido
        </ButtonInterface>
      </div>
    </section>
  );
}
