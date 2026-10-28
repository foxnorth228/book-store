import { PublicRoutes } from "@app/routing";
import { Navigate, Outlet, useLocation } from "react-router";

import { useSessionStore } from "../model/use-session-store";

export const PublicRoute = () => {
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={PublicRoutes.Homepage} replace state={{ from: location }} />;
  }

  return <Outlet />;
};
