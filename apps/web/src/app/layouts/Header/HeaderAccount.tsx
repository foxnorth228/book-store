import { AuthModal, LoginButton, useSessionStore } from "@modules/auth";
import { useState } from "react";

import { AccountMenu } from "./AccountMenu";

export const HeaderAccount = () => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <LoginButton
          className="bg-header text-header-foreground"
          onClick={() => setAuthModalOpen(true)}
        />

        <AuthModal isOpen={authModalOpen} onOpenChange={setAuthModalOpen} />
      </>
    );
  }

  return <AccountMenu />;
};
