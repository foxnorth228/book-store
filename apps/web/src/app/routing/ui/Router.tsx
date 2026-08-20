import { PublicRoute } from "@modules/auth";
import { Navigate, Route, Routes } from "react-router";

import { DefaultLayout } from "../../layouts/DefaultLayout";
import { PublicRoutes, routes } from "../config/routes";

export const Router = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<DefaultLayout />}>
          {Object.entries(routes.auth).map(([key, element]) => (
            <Route path={key} element={element} />
          ))}
        </Route>
      </Route>
      <Route element={<DefaultLayout />}>
        {Object.entries(routes.public).map(([key, element]) => (
          <Route path={key} element={element} />
        ))}
      </Route>
      <Route path="/*" element={<Navigate to={PublicRoutes.Homepage} />} />
    </Routes>
  );
};
