import { Link } from "react-router";
import LogoInterface from "./logoInterface";

const SECTIONS = [
  {
    title: "Tienda",
    links: [
      { to: "/catalogo", label: "Catálogo" },
      { to: "/carrito", label: "Carrito" },
      { to: "/mi-cuenta", label: "Mi cuenta" }
    ]
  },
  {
    title: "Información",
    links: [
      { to: "/nosotros", label: "Nosotros" },
      { to: "/materiales-y-proceso", label: "Materiales y proceso" },
      { to: "/como-instalar", label: "¿Cómo la instalo?" },
      { to: "/como-lavar", label: "¿Cómo la lavo?" },
      { to: "/preguntas-frecuentes", label: "Preguntas frecuentes" }
    ]
  },
  {
    title: "Ayuda",
    links: [{ to: "/contacto", label: "Contacto" }]
  }
];

// Footer del sitio: logo, secciones de navegación, copyright y crédito.
export default function FooterInterface() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-sand bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <LogoInterface />
          <p className="max-w-xs text-sm text-ink-soft">
            Bachas de baño artesanales, hechas y esmaltadas a mano en Argentina.
          </p>
        </div>
        {SECTIONS.map((section) => (
          <nav key={section.title} aria-label={section.title} className="flex flex-col gap-2">
            <span className="font-display text-base text-ink">{section.title}</span>
            {section.links.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-ink-soft hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="border-t border-sand">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Carili Design · Bachas hechas a mano</span>
          <span>
            Diseñado y desarrollado por{" "}
            <a
              href="https://maure-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-clay-deep hover:text-clay"
            >
              Maure-dev
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
