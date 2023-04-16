import { useRef, useState } from "react";

import SVG from "react-inlinesvg";

import { Color, FontSize, FontWeight } from "@src/styles/variables";
import { getIconPath } from "@src/utils/helpers";

import { tooltip } from "../tooltip";

import { Content, Wrapper } from "./content-editable.styled";
import { ContentEditableProps } from "./content-editable.types";
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

  const [controlledContent, setControlledContent] = useState(content);
  const formatTextBarRef = useRef<HTMLDivElement>(null);

  const handleBold = () => {
    const selection = window.getSelection()?.toString();
  };

  const handleItalic = () => {};

  const handleUnderline = () => {};

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const rangeRect = selection?.getRangeAt(0).getBoundingClientRect();

    if (selection?.toString() === "" || !rangeRect) {
      return;
    }

    const formatBarWidth = formatTextBarRef.current?.clientWidth || 0;
    const formatBarHeight = formatTextBarRef.current?.clientHeight || 0;
    const topPos = window.scrollY + rangeRect.top - formatBarHeight - 7;
    const leftPos = rangeRect.right - formatBarWidth / 2;

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
        {controlledContent}
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
