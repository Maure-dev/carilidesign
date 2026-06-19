import type { Dispatch, SetStateAction } from "react";
import type { ProductType } from "@app/modules/main/entities/entities";

export type ValuePropType = {
  title: string;
  text: string;
};

export type HomeContentType = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  valueProps: ValuePropType[];
  processTitle: string;
  processText: string;
  processImageUrl?: string;
};

export type HomeDataType = {
  loading: boolean;
  featured: ProductType[];
  content: HomeContentType;
  error: string | null;
};

export type HomeContextType = {
  getHomeState: HomeDataType;
  setHomeState: Dispatch<SetStateAction<HomeDataType>>;
};
