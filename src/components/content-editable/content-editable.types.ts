import { Color, FontSize, FontWeight } from "@src/styles/variables";

export interface ContentEditableProps {
  text?: string;
  placeholder?: string;
  color?: Color;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  noMargin?: boolean;
  className?: string;
}
