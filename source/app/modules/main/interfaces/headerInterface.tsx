import { Link } from "react-router";
import { useSession } from "@app/modules/main/hooks/useSession";
import CartBadgeInterface from "./cartBadgeInterface";

const NAV = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/contacto", label: "Contacto" }
];

// Header del sitio: logo, navegación, acceso a cuenta/admin y carrito.
export default function HeaderInterface() {
  const { isAuthenticated, isAdmin } = useSession();

  return (
    <header className="sticky top-0 z-20 border-b border-sand bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="font-display text-xl font-semibold text-ink">
          Carili Design
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Navegación principal">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="text-sm text-ink-soft hover:text-ink">
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-clay-deep hover:text-clay">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to={isAuthenticated ? "/mi-cuenta" : "/ingresar"}
            className="text-sm text-ink-soft hover:text-ink"
          >
            {isAuthenticated ? "Mi cuenta" : "Ingresar"}
          </Link>
          <CartBadgeInterface />
        </div>
      </div>
    </header>
  );
}
