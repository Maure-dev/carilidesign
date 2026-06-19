import { Link } from "react-router";
import type { HomeContentType } from "@app/modules/home/entities/entities";
import LazyImageInterface from "@app/modules/main/interfaces/lazyImageInterface";

type Props = {
  content: HomeContentType;
};

export default function HeroInterface({ content }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:py-20 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
          {content.heroTitle}
        </h1>
        <p className="max-w-prose text-lg text-ink-soft">{content.heroSubtitle}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            to="/catalogo"
            className="rounded-buttons bg-clay px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-clay-deep"
          >
            Ver catálogo
          </Link>
          <Link
            to="/materiales-y-proceso"
            className="rounded-buttons border border-clay px-6 py-3 text-sm font-medium text-clay-deep transition-colors hover:bg-sand"
          >
            Conocer el proceso
          </Link>
        </div>
      </div>
      {content.heroImageUrl && (
        <div className="overflow-hidden rounded-card bg-sand">
          <LazyImageInterface
            src={content.heroImageUrl}
            alt="Bacha de cerámica hecha a mano"
            className="aspect-[4/5] h-full w-full object-cover"
          />
        </div>
      )}
    </section>
  );
}
