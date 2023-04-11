import styled from "styled-components";

import { Color, FontSize, FontWeight, Space } from "@src/styles/variables";

export const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignInButton = styled.button`
  border: none;
  outline: none;
  padding: 10px ${Space.px16};
  background-color: ${Color.White};
  color: ${Color.PrimaryDarker};
  font-size: 1.04rem;
  border-radius: 4px;
  cursor: pointer;
`;
