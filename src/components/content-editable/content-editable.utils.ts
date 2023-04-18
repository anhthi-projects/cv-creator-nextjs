interface InjectStyleElementProps {
  tagName: string;
  attrs: Record<string, string>;
  innerHtml: string;
}

export const applyStyleElement = ({
  tagName,
  attrs,
  innerHtml,
}: InjectStyleElementProps) => {
  const styledElement = document.createElement(tagName);

  Object.keys(attrs).forEach((key) => {
    styledElement.setAttribute(key, attrs[key]);
  });

  styledElement.innerHTML = innerHtml;
  return new XMLSerializer().serializeToString(styledElement);
};
