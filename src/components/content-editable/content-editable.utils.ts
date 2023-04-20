import { ContentNodeProps } from "./content-editable.types";

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

export const stringToContentNodes = (input: string) => {};

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
  const previousSibling = anchorNode?.previousSibling as HTMLElement;
  const previousSiblingId =
    previousSibling.getAttribute("id")?.split("-")[1] || "";

  const cloneOriginContentNodes = [...originContentNodes];
  const targetNodeIndex = parseInt(previousSiblingId) + 1;
  const targetNode = cloneOriginContentNodes[targetNodeIndex];
  const prevChunkInTargetNode = targetNode.text.slice(
    0,
    selection.anchorOffset
  );
  const lastChunkInTargetNode = targetNode.text.slice(
    selection.focusOffset,
    targetNode.text.length
  );
  const selectionInContentNode = {
    text: selection.toString(),
    tags: [
      {
        tagName,
        attributes,
      },
    ],
  } as ContentNodeProps;

  cloneOriginContentNodes[targetNodeIndex] = {
    text: prevChunkInTargetNode,
  } as ContentNodeProps;
  cloneOriginContentNodes.splice(
    targetNodeIndex + 1,
    0,
    selectionInContentNode
  );
  cloneOriginContentNodes.splice(targetNodeIndex + 2, 0, {
    text: lastChunkInTargetNode,
  });

  console.log(cloneOriginContentNodes);

  return cloneOriginContentNodes;
};
