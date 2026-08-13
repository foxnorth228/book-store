import type { FC } from "react";

interface ProfileButtonProps {
  nickname?: string;
  onClick: () => void;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ nickname, onClick }) => {
  return (
    <button
      type="button"
      className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
      onClick={onClick}
    >
      {nickname ?? "Profile"}
    </button>
  );
};
