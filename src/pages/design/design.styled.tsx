import styled from "styled-components";

import {
  colorWhite,
  leftColumnWidth,
  pagePadding,
  pageRatio,
  pageWidth,
} from "@src/styles/variables";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: ${pageWidth};
  min-height: calc(${pageWidth} * ${pageRatio});
  background-color: ${colorWhite};
  margin: 80px auto 50px;
  padding: ${pagePadding};
  display: flex;
`;

export const LeftColumn = styled.div`
  width: ${leftColumnWidth};
  margin-right: 20px;
`;

export const RightColumn = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;
