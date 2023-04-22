import { StyleTagName } from "@src/common/constants";

import { Attributes, ContentNodeProps } from "./content-editable.types";

/**
 * Build tag element in string
 */

interface BuildTagElementInStringProps {
  tagName: string;
  innerHtml: string;
  attributes?: Record<string, string>;
}

export const buildTagElementInString = (tag: BuildTagElementInStringProps) => {
  const attributes = tag.attributes || {};
  const attrsInMap = Object.keys(attributes).map((attrKey) => {
    return `${attrKey}="${attributes[attrKey]}"`;
  });
  const attrsInString = attrsInMap.join(" ");

  return `<${tag.tagName} ${attrsInString}>${tag.innerHtml}</${tag.tagName}>`;
};

/**
 * String to content nodes
 */

export const stringToContentNodes = (input: string = "") => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const contentNodes: ContentNodeProps[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeName === "#text") {
      contentNodes.push({
        text: node.textContent || "",
      });
      return;
    }

    const tagElement = node as HTMLElement;
    const tagName = tagElement.tagName.toLowerCase();
    const getAttributes = (): Attributes => {
      if (tagName === StyleTagName.Hyperlink) {
        const url = tagElement.getAttribute("href") || "";
        return {
          href: url,
          title: url,
        };
      }

      return {};
    };

    contentNodes.push({
      text: tagElement.innerText,
      tags: [
        {
          tagName,
          attributes: getAttributes(),
        },
      ],
    });
  });

  return contentNodes;
};

/**
 * Content nodes to string
 */

export const contentNodesToString = (
  contentNodes: ContentNodeProps[]
): string => {
  let accTokenId = 0;

  return contentNodes
    .map((node) => {
      const tags = node.tags || [];

      if (tags.length === 0) {
        accTokenId = accTokenId + 1;
        return node.text;
      }

      return tags.reduce((acc, tag, index) => {
        const attributes = tag.attributes || {};

        if (index === tags.length - 1) {
          attributes.id = `cn-${accTokenId}`;
          accTokenId = accTokenId + 1;
        }

        return buildTagElementInString({
          tagName: tag.tagName,
          innerHtml: acc || node.text,
          attributes,
        });
      }, "");
    })
    .join("");
};

/**
 * Format selection
 */

interface FormatSelectionProps {
  tagName: string;
  attributes?: Record<string, string>;
  originContentNodes: ContentNodeProps[];
}

interface StartEndSelectionIndexesResultProps {
  selectionStartIndex: number;
  selectionEndIndex: number;
}

const getStartEndSelectionIndexes = (
  selection: Selection
): StartEndSelectionIndexesResultProps => {
  const isSelectInverse = selection.anchorOffset > selection.focusOffset;
  return {
    selectionStartIndex: isSelectInverse
      ? selection.focusOffset
      : selection.anchorOffset,
    selectionEndIndex: isSelectInverse
      ? selection.anchorOffset
      : selection.focusOffset,
  };
};

export const formatSelection = ({
  tagName,
  attributes,
  originContentNodes,
}: FormatSelectionProps): ContentNodeProps[] => {
  const selection = window.getSelection();

  if (!selection || selection?.toString() === "") {
    return originContentNodes;
  }

  const { anchorNode } = selection;
  const prevSibling = anchorNode?.previousSibling as HTMLElement;
  const prevSiblingIndex = prevSibling.getAttribute("id")?.split("-")[1] || "";
  const targetNodeIndex = parseInt(prevSiblingIndex) + 1;

  const cloneOriginContentNodes = [...originContentNodes];
  const targetNode = cloneOriginContentNodes[targetNodeIndex];

  const { selectionStartIndex, selectionEndIndex } =
    getStartEndSelectionIndexes(selection);
  const newNodeBeforeTargetNode = targetNode.text.slice(0, selectionStartIndex);
  const newNodeAfterTargetNode = targetNode.text.slice(
    selectionEndIndex,
    targetNode.text.length
  );

  cloneOriginContentNodes[targetNodeIndex] = {
    text: newNodeBeforeTargetNode,
  } as ContentNodeProps;
  cloneOriginContentNodes.splice(targetNodeIndex + 1, 0, {
    text: selection.toString(),
    tags: [
      {
        tagName,
        attributes,
      },
    ],
  } as ContentNodeProps);
  cloneOriginContentNodes.splice(targetNodeIndex + 2, 0, {
    text: newNodeAfterTargetNode,
  } as ContentNodeProps);

  return cloneOriginContentNodes;
};
