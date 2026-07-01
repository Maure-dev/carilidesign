import type {
  AdminContentDocType,
  AdminContentKindType
} from "@app/modules/admin/entities/entities";
import type { ContactInfoType } from "@app/modules/contact/entities/entities";
import ContactInfoInterface from "@app/modules/contact/interfaces/contactInfoInterface";
import type { PageContentType } from "@app/modules/content/entities/entities";
import ContentPageInterface from "@app/modules/content/interfaces/contentPageInterface";
import type { HomeContentType } from "@app/modules/home/entities/entities";
import HeroInterface from "@app/modules/home/interfaces/heroInterface";
import ProcessSectionInterface from "@app/modules/home/interfaces/processSectionInterface";
import ValuePropsInterface from "@app/modules/home/interfaces/valuePropsInterface";
import { formatMoney } from "@app/modules/main/helpers/formatMoney";
import IconButtonInterface from "@app/modules/main/interfaces/iconButtonInterface";
import IconInterface from "@app/modules/main/interfaces/iconInterface";
import { Monitor, Smartphone } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  kind: AdminContentKindType;
  doc: AdminContentDocType;
};

// Anchos de "dispositivo" a los que se renderiza la página real antes de escalar para entrar
// en el panel (emulación desktop/mobile). Son px de viewport, no estilos propios.
const DESKTOP_WIDTH = 1280;
const MOBILE_WIDTH = 390;

// Renderiza la sección con los componentes REALES de la tienda, alimentados con el borrador.
function renderPreview(kind: AdminContentKindType, doc: AdminContentDocType) {
  if (kind === "home") {
    const content: HomeContentType = {
      heroTitle: doc.heroTitle ?? "",
      heroSubtitle: doc.heroSubtitle ?? "",
      heroImageUrl: doc.heroImageUrl,
      valueProps: doc.valueProps ?? [],
      processTitle: doc.processTitle ?? "",
      processText: doc.processText ?? "",
      processImageUrl: doc.processImageUrl
    };
    return (
      <>
        <HeroInterface content={content} />
        {content.valueProps.length > 0 && <ValuePropsInterface items={content.valueProps} />}
        <ProcessSectionInterface content={content} />
      </>
    );
  }
  if (kind === "page" || kind === "faq") {
    const page: PageContentType = {
      slug: "preview",
      title: doc.title ?? "",
      intro: doc.intro,
      body: doc.body ?? [],
      faq: doc.faq,
      imageUrl: doc.imageUrl
    };
    return <ContentPageInterface page={page} />;
  }
  if (kind === "contact") {
    const info: ContactInfoType = {
      email: doc.email ?? "",
      phone: doc.phone ?? "",
      whatsapp: doc.whatsapp ?? "",
      instagram: doc.instagram ?? "",
      address: doc.address ?? "",
      mapEmbedUrl: doc.mapEmbedUrl ?? ""
    };
    return (
      <div className="p-8">
        <ContactInfoInterface info={info} />
      </div>
    );
  }
  if (kind === "payment") {
    return (
      <div className="flex flex-col gap-2 p-8 text-sm text-ink-soft">
        <h2 className="font-display text-lg text-ink">Datos de pago</h2>
        {doc.bankName && <p>Banco: {doc.bankName}</p>}
        {doc.accountName && <p>Titular: {doc.accountName}</p>}
        {doc.cbu && <p>CBU: {doc.cbu}</p>}
        {doc.alias && <p>Alias: {doc.alias}</p>}
        {doc.cashNote && <p className="mt-2">{doc.cashNote}</p>}
      </div>
    );
  }
  if (kind === "brand") {
    return (
      <div className="p-8">
        <p className="max-w-xs text-ink-soft">{doc.tagline || "Sin eslogan cargado."}</p>
      </div>
    );
  }
  if (kind === "social") {
    const links = [
      { label: "Instagram", value: doc.instagram },
      { label: "Facebook", value: doc.facebook },
      { label: "TikTok", value: doc.tiktok },
      { label: "YouTube", value: doc.youtube },
      { label: "WhatsApp", value: doc.whatsapp }
    ].filter((l) => l.value);
    return (
      <div className="flex flex-col gap-2 p-8 text-sm">
        <h2 className="font-display text-lg text-ink">Redes sociales</h2>
        {links.length === 0 ? (
          <p className="text-ink-soft">Sin redes cargadas.</p>
        ) : (
          links.map((l) => (
            <p key={l.label} className="text-ink-soft">
              {l.label}: {l.value}
            </p>
          ))
        )}
      </div>
    );
  }
  if (kind === "seo") {
    return (
      <div className="flex flex-col gap-1 p-8">
        <span className="text-xs text-ink-soft">carilidesign.vercel.app</span>
        <span className="text-lg text-clay-deep">{doc.seoTitle || "Carili Design"}</span>
        <span className="text-sm text-ink-soft">
          {doc.seoDescription || "Sin descripción cargada."}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 p-8 text-sm">
      <h2 className="font-display text-lg text-ink">Opciones de envío</h2>
      {(doc.options ?? []).map((opt) => (
        <div key={opt.id} className="flex items-center justify-between border-b border-sand py-2">
          <span className="text-ink">{opt.name}</span>
          <span className="text-ink-soft">
            {opt.priceArs > 0 ? formatMoney(opt.priceArs) : "Gratis"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AdminContentPreviewInterface({ kind, doc }: Props) {
  const [mobile, setMobile] = useState(false);
  const frameWidth = mobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(0);

  // Escala la página (renderizada a ancho de dispositivo) para que entre en el panel.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) {
      return;
    }
    const update = () => {
      const available = container.clientWidth;
      const nextScale = available > 0 ? Math.min(1, available / frameWidth) : 1;
      setScale(nextScale);
      setScaledHeight(inner.offsetHeight * nextScale);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [frameWidth, kind, doc]);

  return (
    <div className="flex min-w-0 flex-col gap-3 self-start xl:sticky xl:top-24">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Vista previa</span>
        <div className="flex items-center gap-1">
          <IconButtonInterface
            label="Vista escritorio"
            size="sm"
            variant={mobile ? "ghost" : "subtle"}
            onClick={() => setMobile(false)}
          >
            <IconInterface icon={Monitor} size="sm" />
          </IconButtonInterface>
          <IconButtonInterface
            label="Vista móvil"
            size="sm"
            variant={mobile ? "subtle" : "ghost"}
            onClick={() => setMobile(true)}
          >
            <IconInterface icon={Smartphone} size="sm" />
          </IconButtonInterface>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-card border border-sand bg-canvas"
      >
        {/* Ancho/alto reservados = tamaño real escalado; mx-auto centra el frame (clave en móvil). */}
        <div
          className="mx-auto"
          style={{ width: `${frameWidth * scale}px`, height: `${scaledHeight}px` }}
        >
          <div
            ref={innerRef}
            className="origin-top-left bg-canvas"
            style={{ width: `${frameWidth}px`, transform: `scale(${scale})` }}
          >
            {renderPreview(kind, doc)}
          </div>
        </div>
      </div>

      <p className="text-xs text-ink-soft">
        Así se ve la sección en el sitio ({mobile ? "móvil" : "escritorio"}). Se actualiza mientras
        editás; recordá Guardar.
      </p>
    </div>
  );
}
