import styled, { css } from "styled-components";

import { Color, Space } from "@src/styles/variables";

import { ContentEditableProps } from "./content-editable.types";

type StyledParagraph = Omit<
  ContentEditableProps,
  "value" | "placeholder" | "icon"
>;

export const Content = styled.div<StyledParagraph>`
  ${(props) => css`
    color: ${props.color};
    font-size: ${props.fontSize};
    font-weight: ${props.fontWeight};
    text-align: ${props.textAlign};
    margin: ${props.noMargin ? "0" : "unset"};
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

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  ${Content} {
    margin: ${Space.px4} 0 ${Space.px4} ${Space.px12};
  }
`;
