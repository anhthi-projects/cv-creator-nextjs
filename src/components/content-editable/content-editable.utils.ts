import { SelectionType, StyleTagName } from "@src/common/constants";

import { Attributes, ContentNodeProps } from "./content-editable.types";

/**
 * Build tag element in string
 */

interface BuildTagElementInStringProps {
  tagName: string;
  innerHtml: string;
  attributes?: Record<string, string>;
}

export const constructTagElementInString = ({
  tagName,
  innerHtml,
  attributes = {},
}: BuildTagElementInStringProps) => {
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
 * Convert content nodes to string
 */

export const contentNodesToString = (
  contentNodes: ContentNodeProps[]
): string => {
  let accTokenId = -1;

  return contentNodes
    .map((contentNode) => {
      const tags = contentNode.tags || [];

      if (tags.length === 0 && contentNode.text !== "") {
        accTokenId = accTokenId + 1;
        return contentNode.text;
      }

      return tags.reduce((acc, tag, index) => {
        const attributes = tag.attributes || {};
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

/**
 * Format selection
 */

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

/**
 * Get targetContentNodeIndex
 */

interface GetContentNodeIndexesResult {
  targetContentNodeIndex: number;
}

const getContentNodeIndexes = (
  selection: Selection
): GetContentNodeIndexesResult => {
  const { anchorNode } = selection;
  const prevSibling = anchorNode?.previousSibling as HTMLElement;
  const prevSiblingIndex = prevSibling
    ? prevSibling.getAttribute("id")?.split("-")[1] || ""
    : "-1";
  const targetContentNodeIndex = parseInt(prevSiblingIndex) + 1;

  return {
    targetContentNodeIndex,
  };
};

/**
 * Format pure selection
 */

interface FormatPureSelectionProps {
  tagName: string;
  attributes?: Attributes;
  selection: Selection;
  targetContentNode: ContentNodeProps;
  targetContentNodeIndex: number;
  originContentNodes: ContentNodeProps[];
}

export const formatPureSelection = ({
  tagName,
  attributes,
  selection,
  targetContentNode,
  targetContentNodeIndex,
  originContentNodes,
}: FormatPureSelectionProps): ContentNodeProps[] => {
  const { selectionStartIndex, selectionEndIndex } =
    getStartEndSelectionIndexes(selection);
  const newNodeBeforeTargetNode = targetContentNode.text.slice(
    0,
    selectionStartIndex
  );
  const newNodeAfterTargetNode = targetContentNode.text.slice(
    selectionEndIndex,
    targetContentNode.text.length
  );

  originContentNodes[targetContentNodeIndex] = {
    text: newNodeBeforeTargetNode,
  } as ContentNodeProps;
  originContentNodes.splice(targetContentNodeIndex + 1, 0, {
    text: selection.toString(),
    tags: [
      {
        tagName,
        attributes,
      },
    ],
  } as ContentNodeProps);
  originContentNodes.splice(targetContentNodeIndex + 2, 0, {
    text: newNodeAfterTargetNode,
  } as ContentNodeProps);

  return originContentNodes;
};

/**
 * Format selection
 */

interface FormatSelectionProps {
  tagName: string;
  attributes?: Attributes;
  originContentNodes: ContentNodeProps[];
}

export const formatSelection = ({
  tagName,
  attributes,
  originContentNodes,
}: FormatSelectionProps): ContentNodeProps[] => {
  const selection = window.getSelection();

  if (!selection || selection?.toString() === "") {
    return originContentNodes;
  }

  const { targetContentNodeIndex } = getContentNodeIndexes(selection);
  const cloneOriginContentNodes = [...originContentNodes];
  const targetContentNode = cloneOriginContentNodes[targetContentNodeIndex];

  console.log("diff parents");

  return formatPureSelection({
    tagName,
    attributes,
    selection,
    targetContentNode,
    targetContentNodeIndex,
    originContentNodes: cloneOriginContentNodes,
  });
};

/**
 * Check valid selection
 */

export const getSelectionType = (selection: Selection): SelectionType => {
  const { anchorNode, focusNode } = selection;
  const isSameParent = anchorNode?.parentElement === focusNode?.parentElement;

  if (
    isSameParent &&
    anchorNode?.previousSibling === focusNode?.previousSibling &&
    anchorNode?.nextSibling === focusNode?.nextSibling
  ) {
    return SelectionType.PureText;
  }

  if (isSameParent && anchorNode?.nextSibling === focusNode?.previousSibling) {
    return SelectionType.TagAtCenter;
  }

  if (isSameParent && anchorNode?.previousSibling === focusNode?.nextSibling) {
    return SelectionType.TagAtCenterInverse;
  }

  if (anchorNode?.parentElement === focusNode?.previousSibling) {
    return SelectionType.TagAtLeft;
  }

  if (anchorNode?.previousSibling === focusNode?.parentElement) {
    return SelectionType.TagAtLeftInverse;
  }

  if (anchorNode?.nextSibling === focusNode?.parentElement) {
    return SelectionType.TagAtRight;
  }

  if (anchorNode?.parentElement === focusNode?.nextSibling) {
    return SelectionType.TagAtRightInverse;
  }

  return SelectionType.Invalid;
};
