import "./theme/global-styles.css";
import "./theme/theme.css";
import "./i18n/config";

import { StrictMode } from "react";
import { BrowserRouter } from "react-router";

import { SessionProvider } from "./providers/session-provider";
import { SettingsProvider } from "./providers/settings-provider";
import { Router } from "./routing/ui/Router";

export const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <SettingsProvider>
          <SessionProvider>
            <Router />
          </SessionProvider>
        </SettingsProvider>
      </BrowserRouter>
    </StrictMode>
  );
};
