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

export interface TagProps {
  tagName: string;
  attributes?: Record<string, string>;
}

export interface ContentTokenProps {
  text: string;
  tags?: TagProps[];
  startAt: number;
  endAt: number;
}
