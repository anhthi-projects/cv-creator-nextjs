import { AttributesProps, NodeProps, SelectionType } from "@src/common/types";
import {
  checkTagHasAnyStyle,
  checkIsStyleApplied,
  getTagIndex,
} from "@src/utils/dom";

/**
 * Get selection type
 */

interface GetSelectionTypeProps {
  selection: Selection;
  nodes: NodeProps[];
}

export const getSelectionType = ({
  selection,
  nodes,
}: GetSelectionTypeProps): SelectionType => {
  const { anchorNode, focusNode } = selection;

  const textSelection = selection.toString();
  const anchorElement = anchorNode?.parentElement as HTMLElement;
  const focusElement = focusNode?.parentElement as HTMLElement;

  const anchorIndex = getTagIndex(anchorElement);
  const focusIndex = getTagIndex(focusElement);
  const lengthOfAnchorAndFocus = focusIndex - anchorIndex;
  const lengthOfFocusAndAnchor = anchorIndex - focusIndex;

  const isSameElement = anchorElement === focusElement;

  /**
   * Same Style
   */

  if (
    isSameElement &&
    textSelection === anchorElement.textContent &&
    textSelection === focusElement.textContent
  ) {
    console.log("same style fully");
    return SelectionType.SameStyleFully;
  }

  if (
    isSameElement &&
    (anchorElement.textContent?.includes(textSelection) ||
      focusElement.textContent?.includes(textSelection))
  ) {
    console.log("same style partial");
    return SelectionType.SameStylePartial;
  }

  /**
   * Style at center
   */

  if (lengthOfAnchorAndFocus === 2) {
    console.log("tags at center");
    return SelectionType.StyleAtCenter;
  }

  if (lengthOfFocusAndAnchor === 2) {
    console.log("tags at center inverse");
    return SelectionType.StyleAtCenterInverse;
  }

  /**
   * Style at left
   */

  const isAnchorStyleApplied = checkTagHasAnyStyle({
    tagElement: anchorElement,
    nodes,
  });
  const isFocusStyleApplied = checkTagHasAnyStyle({
    tagElement: focusElement,
    nodes,
  });

  if (lengthOfAnchorAndFocus === 1 && isAnchorStyleApplied) {
    console.log("tag at left");
    return SelectionType.StyleAtLeftFully;
  }

  if (lengthOfFocusAndAnchor === 1 && isFocusStyleApplied) {
    console.log("tag at left inverse");
    return SelectionType.StyleAtLeftInverseFully;
  }

  /**
   * Tag at right
   */

  if (anchorNode?.nextSibling === focusNode?.parentElement) {
    console.log("tag at right");
    return SelectionType.StyleAtRightFully;
  }

  if (anchorNode?.parentElement === focusNode?.nextSibling) {
    console.log("tag at right inverse");
    return SelectionType.StyleAtRightInverseFully;
  }

  return SelectionType.Invalid;
};

/**
 * Format same tag
 */

interface FormatPureTextProps {
  tagName: string;
  attributes?: AttributesProps;
  selection: Selection;
  originNodes: NodeProps[];
}

export const formatSameTag = ({
  tagName,
  attributes,
  selection,
  originNodes,
}: FormatPureTextProps): NodeProps[] => {
  const { anchorNode } = selection;

  let selectedNodeIndex = getTagIndex(anchorNode?.parentElement as HTMLElement);
  const selectedNode = originNodes[selectedNodeIndex];
  const selectionInText = selection.toString();

  const isStyleActivated = checkIsStyleApplied(tagName, selection);
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
    const textForCNBeforeTarget = selectedNode.text.slice(
      0,
      selectionStartIndex
    );
    originNodes[selectedNodeIndex] = {
      text: textForCNBeforeTarget,
      tags: selectedNode.tags,
    } as NodeProps;
    selectedNodeIndex += 1;
  }

  /**
   * Selected node
   */

  const updatedTags = isStyleActivated
    ? selectedNode.tags.filter((tag) => tag.tagName !== tagName)
    : [
        ...selectedNode.tags,
        {
          tagName,
          attributes,
        },
      ];

  if (needNodeBeforeSelected) {
    originNodes.splice(selectedNodeIndex, 0, {
      text: selectionInText,
      tags: updatedTags,
    } as NodeProps);
  } else {
    originNodes[selectedNodeIndex] = {
      text: selectionInText,
      tags: updatedTags,
    } as NodeProps;
  }

  /**
   * Node after selected
   */

  const needNodeAfterSelected =
    !anchorNode?.nodeValue?.endsWith(selectionInText);

  if (needNodeAfterSelected) {
    const textForCNAfterTarget = selectedNode.text.slice(
      selectionEndIndex,
      selectedNode.text.length
    );
    originNodes.splice(selectedNodeIndex + 1, 0, {
      text: textForCNAfterTarget,
      tags: selectedNode.tags,
    } as NodeProps);
  }

  return originNodes;
};

/**
 * Format tag at center
 */

/**
 * Format selection
 */

interface FormatSelectionProps {
  tagName: string;
  attributes?: AttributesProps;
  originNodes: NodeProps[];
}

export const formatSelection = ({
  tagName,
  attributes,
  originNodes,
}: FormatSelectionProps): NodeProps[] => {
  const selection = window.getSelection();

  if (!selection || selection?.toString() === "") {
    return originNodes;
  }

  const { anchorNode } = selection;
  const clonedOriginNodes = [...originNodes];
  const selectionType = getSelectionType({
    selection,
    nodes: originNodes,
  });

  /**
   * Format pure text
   */

  if (selectionType === SelectionType.SameStyleFully) {
    return formatSameTag({
      tagName,
      attributes,
      selection,
      originNodes: clonedOriginNodes,
    });
  }

  /**
   * Format tag at center
   */

  if (selectionType === SelectionType.StyleAtCenter) {
    const centerTag = anchorNode?.parentElement as HTMLElement;
    const centerTagIndex = getTagIndex(centerTag);
    const nodeBeforeSelected = originNodes[centerTagIndex - 1];
    const nodeAfterSelected = originNodes[centerTagIndex + 1];
  }

  return originNodes;
};
