import type { AccountDataType } from "@app/modules/account/entities/entities";

export const INITIAL_STATE = {
  ACCOUNT_PAGE: {
    loading: true,
    orders: [],
    selected: null
  } satisfies AccountDataType
};
