import "./theme/global-styles.css";
import "./theme/theme.css";
import "./i18n/config";

import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";

import { SessionProvider } from "./providers/session-provider";
import { Router } from "./routing/ui/Router";

export const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <SessionProvider>
          <Router />
          <Toaster />
        </SessionProvider>
      </BrowserRouter>
    </StrictMode>
  );
};
