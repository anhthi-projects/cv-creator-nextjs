import { createGlobalStyle } from "styled-components";

import { Color } from "./variables";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Quicksand";
    box-sizing: border-box;
    background-color: ${Color.Blue};
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
