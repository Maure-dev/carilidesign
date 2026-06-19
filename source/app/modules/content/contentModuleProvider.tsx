import ContentProvider from "@app/modules/content/states/contentProvider";
import ContentModule from "./contentModule";

export default function ContentModuleProvider() {
  return (
    <ContentProvider>
      <ContentModule />
    </ContentProvider>
  );
}
