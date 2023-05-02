export type AttributesProps = Record<string, string>;

export interface TagProps {
  tagName: string;
  attributes?: AttributesProps;
}

export interface ContentNodeProps {
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
  PureText = "pure-text",
  TagAtLeft = "tag-at-left",
  TagAtLeftInverse = "tag-at-left-inverse",
  TagAtRight = "tag-at-right",
  TagAtRightInverse = "tag-at-right-inverse",
  TagAtCenter = "tag-at-center",
  TagAtCenterInverse = "tag-at-center-inverse",
  Invalid = "invalid",
}
