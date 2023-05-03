import styled from "styled-components";

import { ContentEditable } from "@src/components/content-editable";
import { Space } from "@src/styles/variables";

export const StyledContentEditable = styled(ContentEditable)`
  text-transform: uppercase;
  margin-bottom: ${Space.px20};
`;
