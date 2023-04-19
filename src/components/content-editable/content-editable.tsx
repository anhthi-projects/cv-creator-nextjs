import { useRef, useState } from "react";

import HTMLReactParser from "html-react-parser";
import SVG from "react-inlinesvg";

import { Color, FontSize, FontWeight } from "@src/styles/variables";
import { getIconPath } from "@src/utils/helpers";

import { tooltip } from "../tooltip";

import { Content, Wrapper } from "./content-editable.styled";
import { ContentEditableProps } from "./content-editable.types";
import {
  applyStyleElement,
  injectStyledElementToContent,
} from "./content-editable.utils";
import FormatTextBar from "./format-bar/format-bar";

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

  const [controlledContent, setControlledContent] = useState<string>(
    content?.toString() || ""
  );
  const formatTextBarRef = useRef<HTMLDivElement>(null);

  const formatSelection = (
    tagName: string,
    attrs: Record<string, string> = {}
  ) => {
    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    console.log(selection);
    const selectionInText = selection?.toString() || "";
    const styledElementInText = applyStyleElement({
      tagName,
      attrs,
      innerHtml: selectionInText,
    });
    const completedContent = injectStyledElementToContent({
      selection,
      content: controlledContent,
      styledElementInText,
    });

    setControlledContent(completedContent);
  };

  const handleBold = () => {
    formatSelection("strong");
    tooltip.close();
  };

  const handleItalic = () => {};

  const handleUnderline = () => {};

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const rangeRect = selection?.getRangeAt(0).getBoundingClientRect();

    if (!selection || selection?.toString() === "" || !rangeRect) {
      return;
    }

    console.log(selection);
    console.log(selection.getRangeAt(0));

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
        onSelect={handleTextSelection}
      >
        {HTMLReactParser(controlledContent)}
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
