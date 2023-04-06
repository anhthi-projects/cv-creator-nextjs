import styled from "styled-components";

import { colorWhite } from "@src/styles/variables";

export const Wrapper = styled.div`
  width: 60px;
  height: 300px;
  color: ${colorWhite};
  background-color: #252525;
  border-radius: 30px;
  position: fixed;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
  padding: 6px;
`;
