import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#334155,#020617)] p-6">
      <Outlet />
    </div>
  );
};
