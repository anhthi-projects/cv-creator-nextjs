import styled, { css } from "styled-components";

import { Color, Space } from "@src/styles/variables";

import { ContentEditableProps } from "./content-editable.types";

type StyledParagraph = Omit<ContentEditableProps, "value" | "placeholder">;

export const Paragraph = styled.p<StyledParagraph>`
  ${(props) => css`
    color: ${props.color};
    font-size: ${props.fontSize};
    font-weight: ${props.fontWeight};
    text-align: ${props.textAlign};
    margin: ${props.noMargin ? "0" : "auto"};
    padding: 2px ${Space.px4};
    border: 1px dashed transparent;
    outline: none;

    &[contenteditable="true"]:empty::before {
      content: attr(placeholder);
      color: ${Color.Light4};
    }

    &:hover {
      border: 1px dashed ${Color.Light4};
    }
  `}
`;
