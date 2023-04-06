import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Open Sans";
    box-sizing: border-box;
  }

  input,
  textarea {
    font-family: "Open Sans";
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
