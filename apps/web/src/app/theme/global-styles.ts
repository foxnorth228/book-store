import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Helvetica,
      Arial,
      sans-serif;

    line-height: 1.5;
    background-color: #ffffff;
    color: #111827;

    overflow-x: hidden;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    border: 0;
    padding: 0;
    background: none;
    cursor: pointer;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  &::selection {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
