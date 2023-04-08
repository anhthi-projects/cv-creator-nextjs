import { Color, FontSize, FontWeight } from "@src/styles/variables";

export interface ContentEditableProps {
  text?: string;
  placeholder?: string;
  color?: Color;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: "left" | "right" | "center" | "justify";
  noMargin?: boolean;
  justifyContent?: boolean;
  className?: string;
}
