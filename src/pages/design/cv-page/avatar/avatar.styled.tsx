import styled, { css } from "styled-components";

import { Color, FontSize, Space } from "@src/styles/variables";

export const PreviewPhoto = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  background-image: "";
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0px 1px 17px -3px rgba(0, 0, 0, 0.37);
  border: 2px solid ${Color.White};
`;

export const FileUploader = styled.label`
  ${(props: { hidden: boolean }) => css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed #000;
    border-radius: 50%;
    visibility: ${props.hidden ? "hidden" : "visible"};
    cursor: pointer;
  `}
`;

export const AvatarWrapper = styled.div`
  width: 220px;
  height: 220px;
  margin: 0 auto ${Space.px36};
  position: relative;

  &:has(${PreviewPhoto}):hover {
    ${FileUploader} {
      visibility: visible !important;
      background-color: rgba(256, 256, 256, 0.2);
      border: none;
      transition-delay: 0.1s;
      transition-duration: 0.2s;
    }
  }
`;

export const SelectYourPhoto = styled.span`
  font-size: ${FontSize.Sm};
  margin-top: 6px;
`;

export const InputFile = styled.input`
  display: none;
`;
