import SVG from "react-inlinesvg";

import { Color, FontSize, FontWeight } from "@src/styles/variables";

import { tooltip } from "../tooltip";

import { Content, Wrapper } from "./content-editable.styled";
import { ContentEditableProps } from "./content-editable.types";
import { getIconPath } from "@src/utils/helpers";

export const ContentEditable = (props: ContentEditableProps) => {
  const {
    text,
    icon,
    placeholder = "Empty",
    color = Color.Light7,
    fontSize = FontSize.Md,
    fontWeight = FontWeight.Normal,
    textAlign = "left",
    className,
    noMargin,
  } = props;

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const rangeRect = selection?.getRangeAt(0).getBoundingClientRect();
    const formatTextTooltip = document.getElementById("formatTextTooltip");

    if (selection?.toString() === "" || !rangeRect) {
      return;
    }

    const tooltipWidth = formatTextTooltip?.clientWidth || 0;
    const tooltipHeight = formatTextTooltip?.clientHeight || 0;
    const topPos = window.scrollY + rangeRect.top - tooltipHeight - 7;
    const leftPos = rangeRect.right - tooltipWidth;

    tooltip.open({
      content: "hello world",
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
        {text}
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
