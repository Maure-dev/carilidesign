import { getPageSlug } from "@app/modules/content/helpers/pageSlug";
import { useContentActions } from "@app/modules/content/hooks/useContentActions";
import ContentPageInterface from "@app/modules/content/interfaces/contentPageInterface";
import { useContentProvider } from "@app/modules/content/states/contentProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { useEffect } from "react";

export default function ContentModule() {
  const router = useRouter();
  const slug = getPageSlug(router.pathname);
  const { handleLoadPage } = useContentActions();
  const { getContentState } = useContentProvider();
  const { page, loading } = getContentState;

  useDocumentHead({ title: page?.title ?? "", description: page?.intro });

  useEffect(() => {
    if (slug) {
      handleLoadPage(slug);
    }
  }, [slug]);

  if (loading) {
    return <LoadingInterface />;
  }
  if (!page) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <EmptyBoxInterface message="No encontramos esta página." />
      </div>
    );
  }

  return <ContentPageInterface page={page} />;
}
