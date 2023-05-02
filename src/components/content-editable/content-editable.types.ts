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
