import type { MainDataType } from "@app/modules/main/entities/entities";

export const INITIAL_STATE = {
  MAIN_PAGE: {
    notification: { open: false, status: true, message: "" }
  } satisfies MainDataType
};
