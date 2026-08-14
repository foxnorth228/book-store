import { AuthModal, LoginButton, ProfileButton, useSessionStore } from "@modules/auth";
import { useProfileStore } from "@modules/profile";
import { useState } from "react";

export const HeaderAccount = () => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const profile = useProfileStore((state) => state.profile);

  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <LoginButton onClick={() => setAuthModalOpen(true)} />

        <AuthModal isOpen={authModalOpen} onOpenChange={setAuthModalOpen} />
      </>
    );
  }

  return <ProfileButton nickname={profile?.nickname} onClick={() => {}} />;
};
