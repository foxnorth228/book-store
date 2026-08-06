export const authRoutes = {
  login: "/login",
  register: "/register",
  session: {
    $prefix: "/session",
    refresh: "/refresh",
    logout: "/logout",
  },
};
