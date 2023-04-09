import styled from "styled-components";

import ContentEditable from "@src/components/content-editable/content-editable";
import { Color, Page, Space } from "@src/styles/variables";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: ${Page.Width};
  min-height: calc(${Page.Width} * ${Page.Ratio});
  background-color: ${Color.White};
  margin: 80px auto 50px;
  padding: ${Page.Padding};
`;

export const YourName = styled(ContentEditable)`
  margin: 0 0 ${Space.px6};
`;

export const YourPosition = styled(ContentEditable)`
  margin: 0;
`;
