import { useEffect } from "react";
import { useHomeActions } from "@app/modules/home/hooks/useHomeActions";
import { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import HeroInterface from "@app/modules/home/interfaces/heroInterface";
import ValuePropsInterface from "@app/modules/home/interfaces/valuePropsInterface";
import FeaturedGridInterface from "@app/modules/home/interfaces/featuredGridInterface";
import ProcessSectionInterface from "@app/modules/home/interfaces/processSectionInterface";
import CtaInterface from "@app/modules/home/interfaces/ctaInterface";

// Landing / presentación de marca.
export default function HomeModule() {
  const { handleLoadHome } = useHomeActions();
  const { getHomeState } = useHomeProvider();
  const { content, featured, loading } = getHomeState;

  useDocumentHead({ title: "", description: content.heroSubtitle });

  useEffect(() => {
    handleLoadHome();
  }, []);

  return (
    <div className="flex flex-col">
      <HeroInterface content={content} />
      <ValuePropsInterface items={content.valueProps} />
      <FeaturedGridInterface products={featured} loading={loading} />
      <ProcessSectionInterface content={content} />
      <CtaInterface />
    </div>
  );
}
