import { useRef, useState } from "react";

import HTMLReactParser from "html-react-parser";
import SVG from "react-inlinesvg";

import { Color, FontSize, FontWeight } from "@src/styles/variables";
import { getIconPath } from "@src/utils/helpers";

import { tooltip } from "../tooltip";

import { Content, Wrapper } from "./content-editable.styled";
import { ContentEditableProps } from "./content-editable.types";
import FormatTextBar from "./format-bar/format-bar";
import { applyStyleElement } from "./content-editable.utils";

export const ContentEditable = (props: ContentEditableProps) => {
  const {
    content,
    icon,
    placeholder = "Empty",
    color = Color.Light7,
    fontSize = FontSize.Md,
    fontWeight = FontWeight.Normal,
    textAlign = "left",
    className,
    noMargin,
  } = props;

  const [contentInText, setContentInText] = useState<string>(
    content?.toString() || ""
  );
  const formatTextBarRef = useRef<HTMLDivElement>(null);

  const formatText = (tagName: string, attrs: Record<string, string> = {}) => {
    const selection = window.getSelection();
    const selectionInText = selection?.toString() || "";

    console.log(selection);

    const styledElementInText = applyStyleElement({
      tagName,
      attrs,
      innerHtml: selectionInText,
    });

    const firstParagraph = contentInText.slice(0, selection?.anchorOffset);
    const lastParagraph = contentInText.slice(
      selection?.focusOffset,
      contentInText.length
    );

    setContentInText(`${firstParagraph}${styledElementInText}${lastParagraph}`);
  };

  const handleBold = () => {
    formatText("strong");
    tooltip.close();
  };

  const handleItalic = () => {};

  const handleUnderline = () => {};

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const rangeRect = selection?.getRangeAt(0).getBoundingClientRect();

    console.log(selection);

    if (selection?.toString() === "" || !rangeRect) {
      return;
    }

    const formatBarWidth = formatTextBarRef.current?.clientWidth || 0;
    const formatBarHeight = formatTextBarRef.current?.clientHeight || 0;
    const topPos = window.scrollY + rangeRect.top - formatBarHeight - 7;
    const leftPos = rangeRect.right - formatBarWidth / 2 - 6;

    tooltip.open({
      content: (
        <FormatTextBar
          onBold={handleBold}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
          ref={formatTextBarRef}
        />
      ),
      position: {
        x: topPos,
        y: leftPos,
      },
    });
  };
  /**
   * Render
   */

  const renderContent = () => {
    return (
      <Content
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign={textAlign}
        placeholder={placeholder}
        className={className}
        noMargin={noMargin}
        suppressContentEditableWarning
        contentEditable
        onSelect={handleTextSelect}
      >
        {HTMLReactParser(contentInText)}
      </Content>
    );
  };

  if (icon) {
    return (
      <Wrapper>
        <SVG
          src={getIconPath(icon.iconName)}
          width={icon.width || 22}
          height={icon.height || 22}
        />
        {renderContent()}
      </Wrapper>
    );
  }
  return renderContent();
};
