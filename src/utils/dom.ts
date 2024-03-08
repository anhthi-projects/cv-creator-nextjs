import { NodeProps, TagProps, TagName } from "@src/common/types";

/**
 * Construct tag element in string
 */

interface ConstructTagInStringProps {
  tagName: string;
  innerHtml: string;
  attributes?: Record<string, string>;
}

export const constructTagInString = ({
  tagName,
  innerHtml,
  attributes = {},
}: ConstructTagInStringProps) => {
  const attrsInMap = Object.keys(attributes).map((attrKey) => {
    return `${attrKey}="${attributes[attrKey]}"`;
  });

  return `<${tagName} ${attrsInMap.join(" ")}>${innerHtml}</${tagName}>`;
};

/**
 * Get descendant tags
 */

export const getDescendantTags = (rootTag: HTMLElement): TagProps[] => {
  const descendantTags: TagProps[] = [];

  const getTag = (tagElement?: HTMLElement | null) => {
    if (!tagElement || tagElement.nodeName === "#text") {
      return;
    }

    const childTagName = tagElement.tagName.toLowerCase();
    switch (childTagName) {
      case TagName.Hyperlink: {
        const url = tagElement.getAttribute("href") || "";
        descendantTags.unshift({
          tagName: childTagName,
          attributes: {
            href: url,
            title: url,
          },
        });
      }

      default: {
        descendantTags.unshift({
          tagName: childTagName,
          attributes: {},
        });
      }
    }

    getTag(tagElement.childNodes[0] as HTMLElement);
  };

  getTag(rootTag);
  return descendantTags;
};

/**
 * Get ancestor tag names
 */

export const getAncestorTagNames = (
  childElement?: HTMLElement | null
): string[] => {
  const ancestorTagNames: string[] = [];

  const getParentTagName = (element?: HTMLElement | null) => {
    const parentTagName = element?.parentElement?.tagName.toLowerCase() || "";

    if (!parentTagName || parentTagName === "div") {
      return;
    }

    ancestorTagNames.push(parentTagName);
    getParentTagName(element?.parentElement);
  };

  getParentTagName(childElement);
  return ancestorTagNames;
};

/**
 * Convert string to content nodes
 */

export const stringToNodes = (input: string = ""): NodeProps[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const nodes: NodeProps[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeName === "#text") {
      nodes.push({
        text: node.textContent || "",
        tags: [
          {
            tagName: TagName.Text,
            attributes: {},
          },
        ],
      });
      return;
    }

    const tagElement = node as HTMLElement;
    nodes.push({
      text: tagElement.innerText,
      tags: getDescendantTags(tagElement),
    });
  });

  return nodes;
};

/**
 * Convert content nodes to string
 */

interface NodesToStringProps {
  name: string;
  nodes: NodeProps[];
}

export const nodesToString = ({ name, nodes }: NodesToStringProps): string => {
  let accTokenId = 0;

  return nodes
    .map((node) => {
      const tags = node.tags || [];

      return tags.reduce((acc, tag, index) => {
        const attributes = tag.attributes || {};
        delete attributes.id;
        const isDeepestTag = index === 0;

        if (isDeepestTag) {
          attributes.id = `${name}-cn_${accTokenId}`;
          accTokenId = accTokenId + 1;
        }

        return constructTagInString({
          tagName: tag.tagName,
          innerHtml: acc || node.text,
          attributes,
        });
      }, "");
    })
    .join("");
};

/**
 * Get Tag Index
 */

export const getTagIndex = (tagElement: HTMLElement): number =>
  parseInt(tagElement.getAttribute("id")?.split("_")[1] || "");

/**
 * Check Is style applied
 */

export const checkIsStyleApplied = (tagName: string, selection: Selection) => {
  const { anchorNode, focusNode } = selection;

  const ancestorTagNames = getAncestorTagNames(anchorNode?.parentElement);
  const isSelectInSameTag =
    (anchorNode?.parentElement as HTMLElement) ===
    (focusNode?.parentElement as HTMLElement);

  return isSelectInSameTag && ancestorTagNames.includes(tagName);
};

/**
 * Check Does tag has style
 */

interface CheckTagHasAnyStyleProps {
  tagElement: HTMLElement;
  nodes: NodeProps[];
}

export const checkTagHasAnyStyle = ({
  tagElement,
  nodes,
}: CheckTagHasAnyStyleProps): boolean => {
  const tagIndex = getTagIndex(tagElement);
  const targetNode = nodes[tagIndex];

  return !!targetNode.tags.find((tag) =>
    [TagName.Bold, TagName.Italic, TagName.Underline].includes(
      tag.tagName as TagName
    )
  );
};
