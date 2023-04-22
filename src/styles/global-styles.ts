import { createGlobalStyle } from "styled-components";

import { Color, FontSize } from "./variables";

const GlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${Color.Light8};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${Color.Light10};
    border-radius: 5px;
  }

  ::-moz-selection {
    color: ${Color.White};
    background: ${Color.Primary};
  }

  ::selection {
    color: ${Color.White};
    background: ${Color.Primary};
  }

  
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Quicksand";
    box-sizing: border-box;
    background-color: ${Color.Primary};
    font-size: ${FontSize.Base};
  }

  input,
  textarea {
    font-family: "Quicksand";
  }

  a {
    text-decoration: none;
    color: ${Color.Blue};
  }

  ul,
  li {
    list-style-type: none;
  }

  div {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
