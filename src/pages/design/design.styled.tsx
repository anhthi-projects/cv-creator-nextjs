import styled from "styled-components";

import { Color, Page } from "@src/styles/variables";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: ${Page.Width};
  min-height: calc(${Page.Width} * ${Page.Ratio});
  background-color: ${Color.White};
  margin: 80px auto 50px;
  padding: ${Page.Padding};
  display: flex;
`;

export const LeftColumn = styled.div`
  width: ${Page.LeftColumnWidth};
  margin-right: 20px;
`;

export const RightColumn = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;
