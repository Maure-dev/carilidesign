import type { HomeDataType } from "@app/modules/home/entities/entities";

export const INITIAL_STATE = {
  HOME_PAGE: {
    loading: true,
    featured: [],
    content: null,
    error: null
  } satisfies HomeDataType
};
