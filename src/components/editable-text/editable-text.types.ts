import { Color, FontSize, FontWeight } from "@src/styles/variables";

export enum Mode {
  TEXT = "text",
  INPUT = "input",
}

export interface EditableTextProps {
  text?: string;
  placeholder?: string;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  color?: Color;
}
