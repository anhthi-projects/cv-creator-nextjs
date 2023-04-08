import { Color, FontSize, FontWeight } from "@src/styles/variables";

import { FlexLayout } from "../layout";

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
  className?: string;
}
