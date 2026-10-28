import { AuthRoutes } from "@app/routing";
import { Navigate, Outlet, useLocation } from "react-router";

import { useSessionStore } from "../model/use-session-store";

export const ProtectedRoute = () => {
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={AuthRoutes.Login} replace state={{ from: location }} />;
  }

  return <Outlet />;
};
