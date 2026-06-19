import type { HomeDataType } from "@app/modules/home/entities/entities";

export const INITIAL_STATE = {
  HOME_PAGE: {
    loading: true,
    data: [],
    filters: { search: "" }
  } satisfies HomeDataType
};
