import { AttributesProps, NodeProps, SelectionType } from "@src/common/types";
import { checkStyleApplied } from "@src/utils/dom";

/**
 * Get selection type
 */

export const getSelectionType = (selection: Selection): SelectionType => {
  const { anchorNode, focusNode } = selection;

  const anchorParentElement = anchorNode?.parentElement as HTMLElement;
  const focusParentElement = focusNode?.parentElement as HTMLElement;
  const anchorParentElementIndex = getNodeIndex(anchorParentElement);
  const focusParentElementIndex = getNodeIndex(focusParentElement);
  const isSameParent = anchorParentElement === focusParentElement;

  if (isSameParent) {
    return SelectionType.SameTag;
  }

  if (focusParentElementIndex - anchorParentElementIndex > 1) {
    console.log("tags at center");
    return SelectionType.TagsAtCenter;
  }

  if (anchorParentElementIndex - focusParentElementIndex > 1) {
    console.log("tags at center inverse");
    return SelectionType.TagsAtCenterInverse;
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

const getNodeIndex = (tagElement: HTMLElement): number =>
  parseInt(tagElement.getAttribute("id")?.split("_")[1] || "");

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

  let selectedNodeIndex = getNodeIndex(
    anchorNode?.parentElement as HTMLElement
  );
  const selectedNode = originNodes[selectedNodeIndex];
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
  const selectionType = getSelectionType(selection);

  /**
   * Format pure text
   */

  if (selectionType === SelectionType.SameTag) {
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

  if (selectionType === SelectionType.TagAtCenter) {
    const centerTag = anchorNode?.parentElement as HTMLElement;
    const centerTagIndex = getNodeIndex(centerTag);
    const nodeBeforeSelected = originNodes[centerTagIndex - 1];
    const nodeAfterSelected = originNodes[centerTagIndex + 1];
  }

  return originNodes;
};
