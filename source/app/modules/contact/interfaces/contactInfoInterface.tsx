import type { ContactInfoType } from "@app/modules/contact/entities/entities";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import { Camera, Mail, MapPin, MessageCircle } from "lucide-react";

type Props = {
  info: ContactInfoType;
};

const rowClass = "inline-flex items-center gap-2 hover:text-clay-deep";

export default function ContactInfoInterface({ info }: Props) {
  return (
    <div className="flex flex-col gap-3 text-sm text-ink-soft">
      <h2 className="font-display text-lg text-ink">Datos de contacto</h2>
      {info.email && (
        <a href={`mailto:${info.email}`} className={rowClass}>
          <IconInterface icon={Mail} size="sm" />
          {info.email}
        </a>
      )}
      {info.whatsapp && (
        <a
          href={`https://wa.me/${info.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
        >
          <IconInterface icon={MessageCircle} size="sm" />
          WhatsApp
        </a>
      )}
      {info.instagram && (
        <a
          href={`https://instagram.com/${info.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
        >
          <IconInterface icon={Camera} size="sm" />@{info.instagram}
        </a>
      )}
      {info.address && (
        <span className="inline-flex items-center gap-2">
          <IconInterface icon={MapPin} size="sm" />
          {info.address}
        </span>
      )}
    </div>
  );
}
