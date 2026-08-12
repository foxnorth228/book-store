import "./theme/global-styles.css";
import "./theme/theme.css";

import { Toaster } from "react-hot-toast";

import { Router } from "./routing/ui/Router";

export function App() {
  return (
    <>
      <Toaster />
      <Router />
    </>
  );
}
