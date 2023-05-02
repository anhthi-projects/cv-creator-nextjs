/**
 * Construct tag element in string
 */

import { ContentNodeProps, TagProps, TagName } from "@src/common/types";

interface ConstructTagElementInStringProps {
  tagName: string;
  innerHtml: string;
  attributes?: Record<string, string>;
}

export const constructTagElementInString = ({
  tagName,
  innerHtml,
  attributes = {},
}: ConstructTagElementInStringProps) => {
  const attrsInMap = Object.keys(attributes).map((attrKey) => {
    return `${attrKey}="${attributes[attrKey]}"`;
  });

  return `<${tagName} ${attrsInMap.join(" ")}>${innerHtml}</${tagName}>`;
};

/**
 * Convert string to content nodes
 */

export const stringToContentNodes = (input: string = "") => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const contentNodes: ContentNodeProps[] = [];

  const getTagNameAndAttrs = (tagElement: HTMLElement): TagProps => {
    const tagName = tagElement.tagName.toLowerCase();

    switch (tagName) {
      case TagName.Hyperlink: {
        const url = tagElement.getAttribute("href") || "";
        return {
          tagName,
          attributes: {
            href: url,
            title: url,
          },
        };
      }

      default: {
        return {
          tagName,
          attributes: {},
        };
      }
    }
  };

  doc.body.childNodes.forEach((node) => {
    if (node.nodeName === "#text") {
      contentNodes.push({
        text: node.textContent || "",
        tags: [
          {
            tagName: TagName.Text,
          },
        ],
      });
      return;
    }

    const tagElement = node as HTMLElement;
    contentNodes.push({
      text: tagElement.innerText,
      tags: [getTagNameAndAttrs(tagElement)],
    });
  });

  return contentNodes;
};

/**
 * Convert content nodes to string
 */

export const contentNodesToString = (
  contentNodes: ContentNodeProps[]
): string => {
  let accTokenId = -1;

  return contentNodes
    .map((contentNode) => {
      const tags = contentNode.tags || [];

      return tags.reduce((acc, tag, index) => {
        const attributes = tag.attributes || {};
        delete attributes.id;
        const isLastOuterTagElement = index === tags.length - 1;

        if (isLastOuterTagElement) {
          accTokenId = accTokenId + 1;
          attributes.id = `cn-${accTokenId}`;
        }

        return constructTagElementInString({
          tagName: tag.tagName,
          innerHtml: acc || contentNode.text,
          attributes,
        });
      }, "");
    })
    .join("");
};
