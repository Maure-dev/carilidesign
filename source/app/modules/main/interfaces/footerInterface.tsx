import { Link } from "react-router";
import { useSiteContent } from "@app/modules/main/hooks/useSiteContent";
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

type SettingsDoc = { tagline?: string };
type SocialDoc = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  whatsapp?: string;
};

const DEFAULT_TAGLINE = "Bachas de baño artesanales, hechas y esmaltadas a mano en Argentina.";

// Footer del sitio: logo, tagline y redes (editables desde Admin), navegación, legales y crédito.
export default function FooterInterface() {
  const year = new Date().getFullYear();
  const { getSection } = useSiteContent();
  const settings = getSection<SettingsDoc>("settings");
  const social = getSection<SocialDoc>("social");

  const socialLinks: { label: string; href: string }[] = [];
  if (social?.instagram) {
    socialLinks.push({ label: "Instagram", href: `https://instagram.com/${social.instagram}` });
  }
  if (social?.facebook) {
    socialLinks.push({ label: "Facebook", href: social.facebook });
  }
  if (social?.tiktok) {
    socialLinks.push({ label: "TikTok", href: social.tiktok });
  }
  if (social?.youtube) {
    socialLinks.push({ label: "YouTube", href: social.youtube });
  }
  if (social?.whatsapp) {
    socialLinks.push({ label: "WhatsApp", href: `https://wa.me/${social.whatsapp}` });
  }

  return (
    <footer className="mt-16 border-t border-sand bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <LogoInterface />
          <p className="max-w-xs text-sm text-ink-soft">{settings?.tagline || DEFAULT_TAGLINE}</p>
          {socialLinks.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-3 text-sm">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft transition-colors hover:text-clay-deep"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {SECTIONS.map((section) => (
          <nav key={section.title} aria-label={section.title} className="flex flex-col gap-2">
            <span className="font-display text-base text-ink">{section.title}</span>
            {section.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="border-t border-sand">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} · Carili Design</span>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/terminos" className="transition-colors hover:text-clay-deep">
              Términos
            </Link>
            <Link to="/privacidad" className="transition-colors hover:text-clay-deep">
              Privacidad
            </Link>
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
      </div>
    </footer>
  );
}
