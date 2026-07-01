import { useEffect } from "react";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useAdminActions } from "@app/modules/admin/hooks/useAdminActions";
import { CONTENT_SECTIONS } from "@app/modules/admin/constants/constants";
import AdminContentEditorInterface from "./interfaces/adminContentEditorInterface";
import AdminContentPreviewInterface from "./interfaces/adminContentPreviewInterface";

export default function AdminContentModule() {
  const { getAdminState } = useAdminProvider();
  const actions = useAdminActions();
  const { saving, contentSlug, contentDoc } = getAdminState;

  useDocumentHead({ title: "Contenido" });

  useEffect(() => {
    actions.handleLoadContent();
  }, []);

  const section = CONTENT_SECTIONS.find((s) => s.slug === contentSlug) ?? CONTENT_SECTIONS[0];

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-ink">Contenido</h1>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        <AdminContentEditorInterface
          sections={CONTENT_SECTIONS}
          activeSlug={contentSlug}
          doc={contentDoc}
          saving={saving}
          onSelectSection={actions.handleSelectContentSection}
          onChange={actions.handleChangeContentDoc}
          onUploadImage={actions.handleUploadContentImage}
          onSave={actions.handleSaveContent}
        />
        <AdminContentPreviewInterface kind={section.kind} doc={contentDoc} />
      </div>
    </section>
  );
}
