import { useHomeActions } from "@app/modules/home/hooks/useHomeActions";
import CtaInterface from "@app/modules/home/interfaces/ctaInterface";
import FeaturedGridInterface from "@app/modules/home/interfaces/featuredGridInterface";
import HeroInterface from "@app/modules/home/interfaces/heroInterface";
import ProcessSectionInterface from "@app/modules/home/interfaces/processSectionInterface";
import ValuePropsInterface from "@app/modules/home/interfaces/valuePropsInterface";
import { useHomeProvider } from "@app/modules/home/states/homeProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { useEffect } from "react";

// Landing / presentación de marca.
export default function HomeModule() {
  const { handleLoadHome } = useHomeActions();
  const { getHomeState } = useHomeProvider();
  const { content, featured, loading } = getHomeState;

  useDocumentHead({ title: "", description: content?.heroSubtitle });

  useEffect(() => {
    handleLoadHome();
  }, []);

  if (loading) {
    return <LoadingInterface />;
  }
  if (!content) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <EmptyBoxInterface message="No se pudo cargar el contenido de inicio." />
      </div>
    );
  }

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
