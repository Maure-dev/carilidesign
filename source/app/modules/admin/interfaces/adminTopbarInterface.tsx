import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useSession } from "@app/modules/main/hooks/useSession";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import { Store } from "lucide-react";
import { NavLink } from "react-router";
import { ADMIN_NAV } from "./adminSidebarInterface";

export default function AdminTopbarInterface() {
  const { user, logout } = useSession();
  const { onNotification } = useNotification();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      onNotification(true, "Sesión cerrada.");
      router.navigate("/");
    } catch {
      onNotification(false, "No se pudo cerrar la sesión.");
    }
  };

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-sand bg-canvas/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg text-ink">Administración</p>
          {user && (
            <p className="truncate text-xs text-ink-soft">{user.displayName || user.email}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ButtonInterface to="/" variant="secondary" size="sm">
            <IconInterface icon={Store} size="sm" />
            Ver tienda
          </ButtonInterface>
          <ButtonInterface variant="ghost" size="sm" onClick={handleLogout}>
            Salir
          </ButtonInterface>
        </div>
      </div>

      {/* Navegación móvil (el sidebar se oculta en pantallas chicas) */}
      <nav
        aria-label="Navegación de administración"
        className="-mx-1 flex gap-1 overflow-x-auto md:hidden"
      >
        {ADMIN_NAV.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-buttons px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive ? "bg-clay text-white" : "text-ink-soft hover:bg-sand"
              }`
            }
          >
            <IconInterface icon={icon} size="sm" />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
