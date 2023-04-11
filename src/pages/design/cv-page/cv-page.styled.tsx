import styled, { css } from "styled-components";

import { Breakpoint, Color, Page, Space } from "@src/styles/variables";

export const LeftColumn = styled.div`
  width: ${`${Page.LeftColWidth}px`};
  min-width: ${`${Page.LeftColWidth}px`};
  margin-right: ${Space.px36};
`;

export const RightColumn = styled.div`
  flex-grow: 1;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${`${Page.Width}px`};
  min-height: ${`${Page.Heigh}px`};
  background-color: ${Color.White};

  ${(props: { isInPreview: boolean }) => css`
    margin: ${props.isInPreview ? "auto" : "80px auto"};
    padding: ${props.isInPreview
      ? 0
      : `${Page.PadTopBottom}px ${Page.PadLeftRight}px`};
    box-shadow: ${props.isInPreview
      ? "none"
      : "rgba(0, 0, 0, 0.3) 0.4rem 0.7rem 9.3rem 0.3rem"};
  `}

  @media only screen and (max-width: ${Breakpoint.Lg}) {
    ${LeftColumn} {
      margin-right: 0;
      width: 100%;
    }
  }
`;
