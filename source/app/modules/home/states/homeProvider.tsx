import type { ChildrenType } from "@app/modules/main/entities/entities";
import type { HomeDataType } from "@app/modules/home/entities/entities";
import { useContext, useState } from "react";
import { INITIAL_STATE } from "@app/modules/home/constants/constants";
import { HomeContext } from "./homeContext";

export default function HomeProvider({ children }: ChildrenType) {
  const [getHomeState, setHomeState] = useState<HomeDataType>(
    INITIAL_STATE.HOME_PAGE as HomeDataType
  );

  return (
    <HomeContext.Provider
      value={{
        getHomeState: getHomeState,
        setHomeState: setHomeState
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeProvider = () => {
  return useContext(HomeContext);
};
