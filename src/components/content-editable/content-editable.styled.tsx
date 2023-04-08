import styled, { css } from "styled-components";

import { Color } from "@src/styles/variables";

import { ContentEditableProps } from "./content-editable.types";

type StyledParagraph = Omit<ContentEditableProps, "value" | "placeholder">;

export const Paragraph = styled.p<StyledParagraph>`
  ${(props) => css`
    color: ${props.color};
    font-size: ${props.fontSize};
    font-weight: ${props.fontWeight};
    margin: ${props.noMargin ? "0" : "auto"};
    outline: none;

    &[contenteditable="true"]:empty::before {
      content: attr(placeholder);
      color: ${Color.Light4};
    }
  `}
`;
