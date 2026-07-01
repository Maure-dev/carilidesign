import { INITIAL_STATE } from "@app/modules/content/constants/constants";
import type { ContentDataType } from "@app/modules/content/entities/entities";
import type { ChildrenType } from "@app/modules/main/entities/entities";
import { useContext, useState } from "react";
import { ContentContext } from "./contentContext";

export default function ContentProvider({ children }: ChildrenType) {
  const [getContentState, setContentState] = useState<ContentDataType>(
    INITIAL_STATE.CONTENT_PAGE as ContentDataType
  );

  return (
    <ContentContext.Provider
      value={{ getContentState: getContentState, setContentState: setContentState }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContentProvider = () => {
  return useContext(ContentContext);
};
