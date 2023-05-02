export const checkStyleActivated = (tagName: string, selection: Selection) => {
  const { anchorNode, focusNode } = selection;
  const anchorParentElement = anchorNode?.parentElement as HTMLElement;
  const focusParentElement = focusNode?.parentElement as HTMLElement;
  const isSelectInSameTagElement = anchorParentElement === focusParentElement;

  return (
    isSelectInSameTagElement &&
    anchorParentElement.tagName.toLowerCase() === tagName
  );
};
