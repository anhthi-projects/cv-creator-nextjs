import styled, { css } from "styled-components";

import { Color, Space } from "@src/styles/variables";

import { PositionProps } from "./tooltip.types";

export const TooltipWrapper = styled.div`
  ${({ position }: { position: PositionProps }) => css`
    max-width: 400px;
    position: absolute;
    top: ${`${position.x}px`};
    left: ${`${position.y}px`};
    border: 1px solid ${Color.Light2};
    background-color: ${Color.Light12};
    color: ${Color.White};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 3px;

    &::before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-top: 5px solid ${Color.Light12};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  `}
`;
