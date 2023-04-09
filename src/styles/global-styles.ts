import { createGlobalStyle } from "styled-components";

import { Color } from "./variables";

const GlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${Color.Light8};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${Color.Light4};
    border-radius: 5px;
  }

  
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Quicksand";
    box-sizing: border-box;
    background-color: ${Color.Primary};
  }

  input,
  textarea {
    font-family: "Quicksand";
  }

  a {
    text-decoration: none;
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
