import {
  AttributesProps,
  ContentNodeProps,
  SelectionType,
} from "@src/common/types";

import { checkStyleActivated } from "./format-bar/format-bar.utils";

/**
 * Format selection
 */

const getContentNodeIndex = (tagElement: HTMLElement): string =>
  tagElement.getAttribute("id")?.split("-")[1] || "";

/**
 * Format pure selection
 */

interface FormatPureTextProps {
  tagName: string;
  attributes?: AttributesProps;
  selection: Selection;
  originContentNodes: ContentNodeProps[];
}

export const formatPureText = ({
  tagName,
  attributes,
  selection,
  originContentNodes,
}: FormatPureTextProps): ContentNodeProps[] => {
  const { anchorNode } = selection;

  const isStyleActivated = checkStyleActivated(tagName, selection);
  const targetContentNodeIndex = parseInt(
    getContentNodeIndex(anchorNode?.parentElement as HTMLElement)
  );
  const targetContentNode = originContentNodes[targetContentNodeIndex];
  const isSelectInverse = selection.anchorOffset > selection.focusOffset;
  const selectionStartIndex = isSelectInverse
    ? selection.focusOffset
    : selection.anchorOffset;
  const selectionEndIndex = isSelectInverse
    ? selection.anchorOffset
    : selection.focusOffset;

  /* Node before target */
  const textForCNBeforeTarget = targetContentNode.text.slice(
    0,
    selectionStartIndex
  );
  originContentNodes[targetContentNodeIndex] = {
    text: textForCNBeforeTarget,
    tags: targetContentNode.tags,
  } as ContentNodeProps;

  console.log("targetContentNode tags: ", targetContentNode.tags);

  /* Target node */
  const updatedTags = isStyleActivated
    ? targetContentNode.tags.filter((tag) => tag.tagName !== tagName)
    : [
        ...targetContentNode.tags,
        {
          tagName,
          attributes,
        },
      ];
  console.log("updatedTags:", updatedTags);
  originContentNodes.splice(targetContentNodeIndex + 1, 0, {
    text: selection.toString(),
    tags: updatedTags,
  } as ContentNodeProps);

  /* Node after target */
  const textForCNAfterTarget = targetContentNode.text.slice(
    selectionEndIndex,
    targetContentNode.text.length
  );
  originContentNodes.splice(targetContentNodeIndex + 2, 0, {
    text: textForCNAfterTarget,
    tags: targetContentNode.tags,
  } as ContentNodeProps);

  return originContentNodes;
};

/**
 * Get selection type
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

/**
 * Format selection
 */

interface FormatSelectionProps {
  tagName: string;
  attributes?: AttributesProps;
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

  const { anchorNode } = selection;
  const cloneOriginContentNodes = [...originContentNodes];
  const selectionType = getSelectionType(selection);

  /**
   * Format pure text
   */

  if (selectionType === SelectionType.PureText) {
    return formatPureText({
      tagName,
      attributes,
      selection,
      originContentNodes: cloneOriginContentNodes,
    });
  }

  /**
   * Format tag at center
   */

  if (selectionType === SelectionType.TagAtCenter) {
    const centerTag = anchorNode?.previousSibling as HTMLElement;
    const centerTagIndex = getContentNodeIndex(centerTag);
  }

  return originContentNodes;
};
