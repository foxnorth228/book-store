import { ProtectedRoute, PublicRoute } from "@modules/auth";
import { Navigate, Route, Routes } from "react-router";

import { PublicRoutes, routes } from "../config/routes";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";

export const Router = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          {Object.entries(routes.auth).map(([key, element]) => (
            <Route path={key} element={element} />
          ))}
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        {Object.entries(routes.public).map(([key, element]) => (
          <Route path={key} element={element} />
        ))}
      </Route>
      <Route path="/*" element={<Navigate to={PublicRoutes.Homepage} />} />
    </Routes>
  );
};
