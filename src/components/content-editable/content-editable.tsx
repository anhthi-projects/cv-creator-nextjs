import { useState } from "react";

import { Color, FontSize, FontWeight } from "@src/styles/variables";

import { Paragraph } from "./content-editable.styled";
import { ContentEditableProps } from "./content-editable.types";

const ContentEditable = (props: ContentEditableProps) => {
  const {
    text,
    placeholder,
    color = Color.Light7,
    fontSize = FontSize.Md,
    fontWeight = FontWeight.Normal,
    textAlign = "left",
    className,
    noMargin,
  } = props;

  return (
    <Paragraph
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      placeholder={placeholder}
      className={className}
      noMargin={noMargin}
      contentEditable
      suppressContentEditableWarning
    >
      {text}
    </Paragraph>
  );
};

export default ContentEditable;
