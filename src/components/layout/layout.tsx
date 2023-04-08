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

export interface FlexLayout extends FlexboxProps, SpaceProps, LayoutProps {}

export const Flex = styled.div<FlexLayout>`
  display: flex;
  ${flexbox}
  ${space}
  ${layout}
`;

/**
 * Box
 */

export interface BoxLayout extends SpaceProps, LayoutProps {}

export const Box = styled.div<BoxLayout>`
  ${space}
  ${layout}
`;
