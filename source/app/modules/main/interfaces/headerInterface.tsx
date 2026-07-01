import { useMountTransition } from "@app/modules/main/hooks/useMountTransition";
import { useSession } from "@app/modules/main/hooks/useSession";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import CartBadgeInterface from "./cartBadgeInterface";
import IconButtonInterface from "./iconButtonInterface";
import IconInterface from "./iconInterface";
import LogoInterface from "./logoInterface";

// Nav compacto para desktop.
const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/materiales-y-proceso", label: "Proceso" },
  { to: "/preguntas-frecuentes", label: "FAQ" },
  { to: "/contacto", label: "Contacto" }
];

// Nav completo para el menú móvil (todas las secciones).
const MOBILE_NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/materiales-y-proceso", label: "Materiales y proceso" },
  { to: "/como-instalar", label: "¿Cómo la instalo?" },
  { to: "/como-lavar", label: "¿Cómo la lavo?" },
  { to: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { to: "/contacto", label: "Contacto" }
];

// Header del sitio: logo, navegación (desktop + menú móvil a pantalla completa), cuenta/admin y carrito.
export default function HeaderInterface() {
  const { isAuthenticated, isAdmin } = useSession();
  const showAdmin = isAdmin;
  const [menuOpen, setMenuOpen] = useState(false);
  const { mounted: menuMounted, state: menuState } = useMountTransition(menuOpen, 200);

  const closeMenu = () => setMenuOpen(false);

  // Mientras el menú está abierto: cerrar con Escape y bloquear el scroll del fondo.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const accountTo = isAuthenticated ? "/mi-cuenta" : "/ingresar";
  const accountLabel = isAuthenticated ? "Mi cuenta" : "Ingresar";
  const adminLabel = "Administrar sitio";

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-sand bg-canvas/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" aria-label="Carili Design — inicio">
            <LogoInterface />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="text-sm text-ink-soft hover:text-ink">
                {item.label}
              </Link>
            ))}
            {showAdmin && (
              <Link to="/admin" className="text-sm font-medium text-clay-deep hover:text-clay">
                {adminLabel}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to={accountTo}
              className="hidden text-sm text-ink-soft hover:text-ink sm:block lg:inline"
            >
              {accountLabel}
            </Link>
            <CartBadgeInterface />
            <IconButtonInterface
              label="Abrir menú"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="text-ink lg:hidden"
            >
              <IconInterface icon={Menu} size="lg" />
            </IconButtonInterface>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa (fuera del header para que `fixed` use el viewport) */}
      {menuMounted && (
        <div
          id="mobile-menu"
          data-state={menuState}
          className="fixed inset-0 z-40 flex flex-col bg-canvas transition-transform duration-200 ease-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-sand px-4 py-3">
            <Link to="/" aria-label="Carili Design — inicio" onClick={closeMenu}>
              <LogoInterface />
            </Link>
            <IconButtonInterface label="Cerrar menú" onClick={closeMenu} className="text-ink">
              <IconInterface icon={X} size="lg" />
            </IconButtonInterface>
          </div>

          <nav
            aria-label="Navegación móvil"
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6"
          >
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className="border-b border-sand/70 py-3 font-display text-xl text-ink hover:text-clay-deep"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={accountTo}
              onClick={closeMenu}
              className="border-b border-sand/70 py-3 font-display text-xl text-ink hover:text-clay-deep"
            >
              {accountLabel}
            </Link>
            {showAdmin && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="py-3 font-display text-xl text-clay-deep hover:text-clay"
              >
                {adminLabel}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
