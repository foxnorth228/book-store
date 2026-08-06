import { StrictMode } from "react";
import { BrowserRouter } from "react-router";

import { App } from "./App";
import { SessionProvider } from "./providers/session-provider";

export const Root = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <SessionProvider>
          <App />
        </SessionProvider>
      </BrowserRouter>
    </StrictMode>
  );
};
