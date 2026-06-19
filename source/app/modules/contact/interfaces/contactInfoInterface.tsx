import type { ContactInfoType } from "@app/modules/contact/entities/entities";

type Props = {
  info: ContactInfoType;
};

export default function ContactInfoInterface({ info }: Props) {
  return (
    <div className="flex flex-col gap-3 text-sm text-ink-soft">
      <h2 className="font-display text-lg text-ink">Datos de contacto</h2>
      {info.email && (
        <a href={`mailto:${info.email}`} className="hover:text-clay-deep">
          {info.email}
        </a>
      )}
      {info.whatsapp && (
        <a
          href={`https://wa.me/${info.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-clay-deep"
        >
          WhatsApp
        </a>
      )}
      {info.instagram && (
        <a
          href={`https://instagram.com/${info.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-clay-deep"
        >
          @{info.instagram}
        </a>
      )}
      {info.address && <span>{info.address}</span>}
    </div>
  );
}
