import styled from "styled-components";

import { Space } from "@src/styles/variables";

import ContentEditable from "../content-editable/content-editable";

export const Title = styled(ContentEditable)`
  text-transform: uppercase;
  margin-bottom: ${Space.px20};
`;
