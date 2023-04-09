import styled from "styled-components";

import ContentEditable from "@src/components/content-editable/content-editable";
import { Color, Page, Space } from "@src/styles/variables";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: ${Page.Width};
  min-height: calc(${Page.Width} * ${Page.Ratio});
  background-color: ${Color.White};
  margin: 80px auto;
  padding: ${Page.Padding};
  box-shadow: rgba(0, 0, 0, 0.3) 0.4rem 0.7rem 9.3rem 0.3rem;
`;

export const YourName = styled(ContentEditable)`
  margin: 0 0 ${Space.px6};
`;

export const YourPosition = styled(ContentEditable)`
  margin: 0;
`;
