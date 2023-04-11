import styled from "styled-components";

import { Space } from "@src/styles/variables";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${Space.px6};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
`;
