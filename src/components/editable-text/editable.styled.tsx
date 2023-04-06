import styled, { css } from "styled-components";

import { Color } from "@src/styles/variables";

import { EditableTextProps } from "./editable-text.types";

export const EditableWrapper = styled.div`
  ${(props: EditableTextProps) => css`
    width: 100%;
    min-height: 30px;
    font-size: ${props.fontSize};
    font-weight: ${props.fontWeight};
    color: ${props.text ? Color.Blue : Color.Light6};
    display: flex;
    align-items: center;
    padding: 0 6px;

    input {
      border: none;
      outline: none;
      margin: 0 -6px;
      padding: 0 6px;
      flex-grow: 1;
      align-self: stretch;
      font-size: ${props.fontSize};
      font-weight: ${props.fontWeight};
      color: ${props.text ? Color.Blue : Color.Light3};
      background-color: ${Color.Light1};
      border-radius: 3px;
    }
  `}
`;
