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
    padding: ${Space.px4} ${Space.px6};
    border-radius: 3px;
    position: absolute;
  `}
`;
