import { Route, Routes } from "react-router";

import { routes } from "./routes";

export const Router = () => {
  return (
    <Routes>
      {Object.entries(routes).map(([key, element]) => (
        <Route path={key} element={element} />
      ))}
    </Routes>
  );
};
