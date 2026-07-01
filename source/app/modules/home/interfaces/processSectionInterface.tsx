import type { HomeContentType } from "@app/modules/home/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import LazyImageInterface from "@app/modules/main/interfaces/lazyImageInterface";

type Props = {
  content: HomeContentType;
};

export default function ProcessSectionInterface({ content }: Props) {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
        {content.processImageUrl && (
          <div className="overflow-hidden rounded-card bg-sand">
            <LazyImageInterface
              src={content.processImageUrl}
              alt="Proceso artesanal de cerámica"
              className="aspect-[5/4] h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-3xl text-ink">{content.processTitle}</h2>
          <p className="max-w-prose text-ink-soft">{content.processText}</p>
          <ButtonInterface to="/nosotros" variant="secondary" className="w-fit">
            Sobre nosotros
          </ButtonInterface>
        </div>
      </div>
    </section>
  );
}
