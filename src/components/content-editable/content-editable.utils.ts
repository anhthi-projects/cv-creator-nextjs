interface ApplyStyleElementProps {
  tagName: string;
  attrs: Record<string, string>;
  innerHtml: string;
}

export const applyStyleElement = ({
  tagName,
  attrs,
  innerHtml,
}: ApplyStyleElementProps) => {
  const styledElement = document.createElement(tagName);

  Object.keys(attrs).forEach((key) => {
    styledElement.setAttribute(key, attrs[key]);
  });

  styledElement.innerHTML = innerHtml;
  return new XMLSerializer().serializeToString(styledElement);
};

/**
 * Inject styled element to content
 */

interface InjectStyledElementToContentProps {
  selection: Selection;
  content: string;
  styledElementInText: string;
}

export const injectStyledElementToContent = ({
  selection,
  content,
  styledElementInText,
}: InjectStyledElementToContentProps) => {
  const firstParagraph = content.slice(0, selection?.anchorOffset);
  const lastParagraph = content.slice(selection?.focusOffset, content.length);

  return `${firstParagraph}${styledElementInText}${lastParagraph}`;
};
