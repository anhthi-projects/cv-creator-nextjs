import { ContentEditableProps } from "../content-editable/content-editable.types";

export interface ContentEditableIcon {
  iconName: string;
  width?: number;
  height?: number;
}

export interface ContentEditableEnhanceProps extends ContentEditableProps {
  icon?: ContentEditableIcon;
}
