import SVG from "react-inlinesvg";

import { Color, FontSize, FontWeight, Space } from "@src/styles/variables";

import { Flex } from "../layout";

import { Paragraph, Wrapper } from "./content-editable.styled";
import { ContentEditableProps } from "./content-editable.types";

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

  /**
   * Render
   */

  const renderParagraph = () => {
    return (
      <Paragraph
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign={textAlign}
        placeholder={placeholder}
        className={className}
        noMargin={noMargin}
        suppressContentEditableWarning
        contentEditable
        onSelect={(e) => {
          console.log(window.getSelection()?.toString());
        }}
      >
        {text}
      </Paragraph>
    );
  };

  if (icon) {
    return (
      <Wrapper>
        <SVG
          src={`/static/icons/${icon.iconName}`}
          width={icon.width || 22}
          height={icon.height || 22}
        />
        {renderParagraph()}
      </Wrapper>
    );
  }
  return renderParagraph();
};
