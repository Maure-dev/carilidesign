import type { Dispatch, SetStateAction } from "react";

export type FaqItemType = {
  question: string;
  answer: string;
};

export type PageContentType = {
  slug: string;
  title: string;
  intro?: string;
  body: string[];
  faq?: FaqItemType[];
  imageUrl?: string;
};

export type ContentDataType = {
  loading: boolean;
  page: PageContentType | null;
  error: string | null;
};

export type ContentContextType = {
  getContentState: ContentDataType;
  setContentState: Dispatch<SetStateAction<ContentDataType>>;
};
