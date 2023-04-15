import { ReactNode } from "react";

import { BoxLayoutProps } from "@src/components/layout";

import { ContentEditableProps } from "../content-editable";

export type ContentProps = Pick<
  ContentEditableProps,
  "text" | "placeholder" | "icon"
> & {
  key: string;
};

export interface SectionContentProps extends BoxLayoutProps {
  title: string;
  contents: ContentProps[];
}
