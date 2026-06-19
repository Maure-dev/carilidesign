import type { ChildrenType } from "@app/modules/main/entities/entities";
import type { AdminDataType } from "@app/modules/admin/entities/entities";
import { useContext, useState } from "react";
import { INITIAL_STATE } from "@app/modules/admin/constants/constants";
import { AdminContext } from "./adminContext";

export default function AdminProvider({ children }: ChildrenType) {
  const [getAdminState, setAdminState] = useState<AdminDataType>(
    INITIAL_STATE.ADMIN_PAGE as AdminDataType
  );

  return (
    <AdminContext.Provider value={{ getAdminState: getAdminState, setAdminState: setAdminState }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdminProvider = () => {
  return useContext(AdminContext);
};
