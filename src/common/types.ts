export type AttributesProps = Record<string, string>;

export interface TagProps {
  tagName: string;
  attributes?: AttributesProps;
}

export interface NodeProps {
  text: string;
  tags: TagProps[];
}

export enum TagName {
  Text = "span",
  Bold = "strong",
  Italic = "em",
  Underline = "u",
  Hyperlink = "a",
}

export enum SelectionType {
  SameStyleFully = "same-style-fully",
  SameStylePartial = "same-style-partial",

  StyleAtCenter = "style-at-center",
  StyleAtCenterInverse = "style-at-center-inverse",

  StyleAtLeftFully = "style-at-left-fully",
  StyleAtLeftPartial = "style-at-left-partial",
  StyleAtLeftInverseFully = "style-at-left-inverse-fully",
  StyleAtLeftInversePartial = "style-at-left-inverse-partial",

  StyleAtRightFully = "style-at-right-fully",
  StyleAtRightPartial = "style-at-right-partial",
  StyleAtRightInverseFully = "style-at-right-inverse-fully",
  StyleAtRightInversePartial = "style-at-right-inverse-partial",

  Invalid = "invalid",
}
