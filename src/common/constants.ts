export enum StyleTagName {
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

export const StylePriority = [
  StyleTagName.Hyperlink,
  StyleTagName.Bold,
  StyleTagName.Italic,
  StyleTagName.Underline,
];
