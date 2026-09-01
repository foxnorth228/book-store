import "./theme/theme.css";
import "./i18n/config/config";

import { Toaster } from "@org/ui";
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
            <Toaster position={"top-center"} />
          </SessionProvider>
        </SettingsProvider>
      </BrowserRouter>
    </StrictMode>
  );
};
