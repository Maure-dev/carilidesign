import { NavLink } from "react-router";
import { ClipboardList, FileText, LayoutDashboard, Mail, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LogoInterface from "@app/modules/main/interfaces/logoInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";

export type AdminNavItem = { to: string; label: string; icon: LucideIcon; end?: boolean };

// Navegación del panel (compartida por el sidebar de desktop y la nav móvil del topbar).
export const ADMIN_NAV: AdminNavItem[] = [
  { to: "/admin", label: "Panel", icon: LayoutDashboard, end: true },
  { to: "/admin/productos", label: "Productos", icon: Package },
  { to: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
  { to: "/admin/contenido", label: "Contenido", icon: FileText },
  { to: "/admin/mensajes", label: "Mensajes", icon: Mail }
];

export default function AdminSidebarInterface() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sand bg-surface md:flex">
      <div className="border-b border-sand px-5 py-4">
        <LogoInterface />
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Navegación de administración">
        {ADMIN_NAV.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-buttons px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-clay text-white" : "text-ink-soft hover:bg-sand hover:text-ink"
              }`
            }
          >
            <IconInterface icon={icon} size="sm" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
