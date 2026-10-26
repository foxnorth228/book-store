import { Page } from "@shared/ui";

import { HeaderAccount } from "./HeaderAccount";
import { HeaderSettings } from "./HeaderSettings";

export const Header = () => {
  return (
    <Page.Header>
      <Page.HeaderContent>
        <div className="flex shrink-0 items-center gap-1">
          <HeaderSettings />
          <HeaderAccount />
        </div>
      </Page.HeaderContent>
    </Page.Header>
  );
};
