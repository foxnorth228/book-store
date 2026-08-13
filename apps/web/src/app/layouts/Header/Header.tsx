import { Page } from "@shared/ui";

import { HeaderAccount } from "./HeaderAccount";

export const Header = () => {
  return (
    <Page.Header>
      <Page.HeaderContent>
        <div className="flex shrink-0 items-center gap-1">
          <HeaderAccount />
        </div>
      </Page.HeaderContent>
    </Page.Header>
  );
};
