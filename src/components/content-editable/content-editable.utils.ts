import { ContentTokenProps } from "./content-editable.types";

export const stringToContentTokens = (input: string) => {};

export const contentTokensToString = (
  contentTokens: ContentTokenProps[]
): string => {
  let accTokenId = 0;

  return contentTokens
    .map((token) => {
      const tags = token.tags || [];

      if (tags.length === 0) {
        accTokenId = accTokenId + 1;
        return token.text;
      }

      return tags.reduce((acc, tag, index) => {
        const attributes = tag.attributes || {};
        const attrInMap = Object.keys(attributes).map((attrKey) => {
          return `${attrKey}="${attributes[attrKey]}"`;
        });

        if (index === tags.length - 1) {
          attrInMap.push(`id="ct-${accTokenId}"`);
          accTokenId = accTokenId + 1;
        }

        const attrInString = attrInMap.join(" ");
        return `<${tag.tagName} ${attrInString}>${acc || token.text}</${
          tag.tagName
        }>`;
      }, "");
    })
    .join("");
};

/**
 * Format selection
 */

interface FormatSelectionProps {
  tagName: string;
  attrs?: Record<string, string>;
  originContentToken: ContentTokenProps[];
}

export const formatSelection = ({
  tagName,
  attrs,
  originContentToken,
}: FormatSelectionProps) => {
  const selection = window.getSelection();

  if (!selection || selection?.toString() === "") {
    return;
  }
};
