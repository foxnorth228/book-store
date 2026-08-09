import { restoreSession, useSessionStore } from "@modules/auth";
import { loadProfile } from "@modules/profile";
import { FC, PropsWithChildren, useEffect } from "react";

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const isSessionRestored = useSessionStore((s) => s.isSessionRestored);
  const accessToken = useSessionStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    loadProfile();
  }, [accessToken]);

  useEffect(() => {
    restoreSession();
  }, []);

  if (!isSessionRestored) {
    return;
  }

  return children;
};
