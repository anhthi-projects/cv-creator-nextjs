import styled from "styled-components";
import {
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  flexbox,
  space,
  layout,
} from "styled-system";

export interface FlexLayout extends FlexboxProps, SpaceProps, LayoutProps {}

export const Flex = styled.div<FlexLayout>`
  display: flex;
  ${flexbox}
  ${space}
  ${layout}
`;
