import { Outlet } from "react-router";

import { Layout } from "./AuthLayout.styles";

export const AuthLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
