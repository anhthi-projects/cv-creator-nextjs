import styled, { css } from "styled-components";

import { Color } from "@src/styles/variables";

import { EditableTextProps } from "./editable-text.types";

export const Wrapper = styled.div`
  ${(props: EditableTextProps) => css`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 6px;

    span,
    input {
      font-size: ${props.fontSize};
      font-weight: ${props.fontWeight};
    }

    span {
      color: ${props.text ? props.color : Color.Light6};
    }

    input {
      border: none;
      outline: none;
      margin: 0 -6px;
      padding: 0 6px;
      flex-grow: 1;
      align-self: stretch;
      color: ${props.text ? props.color : Color.Light3};
      background-color: ${Color.Light1};
      border-radius: 3px;
    }
  `}
`;
