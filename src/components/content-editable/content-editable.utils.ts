import {
  AttributesProps,
  ContentNodeProps,
  SelectionType,
} from "@src/common/types";
import { checkStyleApplied } from "@src/utils/dom";

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

const getContentNodeIndex = (tagElement: HTMLElement): string =>
  tagElement.getAttribute("id")?.split("_")[1] || "";

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

  let selectedContentNodeIndex = parseInt(
    getContentNodeIndex(anchorNode?.parentElement as HTMLElement)
  );
  const selectedContentNode = originContentNodes[selectedContentNodeIndex];
  const selectionInText = selection.toString();

  const isStyleActivated = checkStyleApplied(tagName, selection);
  const isSelectInverse = selection.anchorOffset > selection.focusOffset;
  const selectionStartIndex = isSelectInverse
    ? selection.focusOffset
    : selection.anchorOffset;
  const selectionEndIndex = isSelectInverse
    ? selection.anchorOffset
    : selection.focusOffset;

  /**
   * Node before selected
   */

  const needNodeBeforeSelected =
    !anchorNode?.nodeValue?.startsWith(selectionInText);

  if (needNodeBeforeSelected) {
    const textForCNBeforeTarget = selectedContentNode.text.slice(
      0,
      selectionStartIndex
    );
    originContentNodes[selectedContentNodeIndex] = {
      text: textForCNBeforeTarget,
      tags: selectedContentNode.tags,
    } as ContentNodeProps;
    selectedContentNodeIndex += 1;
  }

  /**
   * Selected node
   */

  const updatedTags = isStyleActivated
    ? selectedContentNode.tags.filter((tag) => tag.tagName !== tagName)
    : [
        ...selectedContentNode.tags,
        {
          tagName,
          attributes,
        },
      ];

  if (needNodeBeforeSelected) {
    originContentNodes.splice(selectedContentNodeIndex, 0, {
      text: selectionInText,
      tags: updatedTags,
    } as ContentNodeProps);
  } else {
    originContentNodes[selectedContentNodeIndex] = {
      text: selectionInText,
      tags: updatedTags,
    } as ContentNodeProps;
  }

  /**
   * Node after selected
   */

  const needNodeAfterSelected =
    !anchorNode?.nodeValue?.endsWith(selectionInText);

  if (needNodeAfterSelected) {
    const textForCNAfterTarget = selectedContentNode.text.slice(
      selectionEndIndex,
      selectedContentNode.text.length
    );
    originContentNodes.splice(selectedContentNodeIndex + 1, 0, {
      text: textForCNAfterTarget,
      tags: selectedContentNode.tags,
    } as ContentNodeProps);
  }

  return originContentNodes;
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
