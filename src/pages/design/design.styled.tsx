import styled from "styled-components";

import { Color, Page, Space } from "@src/styles/variables";
import ContentEditable from "@src/components/content-editable/content-editable";

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

export const YourName = styled(ContentEditable)`
  margin: 0 0 ${Space.px12};
`;

export const YourPosition = styled(ContentEditable)`
  margin: 0;
`;
