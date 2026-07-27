import { Route, Routes } from "react-router";

import { routes } from "../config/routes";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";

export const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {Object.entries(routes.auth).map(([key, element]) => (
          <Route path={key} element={element} />
        ))}
      </Route>
    </Routes>
  );
};
