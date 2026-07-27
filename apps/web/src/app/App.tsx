import { ThemeProvider } from "styled-components";

import { Router } from "./routing/ui/Router";
import { GlobalStyles } from "./theme/global-styles";
import { theme } from "./theme/theme";

export function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}
