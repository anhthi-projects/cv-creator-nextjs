import styled from "styled-components";
import {
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  flexbox,
  space,
  layout,
} from "styled-system";

/**
 * Flex
 */

export interface FlexLayoutProps
  extends FlexboxProps,
    SpaceProps,
    LayoutProps {}

export const Flex = styled.div<FlexLayoutProps>`
  display: flex;
  ${flexbox}
  ${space}
  ${layout}
`;

/**
 * Box
 */

export interface BoxLayoutProps extends SpaceProps, LayoutProps {}

export const Box = styled.div<BoxLayoutProps>`
  ${space}
  ${layout}
`;
