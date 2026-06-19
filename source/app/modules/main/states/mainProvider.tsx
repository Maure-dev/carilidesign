import type { ChildrenType, MainDataType } from "@app/modules/main/entities/entities";
import { useContext, useState } from "react";
import { INITIAL_STATE } from "@app/modules/main/constants/constants";
import { MainContext } from "./mainContext";

export default function MainProvider({ children }: ChildrenType) {
  const [getMainState, setMainState] = useState<MainDataType>(
    INITIAL_STATE.MAIN_PAGE as MainDataType
  );

  return (
    <MainContext.Provider
      value={{
        getMainState: getMainState,
        setMainState: setMainState
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useMainProvider = () => {
  return useContext(MainContext);
};
