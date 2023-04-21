export enum StyleTagName {
  Bold = "strong",
  Italic = "em",
  Underline = "u",
  Hyperlink = "a",
}

export const StylePriority = [
  StyleTagName.Hyperlink,
  StyleTagName.Bold,
  StyleTagName.Italic,
  StyleTagName.Underline,
];
