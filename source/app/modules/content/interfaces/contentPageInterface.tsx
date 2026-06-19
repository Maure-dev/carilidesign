import type { PageContentType } from "@app/modules/content/entities/entities";
import LazyImageInterface from "@app/modules/main/interfaces/lazyImageInterface";
import FaqInterface from "./faqInterface";

type Props = {
  page: PageContentType;
};

export default function ContentPageInterface({ page }: Props) {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-4xl text-ink">{page.title}</h1>
        {page.intro && <p className="text-lg text-ink-soft">{page.intro}</p>}
      </header>

      {page.imageUrl && (
        <div className="overflow-hidden rounded-card bg-sand">
          <LazyImageInterface
            src={page.imageUrl}
            alt={page.title}
            className="aspect-[16/9] h-full w-full object-cover"
          />
        </div>
      )}

      {page.body.length > 0 && (
        <div className="flex flex-col gap-4 leading-relaxed text-ink">
          {page.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      )}

      {page.faq && page.faq.length > 0 && <FaqInterface items={page.faq} />}
    </article>
  );
}
