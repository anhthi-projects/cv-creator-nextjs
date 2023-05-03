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
  SameTag = "same-tag",
  TagAtLeft = "tag-at-left",
  TagAtLeftInverse = "tag-at-left-inverse",
  TagAtRight = "tag-at-right",
  TagAtRightInverse = "tag-at-right-inverse",
  TagsAtCenter = "tags-at-center",
  TagsAtCenterInverse = "tags-at-center-inverse",
  Invalid = "invalid",
}
