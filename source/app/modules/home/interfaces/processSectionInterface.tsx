import { Link } from "react-router";
import type { HomeContentType } from "@app/modules/home/entities/entities";
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
          <Link
            to="/nosotros"
            className="w-fit rounded-buttons border border-clay px-5 py-2.5 text-sm font-medium text-clay-deep hover:bg-sand"
          >
            Sobre nosotros
          </Link>
        </div>
      </div>
    </section>
  );
}
