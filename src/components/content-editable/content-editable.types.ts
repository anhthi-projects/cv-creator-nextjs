import { ReactNode } from "react";

import { Color, FontSize, FontWeight } from "@src/styles/variables";

export interface IconProps {
  iconName: string;
  width?: number;
  height?: number;
}

export interface ContentEditableProps {
  content?: string;
  placeholder?: string;
  color?: Color;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: "left" | "right" | "center" | "justify";
  noMargin?: boolean;
  justifyContent?: boolean;
  icon?: IconProps;
  className?: string;
}

export type Attributes = Record<string, string>;

export interface TagProps {
  tagName: string;
  attributes?: Attributes;
}

export interface ContentNodeProps {
  text: string;
  tags?: TagProps[];
}
