import "./theme/theme.css";
import "./i18n/config/config";

import { Toaster } from "@org/ui";
import { StrictMode } from "react";

import { SessionProvider } from "./providers/session-provider";
import { SettingsProvider } from "./providers/settings-provider";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routing";

export const App = () => {
  return (
    <StrictMode>
      <SettingsProvider>
        <SessionProvider>
          <RouterProvider router={router} />
          <Toaster position={"top-center"} />
        </SessionProvider>
      </SettingsProvider>
    </StrictMode>
  );
};
