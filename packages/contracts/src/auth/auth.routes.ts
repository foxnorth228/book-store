export const authRoutes = {
  login: "/login",
  register: "/register",
  session: {
    $prefix: "/session",
    refresh: "/refresh",
    logout: "/logout",
  },
  passwordReset: {
    $prefix: "/password-reset",
    requestOtpCode: "/request",
    verifyOtpCode: "/verify",
    updatePassword: "/password-update",
  },
  admin: {
    $prefix: "/admin",
    login: "/login",
    session: {
      $prefix: "/session",
      refresh: "/refresh",
      logout: "/logout",
    },
  },
};
